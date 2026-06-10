import { Link, Outlet, createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Inbox,
  Megaphone,
  ShieldCheck,
  Settings,
  Paperclip,
  ExternalLink,
  LogOut,
  Tag,
  FolderKanban,
  Image as ImageIcon,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, hasRole } from "@/lib/use-auth";
import { toast } from "sonner";
import logoWhite from "@/assets/logo-white.png";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  head: () => ({ meta: [{ title: "Admin — Faztred" }, { name: "robots", content: "noindex" }] }),
});

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
}

const superadminNav: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/usuarios", label: "Usuarios", icon: Users },
  { to: "/admin/clientes", label: "Clientes", icon: Briefcase },
  { to: "/admin/proyectos", label: "Proyectos", icon: FolderKanban },
  { to: "/admin/encabezados", label: "Encabezados", icon: ImageIcon },
  { to: "/admin/formularios", label: "Formularios", icon: Inbox },
  { to: "/admin/popup", label: "Popup", icon: Megaphone },
  { to: "/admin/confianza", label: "Confianza", icon: ShieldCheck },
  { to: "/admin/configuracion", label: "Configuración", icon: Settings },
  { to: "/admin/gtm", label: "Google Tag Manager", icon: Tag },
];

const clientNav: NavItem[] = [
  { to: "/admin/adjuntos", label: "Mis adjuntos", icon: Paperclip },
];

function AdminLayout() {
  const navigate = useNavigate();
  const { loading, session, roles } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (loading) return;
    if (!session) {
      navigate({ to: "/login" });
      return;
    }
    if (roles.length === 0) {
      toast.error("Tu usuario no tiene acceso");
      supabase.auth.signOut().then(() => navigate({ to: "/login" }));
    }
  }, [loading, session, roles, navigate]);

  if (loading || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/70">
        Cargando...
      </div>
    );
  }

  const isSuper = hasRole(roles, "superadmin");
  const nav = isSuper ? superadminNav : clientNav;

  const logout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0a] text-white">
      <aside className="w-64 shrink-0 border-r border-white/10 bg-[#0d0d0d] flex flex-col">
        <div className="px-5 py-5 border-b border-white/10">
          <Link to="/" className="flex items-center">
            <img src={logoWhite} alt="Faztred Soluciones" className="h-10 w-auto" />
          </Link>
          <p className="mt-2 text-[11px] uppercase tracking-widest text-white/40">
            {isSuper ? "Superadministrador" : "Cliente"}
          </p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to || (item.to !== "/admin" && pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  active ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/60 hover:text-white hover:bg-white/5"
          >
            <ExternalLink className="h-4 w-4" />
            Ver sitio web
          </a>
        </nav>
        <div className="p-3 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/60 hover:text-white hover:bg-white/5"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
