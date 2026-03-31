import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Eye, Edit, Trash2, RefreshCw, Plus, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface AutoPost {
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

interface AutoTopic {
  id: string;
  topic_it: string;
  topic_en: string;
  category: string;
  priority: number;
  status: string;
  target_keywords: string[];
  created_at: string;
  used_at: string | null;
}

const statusColors: Record<string, string> = {
  published: "bg-green-100 text-green-800 border-green-200",
  draft: "bg-yellow-100 text-yellow-800 border-yellow-200",
  archived: "bg-gray-100 text-gray-800 border-gray-200",
  pending: "bg-blue-100 text-blue-800 border-blue-200",
  used: "bg-green-100 text-green-800 border-green-200",
  skipped: "bg-red-100 text-red-800 border-red-200",
};

const AdminAutoBlog = () => {
  const [activeTab, setActiveTab] = useState<"posts" | "topics">("posts");
  const [editingPost, setEditingPost] = useState<AutoPost | null>(null);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: posts = [], isLoading: postsLoading } = useQuery({
    queryKey: ["admin-auto-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("auto_blog_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as AutoPost[];
    },
  });

  const { data: topics = [], isLoading: topicsLoading } = useQuery({
    queryKey: ["admin-auto-topics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("auto_blog_topics")
        .select("*")
        .order("priority", { ascending: false });
      if (error) throw error;
      return (data || []) as AutoTopic[];
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<AutoPost> }) => {
      const { error } = await supabase
        .from("auto_blog_posts")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-auto-posts"] });
      toast.success("Post aggiornato");
      setEditingPost(null);
    },
    onError: (e) => toast.error(`Errore: ${e.message}`),
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("auto_blog_posts")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-auto-posts"] });
      toast.success("Post eliminato");
    },
    onError: (e) => toast.error(`Errore: ${e.message}`),
  });

  const triggerGenerationMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("auto-publish-blog", {
        body: { scheduled: true },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-auto-posts"] });
      queryClient.invalidateQueries({ queryKey: ["admin-auto-topics"] });
      toast.success(data?.slug ? `Articolo generato: ${data.slug}` : "Generazione completata");
    },
    onError: (e) => toast.error(`Errore generazione: ${e.message}`),
  });

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Content Engine Dashboard</h1>
            <p className="text-muted-foreground mt-1">Gestisci articoli auto-generati e coda topic</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => triggerGenerationMutation.mutate()}
              disabled={triggerGenerationMutation.isPending}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              {triggerGenerationMutation.isPending ? "Generando..." : "Genera articolo"}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Articoli totali" value={posts.length} />
          <StatCard label="Pubblicati" value={posts.filter(p => p.status === "published").length} />
          <StatCard label="Bozze" value={posts.filter(p => p.status === "draft").length} />
          <StatCard label="Topic in coda" value={topics.filter(t => t.status === "pending").length} />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-muted rounded-lg p-1 w-fit">
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "posts" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            Articoli ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab("topics")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "topics" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            Topic Queue ({topics.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === "posts" ? (
          <PostsTable
            posts={posts}
            loading={postsLoading}
            expandedPost={expandedPost}
            onToggleExpand={(id) => setExpandedPost(expandedPost === id ? null : id)}
            onEdit={setEditingPost}
            onDelete={(id) => {
              if (confirm("Sei sicuro di voler eliminare questo articolo?")) {
                deletePostMutation.mutate(id);
              }
            }}
            onStatusChange={(id, status) => updatePostMutation.mutate({ id, updates: { status } })}
          />
        ) : (
          <TopicsTable topics={topics} loading={topicsLoading} />
        )}

        {/* Edit Dialog */}
        {editingPost && (
          <EditPostDialog
            post={editingPost}
            onClose={() => setEditingPost(null)}
            onSave={(updates) => updatePostMutation.mutate({ id: editingPost.id, updates })}
            saving={updatePostMutation.isPending}
          />
        )}
      </div>
    </div>
  );
};

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
    </div>
  );
}

