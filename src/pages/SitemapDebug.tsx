import { useState, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ExternalLink, 
  Check, 
  AlertTriangle, 
  Globe, 
  FileText, 
  Newspaper,
  Wrench,
  Users,
  Building2,
  Home,
  ChevronDown,
  ChevronRight,
  Copy,
  CheckCircle2,
  Loader2,
  XCircle,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Navigation, Footer } from '@/components/layout';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface UrlStatus {
  url: string;
  status: number;
  ok: boolean;
  redirected?: boolean;
  finalUrl?: string;
  error?: string;
}

interface SiteUrl {
  path: string;
  pathEN?: string;
  title: string;
  category: 'core' | 'blog' | 'tools' | 'legal';
  priority: number;
  hasHreflang: boolean;
  lastmod?: string;
}

// All site URLs - keep this updated when adding new pages
const siteUrls: SiteUrl[] = [
  // Core pages
  { path: '/', title: 'Homepage', category: 'core', priority: 1.0, hasHreflang: true, lastmod: '2026-01-10' },
  { path: '/chi-siamo', pathEN: '/about', title: 'Chi Siamo / About', category: 'core', priority: 0.9, hasHreflang: true },
  { path: '/investitori', pathEN: '/investors', title: 'Investitori / Investors', category: 'core', priority: 0.9, hasHreflang: true },
  { path: '/studenti', pathEN: '/students', title: 'Studenti / Students', category: 'core', priority: 0.8, hasHreflang: true },
  { path: '/vendi', pathEN: '/sell', title: 'Vendi Casa / Sell Property', category: 'core', priority: 0.9, hasHreflang: true },
  { path: '/blog', title: 'Blog', category: 'core', priority: 0.9, hasHreflang: true },
  { path: '/faq', title: 'FAQ', category: 'core', priority: 0.7, hasHreflang: true },
  { path: '/grazie', pathEN: '/thank-you', title: 'Thank You Page', category: 'core', priority: 0.3, hasHreflang: true },
  
  // Tools
  { path: '/studenti/strumenti', pathEN: '/students/tools', title: 'Student Tools Hub', category: 'tools', priority: 0.8, hasHreflang: true },
  { path: '/studenti/strumenti/budget', pathEN: '/students/tools/budget', title: 'Budget Calculator', category: 'tools', priority: 0.7, hasHreflang: true },
  { path: '/studenti/strumenti/media', pathEN: '/students/tools/gpa', title: 'Grade Calculator', category: 'tools', priority: 0.7, hasHreflang: true },
  { path: '/studenti/strumenti/sessione', pathEN: '/students/tools/session', title: 'Exam Session Planner', category: 'tools', priority: 0.7, hasHreflang: true },
  { path: '/strumenti/aule-studio-torino', pathEN: '/tools/study-spaces-turin', title: 'Aule Studio Directory', category: 'tools', priority: 0.8, hasHreflang: true },
  { path: '/strumenti/dove-mangiare-torino', pathEN: '/tools/cheap-eats-turin', title: 'Cheap Eats Directory', category: 'tools', priority: 0.8, hasHreflang: true },
  { path: '/strumenti/sportelli-studenti-torino', pathEN: '/tools/student-services-turin', title: 'Student Services Directory', category: 'tools', priority: 0.8, hasHreflang: true },
  { path: '/strumenti/palestre-torino-studenti', pathEN: '/tools/gyms-turin-students', title: 'Gyms Directory', category: 'tools', priority: 0.8, hasHreflang: true },
  { path: '/valutazione-immobile', pathEN: '/property-valuation', title: 'Property Valuation', category: 'tools', priority: 0.9, hasHreflang: true },
  { path: '/scioperi-italia', pathEN: '/italy-strikes', title: 'Strike Emergency Directory', category: 'tools', priority: 0.9, hasHreflang: true, lastmod: '2026-01-10' },
  
  // Legal
  { path: '/privacy', title: 'Privacy Policy', category: 'legal', priority: 0.5, hasHreflang: false },
  { path: '/termini-e-condizioni', pathEN: '/terms', title: 'Terms & Conditions', category: 'legal', priority: 0.5, hasHreflang: true },
  
  // Blog posts (add main ones)
  { path: '/blog/sciopero-trasporti-italia-gennaio-2026', title: 'Sciopero Trasporti Gennaio 2026', category: 'blog', priority: 0.9, hasHreflang: true, lastmod: '2026-01-09' },
  { path: '/blog/eventi-torino-gennaio-2026', title: 'Eventi Torino Gennaio 2026', category: 'blog', priority: 0.8, hasHreflang: true },
  { path: '/blog/eventi-torino-febbraio-2026', title: 'Eventi Torino Febbraio 2026', category: 'blog', priority: 0.8, hasHreflang: true },
  { path: '/blog/eventi-torino-marzo-2026', title: 'Eventi Torino Marzo 2026', category: 'blog', priority: 0.8, hasHreflang: true },
  { path: '/blog/jungle-control-dicembre-2025', title: 'Jungle Control Dicembre 2025', category: 'blog', priority: 0.9, hasHreflang: true },
  { path: '/blog/props-gestione-immobiliare-semplificata', title: 'Props Gestione Immobiliare', category: 'blog', priority: 0.9, hasHreflang: true },
  { path: '/blog/aule-studio-torino-guida-completa', title: 'Aule Studio Torino Guida', category: 'blog', priority: 0.8, hasHreflang: true },
  { path: '/blog/san-salvario-guida-studenti', title: 'San Salvario Guida Studenti', category: 'blog', priority: 0.8, hasHreflang: true },
  { path: '/blog/dove-vivere-torino-studenti-politecnico', title: 'Dove Vivere Torino Studenti', category: 'blog', priority: 0.8, hasHreflang: true },
  { path: '/blog/politecnico-torino-guida-completa', title: 'Politecnico Torino Guida', category: 'blog', priority: 0.8, hasHreflang: true },
  { path: '/blog/universita-torino-guida-completa', title: 'Università Torino Guida', category: 'blog', priority: 0.8, hasHreflang: true },
  { path: '/blog/torino-nightlife-guide', title: 'Torino Nightlife Guide', category: 'blog', priority: 0.7, hasHreflang: true },
  { path: '/blog/torino-digital-nomads-guide', title: 'Digital Nomads Guide', category: 'blog', priority: 0.7, hasHreflang: true },
  { path: '/blog/vendere-casa-torino-guida-completa-2025', title: 'Vendere Casa Torino 2025', category: 'blog', priority: 0.8, hasHreflang: true },
  { path: '/blog/valutazione-immobiliare-torino-guida-completa', title: 'Valutazione Immobiliare Torino', category: 'blog', priority: 0.8, hasHreflang: true },
  { path: '/blog/mutui-investitori-immobiliari-guida-completa', title: 'Mutui Investitori Guida', category: 'blog', priority: 0.8, hasHreflang: true },
  { path: '/blog/investire-real-assets-torino-2025', title: 'Investire Real Assets 2025', category: 'blog', priority: 0.8, hasHreflang: true },
  { path: '/blog/student-housing-italia-savills-2025', title: 'Student Housing Italia 2025', category: 'blog', priority: 0.8, hasHreflang: true },
  { path: '/blog/cioccolaterie-torino-guida-completa', title: 'Cioccolaterie Torino Guida', category: 'blog', priority: 0.7, hasHreflang: true },
  { path: '/blog/tajarin-piemontesi-guida-completa', title: 'Tajarin Piemontesi Guida', category: 'blog', priority: 0.7, hasHreflang: true },
  { path: '/blog/migliori-gelaterie-torino-studenti', title: 'Gelaterie Torino Studenti', category: 'blog', priority: 0.7, hasHreflang: true },
  { path: '/blog/dove-mangiare-torino-studenti', title: 'Dove Mangiare Torino Studenti', category: 'blog', priority: 0.7, hasHreflang: true },
  { path: '/blog/palestre-torino-studenti-guida-completa', title: 'Palestre Torino Studenti', category: 'blog', priority: 0.7, hasHreflang: true },
  { path: '/blog/mobilita-sostenibile-torino-studenti', title: 'Mobilità Sostenibile Torino', category: 'blog', priority: 0.7, hasHreflang: true },
  { path: '/blog/raccolta-differenziata-torino-guida', title: 'Raccolta Differenziata Torino', category: 'blog', priority: 0.6, hasHreflang: true },
  { path: '/blog/viaggiare-sostenibile-torino-guida', title: 'Viaggiare Sostenibile Torino', category: 'blog', priority: 0.6, hasHreflang: true },
  { path: '/blog/cicloturismo-avanzato-torino', title: 'Cicloturismo Avanzato Torino', category: 'blog', priority: 0.6, hasHreflang: true },
  { path: '/blog/guida-volontariato-torino', title: 'Guida Volontariato Torino', category: 'blog', priority: 0.6, hasHreflang: true },
  { path: '/blog/quartieri-sicuri-donne-torino', title: 'Quartieri Sicuri Donne Torino', category: 'blog', priority: 0.7, hasHreflang: true },
  { path: '/blog/emergenze-affitti-torino-diritti-inquilini', title: 'Emergenze Affitti Diritti', category: 'blog', priority: 0.7, hasHreflang: true },
  { path: '/blog/mercati-storici-torino-chiusure', title: 'Mercati Storici Torino', category: 'blog', priority: 0.6, hasHreflang: true },
  { path: '/blog/panettoni-pandori-torino-guida-2025', title: 'Panettoni Pandori Torino 2025', category: 'blog', priority: 0.5, hasHreflang: true },
  { path: '/blog/torino-dicembre-turisti', title: 'Torino Dicembre Turisti', category: 'blog', priority: 0.6, hasHreflang: true },
  { path: '/blog/torino-novembre-turisti', title: 'Torino Novembre Turisti', category: 'blog', priority: 0.6, hasHreflang: true },
  { path: '/blog/torino-ogni-stagione-turisti', title: 'Torino Ogni Stagione', category: 'blog', priority: 0.7, hasHreflang: true },
  { path: '/blog/carnevale-ivrea-battaglia-arance-2026', title: 'Carnevale Ivrea 2026', category: 'blog', priority: 0.7, hasHreflang: true },
];

