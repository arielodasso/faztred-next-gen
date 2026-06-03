## Resumen

Activo Lovable Cloud (base de datos + auth + storage + mails) y construyo todo en 4 fases. Cada fase queda usable en sí misma, así podés revisar antes de avanzar.

---

## Fase 1 — Popups (rápido, sin Cloud)

**1.1 Popup de "Agendar reunión" estilo Sigma**
- Reemplazo todos los CTAs de "Agendar reunión", "Coordinar reunión", "Agendá una reunión" para que abran `https://calendar.app.google/aFcAAPqGVBe72yF27` en un popup centrado (window.open con `width=800,height=700,centered`), no en pestaña nueva.
- Mantengo el tracking `meeting_request` en dataLayer.
- Archivos: `src/lib/calendar-popup.ts` (helper), `src/routes/index.tsx`, `src/routes/contacto.tsx`, footer si aplica.

**1.2 Popup de novedades en home (primera visita)**
- Componente `WelcomePopup` que aparece a los 1.2s si no existe `localStorage.faztred_welcome_seen`.
- Lee contenido desde Cloud (fase 2) — mientras tanto tira contenido hardcodeado de prueba.
- Estructura: imagen + título + descripción + botón con link.
- Cierre con X o clic fuera, marca el flag en localStorage.

---

## Fase 2 — Lovable Cloud + Auth + esquema

**2.1 Activar Cloud** (Supabase nativo de Lovable).

**2.2 Esquema de base de datos**
- `profiles` (id, email, full_name, company_name, created_at) — 1:1 con auth.users.
- `user_roles` con enum `app_role` = `superadmin | client_admin` (tabla separada, política `has_role()` security definer).
- `client_attachments` (id, client_user_id, file_name, file_path, file_size, mime_type, uploaded_by, created_at).
- `contact_submissions` (id, name, email, phone, company, message, source, created_at, read).
- `popup_config` (id singleton, enabled, title, description, image_url, button_label, button_url, updated_at).
- `trust_logos` (id, name, image_url, sort_order, visible).
- `app_settings` (id singleton, contact_email, whatsapp_number, whatsapp_default_message).

**2.3 Storage buckets**
- `client-attachments` (privado, 50MB, cualquier MIME) — RLS: solo superadmin sube, cliente solo ve los suyos.
- `popup-images` (público, imágenes).
- `trust-logos` (público, imágenes).

**2.4 RLS** — políticas por tabla usando `has_role(auth.uid(), 'superadmin')`. Adjuntos visibles solo al cliente asignado o superadmin.

**2.5 Seed del superadmin** — usuario `info@faztred.com.ar` / `infoFaztred!2026` creado vía edge admin con rol `superadmin`. Email auto-confirmado.

**2.6 Auth pages**
- `/auth/login` — email + password, sin OAuth.
- `/auth/forgot-password` — envía mail de reset (Lovable Emails).
- `/auth/reset-password` — captura el token y permite nueva password.
- Layout `_authenticated/route.tsx` (manejado por la integración) que protege `/admin/*`.
- Redirect post-login: superadmin → `/admin`, client_admin → `/admin/adjuntos`.

---

## Fase 3 — Panel del Superadmin

**3.1 Layout `/admin`** con sidebar lateral inspirado en la captura, adaptado a la identidad Faztred (fondo negro/charcoal, acento rojo, tipografía Inter, logo Faztred arriba, "Sesión activa" abajo con el email, "Cerrar sesión").

**Tabs (rutas):**
- `/admin` — Dashboard simple (contadores: formularios nuevos, clientes, adjuntos).
- `/admin/usuarios` — listar/crear/eliminar superadmins.
- `/admin/clientes` — CRUD de empresas cliente + sección de adjuntos por cliente (upload, listar, eliminar). Crear cliente = crear auth user + profile + rol `client_admin` + invitación por mail con password temporal.
- `/admin/formularios` — lista de envíos del form de contacto, filtro por email y rango de fechas, marcar leído, exportar CSV. Estilo similar a Mobihunter pero con identidad Faztred.
- `/admin/popup` — editor del popup (toggle on/off, título, descripción, upload de imagen, label y URL del botón) con preview.
- `/admin/confianza` — gestionar logos de "Algunos de nuestros clientes" (upload, reordenar, mostrar/ocultar, eliminar).
- `/admin/configuracion` — editar `contact_email`, `whatsapp_number`, `whatsapp_default_message`. Los CTAs del front leen estos valores.
- "Ver sitio web" en el footer del sidebar → abre `/` en pestaña nueva.

**3.2 Wiring del front con la base**
- `WelcomePopup` lee de `popup_config`.
- Sección "Algunos de nuestros clientes" en home lee de `trust_logos`.
- Botón flotante de WhatsApp + links de contacto leen de `app_settings`.
- `ContactForm` inserta en `contact_submissions` y dispara mail al `contact_email` configurado (Lovable Emails).

---

## Fase 4 — Panel del Cliente

**4.1 Layout y rutas**
- Mismo sidebar, versión reducida: "Mis adjuntos" + "Ver sitio web".
- `/admin/adjuntos` — lista de archivos asignados a su user, descarga con signed URL (privado).
- Si el cliente intenta entrar a otra ruta admin, redirect a `/admin/adjuntos`.

---

## Detalles técnicos

- Stack: TanStack Start + Supabase (Lovable Cloud), `createServerFn` para operaciones admin (crear users, listar formularios), `supabaseAdmin` para creación de users.
- Roles: tabla `user_roles` separada + función `has_role()` security definer (nunca rol en `profiles`).
- Storage privado para adjuntos, signed URLs de 1h al descargar.
- Mails transaccionales: Lovable Emails (al activarse Cloud configuro el dominio si hace falta).
- Validación con Zod en todos los formularios (cliente y server).
- Diseño del admin: usa los tokens existentes de `styles.css` (charcoal `--background`, rojo `--primary`, Inter). Sidebar fijo a la izquierda, ancho `260px`, ítem activo con borde izquierdo rojo + fondo `--muted`, igual feel que Mobihunter pero con paleta Faztred.

## Fuera de alcance (lo aclaro para que decidas si lo querés sumar)

- Notificaciones por mail al cliente cuando el superadmin le sube un nuevo adjunto.
- Auditoría (log de quién hizo qué).
- 2FA para superadmin.
- Mail dominio propio (`@faztred.com.ar`) para el remitente — por defecto sale desde el dominio Lovable hasta que configures DNS.

---

¿Avanzo con la Fase 1 ahora (popup de calendario + popup de bienvenida con contenido temporal) y después arranco Fase 2 activando Cloud? ¿O preferís que active Cloud primero y construya todo de corrido?