function PostsTable({
  posts,
  loading,
  expandedPost,
  onToggleExpand,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  posts: AutoPost[];
  loading: boolean;
  expandedPost: string | null;
  onToggleExpand: (id: string) => void;
  onEdit: (post: AutoPost) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}) {
  if (loading) return <div className="text-center py-12 text-muted-foreground">Caricamento...</div>;
  if (posts.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-border rounded-xl">
        <p className="text-muted-foreground text-lg">Nessun articolo auto-generato</p>
        <p className="text-muted-foreground text-sm mt-2">Clicca "Genera articolo" per crearne uno</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <div key={post.id} className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 flex items-start gap-4">
            <button onClick={() => onToggleExpand(post.id)} className="mt-1 text-muted-foreground hover:text-foreground">
              {expandedPost === post.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <Badge variant="outline" className={statusColors[post.status] || ""}>
                  {post.status}
                </Badge>
                <Badge variant="outline">{post.category}</Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(post.created_at).toLocaleDateString("it-IT")}
                </span>
              </div>
              <h3 className="font-semibold text-foreground truncate">{post.title_it}</h3>
              <p className="text-sm text-muted-foreground truncate">{post.excerpt_it}</p>
            </div>

            <div className="flex gap-1 shrink-0">
              <Select value={post.status} onValueChange={(v) => onStatusChange(post.id, v)}>
                <SelectTrigger className="w-[120px] h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Bozza</SelectItem>
                  <SelectItem value="published">Pubblicato</SelectItem>
                  <SelectItem value="archived">Archiviato</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(post)}>
                <Edit className="h-3.5 w-3.5" />
              </Button>
              
              {post.status === "published" && (
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noopener">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              )}
              
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onDelete(post.id)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {expandedPost === post.id && (
            <div className="border-t border-border p-4 bg-muted/30 space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Titolo EN</p>
                  <p className="text-sm">{post.title_en}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Slug</p>
                  <p className="text-sm font-mono">{post.slug}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">SEO Title IT</p>
                  <p className="text-sm">{post.seo_title_it} ({post.seo_title_it.length} chars)</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">SEO Desc IT</p>
                  <p className="text-sm">{post.seo_desc_it} ({post.seo_desc_it.length} chars)</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Tags IT</p>
                <div className="flex gap-1 flex-wrap">
                  {(Array.isArray(post.tags_it) ? post.tags_it : []).map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Contenuto IT (preview)</p>
                <pre className="text-xs bg-muted p-3 rounded-lg max-h-48 overflow-auto whitespace-pre-wrap">
                  {post.content_it.substring(0, 800)}...
                </pre>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TopicsTable({ topics, loading }: { topics: AutoTopic[]; loading: boolean }) {
  if (loading) return <div className="text-center py-12 text-muted-foreground">Caricamento...</div>;
  if (topics.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-border rounded-xl">
        <p className="text-muted-foreground">Nessun topic in coda</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {topics.map((topic) => (
        <div key={topic.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className={statusColors[topic.status] || ""}>{topic.status}</Badge>
              <Badge variant="outline">{topic.category}</Badge>
              <span className="text-xs text-muted-foreground">Priorità: {topic.priority}</span>
            </div>
            <p className="font-medium text-sm truncate">{topic.topic_it}</p>
            <p className="text-xs text-muted-foreground truncate">{topic.topic_en}</p>
          </div>
          {topic.used_at && (
            <span className="text-xs text-muted-foreground shrink-0">
              Usato: {new Date(topic.used_at).toLocaleDateString("it-IT")}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function EditPostDialog({
  post,
  onClose,
  onSave,
  saving,
}: {
  post: AutoPost;
  onClose: () => void;
  onSave: (updates: Partial<AutoPost>) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState({
    title_it: post.title_it,
    title_en: post.title_en,
    excerpt_it: post.excerpt_it,
    excerpt_en: post.excerpt_en,
    seo_title_it: post.seo_title_it,
    seo_title_en: post.seo_title_en,
    seo_desc_it: post.seo_desc_it,
    seo_desc_en: post.seo_desc_en,
    content_it: post.content_it,
    content_en: post.content_en,
    category: post.category,
    slug: post.slug,
    image: post.image,
    read_time: post.read_time,
  });

  const update = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifica articolo</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Titolo IT</label>
              <Input value={form.title_it} onChange={(e) => update("title_it", e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Titolo EN</label>
              <Input value={form.title_en} onChange={(e) => update("title_en", e.target.value)} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Slug</label>
              <Input value={form.slug} onChange={(e) => update("slug", e.target.value)} className="font-mono text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Categoria</label>
              <Select value={form.category} onValueChange={(v) => update("category", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="students">Students</SelectItem>
                  <SelectItem value="investors">Investors</SelectItem>
                  <SelectItem value="sellers">Sellers</SelectItem>
                  <SelectItem value="turisti">Turisti</SelectItem>
                  <SelectItem value="societa">Società</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">SEO Title IT ({form.seo_title_it.length}/60)</label>
              <Input value={form.seo_title_it} onChange={(e) => update("seo_title_it", e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">SEO Title EN ({form.seo_title_en.length}/60)</label>
              <Input value={form.seo_title_en} onChange={(e) => update("seo_title_en", e.target.value)} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">SEO Desc IT ({form.seo_desc_it.length}/160)</label>
              <Textarea value={form.seo_desc_it} onChange={(e) => update("seo_desc_it", e.target.value)} rows={2} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">SEO Desc EN ({form.seo_desc_en.length}/160)</label>
              <Textarea value={form.seo_desc_en} onChange={(e) => update("seo_desc_en", e.target.value)} rows={2} />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Contenuto IT</label>
            <Textarea value={form.content_it} onChange={(e) => update("content_it", e.target.value)} rows={10} className="font-mono text-xs" />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Contenuto EN</label>
            <Textarea value={form.content_en} onChange={(e) => update("content_en", e.target.value)} rows={10} className="font-mono text-xs" />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Annulla</Button>
            <Button onClick={() => onSave(form)} disabled={saving}>
              {saving ? "Salvando..." : "Salva modifiche"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AdminAutoBlog;
