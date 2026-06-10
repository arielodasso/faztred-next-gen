import { createServerFn } from "@tanstack/react-start";

export interface PublicProject {
  id: string;
  slug: string;
  title: string;
  industry: string;
  category: string;
  category_slug: string;
  problem: string;
  solution: string[];
  result: string;
  technologies: string[];
  cover_url: string | null;
  gallery: string[];
  is_published: boolean;
  sort_order: number;
}

export interface PublicCategory {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
}

export interface PublicHero {
  page_key: string;
  eyebrow: string | null;
  title: string;
  subtitle: string | null;
  image_url: string | null;
}

export const getPublicProjects = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("projects")
      .select("*, project_categories(name, slug)")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    const rows = (data ?? []) as Array<Record<string, unknown> & { project_categories: { name: string; slug: string } | null }>;
    return rows.map((r) => ({
      id: r.id as string,
      slug: r.slug as string,
      title: r.title as string,
      industry: (r.industry as string) ?? "",
      category: r.project_categories?.name ?? "Sin categoría",
      category_slug: r.project_categories?.slug ?? "",
      problem: (r.problem as string) ?? "",
      solution: (r.solution as string[]) ?? [],
      result: (r.result as string) ?? "",
      technologies: (r.technologies as string[]) ?? [],
      cover_url: (r.cover_url as string) ?? null,
      gallery: (r.gallery as string[]) ?? [],
      is_published: Boolean(r.is_published),
      sort_order: (r.sort_order as number) ?? 0,
    })) as PublicProject[];
  } catch {
    return [] as PublicProject[];
  }
});

export const getPublicCategories = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("project_categories")
      .select("id, name, slug, sort_order")
      .order("sort_order", { ascending: true });
    return (data ?? []) as PublicCategory[];
  } catch {
    return [] as PublicCategory[];
  }
});

export const getAllHeroes = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin.from("page_heroes").select("page_key, eyebrow, title, subtitle, image_url");
    return (data ?? []) as PublicHero[];
  } catch {
    return [] as PublicHero[];
  }
});
