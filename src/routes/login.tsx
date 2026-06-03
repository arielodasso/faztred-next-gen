import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import heroPlanta from "@/assets/hero-planta.jpg";

export const Route = createFileRoute("/login")({
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
    <div className="relative min-h-screen w-full overflow-hidden bg-[color:var(--surface-darker)]">
      <div className="absolute inset-0">
        <img
          src={heroPlanta}
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--surface-darker)]/95 via-[color:var(--surface-darker)]/80 to-[color:var(--surface-darker)]/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--surface-darker)] via-transparent to-[color:var(--surface-darker)]/40" />
      <div className="absolute top-1/4 right-[-10%] w-[40%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(204,0,0,0.18),transparent_70%)] blur-2xl" />

      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[color:var(--surface-dark,#111)]/90 backdrop-blur border border-white/10 rounded-2xl p-8 shadow-2xl">
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
              <Link to="/forgot-password" className="text-white/60 hover:text-white">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
