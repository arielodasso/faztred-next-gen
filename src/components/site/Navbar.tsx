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
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-[color:var(--surface-dark)]/95 backdrop-blur-md shadow-lg"
          : "bg-[color:var(--surface-dark)]/70 backdrop-blur-sm",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 md:h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <img src={logoWhite} alt="Faztred Soluciones" className="h-12 md:h-16 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-xs font-medium tracking-[0.18em] text-white/80 hover:text-white transition-colors relative py-2 group"
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
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            <CalendarCheck className="h-4 w-4" />
            Agendá una reunión
          </Link>
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-[color:var(--surface-dark)] border-t border-white/10",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
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
    </header>
  );
}
