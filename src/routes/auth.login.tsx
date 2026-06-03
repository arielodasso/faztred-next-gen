import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Iniciar sesión — Faztred" }] }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error("Credenciales inválidas");
      return;
    }
    toast.success("Bienvenido");
    navigate({ to: "/admin" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-background to-[color:var(--surface-dark,#0a0a0a)]">
      <div className="w-full max-w-md bg-[color:var(--surface-dark,#111)] border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <Link to="/" className="text-2xl font-bold tracking-tight text-white">
            Faztred
          </Link>
          <p className="mt-2 text-sm text-white/60">Panel de administración</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-white/80">Email</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 bg-black/30 border-white/10 text-white"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-white/80">Contraseña</Label>
            <Input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 bg-black/30 border-white/10 text-white"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
          <div className="text-center text-sm">
            <Link to="/auth/forgot-password" className="text-white/60 hover:text-white">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
