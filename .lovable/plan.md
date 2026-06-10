# Plan: Admin de Proyectos, Categorías y Encabezados

## Objetivo
Convertir el contenido hoy hardcodeado en `src/lib/site-data.ts` (proyectos y categorías) y los heros estáticos de cada página en contenido administrable desde el superadmin.

## 1. Base de datos (1 migración)

**Tablas nuevas en `public`:**
- `project_categories` — `id`, `name`, `slug` (único), `sort_order`. Seed con las 7 categorías actuales (Automatización, Tableros, Revamping, Capacitación, Cerramiento, Antiexplosivo, Señalización).
- `projects` — `id`, `slug` (único), `title`, `industry`, `category_id` (FK), `problem`, `solution` (text[]), `result`, `technologies` (text[]), `cover_url`, `gallery` (text[]), `is_published` (bool), `sort_order`. Seed con los 8 proyectos actuales (subiendo las imágenes existentes al bucket).
- `page_heroes` — `id`, `page_key` (único: `home`, `servicios`, `productos`, `proyectos`, `contacto`, `login`), `eyebrow`, `title`, `subtitle`, `image_url`. Seed con valores actuales por defecto.

**RLS:**
- `SELECT` público (anon + authenticated) en las tres tablas. Para projects, además filtro `is_published = true` vía policy.
- `INSERT/UPDATE/DELETE` sólo `has_role(auth.uid(), 'superadmin')`.
- `GRANT`s explícitos por convención del proyecto.

**Storage:**
- Bucket público nuevo `site-media` con policy de upload para superadmin. Subcarpetas `projects/` y `heroes/`.

## 2. Nuevas rutas admin

- `/admin/proyectos` — Lista de proyectos con buscador + botón "Nuevo". Drawer/modal de edición con todos los campos (título, slug, industria, categoría dropdown, problema, solución como lista editable, resultado, tecnologías como tags, publicado, imagen de portada + galería con subida múltiple a `site-media`, reordenable). Sección secundaria con CRUD de categorías (nombre + slug + orden).
- `/admin/encabezados` — Lista fija de las 6 páginas. Por cada una: preview + form con eyebrow, title, subtitle e imagen de hero (upload a `site-media/heroes/`).

Sidebar de `admin.tsx`: agregar dos items entre Clientes y Formularios con íconos `FolderKanban` y `Image`.

## 3. Server functions
`src/lib/site-content.functions.ts` con:
- `getPublicProjects()` / `getPublicCategories()` / `getPageHero(page_key)` — públicos, devuelven DTOs serializables.
- Mutations admin (crear/editar/eliminar proyecto, categoría, hero) protegidas con `requireSupabaseAuth` + chequeo de rol superadmin server-side.

## 4. Frontend público (cambios mínimos)

- `src/routes/proyectos.tsx`: loader que llama `getPublicProjects` + `getPublicCategories` vía Query. El filtro de categorías ahora se construye desde DB en vez del array literal. El tipo `ProjectCategory` queda como `string`.
- `PageHero` se mantiene igual; cada página (home, servicios, productos, proyectos, contacto, login) consume `getPageHero('xxx')` para obtener título/subtítulo/imagen. Fallback a los valores actuales si la DB no responde, para no romper SSR.
- `site-data.ts` mantiene los imports de imágenes sólo como fallback inicial; cuando admin sube reemplazos, se usa la URL del bucket.

## Detalles técnicos
- Imágenes: subida directa con `supabase.storage.from('site-media').upload(...)` desde el cliente admin (autenticado), y se guarda el `publicUrl` en la tabla.
- Galería: drag-and-drop opcional fuera de alcance; reorden con botones ↑/↓.
- SSR: loaders públicos usan `supabaseAdmin` dentro del handler para evitar problemas de auth durante prerender.
- No se borran datos existentes: el seed inicial replica el contenido actual para que `/proyectos` siga viéndose igual antes de cualquier edición.

## Lo que NO incluye
- Editor rich-text (los campos largos quedan como textarea simple).
- Drag-and-drop para reordenar (uso botones ↑/↓).
- Versionado / historial.
- Internacionalización.

## Confirmación
¿Avanzo con esto o querés ajustar algo (por ejemplo, agregar más campos, otro nombre de bucket, o sumar/quitar páginas del admin de encabezados)?
