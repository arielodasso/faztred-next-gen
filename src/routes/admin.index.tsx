import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, hasRole } from "@/lib/use-auth";

export const Route = createFileRoute("/admin/")({
  component: DashboardPage,
});

function DashboardPage() {
  const { roles, loading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ submissions: 0, unread: 0, clients: 0 });

  useEffect(() => {
    if (loading) return;
    if (!hasRole(roles, "superadmin")) {
      navigate({ to: "/admin/adjuntos" });
      return;
    }
    (async () => {
      const [{ count: total }, { count: unread }, { count: clients }] = await Promise.all([
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("is_read", false),
        supabase.from("user_roles").select("id", { count: "exact", head: true }).eq("role", "client_admin"),
      ]);
      setStats({ submissions: total ?? 0, unread: unread ?? 0, clients: clients ?? 0 });
    })();
  }, [loading, roles, navigate]);

  if (!hasRole(roles, "superadmin")) return null;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-white/50 mt-1">Resumen general</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Formularios totales" value={stats.submissions} />
        <StatCard label="Sin leer" value={stats.unread} highlight />
        <StatCard label="Clientes" value={stats.clients} />
      </div>
    </div>
  );
}

function StatCard({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`rounded-xl border p-5 ${highlight ? "border-primary/40 bg-primary/5" : "border-white/10 bg-white/[0.02]"}`}>
      <p className="text-xs uppercase tracking-widest text-white/40">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}
