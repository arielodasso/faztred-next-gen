# Sitio web Faztred Soluciones

Sitio multipágina para Faztred (automatización industrial). Estética minimalista premium tipo dashboard industrial, paleta blanco/negro/grafito con rojo #CC0000 sólo en acentos. Tipografía Inter. Todas las imágenes serán placeholders neutros grises con dimensiones correctas — sin generación por IA.

## Páginas (rutas TanStack Start)

- `/` Home
- `/servicios`
- `/proyectos`
- `/contacto`

Navegación real entre rutas, no single-page scroll. Cada ruta con su propio `head()` (title + description + og tags) usando keywords: automatización industrial, PLC, SCADA, tableros eléctricos, revamping, Industria 4.0.

## Componentes compartidos

- **Navbar** sticky, fondo oscuro #1A1A1A, logo blanco, links + CTA rojo "Agendá una reunión", hamburguesa mobile.
- **Footer** #111111 con dirección, contacto, horarios, redes (Instagram, LinkedIn, WhatsApp), copyright.
- **WhatsApp flotante** fijo bottom-right en todas las páginas (link a wa.me con mensaje pre-cargado).
- **PlaceholderImage** component (div gris con dimensiones + label discreto) para todas las fotos.

## Home

1. Hero slider 3 slides con auto-transición suave, overlay oscuro sobre placeholder, título grande, subtítulo, CTA rojo.
2. "Cómo contactarnos" — 3 cards con íconos Lucide (Calendar, MessageCircle, Phone) sobre fondo claro.
3. Métricas — fondo #1A1A1A, números grandes blancos, acentos rojos (+300 proyectos, +15 años, industrias).
4. Servicios destacados — grid de 8 cards con ícono + título + descripción, hover acento rojo, CTA a /servicios.
5. Proyectos destacados — grid 3 columnas × 6 cards con placeholder, badge industria, título, situación, "VER MÁS".
6. ¿Por qué Faztred? — fondo oscuro, grid 4 cards (en realidad 6 según contenido) con ícono + título + descripción.
7. Clientes — marquee horizontal con logos placeholder.
8. Brochure — fondo gris claro, texto + botón rojo "DESCARGAR" (link al PDF actual) + placeholder.
9. Formulario rápido — Nombre, Teléfono, Email, Mensaje + botón rojo.

## Servicios

- Hero interno oscuro.
- 7 bloques grandes alternados imagen/texto (Automatización industrial, Tableros eléctricos, Industria 4.0, Mantenimiento, Instrumentación, Señalización, Sistemas especiales) con sub-listas de servicios.
- Áreas de trabajo — grid 4 (Consultoría, Desarrollo, Soporte, Mantenimiento preventivo).
- CTA final oscuro/rojo a /contacto.

## Proyectos

- Hero interno.
- Tabs de filtro por categoría (estado client-side): Todos, Automatización, Tableros, Revamping, Capacitación, Cerramiento, Antiexplosivo.
- Grid de 6 proyectos con placeholder, badge industria, título, situación, tareas, botón "VER PROYECTO" que abre modal con galería de placeholders adicionales.
- CTA final.

## Contacto

- Hero interno.
- Layout 2 columnas: datos de contacto + botón WhatsApp verde a la izquierda; formulario completo (Nombre, Empresa, Teléfono, Email, Mensaje) + botón "ENVIAR CONSULTA" + "Agendá reunión online" outline a la derecha.
- Formularios con validación client-side y toast de feedback (sin backend — sólo UI; queda listo para conectar después).

## Detalles técnicos

- TanStack Start file-based routing en `src/routes/` (`__root.tsx` con Navbar/Footer/WhatsApp flotante via Outlet, más `index.tsx`, `servicios.tsx`, `proyectos.tsx`, `contacto.tsx`).
- Tokens de diseño en `src/styles.css` (oklch): background blanco, foreground #111, surface-dark #1A1A1A, footer #111111, accent rojo #CC0000. Sin clases hex directas en componentes.
- Inter cargada vía Google Fonts en `__root.tsx` `head().links`.
- Logos: copiar los 2 PNG subidos a `src/assets/` (blanco para header oscuro / negro para fondos claros) e importarlos como ES modules. Favicon: copiar `icono_sitio.ico` a `public/`.
- Íconos Lucide React.
- Animaciones con Tailwind transitions + framer-motion para slider hero y reveal on scroll.
- Mobile-first, breakpoints `md`/`lg`. Menú hamburguesa con sheet.
- Sin backend: formularios sólo validan y muestran toast. Sin Lovable Cloud por ahora.
- Sin imágenes generadas — componente `PlaceholderImage` reutilizable con aspect ratio + label "Reemplazar con foto real".

En la página de Proyectos, cada proyecto debe tener sus placeholders de imagen con el número correcto: proyecto 1 = 2 imágenes, proyecto 2 = 2, proyecto 3 = 2, proyecto 4 = 2, proyecto 5 = 3, proyecto 6 = 2. El modal debe mostrar esa cantidad exacta por proyecto.

Cada ruta debe tener su propio head() con title y meta description únicos — no solo en el root. Ejemplo: /servicios debe tener title 'Servicios de Automatización Industrial | Faztred Soluciones' y su propia description con keywords.