import { Share2, Link2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface ShareButtonProps {
  title: string;
  excerpt: string;
  url: string;
}

export const ShareButton = ({ title, excerpt, url }: ShareButtonProps) => {
  const { t } = useTranslation();

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success(t('blog.linkCopied'));
    } catch (error) {
      console.error('Failed to copy link:', error);
      toast.error('Failed to copy link');
    }
  };

  const handleWhatsAppShare = () => {
    const text = `${title}\n\n${excerpt}\n\n${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    }
  };

  const hasNativeShare = typeof navigator !== 'undefined' && navigator.share;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="w-4 h-4 mr-2" />
          {t('blog.share')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="end">
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            className="justify-start w-full"
            onClick={handleWhatsAppShare}
          >
            <MessageCircle className="w-4 h-4 mr-2 text-green-600" />
            {t('blog.shareWhatsApp')}
          </Button>
          
          <Button
            variant="ghost"
            className="justify-start w-full"
            onClick={handleCopyLink}
          >
            <Link2 className="w-4 h-4 mr-2" />
            {t('blog.copyLink')}
          </Button>

          {hasNativeShare && (
            <Button
              variant="ghost"
              className="justify-start w-full"
              onClick={handleNativeShare}
            >
              <Share2 className="w-4 h-4 mr-2" />
              {t('blog.shareNative')}
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
