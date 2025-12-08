import logo from "@/assets/jungle-rent-logo-new.svg";

interface LanguageSelectionCardProps {
  onLanguageSelect: (languageCode: string) => void;
}

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
];

export const LanguageSelectionCard = ({ onLanguageSelect }: LanguageSelectionCardProps) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="backdrop-blur-md p-8 md:p-10 rounded-3xl border border-border/50 shadow-2xl bg-card">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <img src={logo} alt="Jungle Rent" className="h-20 w-auto drop-shadow-lg" />
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Jungle Rent</h1>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-foreground mb-2">
            Select Your Language
          </h2>
          <p className="text-muted-foreground text-sm font-light">
            Choose a language to continue
          </p>
        </div>

        {/* Language Grid */}
        <div className="grid grid-cols-2 gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageSelect(lang.code)}
              className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-accent/10 border border-border/30 hover:border-accent/50 transition-all duration-200 active:scale-[0.98]"
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className="font-normal text-foreground">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
