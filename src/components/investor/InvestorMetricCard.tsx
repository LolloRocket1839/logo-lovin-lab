import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface InvestorMetricCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  suffix?: string;
  delay?: number;
}

export const InvestorMetricCard = ({ 
  icon: Icon, 
  value, 
  label, 
  suffix = "", 
  delay = 0 
}: InvestorMetricCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Extract numeric value for animation
  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const prefix = value.match(/[^0-9]+/)?.[0] || "";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, numericValue]);

  return (
    <Card
      ref={cardRef}
      className="investor-card-premium p-8 md:p-10 lg:p-12 text-center group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-500">
        <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
      </div>
      <div className="investor-metric leading-tighter mb-3">
        {prefix}{isVisible ? count.toLocaleString('it-IT') : 0}{suffix}
      </div>
      <p className="text-sm md:text-base text-muted-foreground font-light tracking-wide">
        {label}
      </p>
    </Card>
  );
};
