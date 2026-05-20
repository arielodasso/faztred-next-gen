import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Placeholder } from "@/components/site/Placeholder";
import { SectionTitle } from "@/components/site/SectionTitle";
import { Badge } from "@/components/site/Badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/servicios")({
  component: ServiciosPage,
  head: () => ({
    meta: [
      { title: "Servicios de Automatización Industrial | Faztred Soluciones" },
      { name: "description", content: "PLC, SCADA, tableros eléctricos, revamping, Industria 4.0, mantenimiento e instrumentación industrial. Servicios llave en mano para tu planta." },
      { property: "og:title", content: "Servicios | Faztred Soluciones" },
      { property: "og:description", content: "Soluciones de automatización industrial a medida: ingeniería, programación PLC/HMI/SCADA, tableros, mantenimiento y más." },
      { property: "og:url", content: "/servicios" },
    ],
    links: [{ rel: "canonical", href: "/servicios" }],
  }),
});

const mainServices = [
  {
    title: "Automatización industrial",
    description: "Integración de procesos, programación PLC, HMI y SCADA.",
    items: [
      "Ingeniería de automatización",
      "Programación PLC y HMI",
      "Sistemas SCADA",
      "Integración industrial",
      "Migraciones y revamping",
      "Capacitaciones",
    ],
  },
  {
    title: "Tableros eléctricos",
    description: "Diseño y armado con cumplimiento normativo.",
    items: [
      "Diseño de ingeniería",
      "Fabricación",
      "Armado y montaje",
      "Tableros de potencia y control",
      "Tableros PLC",
    ],
  },
  {
    title: "Industria 4.0 y adquisición de datos",
    description: "Convertimos tus datos en decisiones operativas.",
    items: [
      "Captura de datos industriales",
      "Dashboards y visualización",
      "Monitoreo remoto",
      "Reportes automáticos",
      "Trazabilidad de procesos",
    ],
  },
  {
    title: "Mantenimiento industrial",
    description: "Prevención, predicción y respuesta ante fallas.",
    items: [
      "Preventivo",
      "Predictivo",
      "Correctivo",
      "Diagnóstico de fallas",
      "Puesta en marcha",
    ],
  },
  {
    title: "Instrumentación industrial",
    description: "Mediciones precisas, sensores ajustados y calibrados.",
    items: [
      "Calibración",
      "Mediciones en campo",
      "Diagnóstico de sensores",
      "Ajustes y configuración",
    ],
  },
  {
    title: "Señalización industrial y seguridad visual",
    description: "Información clara en el piso de planta.",
    items: [
      "Sistema de señalización industrial",
      "Alertas visuales",
      "Señalización dinámica",
      "Soluciones de seguridad industrial",
    ],
  },
  {
    title: "Sistemas especiales",
    description: "Aplicaciones avanzadas y casos específicos.",
    items: [
      "Visión artificial",
      "RFID industrial",
      "Integraciones especiales",
      "Automatización personalizada",
    ],
  },
];

const areas = [
  { title: "Consultoría y asesoramiento", desc: "Análisis de procesos, selección de equipamiento, cumplimiento normativo, ingeniería básica y de detalle." },
  { title: "Desarrollo e implementación", desc: "Diseño de tableros, programación PLC/HMI/SCADA, integración de sistemas, IoT e Industria 4.0." },
  { title: "Soporte y mantenimiento", desc: "Asistencia en sitio y remota, mantenimiento mensual, puesta en marcha, capacitación de personal." },
  { title: "Mantenimiento preventivo y diagnóstico", desc: "Puesta a tierra, termografía infrarroja, calidad de energía, auditoría de instalaciones." },
];

function ServiciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Qué hacemos"
        title="Servicios"
        subtitle="Soluciones de automatización industrial a medida para tu planta."
      />

      {/* Main services — alternating layout */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28">
          {mainServices.map((s, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <div
                key={s.title}
                className={cn(
                  "grid md:grid-cols-2 gap-10 md:gap-16 items-center",
                  reverse && "md:[&>*:first-child]:order-2",
                )}
              >
                <Placeholder ratio="video" />
                <div>
                  <Badge variant="ghost" dot>
                    {String(idx + 1).padStart(2, "0")} / {s.title.split(" ")[0]}
                  </Badge>
                  <h3 className="mt-5 text-2xl md:text-4xl font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-4 text-muted-foreground">{s.description}</p>
                  <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-3">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Work areas */}
      <section className="py-20 md:py-28 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Áreas de trabajo" title="Cómo abordamos cada proyecto" />
          <div className="mt-14 grid md:grid-cols-2 gap-px bg-border">
            {areas.map((a, i) => (
              <div key={a.title} className="bg-muted p-8 md:p-10 hover:bg-white transition-colors">
                <div className="flex items-baseline gap-4">
                  <span className="text-primary font-bold text-2xl">0{i + 1}</span>
                  <h4 className="text-xl font-bold">{a.title}</h4>
                </div>
                <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-[color:var(--surface-dark)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(204,0,0,0.18),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            ¿Necesitás una solución a medida?
          </h2>
          <p className="mt-5 text-white/60 text-lg">
            Coordiná una reunión sin compromiso con nuestro equipo técnico.
          </p>
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
