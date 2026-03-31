import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/types/blog";

interface AutoBlogPost {
  id: string;
  slug: string;
  category: string;
  title_it: string;
  title_en: string;
  excerpt_it: string;
  excerpt_en: string;
  content_it: string;
  content_en: string;
  seo_title_it: string;
  seo_title_en: string;
  seo_desc_it: string;
  seo_desc_en: string;
  keywords: string[];
  tags_it: string[];
  tags_en: string[];
  image: string;
  read_time: number;
  author: string;
  status: string;
  published_at: string;
  created_at: string;
}

export function autoBlogPostToBlogPost(post: AutoBlogPost): BlogPost {
  return {
    slug: post.slug,
    category: post.category as BlogPost["category"],
    date: post.published_at?.split("T")[0] || post.created_at?.split("T")[0] || new Date().toISOString().split("T")[0],
    author: post.author,
    image: post.image,
    readTime: post.read_time,
    content: `__auto__${post.slug}`,
    translations: {
      it: {
        title: post.title_it,
        excerpt: post.excerpt_it,
        seo: {
          title: post.seo_title_it,
          description: post.seo_desc_it,
          keywords: Array.isArray(post.keywords) ? post.keywords : [],
        },
        tags: Array.isArray(post.tags_it) ? post.tags_it : [],
      },
      en: {
        title: post.title_en,
        excerpt: post.excerpt_en,
        seo: {
          title: post.seo_title_en,
          description: post.seo_desc_en,
          keywords: Array.isArray(post.keywords) ? post.keywords : [],
        },
        tags: Array.isArray(post.tags_en) ? post.tags_en : [],
      },
    },
  };
}

export function useAutoBlogPosts() {
  return useQuery({
    queryKey: ["auto-blog-posts"],
    queryFn: async (): Promise<BlogPost[]> => {
      const { data, error } = await supabase
        .from("auto_blog_posts")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Error fetching auto blog posts:", error);
        return [];
      }

      return (data || []).map((post: any) => autoBlogPostToBlogPost(post));
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useAutoBlogPost(slug: string) {
  return useQuery({
    queryKey: ["auto-blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("auto_blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (error || !data) return null;
      return data as AutoBlogPost;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  });
}
