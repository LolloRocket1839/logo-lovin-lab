import { useMemo, useState } from 'react';
import { blogPosts } from '@/data/blog/posts';
import { linkableContent } from '@/data/linkableContent';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, ExternalLink, Search, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';

const CANONICAL_DOMAIN = 'junglerent.it';
const FLAGGED_PATTERNS = [
  /lovable\.app/gi,
  /lovable\.dev/gi,
  /jungle-rent\.lovable/gi,
  /junglerent\.lovable/gi,
];

interface AuditIssue {
  source: string;
  field: string;
  value: string;
  pattern: string;
  severity: 'error' | 'warning';
}

function auditValue(source: string, field: string, value: string | undefined): AuditIssue[] {
  if (!value) return [];
  const issues: AuditIssue[] = [];
  for (const pattern of FLAGGED_PATTERNS) {
    pattern.lastIndex = 0;
    if (pattern.test(value)) {
      issues.push({
        source,
        field,
        value: value.length > 120 ? value.slice(0, 120) + '…' : value,
        pattern: pattern.source,
        severity: 'error',
      });
    }
  }
  return issues;
}

function auditBlogPosts(): AuditIssue[] {
  const issues: AuditIssue[] = [];
  for (const post of blogPosts) {
    const label = `Blog: ${post.slug}`;
    issues.push(...auditValue(label, 'image', post.image));
    for (const lang of ['it', 'en'] as const) {
      const t = post.translations[lang];
      issues.push(...auditValue(label, `${lang}.title`, t.title));
      issues.push(...auditValue(label, `${lang}.excerpt`, t.excerpt));
      issues.push(...auditValue(label, `${lang}.seo.title`, t.seo.title));
      issues.push(...auditValue(label, `${lang}.seo.description`, t.seo.description));
      for (const kw of t.seo.keywords) {
        issues.push(...auditValue(label, `${lang}.keyword`, kw));
      }
    }
  }
  return issues;
}

function auditLinkableContent(): AuditIssue[] {
  const issues: AuditIssue[] = [];
  for (const item of linkableContent) {
    const label = `Link: ${item.url}`;
    issues.push(...auditValue(label, 'url', item.url));
    issues.push(...auditValue(label, 'titleIt', item.titleIt));
    issues.push(...auditValue(label, 'titleEn', item.titleEn));
    for (const kw of item.triggerKeywords) {
      issues.push(...auditValue(label, 'keyword', kw));
    }
  }
  return issues;
}

function auditStructuredDataUrls(): AuditIssue[] {
  const issues: AuditIssue[] = [];
  // Simulate the URLs that ArticleStructuredData.tsx would generate
  for (const post of blogPosts) {
    const label = `Schema: ${post.slug}`;
    const imageUrl = post.image.startsWith('http')
      ? post.image
      : `https://junglerent.it${post.image}`;
    issues.push(...auditValue(label, 'image', imageUrl));
    issues.push(...auditValue(label, 'author.url', 'https://junglerent.it/chi-siamo'));
    issues.push(...auditValue(label, 'publisher.logo', 'https://junglerent.it/jungle-rent-logo.svg'));
    issues.push(...auditValue(label, 'breadcrumb.home', 'https://junglerent.it'));
    issues.push(...auditValue(label, 'breadcrumb.blog', 'https://junglerent.it/blog'));
  }
  return issues;
}

function auditStaticAssets(): { file: string; status: 'ok' | 'check' }[] {
  return [
    { file: 'public/robots.txt', status: 'check' },
    { file: 'public/sitemap.xml', status: 'check' },
    { file: 'public/sitemap-blog.xml', status: 'check' },
    { file: 'public/sitemap-tools.xml', status: 'check' },
    { file: 'public/llms.txt', status: 'check' },
    { file: 'public/ai-assistant-info.txt', status: 'check' },
    { file: 'index.html', status: 'check' },
  ];
}

const ContentAudit = () => {
  const [filter, setFilter] = useState('');

  const blogIssues = useMemo(() => auditBlogPosts(), []);
  const linkIssues = useMemo(() => auditLinkableContent(), []);
  const schemaIssues = useMemo(() => auditStructuredDataUrls(), []);
  const allIssues = useMemo(() => [...blogIssues, ...linkIssues, ...schemaIssues], [blogIssues, linkIssues, schemaIssues]);
  const staticFiles = useMemo(() => auditStaticAssets(), []);

  const filtered = useMemo(() => {
    if (!filter) return allIssues;
    const q = filter.toLowerCase();
    return allIssues.filter(
      (i) =>
        i.source.toLowerCase().includes(q) ||
        i.field.toLowerCase().includes(q) ||
        i.value.toLowerCase().includes(q)
    );
  }, [allIssues, filter]);

  const totalPosts = blogPosts.length;
  const totalLinks = linkableContent.length;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Content audit</h1>
        <p className="text-muted-foreground text-sm">
          Scans blog posts and internal links for non-canonical domain references.
          Canonical domain: <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">{CANONICAL_DOMAIN}</code>
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-4 pb-3 text-center">
            <div className="text-2xl font-bold text-foreground">{totalPosts}</div>
            <div className="text-xs text-muted-foreground">Blog posts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3 text-center">
            <div className="text-2xl font-bold text-foreground">{totalLinks}</div>
            <div className="text-xs text-muted-foreground">Linkable entries</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3 text-center">
            <div className={`text-2xl font-bold ${allIssues.length === 0 ? 'text-green-600' : 'text-destructive'}`}>
              {allIssues.length}
            </div>
            <div className="text-xs text-muted-foreground">Issues found</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3 text-center">
            <div className="text-2xl font-bold text-foreground">{staticFiles.length}</div>
            <div className="text-xs text-muted-foreground">Static files to verify</div>
          </CardContent>
        </Card>
      </div>

      {/* Status banner */}
      {allIssues.length === 0 ? (
        <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4 mb-8">
          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">All clear</p>
            <p className="text-sm text-muted-foreground">
              No <code>lovable.app</code> references found in blog metadata or linkable content registry.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 mb-8">
          <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
          <div>
            <p className="font-medium text-destructive">{allIssues.length} issue{allIssues.length > 1 ? 's' : ''} detected</p>
            <p className="text-sm text-muted-foreground">
              Replace these references with <code>{CANONICAL_DOMAIN}</code>.
            </p>
          </div>
        </div>
      )}

      {/* Issues table */}
      {allIssues.length > 0 && (
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Domain reference issues
            </CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter issues…"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {filtered.map((issue, i) => (
                <div key={i} className="flex flex-col gap-1 rounded border p-3 text-sm">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="destructive" className="text-[10px]">
                      {issue.severity}
                    </Badge>
                    <span className="font-medium text-foreground">{issue.source}</span>
                    <span className="text-muted-foreground">→ {issue.field}</span>
                  </div>
                  <code className="text-xs bg-muted p-1.5 rounded break-all">{issue.value}</code>
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="text-muted-foreground text-sm text-center py-4">No matches for "{filter}"</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Static files checklist */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Static files (manual verification)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground mb-3">
            These files contain hardcoded URLs. Verify they use <code>{CANONICAL_DOMAIN}</code>.
          </p>
          <div className="space-y-2">
            {staticFiles.map((f) => (
              <div key={f.file} className="flex items-center gap-2 text-sm">
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                <code className="text-xs">{f.file}</code>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground mt-8 text-center">
        Audit scans {totalPosts} blog posts × 2 languages + {totalLinks} linkable content entries.
        Static files require manual grep.
      </p>
    </div>
  );
};

export default ContentAudit;