const categoryConfig = {
  core: { label: 'Pagine Principali', icon: Home, color: 'bg-blue-500' },
  blog: { label: 'Articoli Blog', icon: Newspaper, color: 'bg-green-500' },
  tools: { label: 'Strumenti', icon: Wrench, color: 'bg-purple-500' },
  legal: { label: 'Legal', icon: FileText, color: 'bg-gray-500' },
};

const SitemapDebug = () => {
  const [search, setSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['core', 'tools']);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [urlStatuses, setUrlStatuses] = useState<Record<string, UrlStatus>>({});
  const [isChecking, setIsChecking] = useState(false);
  const [checkingUrls, setCheckingUrls] = useState<Set<string>>(new Set());

  const filteredUrls = useMemo(() => {
    if (!search) return siteUrls;
    const searchLower = search.toLowerCase();
    return siteUrls.filter(url => 
      url.path.toLowerCase().includes(searchLower) ||
      url.title.toLowerCase().includes(searchLower) ||
      url.pathEN?.toLowerCase().includes(searchLower)
    );
  }, [search]);

  const groupedUrls = useMemo(() => {
    const groups: Record<string, SiteUrl[]> = { core: [], blog: [], tools: [], legal: [] };
    filteredUrls.forEach(url => {
      groups[url.category].push(url);
    });
    return groups;
  }, [filteredUrls]);

  const stats = useMemo(() => ({
    total: siteUrls.length,
    withHreflang: siteUrls.filter(u => u.hasHreflang).length,
    highPriority: siteUrls.filter(u => u.priority >= 0.8).length,
    blog: siteUrls.filter(u => u.category === 'blog').length,
    tools: siteUrls.filter(u => u.category === 'tools').length,
  }), []);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const copyUrl = (path: string) => {
    const fullUrl = `https://junglerent.it${path}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(path);
    toast.success('URL copiato!');
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const copyAllUrls = () => {
    const allUrls = siteUrls.map(u => `https://junglerent.it${u.path}`).join('\n');
    navigator.clipboard.writeText(allUrls);
    toast.success(`${siteUrls.length} URL copiati!`);
  };

  // Check a batch of URLs
  const checkUrls = useCallback(async (urlsToCheck: string[]) => {
    try {
      const { data, error } = await supabase.functions.invoke('check-url-status', {
        body: { urls: urlsToCheck }
      });

      if (error) throw error;

      const newStatuses: Record<string, UrlStatus> = {};
      data.results.forEach((result: UrlStatus) => {
        newStatuses[result.url] = result;
      });
      
      setUrlStatuses(prev => ({ ...prev, ...newStatuses }));
      return data.results;
    } catch (error) {
      console.error('Error checking URLs:', error);
      toast.error('Errore nel controllo URL');
      return [];
    }
  }, []);

  // Check all URLs
  const checkAllUrls = useCallback(async () => {
    setIsChecking(true);
    setUrlStatuses({});
    
    const allUrls = siteUrls.flatMap(u => {
      const urls = [`https://junglerent.it${u.path}`];
      if (u.pathEN) urls.push(`https://junglerent.it${u.pathEN}`);
      return urls;
    });

    // Check in batches of 20
    for (let i = 0; i < allUrls.length; i += 20) {
      const batch = allUrls.slice(i, i + 20);
      setCheckingUrls(new Set(batch));
      await checkUrls(batch);
      // Small delay between batches
      if (i + 20 < allUrls.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    setCheckingUrls(new Set());
    setIsChecking(false);
    toast.success('Controllo completato!');
  }, [checkUrls]);

  // Check single URL
  const checkSingleUrl = useCallback(async (path: string) => {
    const fullUrl = `https://junglerent.it${path}`;
    setCheckingUrls(prev => new Set([...prev, fullUrl]));
    await checkUrls([fullUrl]);
    setCheckingUrls(prev => {
      const newSet = new Set(prev);
      newSet.delete(fullUrl);
      return newSet;
    });
  }, [checkUrls]);

  // Get status stats
  const statusStats = useMemo(() => {
    const statuses = Object.values(urlStatuses);
    return {
      checked: statuses.length,
      ok: statuses.filter(s => s.ok && !s.redirected).length,
      redirected: statuses.filter(s => s.redirected).length,
      errors: statuses.filter(s => !s.ok).length,
    };
  }, [urlStatuses]);

  // Get status for a path
  const getUrlStatus = (path: string) => {
    const fullUrl = `https://junglerent.it${path}`;
    return urlStatuses[fullUrl];
  };

  // Render status badge
  const renderStatusBadge = (path: string) => {
    const fullUrl = `https://junglerent.it${path}`;
    
    if (checkingUrls.has(fullUrl)) {
      return <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />;
    }
    
    const status = urlStatuses[fullUrl];
    if (!status) return null;

    if (status.error) {
      return (
        <Badge variant="destructive" className="text-xs">
          <XCircle className="w-3 h-3 mr-1" />
          Errore
        </Badge>
      );
    }

    if (status.redirected) {
      return (
        <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-300">
          <ArrowRight className="w-3 h-3 mr-1" />
          {status.status} Redirect
        </Badge>
      );
    }

    if (status.ok) {
      return (
        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
          <Check className="w-3 h-3 mr-1" />
          {status.status}
        </Badge>
      );
    }

    return (
      <Badge variant="destructive" className="text-xs">
        <XCircle className="w-3 h-3 mr-1" />
        {status.status}
      </Badge>
    );
  };

  return (
    <>
      <Helmet>
        <title>Sitemap Debug | Jungle Rent</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-20 pb-24">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4">
              <Globe className="w-3 h-3 mr-1" />
              Debug Tool
            </Badge>
            <h1 className="text-3xl font-bold mb-2">Sitemap Interattiva</h1>
            <p className="text-muted-foreground">
              Tutti gli URL del sito per debug e monitoraggio SEO
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            <Card>
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-primary">{stats.total}</div>
                <div className="text-xs text-muted-foreground">URL Totali</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.withHreflang}</div>
                <div className="text-xs text-muted-foreground">Con Hreflang</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.highPriority}</div>
                <div className="text-xs text-muted-foreground">Alta Priorità</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.tools}</div>
                <div className="text-xs text-muted-foreground">Strumenti</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{stats.blog}</div>
                <div className="text-xs text-muted-foreground">Blog Posts</div>
              </CardContent>
            </Card>
          </div>

          {/* HTTP Status Test Card */}
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
                  Test HTTP Status
                </span>
                <Button 
                  onClick={checkAllUrls} 
                  disabled={isChecking}
                  size="sm"
                >
                  {isChecking ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Controllo in corso...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Testa tutti gli URL
                    </>
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {statusStats.checked > 0 ? (
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                      <Check className="w-3 h-3 mr-1" />
                      {statusStats.ok} OK
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                      <ArrowRight className="w-3 h-3 mr-1" />
                      {statusStats.redirected} Redirect
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">
                      <XCircle className="w-3 h-3 mr-1" />
                      {statusStats.errors} Errori
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground ml-auto">
                    {statusStats.checked} URL controllati
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Clicca "Testa tutti gli URL" per verificare lo status HTTP di ogni pagina
                </p>
              )}
            </CardContent>
          </Card>

          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cerca URL o titolo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={copyAllUrls}>
              <Copy className="w-4 h-4 mr-2" />
              Copia tutti gli URL
            </Button>
            <Button variant="outline" asChild>
              <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                sitemap.xml
              </a>
            </Button>
          </div>

          {/* URL Groups */}
          <div className="space-y-4">
            {Object.entries(groupedUrls).map(([category, urls]) => {
              if (urls.length === 0) return null;
              const config = categoryConfig[category as keyof typeof categoryConfig];
              const Icon = config.icon;
              const isExpanded = expandedCategories.includes(category);

              return (
                <Collapsible 
                  key={category} 
                  open={isExpanded}
                  onOpenChange={() => toggleCategory(category)}
                >
                  <Card>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg ${config.color} flex items-center justify-center`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <span>{config.label}</span>
                            <Badge variant="secondary">{urls.length}</Badge>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          )}
                        </CardTitle>
                      </CardHeader>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="divide-y divide-border">
                          {urls.map((url) => (
                            <div 
                              key={url.path} 
                              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <Link 
                                    to={url.path}
                                    className="font-medium text-foreground hover:text-primary truncate"
                                  >
                                    {url.title}
                                  </Link>
                                  {url.hasHreflang && (
                                    <Badge variant="outline" className="text-xs shrink-0">
                                      <Globe className="w-3 h-3 mr-1" />
                                      i18n
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                                  <code className="bg-muted px-1.5 py-0.5 rounded">{url.path}</code>
                                  {url.pathEN && (
                                    <code className="bg-muted px-1.5 py-0.5 rounded">{url.pathEN}</code>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 shrink-0">
                                {renderStatusBadge(url.path)}
                                <Badge 
                                  variant={url.priority >= 0.8 ? 'default' : 'secondary'}
                                  className="text-xs"
                                >
                                  {url.priority.toFixed(1)}
                                </Badge>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => checkSingleUrl(url.path)}
                                  disabled={checkingUrls.has(`https://junglerent.it${url.path}`)}
                                  title="Testa URL"
                                >
                                  <RefreshCw className={`w-4 h-4 ${checkingUrls.has(`https://junglerent.it${url.path}`) ? 'animate-spin' : ''}`} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => copyUrl(url.path)}
                                >
                                  {copiedUrl === url.path ? (
                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </Button>
                                <Button variant="ghost" size="sm" asChild>
                                  <a 
                                    href={`https://junglerent.it${url.path}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              );
            })}
          </div>

          {/* Quick Links */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Link Rapidi GSC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">
                    Google Search Console
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="/robots.txt" target="_blank" rel="noopener noreferrer">
                    robots.txt
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="/llms.txt" target="_blank" rel="noopener noreferrer">
                    llms.txt
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="/sitemap-blog.xml" target="_blank" rel="noopener noreferrer">
                    sitemap-blog.xml
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="/sitemap-tools.xml" target="_blank" rel="noopener noreferrer">
                    sitemap-tools.xml
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default SitemapDebug;
