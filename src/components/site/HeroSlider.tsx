import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase } from "lucide-react";
import heroPlanta from "@/assets/hero-planta.jpg";
import { pushEvent } from "@/lib/analytics";
import { calendarPopupHandler } from "@/lib/calendar-popup";

export function HeroSlider() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative h-screen min-h-[560px] max-h-[920px] w-full overflow-hidden bg-[color:var(--surface-darker)]">
      <div className="absolute inset-0">
        <img
          src={heroPlanta}
          alt="Equipo Faztred trabajando en una planta industrial"
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--surface-darker)]/95 via-[color:var(--surface-darker)]/80 to-[color:var(--surface-darker)]/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--surface-darker)] via-transparent to-[color:var(--surface-darker)]/40" />
      <div className="absolute top-1/4 right-[-10%] w-[40%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(204,0,0,0.18),transparent_70%)] blur-2xl" />
      

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
            <button
              type="button"
              onClick={calendarPopupHandler("hero")}
              className="cta-press group inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3.5 text-sm font-semibold rounded-md transition-colors"
            >
              Coordinar una reunión
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              to="/"
              hash="proyectos-destacados"
              onClick={() => pushEvent("project_view", { location: "hero", label: "Ver proyectos" })}
              className="cta-press inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white px-6 py-3.5 text-sm font-semibold rounded-md transition-colors"
            >
              <Briefcase className="h-4 w-4" />
              Ver proyectos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
