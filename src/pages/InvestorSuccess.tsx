import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/jungle-rent-logo.svg";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div 
        className="fixed inset-0"
        style={{
          background: `linear-gradient(135deg, 
            hsl(var(--primary)) 0%, 
            hsl(var(--accent)) 100%)`
        }}
      />

      {/* Floating shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <div className="backdrop-blur-md p-8 md:p-12 rounded-2xl border border-border/50 shadow-2xl" style={{ backgroundColor: 'hsl(45, 65%, 92%)' }}>
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <img src={logo} alt="Jungle Rent" className="h-12 w-auto" />
              <h1 className="text-2xl font-bold text-foreground tracking-gotham">Jungle Rent</h1>
            </div>

            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-8"
            >
              <CheckCircle2 className="w-24 h-24 text-primary/70" strokeWidth={2} />
            </motion.div>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary/70 mb-4 tracking-tighter">
                Thank You for Your Interest!
              </h2>
              <p className="text-lg mb-6 font-medium" style={{ color: 'hsl(92, 49%, 14%, 0.7)' }}>
                We've received your investment interest form and appreciate you taking the time to share your information with us.
              </p>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-muted/50 rounded-xl p-6 mb-8"
            >
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
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mb-8"
            >
              <p className="text-muted-foreground mb-2 font-medium">
                Questions in the meantime?
              </p>
              <a 
                href="mailto:investments@junglerent.com" 
                className="text-primary/70 hover:text-primary/90 hover:underline font-semibold transition-colors tracking-gotham"
              >
                investments@junglerent.com
              </a>
            </motion.div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center"
            >
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Success;
