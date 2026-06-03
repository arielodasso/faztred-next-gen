import { createFileRoute } from "@tanstack/react-router";
import {
  CircuitBoard, Zap, Gauge, Network, CheckCircle2, ArrowRight, MessageCircle,
  ClipboardList, Hammer, PlayCircle,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ContactForm } from "@/components/site/ContactForm";
import { calendarPopupHandler } from "@/lib/calendar-popup";
import { useAppSettings } from "@/lib/use-site-config";
import { pushEvent } from "@/lib/analytics";
import heroIndustrial from "@/assets/hero-industrial.jpg";

const PATH = "/tableros-electricos-industriales";
const TITLE = "Fabricación de Tableros Eléctricos Industriales | Control, Potencia y Automatización — Faztred";
const DESCRIPTION =
  "Diseño y fabricación de tableros eléctricos industriales: control, potencia, fuerza motriz, variadores de frecuencia y automatización con PLC, HMI y SCADA. Ingeniería, fabricación y puesta en marcha.";

const types = [
  { icon: CircuitBoard, title: "Tableros de Control",
    body: "Control de procesos industriales con PLC, HMI, relés inteligentes y sistemas de automatización.",
    apps: ["Máquinas automáticas", "Líneas de producción", "Extrusoras", "Bombas y dosificación", "Sistemas HVAC", "Procesos continuos"] },
  { icon: Zap, title: "Tableros de Potencia y Fuerza Motriz",
    body: "Alimentación y maniobra de motores eléctricos y cargas industriales con protecciones, contactores, arrancadores suaves y variadores.",
    apps: ["Bombas", "Ventiladores", "Compresores", "Transportadores", "Mezcladores", "Equipos de proceso"] },
  { icon: Gauge, title: "Tableros con Variadores de Frecuencia",
    body: "Control de velocidad y optimización energética con arranques suaves, menor desgaste mecánico y reducción del consumo eléctrico.",
    apps: ["Reducción de consumo", "Menor desgaste", "Mayor control de proceso", "Arranques seguros"] },
  { icon: Network, title: "Tableros de Automatización",
    body: "Integración completa de PLC, HMI, redes industriales, sensores, instrumentación y SCADA para monitoreo y control centralizado.",
    apps: ["PLC y HMI", "Redes industriales", "Sensores e instrumentación", "SCADA y telemetría"] },
];

const process = [
  { icon: ClipboardList, title: "Ingeniería",
    items: ["Relevamiento en planta", "Definición de requerimientos", "Planos eléctricos", "Selección de componentes"] },
  { icon: Hammer, title: "Fabricación",
    items: ["Armado profesional", "Canalización y cableado interno", "Identificación de componentes", "Ensayos funcionales"] },
  { icon: PlayCircle, title: "Instalación y Puesta en Marcha",
    items: ["Montaje en planta", "Conexionado de campo", "Parametrización y programación", "Pruebas operativas"] },
];

const benefits = [
  "Soluciones adaptadas a cada cliente",
  "Ingeniería y fabricación en un único proveedor",
  "Documentación técnica completa",
  "Componentes de primeras marcas",
  "Soporte técnico especializado",
  "Integración con sistemas existentes",
  "Puesta en marcha y asistencia técnica",
];

const sectors = [
  "Industria alimenticia", "Industria química", "Industria farmacéutica",
  "Extrusión y conversión de plásticos", "Logística y almacenamiento",
  "Tratamiento de agua", "Manufactura general",
];

const faqs = [
  { q: "¿Qué tipo de tableros eléctricos fabrican?",
    a: "Fabricamos tableros de control, potencia, fuerza motriz, con variadores de frecuencia y de automatización con PLC, HMI y SCADA." },
  { q: "¿Cumplen con normativas eléctricas vigentes?",
    a: "Sí. Diseñamos y fabricamos bajo normativas industriales vigentes, con documentación técnica completa y ensayos funcionales antes del despacho." },
  { q: "¿Hacen también el montaje y la puesta en marcha?",
    a: "Sí. Acompañamos el proceso completo: ingeniería, fabricación, montaje en planta, conexionado de campo, programación y pruebas operativas." },
  { q: "¿Trabajan con marcas específicas de componentes?",
    a: "Trabajamos con componentes de primeras marcas y nos adaptamos a la marca preferida del cliente: Siemens, Schneider, Allen Bradley, ABB y otras." },
];

