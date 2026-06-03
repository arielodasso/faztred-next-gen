import { useEffect, useState } from "react";
import { X, ExternalLink, CalendarCheck } from "lucide-react";
import { CALENDAR_URL } from "@/lib/calendar-popup";
import { pushEvent } from "@/lib/analytics";

export function CalendarModal() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onOpen = () => {
      setLoaded(false);
      setOpen(true);
    };
    window.addEventListener("faztred:open-calendar", onOpen as EventListener);
    return () =>
      window.removeEventListener("faztred:open-calendar", onOpen as EventListener);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 md:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="calendar-modal-title"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-3xl h-[90vh] md:h-[85vh] bg-[color:var(--surface-dark)] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 animate-in zoom-in-95 duration-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[color:var(--surface-darker)]/60">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/15 text-primary">
              <CalendarCheck className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/50 font-semibold">
                Agendá una reunión
              </p>
              <h2 id="calendar-modal-title" className="text-sm md:text-base font-semibold text-white">
                Agendar reunión
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => pushEvent("meeting_request", { location: "modal_external" })}
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-white/70 hover:text-white px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors"
              aria-label="Abrir en pestaña nueva"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Abrir en nueva pestaña
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="h-9 w-9 rounded-md text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative flex-1 bg-white">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="h-8 w-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
            </div>
          )}
          <iframe
            src={CALENDAR_URL}
            title="Agendar reunión con Faztred"
            className="absolute inset-0 h-full w-full border-0"
            onLoad={() => setLoaded(true)}
            referrerPolicy="no-referrer-when-downgrade"
            allow="clipboard-write; payment"
          />
        </div>
      </div>
    </div>
  );
}
