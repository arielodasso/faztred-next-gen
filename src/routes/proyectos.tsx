import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Placeholder } from "@/components/site/Placeholder";
import { Badge } from "@/components/site/Badge";
import { projects, type Project, type ProjectCategory } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/proyectos")({
  component: ProyectosPage,
  head: () => ({
    meta: [
      { title: "Proyectos Realizados | Faztred Soluciones" },
      { name: "description", content: "Casos reales de automatización industrial, tableros eléctricos, revamping, antiexplosivo y capacitaciones en planta." },
      { property: "og:title", content: "Proyectos | Faztred Soluciones" },
      { property: "og:description", content: "Experiencia real en planta. Problemas reales, soluciones concretas." },
      { property: "og:url", content: "/proyectos" },
    ],
    links: [{ rel: "canonical", href: "/proyectos" }],
  }),
});

const categories: ("Todos" | ProjectCategory)[] = [
  "Todos",
  "Automatización",
  "Tableros",
  "Revamping",
  "Capacitación",
  "Cerramiento",
  "Antiexplosivo",
];

function ProyectosPage() {
  const [active, setActive] = useState<(typeof categories)[number]>("Todos");
  const [open, setOpen] = useState<Project | null>(null);

  const filtered =
    active === "Todos" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <PageHero
        eyebrow="Casos reales"
        title="Proyectos realizados"
        subtitle="Experiencia real en planta. Problemas reales, soluciones concretas."
      />

      {/* Filters */}
      <section className="py-10 md:py-14 bg-background border-b border-border sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  "px-4 py-2 text-xs uppercase tracking-wider font-semibold border rounded-full transition-colors",
                  active === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <article
                key={p.slug}
                className="group bg-white border border-border rounded-xl hover:border-foreground/30 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] transition-all overflow-hidden flex flex-col hover:-translate-y-1 duration-300"
              >
                <Placeholder ratio="video" />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="solid">{p.industry}</Badge>
                    <Badge variant="ghost">{p.category}</Badge>
                  </div>
                  <h3 className="mt-4 text-lg font-bold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground flex-1">{p.situation}</p>
                  <ul className="mt-4 space-y-1.5">
                    {p.tasks.slice(0, 2).map((t) => (
                      <li key={t} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-foreground/50 mt-0.5 flex-shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setOpen(p)}
                    className="mt-6 inline-flex items-center gap-2 text-foreground group-hover:text-primary transition-colors text-xs font-semibold uppercase tracking-wider self-start"
                  >
                    Ver proyecto
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-20">
              No hay proyectos en esta categoría todavía.
            </p>
          )}
        </div>
      </section>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setOpen(null)}
        >
          <div
            className="bg-background max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-background z-10 flex items-center justify-between border-b border-border px-6 py-4">
              <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-semibold flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {open.industry} · {open.category}
              </span>
              <button onClick={() => setOpen(null)} aria-label="Cerrar" className="p-2 hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{open.title}</h3>
              <p className="mt-4 text-muted-foreground">{open.situation}</p>

              <h4 className="mt-8 text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-semibold">
                Tareas realizadas
              </h4>
              <ul className="mt-4 space-y-2">
                {open.tasks.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-foreground/50 mt-0.5 flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <h4 className="mt-8 text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-semibold">
                Galería
              </h4>
              <div className={cn(
                "mt-4 grid gap-4",
                open.images === 3 ? "md:grid-cols-3" : "md:grid-cols-2",
              )}>
                {Array.from({ length: open.images }).map((_, i) => (
                  <Placeholder key={i} ratio="video" />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-[color:var(--surface-dark)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_60%)]" />
        <div className="absolute bottom-0 right-1/4 w-[40%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(204,0,0,0.07),transparent_70%)] blur-2xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            ¿Querés ver cómo podemos resolver tu desafío?
          </h2>
          <Link
            to="/contacto"
            className="mt-10 group inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-8 py-4 text-xs font-semibold tracking-wider uppercase"
          >
            Hablemos de tu proyecto
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
