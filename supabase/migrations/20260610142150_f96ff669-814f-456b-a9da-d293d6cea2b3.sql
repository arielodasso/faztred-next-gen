
-- Categorías de proyectos
CREATE TABLE public.project_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.project_categories TO anon, authenticated;
GRANT ALL ON public.project_categories TO authenticated;
GRANT ALL ON public.project_categories TO service_role;
ALTER TABLE public.project_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories_public_read" ON public.project_categories FOR SELECT USING (true);
CREATE POLICY "categories_admin_insert" ON public.project_categories FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'superadmin'));
CREATE POLICY "categories_admin_update" ON public.project_categories FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'superadmin'));
CREATE POLICY "categories_admin_delete" ON public.project_categories FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'superadmin'));
CREATE TRIGGER trg_project_categories_updated_at BEFORE UPDATE ON public.project_categories FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Proyectos
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  industry text NOT NULL DEFAULT '',
  category_id uuid REFERENCES public.project_categories(id) ON DELETE SET NULL,
  problem text NOT NULL DEFAULT '',
  solution text[] NOT NULL DEFAULT '{}',
  result text NOT NULL DEFAULT '',
  technologies text[] NOT NULL DEFAULT '{}',
  cover_url text,
  gallery text[] NOT NULL DEFAULT '{}',
  is_published boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon, authenticated;
GRANT ALL ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "projects_public_read" ON public.projects FOR SELECT USING (is_published OR public.has_role(auth.uid(), 'superadmin'));
CREATE POLICY "projects_admin_insert" ON public.projects FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'superadmin'));
CREATE POLICY "projects_admin_update" ON public.projects FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'superadmin'));
CREATE POLICY "projects_admin_delete" ON public.projects FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'superadmin'));
CREATE TRIGGER trg_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Heros por página
CREATE TABLE public.page_heroes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key text NOT NULL UNIQUE,
  eyebrow text,
  title text NOT NULL DEFAULT '',
  subtitle text,
  image_url text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.page_heroes TO anon, authenticated;
GRANT ALL ON public.page_heroes TO authenticated;
GRANT ALL ON public.page_heroes TO service_role;
ALTER TABLE public.page_heroes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "heroes_public_read" ON public.page_heroes FOR SELECT USING (true);
CREATE POLICY "heroes_admin_insert" ON public.page_heroes FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'superadmin'));
CREATE POLICY "heroes_admin_update" ON public.page_heroes FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'superadmin'));
CREATE POLICY "heroes_admin_delete" ON public.page_heroes FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'superadmin'));
CREATE TRIGGER trg_page_heroes_updated_at BEFORE UPDATE ON public.page_heroes FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed categorías
INSERT INTO public.project_categories (name, slug, sort_order) VALUES
  ('Automatización', 'automatizacion', 1),
  ('Tableros', 'tableros', 2),
  ('Revamping', 'revamping', 3),
  ('Capacitación', 'capacitacion', 4),
  ('Cerramiento', 'cerramiento', 5),
  ('Antiexplosivo', 'antiexplosivo', 6),
  ('Señalización', 'senalizacion', 7);

-- Seed heros (sin image_url, las páginas usan fallback existente)
INSERT INTO public.page_heroes (page_key, eyebrow, title, subtitle) VALUES
  ('home', NULL, 'Soluciones industriales que funcionan', 'Automatización, tableros, mantenimiento y más.'),
  ('servicios', 'Servicios', 'Soluciones integrales para tu planta', 'Automatización, tableros, mantenimiento y más.'),
  ('productos', 'Productos', 'Productos industriales', 'Componentes y equipos para tu industria.'),
  ('proyectos', 'Casos reales', 'Proyectos realizados', 'Experiencia real en planta. Problema, solución y resultado.'),
  ('contacto', 'Contacto', 'Hablemos de tu proyecto', 'Respondemos en menos de 24 hs hábiles.'),
  ('login', NULL, 'Acceso', 'Ingresá a tu cuenta.');
