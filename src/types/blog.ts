export interface FAQ {
  question: string;
  answer: string;
}

export interface BlogPostTranslation {
  title: string;
  excerpt: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  tags: string[];
  faqs?: FAQ[];
}

export interface BlogPost {
  slug: string;
  category: 'students' | 'investors' | 'sellers' | 'turisti' | 'societa';
  date: string;
  author: string;
  image: string;
  readTime: number;
  content: string; // filename without extension in /data/blog/content/
  noteStyle?: boolean; // iPhone Notes template styling
  translations: {
    it: BlogPostTranslation;
    en: BlogPostTranslation;
  };
}

export type BlogCategory = 'all' | 'students' | 'investors' | 'sellers' | 'turisti' | 'societa';
