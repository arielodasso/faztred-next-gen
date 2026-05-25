import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, CalendarCheck } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "HOME" },
  { to: "/servicios", label: "SERVICIOS" },
  { to: "/proyectos", label: "PROYECTOS" },
  { to: "/contacto", label: "CONTACTO" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 z-50 transition-all duration-500 ease-out",
        scrolled ? "top-3 md:top-5" : "top-0",
      )}
    >
      <div
        className={cn(
          "mx-auto transition-all duration-500 ease-out",
          scrolled
            ? "max-w-6xl px-3 md:px-4"
            : "max-w-7xl px-4 sm:px-6 lg:px-8",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-500 ease-out",
            scrolled || open
              ? "h-16 md:h-20 px-4 md:px-6 bg-[color:var(--surface-dark)]/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
              : "h-24 md:h-32 border border-transparent rounded-none",
          )}
        >
          <Link to="/" className="flex items-center" onClick={handleLogoClick}>
            <img
              src={logoWhite}
              alt="Faztred Soluciones"
              className={cn(
                "w-auto transition-all duration-500 ease-out",
                scrolled ? "h-10 md:h-12" : "h-16 md:h-24",
              )}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-[11px] font-medium tracking-[0.18em] text-white/75 hover:text-white transition-colors relative py-2 group"
                activeProps={{ className: "!text-white" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              to="/contacto"
              onClick={() => {
                import("@/lib/analytics").then((m) =>
                  m.pushEvent("meeting_request", { location: "navbar" }),
                );
              }}
              className="cta-press inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-5 py-2.5 text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors"
            >
              <CalendarCheck className="h-4 w-4" />
              Agendá una reunión
            </Link>
          </div>

          <button
            className="md:hidden text-white p-2 -mr-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 mt-2 rounded-2xl border border-white/10 bg-[color:var(--surface-dark)]/90 backdrop-blur-xl",
            open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0 border-transparent",
          )}
        >
          <nav className="flex flex-col px-5 py-4 gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-white/90 hover:text-primary text-sm font-medium tracking-wider py-3 border-b border-white/5"
                activeProps={{ className: "!text-primary" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contacto"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-md px-5 py-3 text-xs font-semibold tracking-wider uppercase"
            >
              <CalendarCheck className="h-4 w-4" />
              Agendá una reunión
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
