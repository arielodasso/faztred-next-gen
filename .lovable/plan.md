# Por qué quedó en blanco

Cuando corriste `npm run build` en tu PC, Vite necesita las variables `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` y `VITE_SUPABASE_PROJECT_ID` para inyectarlas en el bundle. En Lovable esas viven en el archivo `.env` que es gestionado automáticamente por Lovable Cloud y **no se sube a GitHub** (está en `.gitignore`).

Resultado: el `dist/assets/index-*.js` que subiste a Don Web inicializa el cliente del backend con `undefined`, tira un error en el primer render y el `<div id="root">` queda vacío → página en blanco.

Lo confirmás abriendo la consola del navegador en faztred.com.ar (F12 → Console): vas a ver un error tipo `Missing Supabase URL` o `Invalid URL` apenas carga.

# Solución recomendada (la más simple y la correcta para Lovable)

**No buildees localmente. Publicá desde Lovable** con el botón Publish y después conectá el dominio faztred.com.ar en Project Settings → Domains. Lovable hace el build con las variables correctas, sirve el SPA con fallback de rutas (deep links funcionan en refresh) y vos no tenés que tocar FTP nunca más.

# Solución alternativa (si querés seguir hosteando en Don Web)

1. En la raíz del proyecto descargado, crear un archivo `.env` con:
   ```
   VITE_SUPABASE_URL=https://kjnconitalepzamnrcqd.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_8aBk8gaNQGrfZX7e5nsMpw_FMav0l49
   VITE_SUPABASE_PROJECT_ID=kjnconitalepzamnrcqd
   ```
2. `npm run build` de nuevo.
3. Subir el contenido de `dist/` a Don Web (reemplazando lo anterior).
4. Configurar en Don Web el **SPA fallback**: todas las rutas no encontradas deben servir `index.html` (si no, `/servicios`, `/contacto`, etc. van a dar 404 al recargar). En Apache esto se hace con un `.htaccess` en la raíz:
   ```
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

# Mi recomendación

Publicá desde Lovable y apuntá faztred.com.ar al hosting de Lovable. Te ahorra el `.htaccess`, el rebuild manual cada vez que cambies algo, y el riesgo de exponer claves equivocadas. ¿Querés que avancemos por ese camino?
