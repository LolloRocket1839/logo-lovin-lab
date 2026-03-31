
-- Auto blog posts table
CREATE TABLE public.auto_blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT 'students',
  title_it TEXT NOT NULL,
  title_en TEXT NOT NULL,
  excerpt_it TEXT NOT NULL,
  excerpt_en TEXT NOT NULL,
  content_it TEXT NOT NULL,
  content_en TEXT NOT NULL,
  seo_title_it TEXT NOT NULL,
  seo_title_en TEXT NOT NULL,
  seo_desc_it TEXT NOT NULL,
  seo_desc_en TEXT NOT NULL,
  keywords JSONB NOT NULL DEFAULT '[]'::jsonb,
  tags_it JSONB NOT NULL DEFAULT '[]'::jsonb,
  tags_en JSONB NOT NULL DEFAULT '[]'::jsonb,
  image TEXT NOT NULL DEFAULT '/images/quartieri-studenti-torino.jpg',
  read_time INTEGER NOT NULL DEFAULT 8,
  author TEXT NOT NULL DEFAULT 'Jungle Rent AI',
  status TEXT NOT NULL DEFAULT 'published',
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.auto_blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published auto_blog_posts"
ON public.auto_blog_posts FOR SELECT TO public
USING (status = 'published');

CREATE POLICY "Service role full access auto_blog_posts"
ON public.auto_blog_posts FOR ALL TO service_role
USING (true) WITH CHECK (true);

-- Topic queue table
CREATE TABLE public.auto_blog_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_it TEXT NOT NULL,
  topic_en TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'students',
  priority INTEGER NOT NULL DEFAULT 5,
  status TEXT NOT NULL DEFAULT 'pending',
  target_keywords JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  used_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.auto_blog_topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access auto_blog_topics"
ON public.auto_blog_topics FOR ALL TO service_role
USING (true) WITH CHECK (true);

CREATE POLICY "Block public access auto_blog_topics"
ON public.auto_blog_topics FOR SELECT TO public
USING (false);
