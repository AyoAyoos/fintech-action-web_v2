-- File: supabase/migrations/20260719010000_add_showcase_gallery_images.sql

CREATE TABLE public.showcase_gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  storage_path text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.showcase_gallery_images TO anon, authenticated;
GRANT ALL ON public.showcase_gallery_images TO service_role;
ALTER TABLE public.showcase_gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read showcase gallery" ON public.showcase_gallery_images
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert showcase gallery" ON public.showcase_gallery_images
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update showcase gallery" ON public.showcase_gallery_images
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete showcase gallery" ON public.showcase_gallery_images
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Reuses the existing 'site-images' storage bucket & its existing
-- public-read / admin-write policies — no new storage policies needed.