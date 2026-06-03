import { createFileRoute } from "@tanstack/react-router";

const BASE_URL = "https://faztred.com.ar";

interface Entry { path: string; changefreq?: string; priority?: string; }

const entries: Entry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/servicios", changefreq: "monthly", priority: "0.8" },
  { path: "/proyectos", changefreq: "monthly", priority: "0.8" },
  { path: "/productos", changefreq: "monthly", priority: "0.9" },
  { path: "/contacto", changefreq: "yearly", priority: "0.6" },
  { path: "/automatizacion-industrial", changefreq: "monthly", priority: "0.9" },
  { path: "/tableros-electricos-industriales", changefreq: "monthly", priority: "0.9" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries.map((e) =>
          [
            "  <url>",
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            "  </url>",
          ].filter(Boolean).join("\n"),
        );
        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls,
          "</urlset>",
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
