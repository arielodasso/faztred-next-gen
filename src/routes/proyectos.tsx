import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, X, Sparkles, TrendingUp } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Placeholder } from "@/components/site/Placeholder";
import { Badge } from "@/components/site/Badge";
import { projects, type Project, type ProjectCategory } from "@/lib/site-data";
import { pushEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/proyectos")({
  component: ProyectosPage,
  head: () => ({
    meta: [
      { title: "Proyectos realizados — Casos reales de automatización | Faztred" },
      {
        name: "description",
        content:
          "Casos reales de automatización industrial, tableros eléctricos, revamping, instalaciones antiexplosivas y capacitaciones. Problema, solución y resultado.",
      },
      { property: "og:title", content: "Proyectos | Faztred Soluciones" },
      {
        property: "og:description",
        content: "Experiencia real en planta. Problemas reales, soluciones concretas.",
      },
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

  useEffect(() => {
    if (!open) return;
    pushEvent("project_view", {
      location: "proyectos_modal",
      label: open.title,
      project_slug: open.slug,
      industry: open.industry,
      category: open.category,
    });
    // Body scroll lock
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <PageHero
        eyebrow="Casos reales"
        title="Proyectos realizados"
        subtitle="Experiencia real en planta. Problema, solución y resultado."
      />

      {/* Filters */}
      <section className="py-8 md:py-10 bg-background border-b border-border sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                aria-pressed={active === c}
                className={cn(
                  "px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-semibold border rounded-full transition-colors cta-press",
                  active === c
                    ? "bg-foreground text-white border-foreground"
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
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <article
                key={p.slug}
                className="group bg-white border border-border rounded-xl hover:border-foreground/30 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] transition-all overflow-hidden flex flex-col hover:-translate-y-0.5 duration-300"
              >
                {p.cover ? (
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img src={p.cover} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                  </div>
                ) : (
                  <Placeholder ratio="video" />
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="solid">{p.industry}</Badge>
                    <Badge variant="ghost">{p.category}</Badge>
                  </div>
                  <h3 className="mt-4 text-lg font-bold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.problem}</p>
                  <ul className="mt-4 space-y-1.5 flex-1">
                    {p.solution.slice(0, 2).map((t) => (
                      <li key={t} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-foreground/45 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{t}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setOpen(p)}
                    className="cta-press mt-6 inline-flex items-center gap-2 text-foreground group-hover:text-primary transition-colors text-xs font-semibold uppercase tracking-[0.15em] self-start"
                  >
                    Ver caso
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
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
        >
          <div
            className="bg-background max-w-4xl w-full max-h-[90dvh] overflow-y-auto rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-background/95 backdrop-blur z-10 flex items-center justify-between border-b border-border px-6 py-4">
              <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-semibold flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {open.industry} · {open.category}
              </span>
              <button
                onClick={() => setOpen(null)}
                aria-label="Cerrar"
                className="p-2 hover:bg-muted rounded-md transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{open.title}</h3>

              {/* Situación */}
              <h4 className="mt-8 text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-semibold">
                Situación
              </h4>
              <p className="mt-3 text-muted-foreground leading-relaxed">{open.problem}</p>

              {/* Solución implementada */}
              <h4 className="mt-8 text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-semibold">
                Solución implementada
              </h4>
              <ul className="mt-3 space-y-2">
                {open.solution.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-foreground/55 mt-0.5 flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              {/* Tecnologías */}
              <h4 className="mt-8 text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-semibold flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-foreground/55" />
                Tecnologías utilizadas
              </h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {open.technologies.map((tech) => (
                  <li key={tech}>
                    <Badge variant="light">{tech}</Badge>
                  </li>
                ))}
              </ul>

              {/* Resultado */}
              <h4 className="mt-8 text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-semibold flex items-center gap-2">
                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                Resultado obtenido
              </h4>
              <p className="mt-3 text-foreground leading-relaxed border-l-2 border-primary/60 pl-4">
                {open.result}
              </p>

              {/* Galería */}
              <h4 className="mt-10 text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-semibold">
                Galería
              </h4>
              <div
                className={cn(
                  "mt-4 grid gap-4",
                  (open.gallery?.length ?? open.images) >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
                )}
              >
                {open.gallery && open.gallery.length > 0
                  ? open.gallery.map((src, i) => (
                      <div key={i} className="aspect-video w-full overflow-hidden rounded-md bg-muted">
                        <img src={src} alt={`${open.title} ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
                      </div>
                    ))
                  : Array.from({ length: open.images }).map((_, i) => (
                      <Placeholder key={i} ratio="video" />
                    ))}
              </div>

              {/* CTA modal */}
              <div className="mt-10 pt-8 border-t border-border flex flex-wrap gap-3">
                <Link
                  to="/contacto"
                  onClick={() =>
                    pushEvent("meeting_request", {
                      location: "project_modal",
                      label: open.title,
                      project_slug: open.slug,
                    })
                  }
                  className="cta-press inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-6 py-3.5 text-xs font-semibold tracking-[0.15em] uppercase transition-colors"
                >
                  Hablemos de un proyecto similar
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-[color:var(--surface-dark)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_60%)]" />
        <div className="absolute bottom-0 right-1/4 w-[40%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(204,0,0,0.07),transparent_70%)] blur-2xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            ¿Querés ver cómo podemos resolver tu desafío?
          </h2>
          <Link
            to="/contacto"
            onClick={() => pushEvent("meeting_request", { location: "proyectos_final_cta" })}
            className="cta-press mt-10 group inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-8 py-4 text-xs font-semibold tracking-[0.15em] uppercase transition-colors"
          >
            Hablemos de tu proyecto
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