export const Route = createFileRoute(PATH)({
  component: TablerosPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "tableros eléctricos industriales, fabricación tableros, tableros de control, tableros de potencia, variadores de frecuencia, automatización, PLC, HMI, SCADA, Argentina" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: PATH },
      { property: "og:image", content: "/assets/hero-industrial.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: PATH }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Fabricación de tableros eléctricos industriales",
          provider: {
            "@type": "Organization",
            name: "Faztred Soluciones",
            url: "https://faztred.com.ar",
            telephone: "+5491162083230",
            email: "info@faztred.com.ar",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Merlo",
              addressRegion: "Buenos Aires",
              addressCountry: "AR",
            },
          },
          areaServed: { "@type": "Country", name: "Argentina" },
          description: DESCRIPTION,
          offers: types.map((t) => ({ "@type": "Offer", name: t.title, description: t.body })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inicio", item: "/" },
            { "@type": "ListItem", position: 2, name: "Tableros eléctricos industriales", item: PATH },
          ],
        }),
      },
    ],
  }),
});

function TablerosPage() {
  const { whatsappUrl } = useAppSettings();
  return (
    <>
      <PageHero
        eyebrow="Diseño · Fabricación · Integración"
        title="Fabricación de Tableros Eléctricos Industriales"
        subtitle="Tableros de control, potencia, automatización, distribución eléctrica y fuerza motriz. Ingeniería propia, fabricación bajo norma y puesta en marcha en planta."
        backgroundImage={heroIndustrial}
      />

      <section className="bg-[color:var(--surface-dark)] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            En <strong className="text-white">Faztred Soluciones</strong> diseñamos y fabricamos tableros eléctricos industriales adaptados a los requerimientos de cada proceso productivo. Desarrollamos soluciones para <strong className="text-white">control, potencia, automatización, distribución eléctrica y fuerza motriz</strong>, garantizando seguridad, confiabilidad y facilidad de mantenimiento.
          </p>
          <p className="mt-5 text-base md:text-lg text-white/65 leading-relaxed">
            Acompañamos a nuestros clientes desde la ingeniería inicial hasta la puesta en marcha final del sistema.
          </p>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Tipos de tableros que fabricamos"
            title="Soluciones para cada necesidad eléctrica industrial"
          />
          <div className="mt-12 grid md:grid-cols-2 gap-5">
            {types.map((t) => (
              <article key={t.title} className="rounded-xl border border-border bg-card p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <t.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-foreground">{t.title}</h3>
                <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">{t.body}</p>
                <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1.5">
                  {t.apps.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-foreground/85">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--surface-dark)] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle dark eyebrow="Nuestro proceso de trabajo" title="Ingeniería, fabricación y puesta en marcha" />
          <ol className="mt-12 grid md:grid-cols-3 gap-5">
            {process.map((p, i) => (
              <li key={p.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-primary tracking-[0.2em]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/15 text-primary">
                    <p.icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{p.title}</h3>
                <ul className="mt-4 space-y-2">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-white/70">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      {it}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <SectionTitle eyebrow="Beneficios" title="Por qué trabajar con Faztred" />
            <ul className="mt-8 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionTitle eyebrow="Sectores que atendemos" title="Industrias donde ya operamos" />
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sectors.map((s) => (
                <li key={s} className="rounded-lg border border-border bg-card px-4 py-3 text-sm md:text-base text-foreground">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--surface-darker)] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle dark eyebrow="Preguntas frecuentes" title="Lo que más nos consultan" />
          <dl className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {faqs.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="text-base md:text-lg font-semibold text-white">{f.q}</dt>
                <dd className="mt-2 text-sm md:text-base text-white/65 leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-[color:var(--surface-dark)] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionTitle dark eyebrow="Solicitá una cotización" title="Contanos sobre tu proyecto" description="Recibí una propuesta técnica y económica adaptada a tu requerimiento." />
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button onClick={calendarPopupHandler("landing_tableros")} className="cta-press inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3.5 text-sm font-semibold rounded-md transition-colors">
                Coordinar reunión <ArrowRight className="h-4 w-4" />
              </button>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                 onClick={() => pushEvent("whatsapp_click", { location: "landing_tableros" })}
                 className="cta-press inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white px-6 py-3.5 text-sm font-semibold rounded-md transition-colors">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
