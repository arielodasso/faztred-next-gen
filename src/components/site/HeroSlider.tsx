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
    <section className="relative h-screen min-h-[680px] max-h-[920px] w-full overflow-hidden bg-[color:var(--surface-dark)]">
      {/* Background placeholder layer */}
      <div className="absolute inset-0">
        <Placeholder
          label="Imagen industrial — reemplazar"
          ratio="wide"
          className="!aspect-auto h-full w-full !border-0 opacity-20"
        />
      </div>
      {/* Overlays — n8n-style deep gradient + red glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/70" />
      <div className="absolute -top-1/3 -right-1/4 w-[80%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(204,0,0,0.25),transparent_60%)] blur-2xl" />
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:96px_96px]" />

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-24">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={cn(
              "absolute inset-x-4 sm:inset-x-6 lg:inset-x-8 transition-all duration-700",
              idx === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
            )}
          >
            <div className="max-w-3xl">
              <Badge variant="dark" dot className="mb-8">
                {s.eyebrow}
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-white leading-[1.02] tracking-[-0.03em]">
                {s.title}
              </h1>
              <p className="mt-8 text-base md:text-lg text-white/65 max-w-xl leading-relaxed">
                {s.subtitle}
              </p>
              <div className="mt-12 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contacto"
                  className="group inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3.5 text-sm font-semibold rounded-md transition-colors"
                >
                  {s.cta}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white px-6 py-3.5 text-sm font-semibold rounded-md transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Hablar por WhatsApp
                </a>
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
                "h-1 rounded-full transition-all duration-300",
                idx === i ? "w-12 bg-primary" : "w-6 bg-white/25 hover:bg-white/60",
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
