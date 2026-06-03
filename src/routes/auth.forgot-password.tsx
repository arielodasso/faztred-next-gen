import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/forgot-password")({
  component: ForgotPage,
  head: () => ({ meta: [{ title: "Recuperar contraseña — Faztred" }] }),
});

function ForgotPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error("No se pudo enviar el mail");
      return;
    }
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[color:var(--surface-dark,#111)] border border-white/10 rounded-2xl p-8">
        <h1 className="text-xl font-bold text-white">Recuperar contraseña</h1>
        {sent ? (
          <p className="mt-4 text-sm text-white/70">
            Si la dirección existe, te enviamos un mail con instrucciones.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email" className="text-white/80">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 bg-black/30 border-white/10 text-white" />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Enviando..." : "Enviar instrucciones"}
            </Button>
          </form>
        )}
        <div className="mt-6 text-center text-sm">
          <Link to="/auth/login" className="text-white/60 hover:text-white">Volver al login</Link>
        </div>
      </div>
    </div>
  );
}
