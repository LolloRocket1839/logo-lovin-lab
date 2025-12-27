import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { 
  Calculator, 
  Zap, 
  Mail as Postcard,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Calendar,
  Utensils,
  Building2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";

interface Tool {
  id: string;
  icon: React.ElementType;
  status: 'available' | 'coming-soon';
  path?: string;
}

const tools: Tool[] = [
  {
    id: 'budget',
    icon: Calculator,
    status: 'available',
    path: '/studenti/strumenti/budget'
  },
  {
    id: 'grades',
    icon: GraduationCap,
    status: 'available',
    path: '/studenti/strumenti/media'
  },
  {
    id: 'session',
    icon: Calendar,
    status: 'available',
    path: '/studenti/strumenti/sessione'
  },
  {
    id: 'studySpaces',
    icon: GraduationCap,
    status: 'available',
    path: '/strumenti/aule-studio-torino'
  },
  {
    id: 'cheapEats',
    icon: Utensils,
    status: 'available',
    path: '/strumenti/dove-mangiare-torino'
  },
  {
    id: 'studentServices',
    icon: Building2,
    status: 'available',
    path: '/strumenti/sportelli-studenti-torino'
  },
  {
    id: 'utilities',
    icon: Zap,
    status: 'coming-soon'
  },
  {
    id: 'postcards',
    icon: Postcard,
    status: 'coming-soon'
  }
];

const StudentTools = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('it') ? 'it' : 'en';

  const content = {
    it: {
      title: "Strumenti per Studenti",
      subtitle: "Risorse gratuite per aiutarti a vivere meglio a Torino",
      seoTitle: "Strumenti Utili per Studenti | Jungle Rent",
      seoDesc: "Calcolatore budget, media ponderata, comparatore bollette e altri strumenti gratuiti per studenti universitari a Torino.",
      tools: {
        budget: {
          title: "Calcolatore Budget Mensile",
          description: "Scopri quanto costa vivere in ogni quartiere di Torino. Calcola affitto, bollette, trasporti e spese."
        },
        grades: {
          title: "Calcolatore Media Ponderata",
          description: "Inserisci voti e CFU, calcola la media ponderata e simula il voto di laurea."
        },
        session: {
          title: "Organizzatore Sessione",
          description: "Pianifica la sessione d'esame con calendario, CFU e difficoltà. Ottimizza il tuo piano di studio."
        },
        studySpaces: {
          title: "Directory Aule Studio",
          description: "Trova le migliori aule studio a Torino: biblioteche, sale EDISU, caffetterie e coworking con orari e contatti."
        },
        cheapEats: {
          title: "Directory Dove Mangiare Cheap",
          description: "Trova ristoranti, pizzerie, kebab e mense economiche vicino alle università. Filtri per prezzo, cucina e zona."
        },
        studentServices: {
          title: "Sportelli e Servizi Studenti",
          description: "Guida completa a segreterie, uffici EDISU, borse di studio, DSA, Erasmus e tutti i servizi universitari."
        },
        utilities: {
          title: "Comparatore Bollette",
          description: "Confronta le tariffe di luce e gas per trovare l'offerta migliore per la tua casa."
        },
        postcards: {
          title: "Generatore Cartoline",
          description: "Crea cartoline personalizzate con i monumenti di Torino da condividere con amici e famiglia."
        }
      },
      available: "Disponibile",
      comingSoon: "Prossimamente",
      tryNow: "Prova ora",
      backToStudents: "Torna alla pagina studenti"
    },
    en: {
      title: "Student Tools",
      subtitle: "Free resources to help you live better in Turin",
      seoTitle: "Useful Tools for Students | Jungle Rent",
      seoDesc: "Budget calculator, GPA calculator, utility comparator and other free tools for university students in Turin.",
      tools: {
        budget: {
          title: "Monthly Budget Calculator",
          description: "Find out how much it costs to live in each Turin neighborhood. Calculate rent, bills, transport and expenses."
        },
        grades: {
          title: "Weighted Average Calculator",
          description: "Enter grades and credits, calculate weighted GPA and simulate graduation grade."
        },
        session: {
          title: "Exam Session Planner",
          description: "Plan your exam session with calendar, credits and difficulty. Optimize your study plan."
        },
        studySpaces: {
          title: "Study Spaces Directory",
          description: "Find the best study spaces in Turin: libraries, EDISU rooms, cafes and coworking with hours and contacts."
        },
        cheapEats: {
          title: "Cheap Eats Directory",
          description: "Find affordable restaurants, pizzerias, kebabs and canteens near universities. Filter by price, cuisine and area."
        },
        studentServices: {
          title: "Student services directory",
          description: "Complete guide to registrars, EDISU offices, scholarships, disability services, Erasmus and all university services."
        },
        utilities: {
          title: "Utility Comparator",
          description: "Compare electricity and gas rates to find the best deal for your home."
        },
        postcards: {
          title: "Postcard Generator",
          description: "Create personalized postcards with Turin landmarks to share with friends and family."
        }
      },
      available: "Available",
      comingSoon: "Coming Soon",
      tryNow: "Try now",
      backToStudents: "Back to students page"
    }
  };

  const t = content[currentLang];

  return (
    <>
      {/* IMPORTANT: Dynamic canonical based on current language for IT/EN routes */}
      <Helmet>
        <title>{t.seoTitle}</title>
        <meta name="description" content={t.seoDesc} />
        <link rel="canonical" href={`https://junglerent.it/${currentLang === 'en' ? 'students/tools' : 'studenti/strumenti'}`} />
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/studenti/strumenti" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/students/tools" />
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/studenti/strumenti" />
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-20">
        {/* Header */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              <GraduationCap className="w-3 h-3 mr-1" />
              {currentLang === 'it' ? 'Per studenti' : 'For students'}
            </Badge>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.title}
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {tools.map((tool) => {
                const toolContent = t.tools[tool.id as keyof typeof t.tools];
                const isAvailable = tool.status === 'available';
                
                return (
                  <Card 
                    key={tool.id} 
                    className={`relative overflow-hidden transition-all duration-300 ${
                      isAvailable 
                        ? 'hover:shadow-lg hover:border-primary/30 cursor-pointer' 
                        : 'opacity-75'
                    }`}
                  >
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge 
                        variant={isAvailable ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {isAvailable ? (
                          <>
                            <Sparkles className="w-3 h-3 mr-1" />
                            {t.available}
                          </>
                        ) : (
                          t.comingSoon
                        )}
                      </Badge>
                    </div>
                    
                    <CardHeader className="pb-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                        <tool.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{toolContent.title}</CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <CardDescription className="text-base mb-4">
                        {toolContent.description}
                      </CardDescription>
                      
                      {isAvailable && tool.path ? (
                        <Link to={tool.path}>
                          <Button className="w-full group">
                            {t.tryNow}
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      ) : (
                        <Button disabled className="w-full">
                          {t.comingSoon}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Back link */}
            <div className="text-center mt-12">
              <Link to="/studenti">
                <Button variant="outline">
                  {t.backToStudents}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
};

export default StudentTools;