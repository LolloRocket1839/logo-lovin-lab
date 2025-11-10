import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Building2, Loader2 } from "lucide-react";

const getSellerSchema = (t: any) => z.object({
  name: z.string().trim().min(2, t('sellerContact.nameError')).max(100),
  email: z.string().email(t('sellerContact.emailErrorInvalid')).max(255),
  phone: z.string().trim().min(5, t('sellerContact.phoneError')).max(20),
  address: z.string().trim().min(5, t('sellerContact.addressError')).max(200),
  zone: z.string().optional(),
  squareMeters: z.string().optional(),
  rooms: z.string().optional(),
  floor: z.string().optional(),
  condition: z.string().optional(),
  motivation: z.string().optional(),
  urgent: z.boolean(),
  message: z.string().max(1000).optional(),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: t('sellerContact.privacyError'),
  }),
});

interface SellerContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SellerContactDialog = ({ open, onOpenChange }: SellerContactDialogProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  type SellerFormData = z.infer<ReturnType<typeof getSellerSchema>>;

  const form = useForm<SellerFormData>({
    resolver: zodResolver(getSellerSchema(t)),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      zone: "",
      squareMeters: "",
      rooms: "",
      floor: "",
      condition: "",
      motivation: "",
      urgent: false,
      message: "",
      privacyConsent: false,
    },
  });

  const onSubmit = async (data: SellerFormData) => {
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
          phone: data.phone,
          address: data.address,
          zone: data.zone || "",
          square_meters: data.squareMeters || "",
          rooms: data.rooms || "",
          floor: data.floor || "",
          condition: data.condition || "",
          motivation: data.motivation || "",
          urgent: data.urgent,
          message: data.message || "",
          user_type: "seller",
          _subject: "🏠 Nuova Richiesta Valutazione Immobile - Jungle Rent",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      toast({
        title: t('sellerContact.successTitle'),
        description: t('sellerContact.successDescription'),
      });
      
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: t('sellerContact.errorTitle'),
        description: t('sellerContact.errorDescription'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md md:max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto p-4 sm:p-5 md:p-6">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-6 h-6 text-primary" />
            <DialogTitle>{t('sellerContact.title')}</DialogTitle>
          </div>
          <DialogDescription>
            {t('sellerContact.description')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4 pb-4">
          <div className="space-y-2">
            <Label htmlFor="seller-name">{t('sellerContact.nameLabel')}</Label>
            <Input
              id="seller-name"
              {...form.register("name")}
              placeholder={t('sellerContact.namePlaceholder')}
              autoFocus
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="seller-email">{t('sellerContact.emailLabel')}</Label>
            <Input
              id="seller-email"
              type="email"
              {...form.register("email")}
              placeholder={t('sellerContact.emailPlaceholder')}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="seller-phone">{t('sellerContact.phoneLabel')}</Label>
            <Input
              id="seller-phone"
              type="tel"
              {...form.register("phone")}
              placeholder={t('sellerContact.phonePlaceholder')}
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="seller-address">{t('sellerContact.addressLabel')}</Label>
            <Input
              id="seller-address"
              {...form.register("address")}
              placeholder={t('sellerContact.addressPlaceholder')}
            />
            {form.formState.errors.address && (
              <p className="text-sm text-destructive">{form.formState.errors.address.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="seller-zone">{t('sellerContact.zoneLabel')}</Label>
            <Select {...form.register("zone")} onValueChange={(value) => form.setValue("zone", value)}>
              <SelectTrigger id="seller-zone">
                <SelectValue placeholder={t('sellerContact.zonePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="crocetta">{t('sellerContact.zones.crocetta')}</SelectItem>
                  <SelectItem value="san-salvario">{t('sellerContact.zones.san-salvario')}</SelectItem>
                  <SelectItem value="centro">{t('sellerContact.zones.centro')}</SelectItem>
                  <SelectItem value="vanchiglia">{t('sellerContact.zones.vanchiglia')}</SelectItem>
                  <SelectItem value="lingotto">{t('sellerContact.zones.lingotto')}</SelectItem>
                  <SelectItem value="santa-rita">{t('sellerContact.zones.santa-rita')}</SelectItem>
                  <SelectItem value="san-paolo">{t('sellerContact.zones.san-paolo')}</SelectItem>
                  <SelectItem value="altra">{t('sellerContact.zones.altra')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

          <div className="space-y-2">
            <Label htmlFor="seller-sqm">{t('sellerContact.squareMetersLabel')}</Label>
            <Input
              id="seller-sqm"
              type="number"
              {...form.register("squareMeters")}
              placeholder={t('sellerContact.squareMetersPlaceholder')}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="seller-rooms">{t('sellerContact.roomsLabel')}</Label>
            <Select {...form.register("rooms")} onValueChange={(value) => form.setValue("rooms", value)}>
              <SelectTrigger id="seller-rooms">
                <SelectValue placeholder={t('sellerContact.roomsPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">{t('sellerContact.rooms.2')}</SelectItem>
                  <SelectItem value="3">{t('sellerContact.rooms.3')}</SelectItem>
                  <SelectItem value="4">{t('sellerContact.rooms.4')}</SelectItem>
                  <SelectItem value="5+">{t('sellerContact.rooms.5+')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

          <div className="space-y-2">
            <Label htmlFor="seller-floor">{t('sellerContact.floorLabel')}</Label>
            <Select {...form.register("floor")} onValueChange={(value) => form.setValue("floor", value)}>
              <SelectTrigger id="seller-floor">
                <SelectValue placeholder={t('sellerContact.floorPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="terra">{t('sellerContact.floors.terra')}</SelectItem>
                  <SelectItem value="1">{t('sellerContact.floors.1')}</SelectItem>
                  <SelectItem value="2">{t('sellerContact.floors.2')}</SelectItem>
                  <SelectItem value="3">{t('sellerContact.floors.3')}</SelectItem>
                  <SelectItem value="4">{t('sellerContact.floors.4')}</SelectItem>
                  <SelectItem value="5">{t('sellerContact.floors.5')}</SelectItem>
                  <SelectItem value="6+">{t('sellerContact.floors.6+')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="seller-condition">{t('sellerContact.conditionLabel')}</Label>
            <Select {...form.register("condition")} onValueChange={(value) => form.setValue("condition", value)}>
              <SelectTrigger id="seller-condition">
                <SelectValue placeholder={t('sellerContact.conditionPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ottimo">{t('sellerContact.conditions.ottimo')}</SelectItem>
                  <SelectItem value="buono">{t('sellerContact.conditions.buono')}</SelectItem>
                  <SelectItem value="da-ristrutturare">{t('sellerContact.conditions.da-ristrutturare')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

          <div className="space-y-2">
            <Label htmlFor="seller-motivation">{t('sellerContact.motivationLabel')}</Label>
            <Select {...form.register("motivation")} onValueChange={(value) => form.setValue("motivation", value)}>
              <SelectTrigger id="seller-motivation">
                <SelectValue placeholder={t('sellerContact.motivationPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cambio-citta">{t('sellerContact.motivations.cambio-citta')}</SelectItem>
                  <SelectItem value="liquidita">{t('sellerContact.motivations.liquidita')}</SelectItem>
                  <SelectItem value="eredita">{t('sellerContact.motivations.eredita')}</SelectItem>
                  <SelectItem value="investimento">{t('sellerContact.motivations.investimento')}</SelectItem>
                  <SelectItem value="altro">{t('sellerContact.motivations.altro')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2 p-4 bg-accent/10 rounded-lg">
            <Checkbox 
              id="seller-urgent" 
              checked={form.watch("urgent")}
              onCheckedChange={(checked) => form.setValue("urgent", checked as boolean)}
            />
            <Label htmlFor="seller-urgent" className="cursor-pointer font-medium">
              {t('sellerContact.urgentLabel')}
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seller-message">{t('sellerContact.messageLabel')}</Label>
            <Textarea
              id="seller-message"
              {...form.register("message")}
              placeholder={t('sellerContact.messagePlaceholder')}
              rows={3}
            />
          </div>

          <div className="flex items-start space-x-2 p-4 bg-muted/50 rounded-lg border border-border">
            <Checkbox 
              id="seller-privacy" 
              checked={form.watch("privacyConsent")}
              onCheckedChange={(checked) => form.setValue("privacyConsent", checked as boolean)}
            />
            <Label htmlFor="seller-privacy" className="cursor-pointer text-sm leading-relaxed">
              {t('sellerContact.privacyLabel')}
              <a href="/privacy" target="_blank" className="text-primary underline ml-1">
                {t('sellerContact.privacyLink')}
              </a>
            </Label>
            {form.formState.errors.privacyConsent && (
              <p className="text-sm text-destructive">{form.formState.errors.privacyConsent.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('sellerContact.submitting')}
              </>
            ) : (
              t('sellerContact.submitButton')
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center pt-4 border-t border-border/50">
            {t('sellerContact.footerInfo')}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};