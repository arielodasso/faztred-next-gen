import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Menu,
  X,
  CalendarCheck,
  ChevronDown,
  CircuitBoard,
  AlertTriangle,
  Wrench,
  Shield,
  GraduationCap,
  Cpu,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import { cn } from "@/lib/utils";
import { projects, type ProjectCategory } from "@/lib/site-data";
import { calendarPopupHandler } from "@/lib/calendar-popup";

const links = [
  { to: "/", label: "HOME" },
  { to: "/servicios", label: "SERVICIOS" },
  { to: "/productos", label: "PRODUCTOS" },
  { to: "/proyectos", label: "PROYECTOS", hasMenu: true },
  { to: "/contacto", label: "CONTACTO" },
] as const;

const categoryIcons: Record<ProjectCategory, LucideIcon> = {
  Automatización: Cpu,
  Tableros: CircuitBoard,
  Revamping: Wrench,
  Capacitación: GraduationCap,
  Cerramiento: Shield,
  Antiexplosivo: AlertTriangle,
  Señalización: Sparkles,
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogoClick = () => {
    setOpen(false);
    if (typeof window !== "undefined" && window.location.pathname === "/") {
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

          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {links.map((l) =>
              "hasMenu" in l && l.hasMenu ? (
                <div
                  key={l.to}
                  className="relative"
                  onMouseEnter={() => setProjectsOpen(true)}
                  onMouseLeave={() => setProjectsOpen(false)}
                >
                  <Link
                    to={l.to}
                    className="inline-flex items-center gap-1 text-[11px] font-medium tracking-[0.18em] text-white/75 hover:text-white transition-colors relative py-2 group"
                    activeProps={{ className: "!text-white" }}
                  >
                    {l.label}
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transition-transform duration-200",
                        projectsOpen && "rotate-180",
                      )}
                    />
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>

                  {/* Mega menu */}
                  <div
                    className={cn(
                      "absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-200",
                      projectsOpen
                        ? "opacity-100 pointer-events-auto translate-y-0"
                        : "opacity-0 pointer-events-none -translate-y-1",
                    )}
                  >
                    <div className="w-[640px] max-w-[90vw] rounded-2xl border border-white/10 bg-[color:var(--surface-dark)]/95 backdrop-blur-xl shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)] p-4">
                      <div className="grid grid-cols-2 gap-1">
                        {projects.map((p) => {
                          const Icon = categoryIcons[p.category] ?? Sparkles;
                          return (
                            <Link
                              key={p.slug}
                              to="/proyectos"
                              search={{ cat: p.category }}
                              onClick={() => setProjectsOpen(false)}
                              className="group flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-white/5 transition-colors"
                            >
                              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70 group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-colors">
                                <Icon className="h-4 w-4" />
                              </span>
                              <span className="flex-1 min-w-0">
                                <span className="block text-[13px] font-medium text-white/90 truncate group-hover:text-white">
                                  {p.title}
                                </span>
                                <span className="block text-[10px] uppercase tracking-[0.16em] text-white/45 mt-0.5">
                                  {p.category}
                                </span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                      <div className="mt-3 border-t border-white/5 pt-3">
                        <Link
                          to="/proyectos"
                          onClick={() => setProjectsOpen(false)}
                          className="flex items-center justify-between rounded-lg px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 hover:text-primary transition-colors"
                        >
                          Ver todos los proyectos
                          <span className="text-primary">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
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
              ),
            )}
          </nav>

          <div className="hidden md:block">
            <button
              type="button"
              onClick={calendarPopupHandler("navbar")}
              className="cta-press inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-5 py-2.5 text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors"
            >
              <CalendarCheck className="h-4 w-4" />
              Agendá una reunión
            </button>
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
            <button
              type="button"
              onClick={(e) => {
                setOpen(false);
                calendarPopupHandler("navbar_mobile")(e);
              }}
              className="mt-3 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-md px-5 py-3 text-xs font-semibold tracking-wider uppercase"
            >
              <CalendarCheck className="h-4 w-4" />
              Agendá una reunión
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
