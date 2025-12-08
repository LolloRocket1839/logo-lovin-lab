import { useNavigate } from "react-router-dom";
import { CheckCircle2, Home, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/jungle-rent-logo-new.svg";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div 
        className="fixed inset-0"
        style={{
          background: `linear-gradient(135deg, 
            hsl(var(--primary)) 0%, 
            hsl(var(--accent)) 100%)`
        }}
      />

      {/* Static decorative shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          <div className="backdrop-blur-md p-8 md:p-12 rounded-2xl border border-border/50 shadow-2xl" style={{ backgroundColor: 'hsl(45, 65%, 92%)' }}>
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <img src={logo} alt="Jungle Rent" className="h-12 w-auto" />
              <h1 className="text-2xl font-bold text-foreground tracking-gotham">Jungle Rent</h1>
            </div>

            {/* Success Icon */}
            <div className="flex justify-center mb-8">
              <CheckCircle2 className="w-24 h-24 text-primary/70" strokeWidth={2} />
            </div>

            {/* Success Message */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary/70 mb-4 tracking-tighter">
                Thank You for Your Interest!
              </h2>
              <p className="text-lg mb-6 font-medium" style={{ color: 'hsl(92, 49%, 14%, 0.7)' }}>
                We've received your investment interest form and appreciate you taking the time to share your information with us.
              </p>
            </div>

            {/* Next Steps */}
            <div className="bg-muted/50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 tracking-gotham">What Happens Next?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-accent font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 tracking-gotham">Review</h4>
                    <p className="text-sm text-muted-foreground font-medium">
                      Our team will carefully review your information and investment preferences.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-accent font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 tracking-gotham">Initial Contact</h4>
                    <p className="text-sm text-muted-foreground font-medium">
                      We'll reach out within 3-5 business days to discuss potential opportunities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-accent font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 tracking-gotham">Due Diligence</h4>
                    <p className="text-sm text-muted-foreground font-medium">
                      We'll provide detailed information about Jungle Rent and answer all your questions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bonus Resource */}
            <div className="bg-primary/10 rounded-xl p-6 mb-8 border border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2 tracking-gotham">Your Free Resource</h3>
                  <p className="text-sm text-muted-foreground mb-4 font-medium">
                    Download our exclusive report on Turin's university real estate market: 23 pages of data, analysis, and investment opportunities.
                  </p>
                  <Button 
                    onClick={() => window.open('/resources/mercato-immobiliare-universitario-torino.pdf', '_blank')}
                    variant="premium"
                    size="sm"
                    className="group"
                  >
                    <Download className="mr-2 w-4 h-4" />
                    Download Report PDF
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="text-center mb-8">
              <p className="text-muted-foreground mb-2 font-medium">
                Questions in the meantime?
              </p>
              <a 
                href="mailto:investments@junglerent.com" 
                className="text-primary/70 hover:text-primary/90 hover:underline font-semibold transition-colors tracking-gotham"
              >
                investments@junglerent.com
              </a>
            </div>

            {/* Back Button */}
            <div className="flex justify-center">
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
