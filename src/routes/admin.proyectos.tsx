import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ConfirmDialog } from "@/components/site/ConfirmDialog";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  ArrowUp,
  ArrowDown,
  X,
  Save,
  ArrowLeft,
} from "lucide-react";
import { mediaUrl } from "@/lib/media-url";

export const Route = createFileRoute("/admin/proyectos")({
  component: ProyectosAdminPage,
  head: () => ({ meta: [{ title: "Proyectos — Admin Faztred" }, { name: "robots", content: "noindex" }] }),
});

interface Category {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
}

interface Project {
  id: string;
  slug: string;
  title: string;
  industry: string;
  category_id: string | null;
  problem: string;
  solution: string[];
  result: string;
  technologies: string[];
  cover_url: string | null;
  gallery: string[];
  is_published: boolean;
  sort_order: number;
}

const empty: Omit<Project, "id"> = {
  slug: "",
  title: "",
  industry: "",
  category_id: null,
  problem: "",
  solution: [],
  result: "",
  technologies: [],
  cover_url: null,
  gallery: [],
  is_published: true,
  sort_order: 0,
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function uploadFile(file: File, folder: "projects" | "heroes"): Promise<string | null> {
  const safe = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safe}`;
  const { error } = await supabase.storage.from("site-media").upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) {
    toast.error(error.message);
    return null;
  }
  return path;
}

function ProyectosAdminPage() {
  const [view, setView] = useState<"list" | "edit" | "categories">("list");
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Project | (Omit<Project, "id"> & { id?: string }) | null>(null);
  const [search, setSearch] = useState("");
  const [toDelete, setToDelete] = useState<Project | null>(null);
  const [toDeleteCat, setToDeleteCat] = useState<Category | null>(null);
  const [saving, setSaving] = useState(false);

  const loadAll = async () => {
    const [{ data: p }, { data: c }] = await Promise.all([
      supabase.from("projects").select("*").order("sort_order").order("created_at", { ascending: false }),
      supabase.from("project_categories").select("*").order("sort_order"),
    ]);
    setProjects((p ?? []) as Project[]);
    setCategories((c ?? []) as Category[]);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) => p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q),
    );
  }, [projects, search]);

  const startNew = () => {
    setEditing({ ...empty, sort_order: projects.length });
    setView("edit");
  };

  const startEdit = (p: Project) => {
    setEditing(p);
    setView("edit");
  };

  const save = async () => {
    if (!editing) return;
    if (!editing.title.trim()) {
      toast.error("El título es obligatorio");
      return;
    }
    const slug = editing.slug.trim() || slugify(editing.title);
    setSaving(true);
    const payload = {
      slug,
      title: editing.title.trim(),
      industry: editing.industry,
      category_id: editing.category_id,
      problem: editing.problem,
      solution: editing.solution.filter((s) => s.trim()),
      result: editing.result,
      technologies: editing.technologies.filter((t) => t.trim()),
      cover_url: editing.cover_url,
      gallery: editing.gallery,
      is_published: editing.is_published,
      sort_order: editing.sort_order,
    };
    const id = (editing as Project).id;
    const { error } = id
      ? await supabase.from("projects").update(payload).eq("id", id)
      : await supabase.from("projects").insert(payload);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(id ? "Proyecto actualizado" : "Proyecto creado");
    setEditing(null);
    setView("list");
    loadAll();
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    const { error } = await supabase.from("projects").delete().eq("id", toDelete.id);
    if (error) toast.error(error.message);
    else toast.success("Proyecto eliminado");
    setToDelete(null);
    loadAll();
  };

  const move = async (p: Project, dir: -1 | 1) => {
    const idx = projects.findIndex((x) => x.id === p.id);
    const swap = projects[idx + dir];
    if (!swap) return;
    await Promise.all([
      supabase.from("projects").update({ sort_order: swap.sort_order }).eq("id", p.id),
      supabase.from("projects").update({ sort_order: p.sort_order }).eq("id", swap.id),
    ]);
    loadAll();
  };

  // ─── Categories ───
  const [newCatName, setNewCatName] = useState("");
  const addCategory = async () => {
    if (!newCatName.trim()) return;
    const slug = slugify(newCatName);
    const sort_order = categories.length;
    const { error } = await supabase
      .from("project_categories")
      .insert({ name: newCatName.trim(), slug, sort_order });
    if (error) toast.error(error.message);
    else {
      setNewCatName("");
      loadAll();
    }
  };
  const updateCategory = async (c: Category, name: string) => {
    const { error } = await supabase
      .from("project_categories")
      .update({ name, slug: slugify(name) })
      .eq("id", c.id);
    if (error) toast.error(error.message);
    else loadAll();
  };
  const deleteCategory = async () => {
    if (!toDeleteCat) return;
    const { error } = await supabase.from("project_categories").delete().eq("id", toDeleteCat.id);
    if (error) toast.error(error.message);
    else toast.success("Categoría eliminada");
    setToDeleteCat(null);
    loadAll();
  };

  // ─── Edit view ───
  if (view === "edit" && editing) {
    return (
      <ProjectEditor
        project={editing}
        categories={categories}
        saving={saving}
        onCancel={() => {
          setEditing(null);
          setView("list");
        }}
        onSave={save}
        onChange={(patch) => setEditing({ ...editing, ...patch })}
      />
    );
  }

  // ─── Categories view ───
  if (view === "categories") {
    return (
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <button
              onClick={() => setView("list")}
              className="text-xs text-white/60 hover:text-white inline-flex items-center gap-1 mb-2"
            >
              <ArrowLeft className="h-3 w-3" /> Volver a proyectos
            </button>
            <h1 className="text-2xl font-bold">Categorías</h1>
          </div>
        </header>

        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
          <div className="flex gap-2">
            <Input
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="Nueva categoría"
              className="bg-black/30 border-white/10 text-white"
              onKeyDown={(e) => e.key === "Enter" && addCategory()}
            />
            <Button onClick={addCategory} className="bg-primary text-white">
              <Plus className="h-4 w-4 mr-1" /> Agregar
            </Button>
          </div>
          <ul className="divide-y divide-white/5">
            {categories.map((c) => (
              <li key={c.id} className="py-3 flex items-center gap-3">
                <Input
                  defaultValue={c.name}
                  onBlur={(e) => {
                    if (e.target.value !== c.name) updateCategory(c, e.target.value);
                  }}
                  className="bg-black/30 border-white/10 text-white"
                />
                <span className="text-xs text-white/40 w-40 truncate">{c.slug}</span>
                <button
                  onClick={() => setToDeleteCat(c)}
                  className="text-white/60 hover:text-red-400 p-2"
                  aria-label="Eliminar categoría"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
            {categories.length === 0 && (
              <p className="text-sm text-white/60 py-4">Sin categorías.</p>
            )}
          </ul>
        </div>

        <ConfirmDialog
          open={!!toDeleteCat}
          onOpenChange={(o) => !o && setToDeleteCat(null)}
          title="Eliminar categoría"
          description={toDeleteCat ? `¿Eliminar "${toDeleteCat.name}"? Los proyectos quedarán sin categoría.` : ""}
          onConfirm={deleteCategory}
        />
      </div>
    );
  }

  // ─── List view ───
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Proyectos</h1>
          <p className="text-sm text-white/60 mt-1">Administrá los proyectos de /proyectos.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setView("categories")} variant="outline" className="border-white/15 text-white bg-white/5 hover:bg-white/10">
            Categorías
          </Button>
          <Button onClick={startNew} className="bg-primary text-white">
            <Plus className="h-4 w-4 mr-1" /> Nuevo proyecto
          </Button>
        </div>
      </header>

      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por título o slug…"
        className="bg-black/30 border-white/10 text-white max-w-md"
      />

      <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
        {filtered.length === 0 ? (
          <p className="p-6 text-sm text-white/60">Sin proyectos.</p>
        ) : (
          <ul className="divide-y divide-white/5">
            {filtered.map((p, i) => {
              const cat = categories.find((c) => c.id === p.category_id);
              return (
                <li key={p.id} className="p-4 flex items-center gap-4">
                  <div className="h-14 w-20 rounded-md bg-black/40 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {p.cover_url ? (
                      <img src={mediaUrl(p.cover_url) ?? ""} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <ImageIcon className="h-5 w-5 text-white/30" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-white truncate">{p.title}</span>
                      {!p.is_published && (
                        <span className="text-[10px] uppercase tracking-wider bg-yellow-500/20 text-yellow-300 px-1.5 py-0.5 rounded">
                          Borrador
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-white/50 truncate">
                      {cat?.name ?? "Sin categoría"} · {p.slug}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => move(p, -1)}
                      disabled={i === 0 || !!search}
                      className="p-2 text-white/60 hover:text-white disabled:opacity-30"
                      aria-label="Subir"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => move(p, 1)}
                      disabled={i === filtered.length - 1 || !!search}
                      className="p-2 text-white/60 hover:text-white disabled:opacity-30"
                      aria-label="Bajar"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <Button
                      size="sm"
                      onClick={() => startEdit(p)}
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/15"
                    >
                      Editar
                    </Button>
                    <button
                      onClick={() => setToDelete(p)}
                      className="p-2 text-white/60 hover:text-red-400"
                      aria-label="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(o) => !o && setToDelete(null)}
        title="Eliminar proyecto"
        description={toDelete ? `¿Eliminar "${toDelete.title}"? Esta acción no se puede deshacer.` : ""}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

interface EditorProps {
  project: Omit<Project, "id"> & { id?: string };
  categories: Category[];
  saving: boolean;
  onCancel: () => void;
  onSave: () => void;
  onChange: (patch: Partial<Project>) => void;
}

function ProjectEditor({ project, categories, saving, onCancel, onSave, onChange }: EditorProps) {
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const onCover = async (file: File) => {
    setUploadingCover(true);
    const path = await uploadFile(file, "projects");
    setUploadingCover(false);
    if (path) onChange({ cover_url: path });
  };

  const onGallery = async (files: FileList) => {
    setUploadingGallery(true);
    const uploads = await Promise.all(Array.from(files).map((f) => uploadFile(f, "projects")));
    setUploadingGallery(false);
    const ok = uploads.filter((x): x is string => !!x);
    onChange({ gallery: [...project.gallery, ...ok] });
  };

  const removeGallery = (idx: number) => {
    onChange({ gallery: project.gallery.filter((_, i) => i !== idx) });
  };

  const moveGallery = (idx: number, dir: -1 | 1) => {
    const newG = [...project.gallery];
    const target = idx + dir;
    if (target < 0 || target >= newG.length) return;
    [newG[idx], newG[target]] = [newG[target], newG[idx]];
    onChange({ gallery: newG });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <header className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <button onClick={onCancel} className="text-xs text-white/60 hover:text-white inline-flex items-center gap-1 mb-2">
            <ArrowLeft className="h-3 w-3" /> Volver
          </button>
          <h1 className="text-2xl font-bold">{project.id ? "Editar proyecto" : "Nuevo proyecto"}</h1>
        </div>
        <Button onClick={onSave} disabled={saving} className="bg-primary text-white">
          <Save className="h-4 w-4 mr-1" /> {saving ? "Guardando…" : "Guardar"}
        </Button>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label className="text-white/70">Título *</Label>
          <Input
            value={project.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className="bg-black/30 border-white/10 text-white mt-1"
          />
        </div>
        <div>
          <Label className="text-white/70">Slug</Label>
          <Input
            value={project.slug}
            onChange={(e) => onChange({ slug: e.target.value })}
            placeholder="auto-generado si vacío"
            className="bg-black/30 border-white/10 text-white mt-1"
          />
        </div>
        <div>
          <Label className="text-white/70">Industria</Label>
          <Input
            value={project.industry}
            onChange={(e) => onChange({ industry: e.target.value })}
            className="bg-black/30 border-white/10 text-white mt-1"
          />
        </div>
        <div>
          <Label className="text-white/70">Categoría</Label>
          <select
            value={project.category_id ?? ""}
            onChange={(e) => onChange({ category_id: e.target.value || null })}
            className="mt-1 w-full h-9 rounded-md bg-black/30 border border-white/10 text-white px-3 text-sm"
          >
            <option value="">— Sin categoría —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label className="text-white/70">Problema / Situación</Label>
        <Textarea
          value={project.problem}
          onChange={(e) => onChange({ problem: e.target.value })}
          rows={3}
          className="bg-black/30 border-white/10 text-white mt-1"
        />
      </div>

      <ArrayEditor
        label="Solución implementada"
        items={project.solution}
        onChange={(v) => onChange({ solution: v })}
        placeholder="Una tarea por línea"
      />

      <div>
        <Label className="text-white/70">Resultado</Label>
        <Textarea
          value={project.result}
          onChange={(e) => onChange({ result: e.target.value })}
          rows={2}
          className="bg-black/30 border-white/10 text-white mt-1"
        />
      </div>

      <ArrayEditor
        label="Tecnologías"
        items={project.technologies}
        onChange={(v) => onChange({ technologies: v })}
        placeholder="Una por línea (PLC, HMI, etc.)"
      />

      {/* Cover */}
      <div>
        <Label className="text-white/70">Imagen de portada</Label>
        <div className="mt-2 flex items-start gap-4">
          {project.cover_url ? (
            <div className="relative h-32 w-48 rounded-md overflow-hidden bg-black/40">
              <img src={mediaUrl(project.cover_url) ?? ""} alt="" className="h-full w-full object-cover" />
              <button
                onClick={() => onChange({ cover_url: null })}
                className="absolute top-1 right-1 bg-black/60 rounded-full p-1 text-white hover:bg-red-500"
                aria-label="Quitar portada"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="h-32 w-48 rounded-md border border-dashed border-white/15 flex items-center justify-center text-white/30">
              <ImageIcon className="h-6 w-6" />
            </div>
          )}
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/15 bg-black/30 hover:bg-white/10 text-sm text-white">
            <Upload className="h-4 w-4" />
            {uploadingCover ? "Subiendo…" : "Subir portada"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => e.target.files?.[0] && onCover(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      {/* Gallery */}
      <div>
        <Label className="text-white/70">Galería</Label>
        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-3">
          {project.gallery.map((src, i) => (
            <div key={`${src}-${i}`} className="relative aspect-video bg-black/40 rounded-md overflow-hidden group">
              <img src={mediaUrl(src) ?? ""} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                <button onClick={() => moveGallery(i, -1)} className="bg-black/60 rounded p-1 text-white hover:bg-white/20"><ArrowUp className="h-3 w-3" /></button>
                <button onClick={() => moveGallery(i, 1)} className="bg-black/60 rounded p-1 text-white hover:bg-white/20"><ArrowDown className="h-3 w-3" /></button>
                <button onClick={() => removeGallery(i)} className="bg-black/60 rounded p-1 text-white hover:bg-red-500"><Trash2 className="h-3 w-3" /></button>
              </div>
            </div>
          ))}
          <label className="cursor-pointer aspect-video rounded-md border border-dashed border-white/15 flex flex-col items-center justify-center text-white/50 hover:border-white/30 hover:text-white/80 text-xs gap-1">
            <Upload className="h-5 w-5" />
            {uploadingGallery ? "Subiendo…" : "Agregar imágenes"}
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => e.target.files && onGallery(e.target.files)}
            />
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <Switch
          checked={project.is_published}
          onCheckedChange={(v) => onChange({ is_published: v })}
        />
        <Label className="text-white/80">Publicado (visible en /proyectos)</Label>
      </div>
    </div>
  );
}

function ArrayEditor({
  label,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  items: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const text = items.join("\n");
  return (
    <div>
      <Label className="text-white/70">{label}</Label>
      <Textarea
        value={text}
        onChange={(e) => onChange(e.target.value.split("\n"))}
        rows={Math.max(3, items.length + 1)}
        placeholder={placeholder}
        className="bg-black/30 border-white/10 text-white mt-1 font-mono text-xs"
      />
      <p className="text-[10px] text-white/40 mt-1">Un ítem por línea.</p>
    </div>
  );
}
