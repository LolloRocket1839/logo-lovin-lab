import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Building2, Euro, Calendar, Users, Loader2, ArrowRight, AlertCircle } from "lucide-react";

const waitlistSchema = z.object({
  name: z.string().trim().min(2, "Inserisci il tuo nome").max(100),
  email: z.string().email("Inserisci un'email valida").max(255),
  university: z.string().min(1, "Seleziona la tua università"),
  budget: z.string().min(1, "Seleziona il tuo budget"),
  move_date: z.string().min(1, "Seleziona quando vuoi trasferirti"),
  referral_source: z.string().min(1, "Dicci come ci hai conosciuto"),
  privacy_consent: z.boolean().refine((val) => val === true, {
    message: "Devi accettare per continuare",
  }),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WaitlistDialog = ({ open, onOpenChange }: WaitlistDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: "",
      email: "",
      university: "",
      budget: "",
      move_date: "",
      referral_source: "",
      privacy_consent: false,
    },
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xeojbzow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          university: data.university,
          budget: data.budget,
          move_date: data.move_date,
          referral_source: data.referral_source,
          privacy_consent: data.privacy_consent,
          user_type: "student",
          _subject: "New Jungle Rent Waitlist - React App 🚀",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      toast({
        title: "✅ Perfetto!",
        description: "Sei nella waitlist! Controlla la tua email per la conferma.",
        className: "bg-gradient-to-r from-primary/20 to-emerald-500/20 border-2 border-primary/50 backdrop-blur-xl",
      });

      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "❌ Errore",
        description: "Qualcosa è andato storto. Riprova tra poco.",
        variant: "destructive",
        className: "backdrop-blur-xl border-2",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] 
                               backdrop-blur-2xl bg-black/90 
                               border-2 border-white/20 
                               shadow-[0_24px_96px_rgba(0,0,0,0.4),0_8px_32px_rgba(139,195,74,0.15)]
                               text-foreground 
                               max-h-[90vh] overflow-hidden
                               rounded-3xl
                               animate-in fade-in-0 zoom-in-95 duration-500">
        <DialogHeader className="pb-6 border-b border-white/10">
          <DialogTitle className="text-3xl font-display font-bold tracking-tight 
                                  bg-gradient-to-r from-foreground via-primary to-foreground 
                                  bg-clip-text text-transparent">
            🎯 Iscriviti alla Waitlist Jungle Rent
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground font-light pt-3 leading-relaxed">
            Compila il form in <span className="text-primary font-medium">meno di 1 minuto</span>. 
            Riceverai <span className="font-medium text-foreground">accesso prioritario</span> alle stanze disponibili!
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-180px)] px-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="animate-in slide-in-from-left-4 duration-500">
                      <FormLabel className="text-sm font-medium">Nome Completo *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Mario Rossi" 
                          {...field}
                          className="bg-white/5 border-white/20 
                                     focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                                     hover:bg-white/8 hover:border-white/30
                                     transition-all duration-300
                                     h-12 px-4
                                     text-foreground placeholder:text-muted-foreground/60"
                        />
                      </FormControl>
                      {form.formState.errors.name && (
                        <div className="flex items-start gap-2 text-sm text-red-400 
                                        bg-red-500/10 border border-red-500/20 
                                        rounded-lg px-3 py-2 mt-2
                                        animate-in slide-in-from-top-1 duration-300">
                          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <FormMessage />
                        </div>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="animate-in slide-in-from-left-4 duration-500" style={{ animationDelay: "50ms" }}>
                      <FormLabel className="text-sm font-medium">Email *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="mario.rossi@email.com" 
                          {...field}
                          className="bg-white/5 border-white/20 
                                     focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                                     hover:bg-white/8 hover:border-white/30
                                     transition-all duration-300
                                     h-12 px-4
                                     text-foreground placeholder:text-muted-foreground/60"
                        />
                      </FormControl>
                      {form.formState.errors.email && (
                        <div className="flex items-start gap-2 text-sm text-red-400 
                                        bg-red-500/10 border border-red-500/20 
                                        rounded-lg px-3 py-2 mt-2
                                        animate-in slide-in-from-top-1 duration-300">
                          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <FormMessage />
                        </div>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="university"
                  render={({ field }) => (
                    <FormItem className="animate-in slide-in-from-left-4 duration-500" style={{ animationDelay: "100ms" }}>
                      <FormLabel className="text-sm font-medium">Università *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-white/20 
                                                    focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                                                    hover:bg-white/8 hover:border-white/30
                                                    transition-all duration-300
                                                    h-12">
                            <div className="flex items-center gap-3">
                              <Building2 className="w-4 h-4 text-primary/70" />
                              <SelectValue placeholder="Seleziona università" />
                            </div>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="polito">Politecnico di Torino</SelectItem>
                          <SelectItem value="unito">Università di Torino</SelectItem>
                          <SelectItem value="escp">ESCP Business School</SelectItem>
                          <SelectItem value="ied">IED Torino</SelectItem>
                          <SelectItem value="iaad">IAAD</SelectItem>
                          <SelectItem value="iusto">IUSTO</SelectItem>
                          <SelectItem value="other">Altro</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.university && (
                        <div className="flex items-start gap-2 text-sm text-red-400 
                                        bg-red-500/10 border border-red-500/20 
                                        rounded-lg px-3 py-2 mt-2
                                        animate-in slide-in-from-top-1 duration-300">
                          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <FormMessage />
                        </div>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem className="animate-in slide-in-from-left-4 duration-500" style={{ animationDelay: "150ms" }}>
                      <FormLabel className="text-sm font-medium">Budget Mensile *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-white/20 
                                                    focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                                                    hover:bg-white/8 hover:border-white/30
                                                    transition-all duration-300
                                                    h-12">
                            <div className="flex items-center gap-3">
                              <Euro className="w-4 h-4 text-primary/70" />
                              <SelectValue placeholder="Seleziona budget" />
                            </div>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="300-400">€300-400</SelectItem>
                          <SelectItem value="400-500">€400-500</SelectItem>
                          <SelectItem value="500-600">€500-600</SelectItem>
                          <SelectItem value="over-600">&gt;€600</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.budget && (
                        <div className="flex items-start gap-2 text-sm text-red-400 
                                        bg-red-500/10 border border-red-500/20 
                                        rounded-lg px-3 py-2 mt-2
                                        animate-in slide-in-from-top-1 duration-300">
                          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <FormMessage />
                        </div>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="move_date"
                  render={({ field }) => (
                    <FormItem className="animate-in slide-in-from-left-4 duration-500" style={{ animationDelay: "200ms" }}>
                      <FormLabel className="text-sm font-medium">Data Trasloco Preferita *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-white/20 
                                                    focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                                                    hover:bg-white/8 hover:border-white/30
                                                    transition-all duration-300
                                                    h-12">
                            <div className="flex items-center gap-3">
                              <Calendar className="w-4 h-4 text-primary/70" />
                              <SelectValue placeholder="Quando ti trasferisci?" />
                            </div>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="september-2025">Settembre 2025</SelectItem>
                          <SelectItem value="january-2026">Gennaio 2026</SelectItem>
                          <SelectItem value="asap">ASAP</SelectItem>
                          <SelectItem value="other">Altro</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.move_date && (
                        <div className="flex items-start gap-2 text-sm text-red-400 
                                        bg-red-500/10 border border-red-500/20 
                                        rounded-lg px-3 py-2 mt-2
                                        animate-in slide-in-from-top-1 duration-300">
                          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <FormMessage />
                        </div>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="referral_source"
                  render={({ field }) => (
                    <FormItem className="animate-in slide-in-from-left-4 duration-500" style={{ animationDelay: "250ms" }}>
                      <FormLabel className="text-sm font-medium">Come Ci Hai Conosciuto? *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-white/20 
                                                    focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                                                    hover:bg-white/8 hover:border-white/30
                                                    transition-all duration-300
                                                    h-12">
                            <div className="flex items-center gap-3">
                              <Users className="w-4 h-4 text-primary/70" />
                              <SelectValue placeholder="Seleziona fonte" />
                            </div>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="friend">Amico</SelectItem>
                          <SelectItem value="university">Università</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="google">Google</SelectItem>
                          <SelectItem value="ai-assistant">AI assistant</SelectItem>
                          <SelectItem value="other">Altro</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.referral_source && (
                        <div className="flex items-start gap-2 text-sm text-red-400 
                                        bg-red-500/10 border border-red-500/20 
                                        rounded-lg px-3 py-2 mt-2
                                        animate-in slide-in-from-top-1 duration-300">
                          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <FormMessage />
                        </div>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="privacy_consent"
                render={({ field }) => (
                  <FormItem className="animate-in slide-in-from-left-4 duration-500" style={{ animationDelay: "300ms" }}>
                    <div className="flex items-start gap-4 p-5 rounded-xl 
                                    bg-white/5 border border-white/10
                                    hover:bg-white/8 hover:border-white/20
                                    transition-all duration-300">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5 border-white/30 data-[state=checked]:bg-primary 
                                     data-[state=checked]:border-primary"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none flex-1">
                        <FormLabel className="text-sm font-light leading-relaxed cursor-pointer 
                                              text-muted-foreground hover:text-foreground 
                                              transition-colors">
                          Acconsento a ricevere aggiornamenti sulle <span className="text-primary font-medium">offerte esclusive</span> di Jungle Rent *
                        </FormLabel>
                        {form.formState.errors.privacy_consent && (
                          <div className="flex items-start gap-2 text-sm text-red-400 
                                          bg-red-500/10 border border-red-500/20 
                                          rounded-lg px-3 py-2 mt-2
                                          animate-in slide-in-from-top-1 duration-300">
                            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <FormMessage />
                          </div>
                        )}
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-bold
                           bg-gradient-to-r from-primary via-emerald-600 to-primary
                           hover:from-emerald-600 hover:via-primary hover:to-emerald-600
                           text-primary-foreground
                           shadow-[0_8px_32px_rgba(139,195,74,0.3)]
                           hover:shadow-[0_12px_48px_rgba(139,195,74,0.5)]
                           hover:scale-[1.02]
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                           transition-all duration-500
                           group relative overflow-hidden
                           animate-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: "350ms" }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full 
                                bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                transition-transform duration-1000" />
                
                <span className="relative flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Invio in corso...
                    </>
                  ) : (
                    <>
                      Iscriviti alla Waitlist
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
