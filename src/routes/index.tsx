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
import brochureCover from "@/assets/brochure-cover.png";
import { SectionTitle } from "@/components/site/SectionTitle";
import { Placeholder } from "@/components/site/Placeholder";
import { Badge } from "@/components/site/Badge";
import { ContactForm } from "@/components/site/ContactForm";
import { CountUp } from "@/components/site/CountUp";
import {
  featuredServices,
  projects,
  WHATSAPP_URL,
  BROCHURE_URL,
} from "@/lib/site-data";
import { pushEvent } from "@/lib/analytics";
import clientManaos from "@/assets/clients/manaos.png";
import clientYpf from "@/assets/clients/ypf.png";
import clientYamaha from "@/assets/clients/yamaha.png";
import clientIvess from "@/assets/clients/ivess.png";
import clientJms from "@/assets/clients/jms.png";
import clientFuerzaBruta from "@/assets/clients/fuerza-bruta.png";
import clientFoggia from "@/assets/clients/foggia.png";
import clientKromberg from "@/assets/clients/kromberg.png";
import clientTea from "@/assets/clients/tea.png";
import clientMiller from "@/assets/clients/miller.png";
import clientDayplas from "@/assets/clients/dayplas.png";
import clientHqfilms from "@/assets/clients/hqfilms.png";
import clientTecnoperfiles from "@/assets/clients/tecnoperfiles.png";
import clientRonalflex from "@/assets/clients/ronalflex.png";
import clientHixwer from "@/assets/clients/hixwer.png";

const clientLogos = [
  { src: clientYpf, name: "YPF" },
  { src: clientYamaha, name: "Yamaha" },
  { src: clientManaos, name: "Manaos" },
  { src: clientIvess, name: "Ivess" },
  { src: clientJms, name: "JMS" },
  { src: clientKromberg, name: "Kromberg & Schubert" },
  { src: clientTea, name: "Manufacturas TEA" },
  { src: clientMiller, name: "Miller" },
  { src: clientFuerzaBruta, name: "Fuerza Bruta" },
  { src: clientFoggia, name: "Foggia Company" },
  { src: clientDayplas, name: "Dayplas" },
  { src: clientHqfilms, name: "HQ Films" },
  { src: clientTecnoperfiles, name: "Tecnoperfiles" },
  { src: clientRonalflex, name: "Ronalflex" },
  { src: clientHixwer, name: "Hixwer" },
];
const mid = Math.ceil(clientLogos.length / 2);
const clientsRowA = clientLogos.slice(0, mid);
const clientsRowB = clientLogos.slice(mid);

