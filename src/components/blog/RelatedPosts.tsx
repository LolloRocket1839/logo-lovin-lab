import { BlogPost } from "@/types/blog";
import { useTranslation } from "react-i18next";
import { BlogCard } from "./BlogCard";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  const { t } = useTranslation();

  if (posts.length === 0) return null;

  return (
    <section className="py-16 border-t border-border">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold mb-8">
          {t('blog.relatedPosts')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};
