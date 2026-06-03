import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import heroPlanta from "@/assets/hero-planta.jpg";

export const Route = createFileRoute("/reset-password")({
  component: ResetPage,
  head: () => ({ meta: [{ title: "Nueva contraseña — Faztred" }] }),
});

function ResetPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Mínimo 8 caracteres");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Contraseña actualizada");
    navigate({ to: "/admin" });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[color:var(--surface-darker)]">
      <div className="absolute inset-0">
        <img src={heroPlanta} alt="" aria-hidden className="h-full w-full object-cover object-center" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--surface-darker)]/95 via-[color:var(--surface-darker)]/80 to-[color:var(--surface-darker)]/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--surface-darker)] via-transparent to-[color:var(--surface-darker)]/40" />
      <div className="absolute top-1/4 right-[-10%] w-[40%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(204,0,0,0.18),transparent_70%)] blur-2xl" />

      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[color:var(--surface-dark,#111)]/90 backdrop-blur border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-xl font-bold text-white">Nueva contraseña</h1>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="password" className="text-white/80">Nueva contraseña</Label>
              <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 bg-black/30 border-white/10 text-white" />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