function openBrochurePopup(e: React.MouseEvent) {
  e.preventDefault();
  pushEvent("brochure_download", { location: "home_brochure" });
  const w = 900;
  const h = Math.min(900, window.innerHeight - 40);
  const left = window.screenX + (window.outerWidth - w) / 2;
  const top = window.screenY + (window.outerHeight - h) / 2;
  window.open(
    BROCHURE_URL,
    "FaztredBrochure",
    `popup=yes,width=${w},height=${h},left=${left},top=${top},scrollbars=yes,resizable=yes`,
  );
}

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Faztred | Automatización Industrial, PLC, SCADA y Tableros Eléctricos" },
      {
        name: "description",
        content:
          "Automatización industrial, programación de PLC, SCADA, diseño de tableros eléctricos, revamping, integración industrial, mantenimiento y soluciones Industria 4.0 para procesos productivos.",
      },
      {
        name: "keywords",
        content:
          "automatización industrial, PLC, SCADA, tableros eléctricos, revamping, integración industrial, programación PLC, mantenimiento industrial, Industria 4.0, ingeniería industrial, automatización de procesos",
      },
      { property: "og:title", content: "Faztred | Automatización Industrial llave en mano" },
      {
        property: "og:description",
        content:
          "Ingeniería, programación PLC, SCADA, tableros eléctricos, revamping y asistencia técnica para industrias que necesitan resultados concretos.",
      },
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
      <section className="bg-[#e6e7ea] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {contactCards.map((c) => {
              const Icon = c.icon;
              const Inner = (
                <div className="group relative h-full bg-white border border-border rounded-xl p-8 flex flex-col hover:border-foreground/30 hover:shadow-[0_20px_60px_-25px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1">
                  <div className="h-11 w-11 flex items-center justify-center bg-foreground text-white rounded-lg group-hover:bg-primary transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-foreground tracking-tight">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground flex-1">{c.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-foreground text-xs font-semibold uppercase tracking-wider group-hover:text-primary transition-colors">
                    {c.cta}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              );
              const trackingHandler = () => {
                if (c.icon === MessageCircle) pushEvent("whatsapp_click", { location: "home_card" });
                else if (c.icon === Phone) pushEvent("phone_click", { location: "home_card" });
                else pushEvent("meeting_request", { location: "home_card", label: c.title });
              };
              return c.external ? (
                <a key={c.title} href={c.href} target="_blank" rel="noopener noreferrer" onClick={trackingHandler}>{Inner}</a>
              ) : (
                <Link key={c.title} to={c.href} onClick={trackingHandler}>{Inner}</Link>
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
                <CountUp to={300} prefix="+" />
                <span className="text-primary">.</span>
              </div>
              <p className="mt-3 text-white/60 text-sm uppercase tracking-widest">Proyectos implementados</p>
            </div>
            <div>
              <div className="text-6xl md:text-7xl font-bold text-white tracking-tight">
                <CountUp to={15} prefix="+" />
                <span className="text-primary">.</span>
              </div>
              <p className="mt-3 text-white/60 text-sm uppercase tracking-widest">Años de experiencia</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/55 font-semibold mb-4 flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Industrias
              </p>
              <ul className="flex flex-wrap gap-2">
                {industries.map((ind) => (
                  <li key={ind}>
                    <Badge variant="dark">{ind}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-14 text-white/50 text-sm max-w-3xl border-l border-white/15 pl-4">
            Más de 300 proyectos implementados con éxito en sectores como pintura,
            metalurgia, alimentos, farmacéutica y más.
          </p>
        </div>
      </section>

      {/* Featured services */}
      <section className="py-20 md:py-28 bg-[#5e5f60]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Lo que hacemos"
            title="Servicios destacados"
            description="Una oferta completa de ingeniería, implementación y soporte para procesos industriales."
            dark
          />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredServices.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="group relative bg-background border border-border rounded-xl p-7 hover:border-foreground/30 hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)] transition-all duration-300">
                  <div className="h-11 w-11 flex items-center justify-center border border-border rounded-lg bg-muted group-hover:border-primary/40 group-hover:bg-primary/5 transition-colors">
                    <Icon className="h-5 w-5 text-foreground group-hover:text-primary transition-colors" />
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
            <Link to="/servicios" className="cta-press group inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-7 py-4 text-xs font-semibold tracking-wider uppercase transition-colors">
              Ver todos los servicios
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section id="proyectos-destacados" className="py-20 md:py-28 bg-muted scroll-mt-24">
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
                className="group bg-white border border-border rounded-xl hover:border-foreground/30 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] transition-all overflow-hidden flex flex-col hover:-translate-y-0.5 duration-300"
              >
                <Placeholder ratio="video" />
                <div className="p-6 flex-1 flex flex-col">
                  <Badge variant="solid" className="self-start">{p.industry}</Badge>
                  <h3 className="mt-4 text-lg font-bold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground flex-1 line-clamp-3">{p.problem}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-foreground text-xs font-semibold uppercase tracking-[0.15em] group-hover:text-primary transition-colors">
                    Ver caso
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
      <section id="diferenciales" className="py-20 md:py-28 bg-[color:var(--surface-dark)] relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.05),transparent_60%)]" />
        <div className="absolute bottom-0 left-1/4 w-[30%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(204,0,0,0.06),transparent_70%)] blur-2xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Diferenciales" title="¿Por qué Faztred?" dark />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyFaztred.map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.title} className="group bg-white/[0.02] border border-white/10 rounded-xl hover:border-white/25 hover:bg-white/[0.04] p-7 transition-colors">
                  <div className="h-11 w-11 flex items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/80 group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-colors">
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

      {/* Clients — dual marquee */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Confianza" title="Algunos de nuestros clientes" align="center" />
          <div className="mt-14 space-y-5">
            {[
              { items: clientsRowA, reverse: false },
              { items: clientsRowB, reverse: true },
            ].map((row, rIdx) => (
              <div
                key={rIdx}
                className="group overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
              >
                <div
                  className={`flex gap-4 w-max ${row.reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover:[animation-play-state:paused]`}
                >
                  {[...row.items, ...row.items, ...row.items].map((logo, i) => (
                    <div
                      key={i}
                      className="h-24 w-44 flex-shrink-0 rounded-xl border border-border bg-white hover:border-foreground/30 transition-colors flex items-center justify-center p-5"
                    >
                      <img
                        src={logo.src}
                        alt={logo.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Brochure */}
      <section className="py-24 md:py-32 bg-[color:var(--surface-dark)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute top-0 right-0 w-[40%] h-full bg-[radial-gradient(circle_at_right,rgba(204,0,0,0.08),transparent_70%)] blur-2xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[11px] uppercase tracking-[0.22em] text-white/55 font-semibold flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Material
              </span>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white">Brochure Faztred</h2>
              <p className="mt-5 text-white/65 max-w-md">
                Conocé más sobre quiénes somos, qué hacemos y cómo podemos ayudarte
                a transformar tu planta.
              </p>
              <a
                href={BROCHURE_URL}
                target="FaztredBrochure"
                rel="noopener noreferrer"
                onClick={openBrochurePopup}
                className="cta-press mt-8 inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-7 py-4 text-xs font-semibold tracking-[0.15em] uppercase transition-colors"
              >
                <Download className="h-4 w-4" />
                Descargar PDF
              </a>
            </div>
            <div className="relative flex items-center justify-center">
              <img
                src={brochureCover}
                alt="Brochure Faztred 2025 — portada"
                loading="lazy"
                className="w-full max-w-xl drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
              />
            </div>
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
