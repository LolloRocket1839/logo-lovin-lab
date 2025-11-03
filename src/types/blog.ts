export interface BlogPost {
  title: string;
  slug: string;
  category: 'students' | 'investors' | 'sellers';
  date: string;
  author: string;
  excerpt: string;
  image: string;
  readTime: number;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  tags: string[];
  content?: string;
}

export type BlogCategory = 'all' | 'students' | 'investors' | 'sellers';
