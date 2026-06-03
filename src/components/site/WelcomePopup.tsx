import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "faztred_welcome_seen_v";

interface Cfg {
  enabled: boolean;
  title: string;
  description: string;
  image_url: string | null;
  button_label: string | null;
  button_url: string | null;
  version: number;
}

export function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<Cfg | null>(null);

  useEffect(() => {
    let active = true;
    supabase.from("popup_config").select("*").eq("id", 1).single().then(({ data }) => {
      if (!active || !data) return;
      const cfg = data as Cfg;
      setConfig(cfg);
      if (!cfg.enabled) return;
      try {
        if (localStorage.getItem(STORAGE_KEY + cfg.version)) return;
      } catch { return; }
      setTimeout(() => {
        setOpen(true);
        pushEvent("popup_view", { location: "home_welcome" });
      }, 1200);
    });
    return () => { active = false; };
  }, []);

  const close = () => {
    setOpen(false);
    if (config) {
      try { localStorage.setItem(STORAGE_KEY + config.version, new Date().toISOString()); } catch { /* ignore */ }
    }
  };

  if (!open || !config) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-popup-title"
    >
      <div
        className="relative w-full max-w-lg bg-[color:var(--surface-dark)] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Cerrar"
          className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {config.image_url && (
          <div className="aspect-[16/9] w-full overflow-hidden bg-black">
            <img src={config.image_url} alt="" className="h-full w-full object-cover" loading="eager" />
          </div>
        )}

        <div className="p-8 md:p-10">
          <span className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Novedades
          </span>
          <h2 id="welcome-popup-title" className="mt-4 text-2xl md:text-3xl font-bold text-white tracking-tight">
            {config.title}
          </h2>
          <p className="mt-3 text-sm md:text-base text-white/65 leading-relaxed">
            {config.description}
          </p>
          {config.button_label && config.button_url && (
            <a
              href={config.button_url}
              onClick={() => {
                pushEvent("popup_click", { location: "home_welcome", label: config.button_label ?? undefined });
                close();
              }}
              className="cta-press mt-8 inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-6 py-3 text-xs font-semibold tracking-[0.15em] uppercase transition-colors"
            >
              {config.button_label}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
