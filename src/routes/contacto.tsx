
import { MapPin, Mail, Phone, Clock, Instagram, Linkedin, MessageCircle, CalendarCheck } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { useDocumentHead } from "@/lib/useDocumentHead";
import heroImage from "@/assets/hero-industrial.jpg";
import { ContactForm } from "@/components/site/ContactForm";
import { PHONE_NUMBER, PHONE_DISPLAY, EMAIL } from "@/lib/site-data";
import { pushEvent } from "@/lib/analytics";
import { calendarPopupHandler } from "@/lib/calendar-popup";
import { useAppSettings } from "@/lib/use-site-config";


interface InfoItem {
  icon: typeof MapPin;
  label: string;
  href?: string;
  event?: "phone_click" | "email_click";
}

const infoItems: InfoItem[] = [
  { icon: MapPin, label: "Merlo (1761), Buenos Aires, Argentina" },
  { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}`, event: "email_click" },
  { icon: Phone, label: PHONE_DISPLAY, href: `tel:${PHONE_NUMBER}`, event: "phone_click" },
  { icon: Clock, label: "Lunes a Viernes · 8:00 a 17:00 hs" },
];

function ContactoPage() {
  const { whatsappUrl } = useAppSettings();
  return (
    <>
      <PageHero
        pageKey="contacto"
        eyebrow="Hablemos"
        title="Contacto"
        subtitle="Contanos tu desafío. Te respondemos rápido."
        backgroundImage={heroImage}
      />

      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left: info */}
            <div className="lg:col-span-2">
              <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-semibold flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Datos
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
                Estamos a un mensaje.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Coordinamos visitas técnicas, llamadas o videollamadas según te resulte
                más cómodo.
              </p>

              <ul className="mt-10 space-y-5">
                {infoItems.map((it) => {
                  const Icon = it.icon;
                  const Inner = (
                    <span className="flex items-start gap-4">
                      <span className="h-10 w-10 rounded-md flex items-center justify-center bg-foreground text-white flex-shrink-0">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm pt-2.5">{it.label}</span>
                    </span>
                  );
                  return (
                    <li key={it.label}>
                      {it.href ? (
                        <a
                          href={it.href}
                          onClick={() => it.event && pushEvent(it.event, { location: "contacto" })}
                          className="hover:text-primary transition-colors"
                        >
                          {Inner}
                        </a>
                      ) : (
                        Inner
                      )}
                    </li>
                  );
                })}
              </ul>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => pushEvent("whatsapp_click", { location: "contacto" })}
                className="cta-press mt-10 inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebd5c] text-white rounded-md px-7 py-4 text-xs font-semibold tracking-[0.15em] uppercase transition-colors"
              >
                <MessageCircle className="h-4 w-4" fill="currentColor" />
                Escribinos por WhatsApp
              </a>

              <div className="mt-10 pt-10 border-t border-border">
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-4 font-semibold">Seguinos</p>
                <div className="flex gap-3">
                  <a href="https://instagram.com/faztred" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-11 w-11 rounded-md border border-border hover:bg-primary hover:border-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a href="https://www.linkedin.com/in/faztred/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="h-11 w-11 rounded-md border border-border hover:bg-primary hover:border-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              <div className="bg-muted rounded-xl p-8 md:p-10 border border-border border-l-2 border-l-primary">
                <h3 className="text-2xl font-bold tracking-tight">Enviá tu consulta</h3>
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
                  <button
                    type="button"
                    onClick={calendarPopupHandler("contacto_form_block")}
                    className="cta-press inline-flex items-center gap-3 border border-foreground hover:bg-foreground hover:text-white text-foreground rounded-md px-6 py-3.5 text-xs font-semibold tracking-[0.15em] uppercase transition-colors"
                  >
                    <CalendarCheck className="h-4 w-4" />
                    Agendá una reunión online
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactoPage;
