
## Migración a Vite SPA

Voy a convertir todo el proyecto de TanStack Start (SSR sobre Cloudflare Workers) a una SPA estática con React Router. `npm run build` producirá solo `dist/` con `index.html` y assets.

### Implicancias importantes (leer antes de aprobar)

1. **Email de contacto con Resend deja de funcionar tal cual está.**
   Hoy se envía vía `createServerFn` (server function) usando `RESEND_API_KEY` desde `process.env`. En una SPA estática no hay servidor: la API key no puede vivir en el browser (sería pública y cualquiera podría usarla).
   **Solución propuesta:** mover el envío a una **Edge Function de Lovable Cloud (Supabase)** y llamarla desde el browser. Sigue siendo "Supabase desde el browser", la key queda segura en el backend de Lovable Cloud. Si preferís, puedo simplemente eliminar el envío y dejar solo el guardado en la tabla `contact_submissions`.

2. **Ruta `/api/public/media/*` (servidor) desaparece.**
   Hoy proxea archivos privados del bucket de Storage. En SPA no existe. Voy a hacer que `mediaUrl()` devuelva directamente la URL pública del bucket de Supabase Storage (requiere que el bucket sea público o usar signed URLs). Lo más simple: marcar `site-media` como **bucket público** y servir desde la URL pública de Supabase.

3. **Sitemap dinámico (`/sitemap.xml`) deja de ser dinámico.**
   Pasa a ser un `public/sitemap.xml` estático que listamos a mano con las rutas conocidas. (Las URLs no cambian, así que no se pierde nada práctico.)

4. **SEO / metadata por ruta**
   Sin SSR, los metadatos se inyectan en runtime en el cliente. Google los lee igual (renderiza JS), pero algunos crawlers de redes sociales no. Voy a usar un componente tipo `<Head>` con efectos que actualizan `<title>` / `<meta>`. Los OG tags base quedan en `index.html`.

5. **GTM** se mueve a `index.html` con el ID por defecto. (Si querés mantenerlo configurable desde el admin como hoy, hay que aceptar que en la primera carga aparece el default y luego cambia — pero GTM ya inicializado no se reemplaza, así que recomiendo dejarlo fijo en `index.html`.)

### Cambios de código

**Eliminar:**
- `wrangler.jsonc`, `src/server.ts`, `src/start.ts`, `src/router.tsx`, `src/routeTree.gen.ts`
- `src/lib/error-capture.ts`, `src/lib/error-page.ts`
- `src/routes/__root.tsx`, `src/routes/api.public.media.$.tsx`, `src/routes/sitemap[.]xml.tsx`
- `src/lib/send-contact-email.functions.ts`, `src/lib/site-config.functions.ts`, `src/lib/site-content.functions.ts`, `src/lib/admin-users.functions.ts`
- `src/integrations/supabase/client.server.ts`, `auth-middleware.ts`, `auth-attacher.ts`
- `supabase/config.toml` (queda solo lo necesario)
- Dependencias: `@tanstack/react-router`, `@tanstack/react-start`, `@tanstack/router-plugin`, `@cloudflare/vite-plugin`, `@lovable.dev/vite-tanstack-config`, `nitro`

**Agregar:**
- `react-router-dom`
- `vite` con `@vitejs/plugin-react` + `@tailwindcss/vite` (config SPA simple)
- `index.html` en la raíz con favicon, fonts, GTM y mount point `#root`
- `src/main.tsx` con `<BrowserRouter>` + `QueryClientProvider` + montaje en `#root`
- `src/App.tsx` con `<Routes>` listando todas las páginas (mismas URLs)
- `src/components/AppShell.tsx` con Navbar/Footer/WhatsApp/CalendarModal/Toaster (lo que hoy hace `RootComponent`)
- `src/components/ProtectedRoute.tsx` para `/admin/*`
- `public/sitemap.xml` y `public/robots.txt` (ya existe)
- Edge function `send-contact-email` en Supabase (si elegís opción A)

**Migrar todos los archivos de rutas y componentes:**
- Cambiar `createFileRoute(...)({ component })` → exportar componente directamente.
- Cambiar `Link, useNavigate, useRouter` de `@tanstack/react-router` → `react-router-dom` (`Link`/`useNavigate`, props: `to` con strings interpolados, no `params`).
- Reemplazar llamadas a server functions:
  - `getPublicSiteConfig`, `getAdminSiteConfig`, etc. → consultas directas a Supabase desde el cliente.
  - `sendContactEmail` → `supabase.functions.invoke('send-contact-email', ...)` (opción A) o solo insertar en tabla (opción B).
  - Funciones admin que usaban service role → mover a edge function con verificación de rol, o eliminar features que requieran service role (ej. crear usuarios desde admin requiere edge function).
- `head()` de TanStack → hook `useDocumentHead({ title, description, ogImage })` que setea `document.title` y meta tags.

**Build output:** `vite.config.ts` por defecto produce `dist/` con `index.html` + `assets/`. No habrá `client/` ni `server/`.

### Preguntas antes de empezar

- **A** (recomendado): mover envío de email a Edge Function de Supabase, o **B**: solo guardar en DB y olvidar el email?
- ¿Está OK volver **público** el bucket `site-media`? (alternativa: signed URLs, más código)
- ¿Funciones admin que crean/eliminan usuarios (service role) — las mantenemos vía Edge Function, o las dejamos fuera por ahora?

Confirmá esas tres decisiones y arranco con la migración completa.
