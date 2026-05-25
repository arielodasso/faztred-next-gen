import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Placeholder } from "@/components/site/Placeholder";
import { SectionTitle } from "@/components/site/SectionTitle";
import { Badge } from "@/components/site/Badge";
import { services, serviceImages } from "@/lib/site-data";
import heroImage from "@/assets/hero-industrial.jpg";
import { pushEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/servicios")({
  component: ServiciosPage,
  head: () => ({
    meta: [
      { title: "Servicios — Automatización Industrial, PLC, SCADA, Tableros | Faztred" },
      {
        name: "description",
        content:
          "Automatización industrial, PLC, SCADA, tableros eléctricos, revamping, mantenimiento, instrumentación, Industria 4.0 y sistemas especiales. Soluciones llave en mano para tu planta.",
      },
      { property: "og:title", content: "Servicios | Faztred Soluciones" },
      {
        property: "og:description",
        content:
          "PLC, SCADA, tableros, revamping, mantenimiento, instrumentación, Industria 4.0 y sistemas especiales — ingeniería + implementación.",
      },
      { property: "og:url", content: "/servicios" },
    ],
    links: [{ rel: "canonical", href: "/servicios" }],
  }),
});

const areas = [
  {
    title: "Consultoría y asesoramiento",
    desc: "Análisis de procesos, selección de equipamiento, cumplimiento normativo, ingeniería básica y de detalle.",
  },
  {
    title: "Desarrollo e implementación",
    desc: "Diseño de tableros, programación PLC/HMI/SCADA, integración de sistemas, IoT e Industria 4.0.",
  },
  {
    title: "Soporte y mantenimiento",
    desc: "Asistencia en sitio y remota, mantenimiento mensual, puesta en marcha, capacitación de personal.",
  },
  {
    title: "Mantenimiento preventivo y diagnóstico",
    desc: "Puesta a tierra, termografía infrarroja, calidad de energía, auditoría de instalaciones.",
  },
];

function ServiciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Qué hacemos"
        title="Servicios"
        subtitle="Soluciones de automatización industrial a medida para tu planta."
        backgroundImage={heroImage}
      />

      {/* Main services — alternating layout */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32">
          {services.map((s, idx) => {
            const reverse = idx % 2 === 1;
            const Icon = s.icon;
            return (
              <article
                key={s.slug}
                id={s.slug}
                className={cn(
                  "grid md:grid-cols-2 gap-10 md:gap-16 items-center scroll-mt-32",
                  reverse && "md:[&>*:first-child]:order-2",
                )}
              >
                {serviceImages[s.slug] ? (
                  <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted border border-border">
                    <img
                      src={serviceImages[s.slug]}
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <Placeholder ratio="video" />
                )}
                <div>
                  <Badge variant="ghost" dot>
                    {String(idx + 1).padStart(2, "0")} / {s.title.split(" ")[0].toUpperCase()}
                  </Badge>
                  <div className="mt-5 flex items-start gap-4">
                    <span className="hidden sm:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight">{s.title}</h2>
                  </div>
                  <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl">
                    {s.description}
                  </p>
                  <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-3">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-foreground/55 mt-0.5 flex-shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contacto"
                    onClick={() =>
                      pushEvent("service_cta_click", {
                        location: "servicios",
                        label: s.title,
                        service_slug: s.slug,
                      })
                    }
                    className="cta-press mt-8 group inline-flex items-center gap-2 text-foreground hover:text-primary text-xs font-semibold uppercase tracking-[0.15em] transition-colors"
                  >
                    Consultar este servicio
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Work areas */}
      <section className="py-24 md:py-32 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Áreas de trabajo" title="Cómo abordamos cada proyecto" />
          <div className="mt-14 grid md:grid-cols-2 gap-px bg-border">
            {areas.map((a, i) => (
              <div key={a.title} className="bg-muted p-8 md:p-10 hover:bg-white transition-colors">
                <div className="flex items-baseline gap-4">
                  <span className="text-primary font-bold text-2xl tabular-nums">
                    0{i + 1}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight">{a.title}</h3>
                </div>
                <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-[color:var(--surface-dark)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_60%)]" />
        <div className="absolute top-1/3 left-1/4 w-[40%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(204,0,0,0.07),transparent_70%)] blur-2xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            ¿Necesitás una solución a medida?
          </h2>
          <p className="mt-5 text-white/60 text-base md:text-lg">
            Coordiná una reunión sin compromiso con nuestro equipo técnico.
          </p>
          <Link
            to="/contacto"
            onClick={() => pushEvent("meeting_request", { location: "servicios_final_cta" })}
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
