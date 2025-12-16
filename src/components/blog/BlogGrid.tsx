import { BlogPost } from "@/types/blog";
import { BlogCard } from "./BlogCard";

interface BlogGridProps {
  posts: BlogPost[];
}

export const BlogGrid = ({ posts }: BlogGridProps) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          Nessun articolo trovato in questa categoria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
};
