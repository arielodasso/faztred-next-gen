import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/site/ConfirmDialog";
import { Mail, Phone, Building2, Check, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/formularios")({
  component: FormulariosPage,
});

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  source: string | null;
  is_read: boolean;
  created_at: string;
}

function FormulariosPage() {
  const [items, setItems] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setItems((data ?? []) as Submission[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id: string, read = true) => {
    await supabase.from("contact_submissions").update({ is_read: read }).eq("id", id);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("¿Eliminar este envío?")) return;
    await supabase.from("contact_submissions").delete().eq("id", id);
    if (selected?.id === id) setSelected(null);
    toast.success("Eliminado");
    load();
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Formularios</h1>
          <p className="text-sm text-white/50 mt-1">Categoría: Contacto · {items.length} envíos</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
          {loading ? (
            <p className="p-6 text-sm text-white/50">Cargando...</p>
          ) : items.length === 0 ? (
            <p className="p-6 text-sm text-white/50">Aún no hay envíos.</p>
          ) : (
            <ul className="divide-y divide-white/5 max-h-[70vh] overflow-auto">
              {items.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => { setSelected(s); if (!s.is_read) markRead(s.id, true); }}
                    className={`w-full text-left px-4 py-3 hover:bg-white/5 transition-colors ${selected?.id === s.id ? "bg-white/5" : ""}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium truncate">{s.name}</span>
                      {!s.is_read && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                    </div>
                    <div className="text-xs text-white/50 mt-0.5 truncate">{s.email}</div>
                    <div className="text-[11px] text-white/40 mt-1">
                      {new Date(s.created_at).toLocaleString("es-AR")}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
          {selected ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{selected.name}</h2>
                  <p className="text-xs text-white/40 mt-1">
                    {new Date(selected.created_at).toLocaleString("es-AR")}
                    {selected.source && ` · ${selected.source}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => markRead(selected.id, !selected.is_read)}>
                    <Check className="h-4 w-4 mr-1" /> {selected.is_read ? "Marcar no leído" : "Marcar leído"}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => remove(selected.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2 text-white/70"><Mail className="h-4 w-4" /> <a href={`mailto:${selected.email}`} className="hover:text-white">{selected.email}</a></p>
                {selected.phone && <p className="flex items-center gap-2 text-white/70"><Phone className="h-4 w-4" /> {selected.phone}</p>}
                {selected.company && <p className="flex items-center gap-2 text-white/70"><Building2 className="h-4 w-4" /> {selected.company}</p>}
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-2">Mensaje</p>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{selected.message}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-white/50">Seleccioná un envío.</p>
          )}
        </div>
      </div>
    </div>
  );
}
