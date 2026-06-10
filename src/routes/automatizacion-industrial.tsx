
import {
  Cpu, CircuitBoard, Wrench, Activity, LifeBuoy, Cloud,
  CheckCircle2, ArrowRight, MessageCircle,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ContactForm } from "@/components/site/ContactForm";
import { calendarPopupHandler } from "@/lib/calendar-popup";
import { useAppSettings } from "@/lib/use-site-config";
import { pushEvent } from "@/lib/analytics";
import heroIndustrial from "@/assets/hero-industrial.jpg";

const PATH = "/automatizacion-industrial";
const TITLE = "Automatización Industrial en Argentina | Faztred";
const DESCRIPTION =
  "Automatización industrial llave en mano: PLC, SCADA, tableros, revamping y soporte 24/7. +30 plantas optimizadas en Argentina.";

const includes = [
  { icon: Cpu, title: "Ingeniería de automatización a medida",
    body: "Relevamiento, diagramas eléctricos, PLC, HMI y comunicaciones integradas bajo una única solución adaptada a tu proceso." },
  { icon: CircuitBoard, title: "Diseño y fabricación de tableros eléctricos",
    body: "Tableros robustos con protecciones, cableado, PLC, HMI y borneras listas para conexión en planta. Bajo normativas vigentes." },
  { icon: Wrench, title: "Revamping y modernización de máquinas",
    body: "Actualizamos controladores y automatismos sin detener tu producción. Menos fallas, más eficiencia, equipos vigentes." },
  { icon: Activity, title: "Programación de PLC, SCADA y redes",
    body: "Lógica robusta y visualización en tiempo real. Siemens, Schneider, Allen Bradley, Rockwell, Mitsubishi, Omron." },
  { icon: LifeBuoy, title: "Puesta en marcha y soporte técnico",
    body: "Acompañamos start-up, capacitación y soporte remoto o presencial. Ajustes y optimización post-instalación." },
  { icon: Cloud, title: "Industria 4.0 e IoT",
    body: "Recolectamos datos desde tus máquinas hacia dashboards inteligentes o tu ERP. Visualizá, controlá y optimizá desde cualquier lugar." },
];

const cases = [
  { sector: "Metalúrgica", result: "Automatismo completo en flejadora. +35% de productividad." },
  { sector: "Química", result: "Migración de PLC y nuevo sistema de bombeo de pigmentos." },
  { sector: "Alimenticia", result: "Diseño y montaje de tableros para automatismo distribuido." },
];

const reasons = [
  "+10 años de experiencia en automatización industrial",
  "Soporte en planta o remoto 24/7",
  "Documentación técnica completa entregada",
  "Componentes de primeras marcas",
  "Integración con sistemas y ERP existentes",
  "Ingeniería y fabricación bajo un solo proveedor",
];

const faqs = [
  { q: "¿Qué incluye un proyecto de automatización industrial?",
    a: "Relevamiento, ingeniería eléctrica y de control, diseño y fabricación de tableros, programación de PLC y SCADA, puesta en marcha y soporte técnico." },
  { q: "¿Con qué marcas de PLC trabajan?",
    a: "Trabajamos con Siemens, Schneider Electric, Allen Bradley / Rockwell, Mitsubishi, Omron y otras marcas industriales líderes." },
  { q: "¿Dan soporte técnico después de la puesta en marcha?",
    a: "Sí. Brindamos soporte remoto y presencial, capacitación al equipo de planta y mantenimiento preventivo y correctivo." },
  { q: "¿Trabajan en todo el país?",
    a: "Operamos en toda Argentina desde nuestra base en Merlo, Buenos Aires, con proyectos en industrias alimenticia, química, plásticos, metalúrgica y más." },
];


function AutomatizacionIndustrialPage() {
  const { whatsappUrl } = useAppSettings();
  return (
    <>
      <PageHero
        eyebrow="Servicio integral"
        title="Automatización industrial para una producción más eficiente"
        subtitle="Integramos soluciones a medida con PLC, SCADA, tableros y programación. Para empresas que quieren crecer sin frenos."
        backgroundImage={heroIndustrial}
      />

      <section className="bg-[color:var(--surface-dark)] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <SectionTitle
              dark
              eyebrow="El problema"
              title="¿Tus procesos siguen dependiendo de tareas manuales?"
              description="Te está costando tiempo, dinero y calidad. Integramos automatismos inteligentes para que tu línea trabaje 24/7 sin errores."
            />
            <blockquote className="mt-8 border-l-2 border-primary pl-5 text-white/85 text-lg leading-relaxed">
              Ya ayudamos a <strong className="text-white">más de 30 empresas industriales</strong> a reducir paradas, errores humanos y riesgos eléctricos.
            </blockquote>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { k: "+30", v: "Plantas optimizadas" },
              { k: "+10", v: "Años de experiencia" },
              { k: "24/7", v: "Soporte técnico" },
            ].map((s) => (
              <div key={s.v} className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{s.k}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/55">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Qué incluye nuestra solución"
            title="Ingeniería, control y soporte bajo un mismo proveedor"
            description="Cubrimos todo el ciclo: desde el relevamiento en planta hasta el soporte post-puesta en marcha."
          />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {includes.map((it) => (
              <article key={it.title} className="group rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-lg transition-all">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <it.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{it.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--surface-dark)] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle dark eyebrow="Casos de éxito" title="Resultados reales en planta" />
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {cases.map((c) => (
              <article key={c.sector} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-[11px] uppercase tracking-[0.18em] text-primary font-semibold">{c.sector}</p>
                <p className="mt-3 text-base text-white/85 leading-relaxed">{c.result}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <SectionTitle
            eyebrow="Por qué elegirnos"
            title="Faztred Soluciones: ingeniería con foco en planta"
            description="Somos un equipo industrial: hablamos el idioma del mantenimiento, la producción y la gerencia técnica."
          />
          <ul className="space-y-3">
            {reasons.map((r) => (
              <li key={r} className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base text-foreground">{r}</span>
              </li>
            ))}
          </ul>
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
            <SectionTitle dark eyebrow="Hablemos" title="Coordiná una reunión con nuestro equipo técnico" description="Te respondemos en menos de 24 hs hábiles." />
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button onClick={calendarPopupHandler("landing_automatizacion")} className="cta-press inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3.5 text-sm font-semibold rounded-md transition-colors">
                Coordinar reunión <ArrowRight className="h-4 w-4" />
              </button>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                 onClick={() => pushEvent("whatsapp_click", { location: "landing_automatizacion" })}
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

export default AutomatizacionIndustrialPage;
