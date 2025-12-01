import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const MiniInvestorForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidEmail(email)) {
      toast.error(i18n.language.startsWith('en') ? "Please enter a valid email" : "Inserisci un'email valida");
      return;
    }

    setIsLoading(true);
    
    try {
      // Store minimal lead data
      const { error } = await supabase.from("investor_interest").insert([{
        full_name: "Quick Lead",
        email: email.toLowerCase().trim(),
        phone: "+39 000 000 0000",
        country: "italy",
        investor_type: "individual",
        investment_amount_range: "5000-10000",
        investment_timeline: "exploratory",
        accredited_investor: "unsure",
        areas_of_interest: ["equity"],
        consents_to_data_processing: true,
        consents_to_fadp: true,
        consents_to_contact: true,
        understands_no_commitment: true,
      }]);
      
      if (error) throw error;

      // Save email for pre-filling the full form
      localStorage.setItem('junglerent_prefill_email', email.toLowerCase().trim());
      
      toast.success(i18n.language.startsWith('en') ? "Thank you! We'll be in touch." : "Grazie! Ti contatteremo presto.");
      
      // Redirect to full form to complete profile
      navigate('/invest');
    } catch (error) {
      console.error("Error submitting mini form:", error);
      toast.error(i18n.language.startsWith('en') ? "Something went wrong. Try again." : "Qualcosa è andato storto. Riprova.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="email"
          placeholder={i18n.language.startsWith('en') ? "Your email" : "La tua email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 h-12 text-base bg-background/80 backdrop-blur-sm"
          required
        />
      </div>
      <Button 
        type="submit" 
        variant="premium"
        disabled={isLoading || !email}
        className="h-12 px-6 text-base font-semibold group"
      >
        {isLoading ? (
          <span className="animate-pulse">...</span>
        ) : (
          <>
            {i18n.language.startsWith('en') ? "Get Started" : "Inizia"}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </Button>
    </motion.form>
  );
};
