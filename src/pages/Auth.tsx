import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Navigation, Footer, MobileHeader, MobileFooter } from "@/components/layout";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function Auth() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("en") ? "en" : "it";
  const navigate = useNavigate();
  const { user } = useAuth();
  const ALLOWED_EMAIL = "lorenzo.onijoseph@gmail.com";
  const [isLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/contratti-locazione");
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (email.trim().toLowerCase() !== ALLOWED_EMAIL) {
        throw new Error(
          lang === "it"
            ? "Accesso riservato. Questo account non è autorizzato."
            : "Access restricted. This account is not authorized."
        );
      }
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success(lang === "it" ? "Accesso effettuato!" : "Signed in!");
      navigate("/contratti-locazione");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const t = {
    it: {
      loginTitle: "Accedi",
      signupTitle: "Registrati",
      loginDesc: "Accedi per salvare e riprendere le bozze dei tuoi contratti",
      signupDesc: "Crea un account per iniziare a creare contratti",
      email: "Email",
      password: "Password",
      name: "Nome completo",
      submit: isLogin ? "Accedi" : "Registrati",
      toggle: isLogin ? "Non hai un account? Registrati" : "Hai già un account? Accedi",
    },
    en: {
      loginTitle: "Sign In",
      signupTitle: "Sign Up",
      loginDesc: "Sign in to save and resume your contract drafts",
      signupDesc: "Create an account to start creating contracts",
      email: "Email",
      password: "Password",
      name: "Full name",
      submit: isLogin ? "Sign In" : "Sign Up",
      toggle: isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in",
    },
  };

  const labels = t[lang];

  return (
    <>
      <Navigation />
      <MobileHeader />
      <main className="min-h-screen bg-background flex items-center justify-center px-4 pt-24 pb-32">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>{isLogin ? labels.loginTitle : labels.signupTitle}</CardTitle>
            <CardDescription>{isLogin ? labels.loginDesc : labels.signupDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">{labels.name}</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">{labels.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{labels.password}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "..." : labels.submit}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
      <MobileFooter />
    </>
  );
}
