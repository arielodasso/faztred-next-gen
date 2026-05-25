
# Plan — Pase de pulido + estructura + tracking

Tres frentes acotados, sin sumar secciones nuevas más allá de las que pide el brief que ya tenemos.

---

## 1) Auditoría visual fina

Pulido sistémico sobre lo que ya existe, alineado al brief (moderno, tecnológico, elegante, industrial, sin recargar).

- **Tipografía**: cargar Inter desde `<head>` (hoy se referencia pero no se importa). Unificar escala: H1 hero `clamp(2.4rem, 5vw, 5.25rem)`, H2 sección `clamp(2rem, 3.4vw, 3.25rem)`, body `15–16px`, eyebrows `11px / 0.22em`. Activar `font-feature-settings: "ss01","cv11"` y `tracking-tight` sólo en titulares.
- **Jerarquías**: separación consistente entre eyebrow → título → descripción → CTA (gap 16/24/32). Eliminar dobles bordes y dobles "líneas rojas" donde quedaron juntas.
- **Espaciados**: secciones a `py-24 md:py-32`, contenedor `max-w-7xl`, grids con `gap-6` en cards y `gap-12` en bloques alternados.
- **Micro-interacciones (solo Tailwind, sin Framer)**:
  - Cards: `hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)]` y borde a `foreground/30`.
  - Botones: estado `:active` con `scale-[0.98]`, foco visible con `ring-1 ring-primary/40`.
  - Links de "Ver más / Ver proyecto": flecha con `translate-x-1` en hover, color pasa a rojo sólo en hover.
  - Slider hero: easing `cubic-bezier(0.22,1,0.36,1)`, duración 800ms, fade + slide 8px.
- **Consistencia de radios y botones**: todos los CTAs con `rounded-md` (8px), pills sólo en badges/filtros, iconos en cuadrados `rounded-lg`.
- **Responsive**: revisar hero en 360/390/414 (titular sin quedar pegado al header), navbar pill que no toque los bordes (`px-3`), grids de servicios/proyectos en 2 col desde `sm:`, modal de proyecto con `max-h-[90dvh]` y scroll interno.
- **A11y**: contraste en `text-white/55` (eyebrows) verificado, `aria-current` en navbar activo, foco visible en todos los links.

## 2) Reestructurar Servicios con las 7 categorías del brief

Reescribir `mainServices` en `src/routes/servicios.tsx` y `featuredServices` en `src/lib/site-data.ts` para que coincidan exactamente con el brief:

1. Automatización industrial (PLC, HMI, SCADA, integración, migraciones, capacitaciones)
2. Diseño y fabricación de tableros eléctricos
3. Industria 4.0 y adquisición de datos
4. Mantenimiento industrial
5. Instrumentación industrial
6. Señalización industrial y seguridad visual
7. Sistemas especiales (visión artificial, RFID, integraciones a medida)

- Home muestra 4 destacados (los 4 primeros) + link "Ver todos los servicios".
- Página `/servicios` mantiene layout alternado pero unifica cada bloque con: eyebrow `01/AUTOMATIZACIÓN`, título, descripción corta, lista de capacidades en 2 columnas, CTA "Consultar este servicio" que linkea a `/contacto?servicio={slug}`.
- Cada servicio recibe un `slug` y un ícono Lucide acorde (ya hay set elegido, se ajustan los faltantes).
- SEO: en `head()` de `/servicios` se enriquece la meta description con las palabras clave del brief (PLC, SCADA, tableros, revamping, Industria 4.0, mantenimiento, instrumentación).

## 3) Proyectos con formato Problema → Solución → Resultado

Refactor del modelo `Project` en `src/lib/site-data.ts`:

```ts
interface Project {
  slug; title; industry; category;
  problem: string;          // Situación / desafío
  solution: string[];       // Tareas realizadas (lo que hoy es tasks)
  result: string;           // Resultado obtenido
  technologies: string[];   // Stack (PLC, HMI, marcas)
  images: number;           // placeholders por ahora
}
```

- Modal de `/proyectos` se reescribe con 4 bloques verticales: **Situación**, **Solución implementada**, **Tecnologías utilizadas**, **Resultado obtenido**, más la galería al final.
- Card de listado muestra: industria + categoría (badges), título, situación (2 líneas), CTA "Ver caso".
- Datos: para los 6 proyectos existentes infiero `result` y `technologies` a partir de tasks (ej. revamping bombeo → "Migración exitosa Siemens → Allen Bradley con HMI integrado y puesta en marcha sin paradas" / tech: `Siemens S7`, `Allen Bradley`, `HMI PanelView`). Se marca como editable después con los datos reales del usuario.

## 4) Tracking dataLayer para Google Ads / GA4

Sin instalar GA4 ni GTM (los IDs los pondrás luego). Sólo se dejan los eventos disparándose en `window.dataLayer`:

- Helper nuevo `src/lib/analytics.ts` con `pushEvent(name, payload)` que hace `window.dataLayer = window.dataLayer || []` y push seguro en SSR.
- Inicialización del array en `<head>` desde `__root.tsx`.
- Eventos cableados:
  - `whatsapp_click` → botón flotante, hero, footer, contacto.
  - `form_submit` → `ContactForm` (con `variant` como prop del evento).
  - `phone_click` → todos los `<a href="tel:...">`.
  - `email_click` → mailto en footer y contacto.
  - `meeting_request` → CTA "Agendá una reunión" / "Coordinar reunión".
  - `brochure_download` → CTA del brochure.
  - `service_cta_click` → CTA por servicio (incluye `service_slug`).
  - `project_view` → cuando se abre el modal de un proyecto.
- Cada evento mantiene un shape consistente: `{ event, location, label }` para que GTM filtre fácil.

Cuando me pases los IDs (G-XXXX / GTM-XXXX) cargo los snippets en `__root.tsx` y los eventos ya van a funcionar.

---

## Detalles técnicos

- Sin Framer Motion. Toda la animación queda en Tailwind + keyframes ya definidos en `styles.css` (`fade-in`, `marquee`).
- Sin nuevas dependencias.
- `Placeholder` se mantiene; cuando subas las fotos reales se reemplazan por `<img>` con `loading="lazy"` y `alt` SEO.
- Inter se carga con `<link rel="preconnect">` + `<link rel="stylesheet">` desde Google Fonts en `__root.tsx`, manteniendo `font-display: swap`.
- Eventos dataLayer no requieren consent banner para el push en sí, pero el snippet de GA/GTM (cuando lo agreguemos) sí debería convivir con uno — eso queda fuera de este pase.

---

## Fuera de alcance (para iteración siguiente)

- Sección "Industria 4.0 / Innovación" dedicada (la sumamos cuando tengas screenshots de dashboards reales).
- Reemplazo de placeholders por fotos reales.
- Instalación efectiva de GA4 / GTM / Google Ads (necesito los IDs).
- Blog / noticias técnicas.
- Calendario embebido para reuniones.
