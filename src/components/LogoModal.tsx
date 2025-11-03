import { useTranslation } from "react-i18next";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";

interface LogoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LogoModal = ({ open, onOpenChange }: LogoModalProps) => {
  const { t } = useTranslation();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-0 bg-transparent">
        <div className="relative bg-white rounded-lg p-8 md:p-12">
          {/* Logo */}
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="relative">
              <img
                src={jungleRentLogo}
                alt={t('logoModal.logoAlt')}
                className="w-64 h-64 md:w-80 md:h-80 object-contain"
              />
            </div>

            {/* Brand info */}
            <div className="text-center space-y-2">
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
