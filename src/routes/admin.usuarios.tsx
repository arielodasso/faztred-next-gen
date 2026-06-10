
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/site/ConfirmDialog";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";


interface UserRow {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string | null;
}

function UsuariosPage() {
  const createFn = async (args: { data: typeof form }) => {
    const { error } = await supabase.functions.invoke("admin-users", {
      body: { action: "create", ...args.data },
    });
    if (error) throw new Error(error.message);
  };
  const deleteFn = async (args: { data: { user_id: string } }) => {
    const { error } = await supabase.functions.invoke("admin-users", {
      body: { action: "delete", user_id: args.data.user_id },
    });
    if (error) throw new Error(error.message);
  };
  const [rows, setRows] = useState<UserRow[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", full_name: "", role: "client_admin" as "superadmin" | "client_admin" });
  const [toDelete, setToDelete] = useState<UserRow | null>(null);

  const load = async () => {
    const { data: profiles } = await supabase.from("profiles").select("id, email, full_name");
    const { data: roles } = await supabase.from("user_roles").select("user_id, role");
    const merged: UserRow[] = (profiles ?? []).map((p) => ({
      ...p,
      role: roles?.find((r) => r.user_id === p.id)?.role ?? null,
    }));
    setRows(merged);
  };
  useEffect(() => { load(); }, []);

  const create = async () => {
    try {
      await createFn({ data: form });
      toast.success("Usuario creado");
      setOpen(false);
      setForm({ email: "", password: "", full_name: "", role: "client_admin" });
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error");
    }
  };

  const confirmRemove = async () => {
    if (!toDelete) return;
    try {
      await deleteFn({ data: { user_id: toDelete.id } });
      toast.success("Usuario eliminado");
      setToDelete(null);
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error");
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Usuarios</h1>
          <p className="text-sm text-white/50 mt-1">Superadministradores y administradores cliente.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-1" /> Nuevo usuario</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Crear usuario</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Nombre</Label><Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></div>
              <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
              <div><Label>Contraseña inicial</Label><Input type="text" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Mínimo 8 caracteres" /></div>
              <div>
                <Label>Rol</Label>
                <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as "superadmin" | "client_admin" })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client_admin">Cliente</SelectItem>
                    <SelectItem value="superadmin">Superadministrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={create} className="w-full">Crear</Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-widest text-white/50">
            <tr>
              <th className="text-left px-4 py-3">Nombre</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Rol</th>
              <th className="text-right px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-3">{r.full_name ?? "—"}</td>
                <td className="px-4 py-3 text-white/70">{r.email ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${r.role === "superadmin" ? "bg-primary/20 text-primary" : "bg-white/10 text-white/70"}`}>
                    {r.role === "superadmin" ? "Superadmin" : r.role === "client_admin" ? "Cliente" : "Sin rol"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setToDelete(r)} className="text-white/60 hover:text-red-400" aria-label={`Eliminar ${r.full_name ?? r.email}`}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(o) => !o && setToDelete(null)}
        title="Eliminar usuario"
        description={toDelete ? `¿Eliminar a "${toDelete.full_name ?? toDelete.email}"? Esta acción es irreversible.` : ""}
        onConfirm={confirmRemove}
      />
    </div>
  );
}

export default UsuariosPage;
