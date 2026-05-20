import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarCheck,
  MessageCircle,
  Phone,
  ArrowRight,
  Download,
  Zap,
  Clock4,
  Settings2,
  Workflow,
  LifeBuoy,
  Brain,
} from "lucide-react";
import { HeroSlider } from "@/components/site/HeroSlider";
import { SectionTitle } from "@/components/site/SectionTitle";
import { Placeholder } from "@/components/site/Placeholder";
import { Badge } from "@/components/site/Badge";
import { ContactForm } from "@/components/site/ContactForm";
import {
  featuredServices,
  projects,
  WHATSAPP_URL,
  BROCHURE_URL,
} from "@/lib/site-data";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Faztred Soluciones | Automatización Industrial llave en mano" },
      { name: "description", content: "Diagnóstico, automatización, tableros eléctricos, revamping y mantenimiento industrial. Soluciones a medida para tu planta." },
      { property: "og:title", content: "Faztred Soluciones | Automatización Industrial" },
      { property: "og:description", content: "Soluciones de automatización industrial llave en mano: PLC, SCADA, tableros y revamping." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const contactCards = [
  {
    icon: CalendarCheck,
    title: "Agendá un diagnóstico gratuito",
    desc: "Te visitamos sin costo o por videollamada.",
    cta: "Reservar una reunión",
    href: "/contacto",
    external: false,
  },
  {
    icon: MessageCircle,
    title: "Escribinos por WhatsApp",
    desc: "Respondemos al instante y sin compromiso.",
    cta: "Enviar un mensaje",
    href: WHATSAPP_URL,
    external: true,
  },
  {
    icon: Phone,
    title: "¿Preferís hablar? Dejanos tus datos",
    desc: "Podés llamarnos o completar el formulario.",
    cta: "Ir al formulario",
    href: "/contacto",
    external: false,
  },
];

const whyFaztred = [
  { icon: Zap, title: "Experiencia real en planta", desc: "Hablamos el idioma de planta, entendemos tus procesos." },
  { icon: Clock4, title: "Respuesta rápida", desc: "Soporte técnico en sitio y remoto ante emergencias." },
  { icon: Settings2, title: "Soluciones personalizadas", desc: "Sin fórmulas genéricas. Cada proyecto es único." },
  { icon: Workflow, title: "Ingeniería + implementación", desc: "Acompañamos desde el diseño hasta la puesta en marcha." },
  { icon: LifeBuoy, title: "Soporte postventa", desc: "No desaparecemos al terminar el proyecto." },
  { icon: Brain, title: "Visión técnica y práctica", desc: "Capacidad de resolver problemas complejos de automatización." },
];

const industries = ["Química", "Metalúrgica", "Alimenticia", "Automotriz", "Farmacéutica"];

function HomePage() {
  return (
    <>
      <HeroSlider />

      {/* Contact CTAs */}
      <section className="bg-muted py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {contactCards.map((c) => {
              const Icon = c.icon;
              const Inner = (
                <div className="group relative h-full bg-white border border-border rounded-xl p-8 flex flex-col hover:border-primary/50 hover:shadow-[0_20px_60px_-20px_rgba(204,0,0,0.25)] transition-all duration-300 hover:-translate-y-1">
                  <div className="h-11 w-11 flex items-center justify-center bg-foreground text-white rounded-lg group-hover:bg-primary transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-foreground tracking-tight">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground flex-1">{c.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
                    {c.cta}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              );
              return c.external ? (
                <a key={c.title} href={c.href} target="_blank" rel="noopener noreferrer">{Inner}</a>
              ) : (
                <Link key={c.title} to={c.href}>{Inner}</Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-[color:var(--surface-dark)] py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 md:gap-6 items-start">
            <div>
              <div className="text-6xl md:text-7xl font-bold text-white tracking-tight">
                +300
                <span className="text-primary">.</span>
              </div>
              <p className="mt-3 text-white/60 text-sm uppercase tracking-widest">Proyectos implementados</p>
            </div>
            <div>
              <div className="text-6xl md:text-7xl font-bold text-white tracking-tight">
                +15
                <span className="text-primary">.</span>
              </div>
              <p className="mt-3 text-white/60 text-sm uppercase tracking-widest">Años de experiencia</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">Industrias</p>
              <ul className="flex flex-wrap gap-2">
                {industries.map((ind) => (
                  <li key={ind}>
                    <Badge variant="dark">{ind}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-14 text-white/50 text-sm max-w-3xl border-l-2 border-primary pl-4">
            Más de 300 proyectos implementados con éxito en sectores como pintura,
            metalurgia, alimentos, farmacéutica y más.
          </p>
        </div>
      </section>

      {/* Featured services */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Lo que hacemos"
            title="Servicios destacados"
            description="Una oferta completa de ingeniería, implementación y soporte para procesos industriales."
          />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredServices.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="group relative bg-background border border-border rounded-xl p-7 hover:border-primary/40 hover:shadow-[0_20px_50px_-25px_rgba(204,0,0,0.3)] transition-all duration-300">
                  <div className="h-11 w-11 flex items-center justify-center border border-border rounded-lg bg-muted group-hover:border-primary/30 group-hover:bg-primary/5 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-5 text-base font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-12 flex justify-center">
            <Link to="/servicios" className="group inline-flex items-center gap-3 border border-foreground hover:bg-foreground hover:text-white rounded-md px-7 py-4 text-xs font-semibold tracking-wider uppercase transition-colors">
              Ver todos los servicios
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="py-20 md:py-28 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Casos reales"
            title="Proyectos destacados"
            description="Soluciones implementadas en industrias exigentes."
          />
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <Link
                key={p.slug}
                to="/proyectos"
                className="group bg-white border border-border rounded-xl hover:border-primary/40 hover:shadow-[0_24px_60px_-25px_rgba(204,0,0,0.3)] transition-all overflow-hidden flex flex-col hover:-translate-y-1 duration-300"
              >
                <Placeholder ratio="video" />
                <div className="p-6 flex-1 flex flex-col">
                  <Badge variant="solid" className="self-start">{p.industry}</Badge>
                  <h3 className="mt-4 text-lg font-bold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground flex-1">{p.situation}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
                    Ver más
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link to="/proyectos" className="group inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-7 py-4 text-xs font-semibold tracking-wider uppercase">
              Ver todos los proyectos
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Faztred */}
      <section className="py-20 md:py-28 bg-[color:var(--surface-dark)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(204,0,0,0.15),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Diferenciales" title="¿Por qué Faztred?" dark />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyFaztred.map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.title} className="group bg-white/[0.02] border border-white/10 rounded-xl hover:border-primary/40 hover:bg-white/[0.04] p-7 transition-colors">
                  <div className="h-11 w-11 flex items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">{w.title}</h3>
                  <p className="mt-3 text-sm text-white/60 leading-relaxed">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clients marquee */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Confianza" title="Algunos de nuestros clientes" align="center" />
        </div>
        <div className="mt-12 overflow-hidden">
          <div className="flex gap-12 animate-marquee w-max">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div key={dup} className="flex gap-12 items-center">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-20 w-44 bg-muted border border-border flex items-center justify-center text-muted-foreground/60 text-xs uppercase tracking-widest"
                  >
                    Cliente {i + 1}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brochure */}
      <section className="py-20 md:py-28 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Material</span>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">Brochure Faztred</h2>
              <p className="mt-5 text-muted-foreground max-w-md">
                Conocé más sobre quiénes somos, qué hacemos y cómo podemos ayudarte
                a transformar tu planta.
              </p>
              <a
                href={BROCHURE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-4 text-xs font-semibold tracking-wider uppercase"
              >
                <Download className="h-4 w-4" />
                Descargar PDF
              </a>
            </div>
            <Placeholder ratio="portrait" className="!aspect-[4/5]" label="Portada del brochure" />
          </div>
        </div>
      </section>

      {/* Quick contact form */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Contacto rápido"
            title="Contanos tu desafío"
            description="Te respondemos en horas hábiles. Sin compromiso."
            align="center"
          />
          <div className="mt-12">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
