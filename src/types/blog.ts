export interface BlogPostTranslation {
  title: string;
  excerpt: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  tags: string[];
}

export interface BlogPost {
  slug: string;
  category: 'students' | 'investors' | 'sellers';
  date: string;
  author: string;
  image: string;
  readTime: number;
  content: string; // filename without extension in /data/blog/content/
  translations: {
    it: BlogPostTranslation;
    en: BlogPostTranslation;
  };
}

export type BlogCategory = 'all' | 'students' | 'investors' | 'sellers';
