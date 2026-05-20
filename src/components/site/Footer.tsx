import { Link } from "@tanstack/react-router";
import { MapPin, Mail, Phone, Clock, Instagram, Linkedin, MessageCircle } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";

export function Footer() {
  return (
    <footer className="bg-[color:var(--surface-darker)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <img src={logoWhite} alt="Faztred Soluciones" className="h-12 w-auto mb-5" />
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Automatización industrial con experiencia real en planta. Ingeniería,
              implementación y soporte llave en mano.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">Dirección</h4>
            <div className="flex items-start gap-3 text-white/70 text-sm">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
              <span>Merlo (1761), Buenos Aires, Argentina</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <a href="mailto:info@faztred.com.ar" className="hover:text-white">info@faztred.com.ar</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                <a href="tel:+5491162083230" className="hover:text-white">(+54) 9 11 6208-3230</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 text-primary" />
                <span>Lun a Vie · 8:00 a 17:00 hs</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">Seguinos</h4>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com/faztred" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-10 w-10 flex items-center justify-center border border-white/10 hover:border-primary hover:text-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com/company/faztred" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="h-10 w-10 flex items-center justify-center border border-white/10 hover:border-primary hover:text-primary transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://api.whatsapp.com/send/?phone=5491162083230" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="h-10 w-10 flex items-center justify-center border border-white/10 hover:border-primary hover:text-primary transition-colors">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-white/40">
          <p>© {new Date().getFullYear()} Faztred Soluciones. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link to="/servicios" className="hover:text-white/70">Servicios</Link>
            <Link to="/proyectos" className="hover:text-white/70">Proyectos</Link>
            <Link to="/contacto" className="hover:text-white/70">Contacto</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
