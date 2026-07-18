
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  program TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT SELECT, DELETE ON public.contact_submissions TO authenticated;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit" ON public.contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view submissions" ON public.contact_submissions FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete submissions" ON public.contact_submissions FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Seed editable text content into existing site_settings key/value table
INSERT INTO public.site_settings (key, value) VALUES
  ('hero_headline', 'Price Action. Precision Execution.'),
  ('hero_subheadline', 'From Beginner To Market Expert — India''s premier academy for copyright-registered price action & intraday trading systems.'),
  ('about_bio', 'Founded in 2019 by Mangesh Balasaheb Waghmare, ExpertAction® is dedicated to stock market education focused on Price Action Trading, Risk Management, Trading Psychology, and Intraday Trading Strategies.'),
  ('about_bio_2', 'We''ve trained 1,500+ students through classroom and online programs in Pune and across India.'),
  ('section_about_heading', 'About ExpertAction®'),
  ('section_courses_heading', 'Our Entry Setup Trading Programs'),
  ('section_courses_sub', 'Copyright-registered curricula built from real market experience.'),
  ('section_gallery_heading', 'Our Research in Pictures'),
  ('section_gallery_sub', 'A snapshot of industry insights, sessions, and student milestones.'),
  ('section_why_heading', 'Why Choose ExpertAction'),
  ('section_contact_heading', 'Get in Touch'),
  ('course_1_title', '2 Copyrighted Entry Setup'),
  ('course_1_desc', 'Basic to Advanced. Perfect for beginners entering the markets.'),
  ('course_1_price', '₹20,000'),
  ('course_2_title', '7 Copyrighted Entry Setup'),
  ('course_2_desc', 'Advanced Price Action & Options Trading Concepts.'),
  ('course_2_price', '₹50,000'),
  ('course_3_title', '11 Copyrighted Entry Setup'),
  ('course_3_desc', 'Complete Price Action Framework for professional traders.'),
  ('course_3_price', '₹1,00,000')
ON CONFLICT (key) DO NOTHING;
