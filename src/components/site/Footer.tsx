import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import { pushEvent } from "@/lib/analytics";
import {
  WHATSAPP_URL,
  PHONE_NUMBER,
  PHONE_DISPLAY,
  EMAIL,
  BROCHURE_URL,
} from "@/lib/site-data";

const companyLinks = [
  { label: "Sobre nosotros", to: "/" as const, hash: "diferenciales" },
  { label: "Servicios", to: "/servicios" as const },
  { label: "Proyectos", to: "/proyectos" as const },
  { label: "Contacto", to: "/contacto" as const },
  { label: "Brochure 2025", href: BROCHURE_URL, external: true },
];

const serviceLinks = [
  { label: "Automatización industrial", slug: "automatizacion" },
  { label: "Tableros eléctricos", slug: "tableros" },
  { label: "Industria 4.0", slug: "industria-4-0" },
  { label: "Mantenimiento", slug: "mantenimiento" },
  { label: "Instrumentación", slug: "instrumentacion" },
  { label: "Señalización", slug: "senalizacion" },
  { label: "Sistemas especiales", slug: "sistemas-especiales" },
];

const industries = [
  "Química",
  "Metalúrgica",
  "Alimenticia",
  "Automotriz",
  "Farmacéutica",
  "Pintura",
];

const technologies = [
  "PLC Siemens",
  "Allen-Bradley",
  "Schneider",
  "SCADA",
  "WinCC",
  "Ignition",
  "HMI",
  "Revamping",
];

export function Footer() {
  return (
    <footer className="bg-[color:var(--surface-darker)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        {/* Top: brand + nav columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand block */}
          <div className="lg:col-span-4">
            <Link to="/" className="block mb-6">
              <img src={logoWhite} alt="Faztred Soluciones" className="h-16 w-auto" />
            </Link>
            <p className="text-white/70 text-base font-medium max-w-xs">
              Automatización industrial sin límites.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <a
                href="https://instagram.com/faztred"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-9 w-9 flex items-center justify-center rounded-md text-white/60 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/company/faztred"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="h-9 w-9 flex items-center justify-center rounded-md text-white/60 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                onClick={() => pushEvent("whatsapp_click", { location: "footer" })}
                className="h-9 w-9 flex items-center justify-center rounded-md text-white/60 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-sm font-semibold mb-5">Empresa</h4>
            <ul className="space-y-3 text-sm">
              {companyLinks.map((l) =>
                "href" in l ? (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ) : (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      hash={l.hash}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-sm font-semibold mb-5">Servicios</h4>
            <ul className="space-y-3 text-sm">
              {serviceLinks.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/servicios"
                    hash={s.slug}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-sm font-semibold mb-5">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-white/60">
                <MapPin className="h-4 w-4 mt-0.5 text-white/40 flex-shrink-0" />
                <span>Merlo (1761), Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-white/40 flex-shrink-0" />
                <a
                  href={`mailto:${EMAIL}`}
                  onClick={() => pushEvent("email_click", { location: "footer" })}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-white/40 flex-shrink-0" />
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  onClick={() => pushEvent("phone_click", { location: "footer" })}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="text-white/60 pt-1">Lun a Vie · 8:00 a 17:00 hs</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Industries */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-5">Industrias que automatizamos</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {industries.map((i) => (
                <li key={i}>
                  <Link
                    to="/proyectos"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {i}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-5">Tecnologías y plataformas</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {technologies.map((t) => (
                <li key={t}>
                  <Link
                    to="/servicios"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-white/40">
          <p>© {new Date().getFullYear()} Faztred Soluciones. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link to="/servicios" className="hover:text-white/70 transition-colors">Servicios</Link>
            <Link to="/proyectos" className="hover:text-white/70 transition-colors">Proyectos</Link>
            <Link to="/contacto" className="hover:text-white/70 transition-colors">Contacto</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
