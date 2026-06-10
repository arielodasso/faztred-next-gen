import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, X, Sparkles, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import heroImage from "@/assets/hero-industrial.jpg";
import { Placeholder } from "@/components/site/Placeholder";
import { Badge } from "@/components/site/Badge";
import { projects as staticProjects, type Project as StaticProject } from "@/lib/site-data";
import { pushEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { mediaUrl } from "@/lib/media-url";

export const Route = createFileRoute("/proyectos")({
  component: ProyectosPage,
  validateSearch: (search: Record<string, unknown>) => ({
    cat: typeof search.cat === "string" ? (search.cat as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Proyectos — Casos reales | Faztred" },
      {
        name: "description",
        content:
          "Casos reales de automatización industrial, tableros eléctricos, revamping y capacitaciones. Problema, solución y resultado.",
      },
      { property: "og:title", content: "Proyectos | Faztred Soluciones" },
      {
        property: "og:description",
        content: "Experiencia real en planta. Problemas reales, soluciones concretas.",
      },
      { property: "og:url", content: "/proyectos" },
    ],
    links: [{ rel: "canonical", href: "/proyectos" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Proyectos realizados — Faztred Soluciones",
          description:
            "Portfolio de proyectos de automatización industrial, tableros eléctricos, revamping y capacitaciones ejecutados por Faztred en Argentina.",
          url: "https://faztred.com.ar/proyectos",
          isPartOf: { "@type": "WebSite", name: "Faztred Soluciones", url: "https://faztred.com.ar" },
        }),
      },
    ],
  }),
});

interface Project {
  slug: string;
  title: string;
  industry: string;
  category: string;
  problem: string;
  solution: string[];
  result: string;
  technologies: string[];
  images: number;
  gallery?: string[];
  cover?: string;
}

function fromStatic(p: StaticProject): Project {
  return { ...p };
}

function ProyectosPage() {
  const { cat } = Route.useSearch();
  const [active, setActive] = useState<string>(cat ?? "Todos");
  const [open, setOpen] = useState<Project | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [dbProjects, setDbProjects] = useState<Project[] | null>(null);
  const [dbCategories, setDbCategories] = useState<string[] | null>(null);

  useEffect(() => {
    (async () => {
      const [{ data: pRows }, { data: cRows }] = await Promise.all([
        supabase
          .from("projects")
          .select("slug, title, industry, problem, solution, result, technologies, cover_url, gallery, project_categories(name)")
          .eq("is_published", true)
          .order("sort_order"),
        supabase.from("project_categories").select("name").order("sort_order"),
      ]);
      if (pRows && pRows.length > 0) {
        const mapped: Project[] = (pRows as Array<Record<string, unknown> & { project_categories: { name: string } | null }>).map((r) => ({
          slug: r.slug as string,
          title: r.title as string,
          industry: (r.industry as string) ?? "",
          category: r.project_categories?.name ?? "Sin categoría",
          problem: (r.problem as string) ?? "",
          solution: (r.solution as string[]) ?? [],
          result: (r.result as string) ?? "",
          technologies: (r.technologies as string[]) ?? [],
          images: 0,
          gallery: ((r.gallery as string[]) ?? []).map((g) => mediaUrl(g) ?? g),
          cover: mediaUrl(r.cover_url as string | null) ?? undefined,
        }));
        setDbProjects(mapped);
      } else {
        setDbProjects([]);
      }
      if (cRows && cRows.length > 0) {
        setDbCategories((cRows as Array<{ name: string }>).map((c) => c.name));
      }
    })();
  }, []);

  useEffect(() => {
    if (cat) setActive(cat);
  }, [cat]);

  const projects: Project[] = useMemo(() => {
    if (dbProjects && dbProjects.length > 0) return dbProjects;
    return staticProjects.map(fromStatic);
  }, [dbProjects]);

  const categories: string[] = useMemo(() => {
    const base = dbCategories ?? ["Automatización", "Tableros", "Revamping", "Capacitación", "Cerramiento", "Antiexplosivo", "Señalización"];
    return ["Todos", ...base];
  }, [dbCategories]);

  const lightboxImages = open?.gallery ?? [];

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? null : (i + 1) % lightboxImages.length));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? null : (i - 1 + lightboxImages.length) % lightboxImages.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, lightboxImages.length]);

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
        pageKey="proyectos"
        eyebrow="Casos reales"
        title="Proyectos realizados"
        subtitle="Experiencia real en planta. Problema, solución y resultado."
        backgroundImage={heroImage}
      />

      {/* Filters */}
      <section className="py-8 md:py-10 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex md:flex-wrap gap-2 overflow-x-auto md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                aria-pressed={active === c}
                className={cn(
                  "shrink-0 snap-start px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-semibold border rounded-full transition-colors cta-press",
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
      <section className="py-16 md:py-24 bg-background" aria-labelledby="proyectos-grid-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="proyectos-grid-heading" className="sr-only">Casos de éxito</h2>
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
                  <Badge variant="solid" className="self-start">{p.category}</Badge>
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
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {open.category}
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
                      <button
                        type="button"
                        key={i}
                        onClick={() => setLightboxIndex(i)}
                        className="cta-press aspect-video w-full overflow-hidden rounded-md bg-muted group/img relative"
                        aria-label={`Ampliar imagen ${i + 1}`}
                      >
                        <img src={src} alt={`${open.title} ${i + 1}`} loading="lazy" className="h-full w-full object-cover group-hover/img:scale-[1.04] transition-transform duration-500" />
                      </button>
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

      {/* Lightbox */}
      {open && lightboxIndex !== null && lightboxImages.length > 0 && (
        <div
          className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada"
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            aria-label="Cerrar"
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors z-10"
          >
            <X className="h-6 w-6" />
          </button>
          {lightboxImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i === null ? null : (i - 1 + lightboxImages.length) % lightboxImages.length)); }}
                aria-label="Anterior"
                className="absolute left-4 md:left-6 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i === null ? null : (i + 1) % lightboxImages.length)); }}
                aria-label="Siguiente"
                className="absolute right-4 md:right-6 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}
          <img
            src={lightboxImages[lightboxIndex]}
            alt={`${open.title} ${lightboxIndex + 1}`}
            className="max-w-full max-h-[90dvh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {lightboxImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-xs uppercase tracking-[0.2em] font-semibold">
              {lightboxIndex + 1} / {lightboxImages.length}
            </div>
          )}
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
