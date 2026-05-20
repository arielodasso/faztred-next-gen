import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Placeholder } from "./Placeholder";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";
import { WHATSAPP_URL } from "@/lib/site-data";

const slides = [
  {
    eyebrow: "DIAGNÓSTICO INDUSTRIAL",
    title: "¿Cansado de parar la producción por fallas imprevistas?",
    subtitle:
      "Diagnosticamos tu planta operativa con informes claros y soluciones que funcionan.",
    cta: "Solicitá tu visita técnica sin costo",
  },
  {
    eyebrow: "MODERNIZACIÓN LLAVE EN MANO",
    title: "¿Tenés que actualizar tus máquinas y no sabés por dónde empezar?",
    subtitle:
      "Te acompañamos en un proceso llave en mano desde el relevamiento hasta la puesta en marcha.",
    cta: "Coordiná tu reunión con un especialista",
  },
  {
    eyebrow: "AUTOMATIZACIÓN A MEDIDA",
    title: "¿Tu proceso podría rendir más con automatización?",
    subtitle:
      "Integramos sistemas, programamos PLC y armamos tableros a medida, con foco en resultados.",
    cta: "Consultá sin compromiso",
  },
];

export function HeroSlider() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-screen min-h-[640px] max-h-[860px] w-full overflow-hidden bg-[color:var(--surface-dark)]">
      {/* Background placeholder layer */}
      <div className="absolute inset-0">
        <Placeholder
          label="Imagen industrial — reemplazar"
          ratio="wide"
          className="!aspect-auto h-full w-full !border-0 opacity-30"
        />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/70 to-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(204,0,0,0.2),transparent_50%)]" />
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-20">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={cn(
              "absolute inset-x-4 sm:inset-x-6 lg:inset-x-8 transition-all duration-700",
              idx === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
            )}
          >
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-primary" />
                <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                  {s.eyebrow}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
                {s.title}
              </h1>
              <p className="mt-6 text-lg md:text-xl text-white/75 max-w-2xl">
                {s.subtitle}
              </p>
              <div className="mt-10">
                <Link
                  to="/contacto"
                  className="group inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-4 text-sm font-semibold tracking-wider uppercase transition-colors"
                >
                  {s.cta}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-10 left-4 sm:left-6 lg:left-8 flex items-center gap-3 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={cn(
                "h-1 transition-all duration-300",
                idx === i ? "w-12 bg-primary" : "w-6 bg-white/30 hover:bg-white/60",
              )}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="absolute bottom-10 right-4 sm:right-6 lg:right-8 text-white/60 text-xs tracking-widest z-10 hidden md:block">
          <span className="text-white font-bold">{String(i + 1).padStart(2, "0")}</span>
          <span className="mx-2">/</span>
          <span>{String(slides.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}
