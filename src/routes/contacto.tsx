import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Mail, Phone, Clock, Instagram, Linkedin, MessageCircle, CalendarCheck } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { WHATSAPP_URL } from "@/lib/site-data";

export const Route = createFileRoute("/contacto")({
  component: ContactoPage,
  head: () => ({
    meta: [
      { title: "Contacto | Faztred Soluciones — Automatización Industrial" },
      { name: "description", content: "Contactanos para asesorarte en automatización industrial, tableros eléctricos, PLC, SCADA y revamping. Respondemos rápido." },
      { property: "og:title", content: "Contacto | Faztred Soluciones" },
      { property: "og:description", content: "Contanos tu desafío. Te respondemos rápido." },
      { property: "og:url", content: "/contacto" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
});

const infoItems = [
  { icon: MapPin, label: "Merlo (1761), Buenos Aires, Argentina" },
  { icon: Mail, label: "info@faztred.com.ar", href: "mailto:info@faztred.com.ar" },
  { icon: Phone, label: "(+54) 9 11 6208-3230", href: "tel:+5491162083230" },
  { icon: Clock, label: "Lunes a Viernes · 8:00 a 17:00 hs" },
];

function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Hablemos"
        title="Contacto"
        subtitle="Contanos tu desafío. Te respondemos rápido."
      />

      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left: info */}
            <div className="lg:col-span-2">
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Datos</span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
                Estamos a un mensaje.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Coordinamos visitas técnicas, llamadas o videollamadas según te resulte
                más cómodo.
              </p>

              <ul className="mt-10 space-y-5">
                {infoItems.map((it) => {
                  const Icon = it.icon;
                  const Inner = (
                    <span className="flex items-start gap-4">
                      <span className="h-10 w-10 flex items-center justify-center bg-foreground text-white flex-shrink-0">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm pt-2.5">{it.label}</span>
                    </span>
                  );
                  return (
                    <li key={it.label}>
                      {it.href ? (
                        <a href={it.href} className="hover:text-primary transition-colors">{Inner}</a>
                      ) : Inner}
                    </li>
                  );
                })}
              </ul>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebd5c] text-white rounded-md px-7 py-4 text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                <MessageCircle className="h-4 w-4" fill="currentColor" />
                Escribinos por WhatsApp
              </a>

              <div className="mt-10 pt-10 border-t border-border">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Seguinos</p>
                <div className="flex gap-3">
                  <a href="https://instagram.com/faztred" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-11 w-11 rounded-md border border-border hover:border-primary hover:text-primary flex items-center justify-center transition-colors">
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a href="https://linkedin.com/company/faztred" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="h-11 w-11 rounded-md border border-border hover:border-primary hover:text-primary flex items-center justify-center transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              <div className="bg-muted rounded-xl p-8 md:p-10 border-t-2 border-primary">
                <h3 className="text-2xl font-bold">Enviá tu consulta</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Completá los datos y te respondemos a la brevedad.
                </p>
                <div className="mt-8">
                  <ContactForm variant="full" />
                </div>
                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    También podés agendar una reunión directamente:
                  </p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 border border-foreground hover:bg-foreground hover:text-white text-foreground rounded-md px-6 py-3.5 text-xs font-semibold tracking-wider uppercase transition-colors"
                  >
                    <CalendarCheck className="h-4 w-4" />
                    Agendá una reunión online
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
