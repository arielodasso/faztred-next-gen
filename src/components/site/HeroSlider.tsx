import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Placeholder } from "./Placeholder";
import { pushEvent } from "@/lib/analytics";

import { WHATSAPP_URL } from "@/lib/site-data";

export function HeroSlider() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative h-screen min-h-[560px] max-h-[920px] w-full overflow-hidden bg-[color:var(--surface-dark)]">
      <div className="absolute inset-0">
        <Placeholder
          label="Imagen industrial — reemplazar"
          ratio="wide"
          className="!aspect-auto h-full w-full !border-0 opacity-20"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--surface-darker)] via-[color:var(--surface-dark)] to-[color:var(--surface-darker)]" />
      <div className="absolute -bottom-1/3 -left-1/4 w-[60%] h-[100%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)] blur-2xl" />
      <div className="absolute top-1/4 right-[-10%] w-[40%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(204,0,0,0.10),transparent_70%)] blur-2xl" />
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:96px_96px]" />

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-24">
        <div
          className={`max-w-5xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <h1 className="h-display font-bold text-white text-balance">
            Automatización industrial con soluciones reales para planta
          </h1>
          <p className="mt-6 md:mt-8 text-base md:text-lg text-white/65 max-w-2xl leading-relaxed">
            Ingeniería, programación, tableros eléctricos, revamping y asistencia
            técnica para industrias que necesitan resultados concretos.
          </p>
          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-3">
            <Link
              to="/contacto"
              onClick={() => pushEvent("meeting_request", { location: "hero", label: "Coordinar reunión" })}
              className="cta-press group inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3.5 text-sm font-semibold rounded-md transition-colors"
            >
              Coordinar una reunión
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => pushEvent("whatsapp_click", { location: "hero" })}
              className="cta-press inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white px-6 py-3.5 text-sm font-semibold rounded-md transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Hablemos sobre tu proyecto
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
