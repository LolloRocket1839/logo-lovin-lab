import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, Send, Loader2, CheckCircle, Calendar, Upload, X,
  Bed, Bath, UtensilsCrossed, Sofa, Sun, Package, ChevronLeft, ChevronRight, Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";
import { openCalendly } from "@/lib/calendly";
import { getUTMParams, formatUTMForEmail } from "@/hooks/useUTMTracking";
import { supabase } from "@/integrations/supabase/client";

interface PhotoCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  multiple: boolean;
  conditionalField?: 'has_terrace' | 'has_cellar';
}

interface UploadedPhoto {
  file: File;
  preview: string;
  category: string;
}

interface PropertyData {
  zone?: string;
  sqm?: number;
  condition?: string;
  estimatedValue?: number;
}

interface SellerLeadFormWithPhotosProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
  propertyData?: PropertyData;
}

const PHOTO_CATEGORIES: PhotoCategory[] = [
  { id: 'bedroom', label: 'Camere da letto', icon: <Bed className="w-4 h-4" />, multiple: true },
  { id: 'bathroom', label: 'Bagno/i', icon: <Bath className="w-4 h-4" />, multiple: true },
  { id: 'kitchen', label: 'Cucina', icon: <UtensilsCrossed className="w-4 h-4" />, multiple: true },
  { id: 'living', label: 'Soggiorno', icon: <Sofa className="w-4 h-4" />, multiple: true },
  { id: 'terrace', label: 'Terrazzi/Balconi', icon: <Sun className="w-4 h-4" />, multiple: true, conditionalField: 'has_terrace' },
  { id: 'cellar', label: 'Cantina', icon: <Package className="w-4 h-4" />, multiple: false, conditionalField: 'has_cellar' },
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];

export const SellerLeadFormWithPhotos = ({ 
  open, 
  onOpenChange,
  source = "property-valuator",
  propertyData
}: SellerLeadFormWithPhotosProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { trackClick } = useAnalytics();
  
  // Form state
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Step 1: Contact info
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  // Step 2: Property details
  const [numRooms, setNumRooms] = useState("");
  const [numBathrooms, setNumBathrooms] = useState("");
  const [hasTerrace, setHasTerrace] = useState(false);
  const [hasCellar, setHasCellar] = useState(false);
  
  // Step 3: Photos
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [uploadingCategory, setUploadingCategory] = useState<string | null>(null);

  const totalSteps = 3;

  const validateStep1 = (): boolean => {
    if (!email.trim()) {
      toast({
        title: "Email obbligatoria",
        description: "Inserisci un indirizzo email valido",
        variant: "destructive",
      });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast({
        title: "Email non valida",
        description: "Inserisci un indirizzo email valido",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && !validateStep1()) return;
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleFileSelect = useCallback((categoryId: string, files: FileList | null) => {
    if (!files || files.length === 0) return;

    const category = PHOTO_CATEGORIES.find(c => c.id === categoryId);
    if (!category) return;

    const validFiles: UploadedPhoto[] = [];

    Array.from(files).forEach(file => {
      // Validate file type
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        toast({
          title: "Formato non supportato",
          description: `${file.name}: usa JPG, PNG o WebP`,
          variant: "destructive",
        });
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File troppo grande",
          description: `${file.name}: max 10MB per foto`,
          variant: "destructive",
        });
        return;
      }

      validFiles.push({
        file,
        preview: URL.createObjectURL(file),
        category: categoryId,
      });
    });

    if (validFiles.length > 0) {
      setPhotos(prev => {
        // If single file category, replace existing
        if (!category.multiple) {
          const filtered = prev.filter(p => p.category !== categoryId);
          return [...filtered, validFiles[0]];
        }
        return [...prev, ...validFiles];
      });
    }
  }, [toast]);

  const removePhoto = (index: number) => {
    setPhotos(prev => {
      const photo = prev[index];
      if (photo) {
        URL.revokeObjectURL(photo.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const uploadPhotosToStorage = async (leadId: string): Promise<Array<{url: string; category: string; fileName: string}>> => {
    const uploadedPhotos: Array<{url: string; category: string; fileName: string}> = [];

    for (const photo of photos) {
      const fileExt = photo.file.name.split('.').pop();
      const fileName = `${leadId}/${photo.category}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('property-photos')
        .upload(fileName, photo.file);

      if (error) {
        console.error('Photo upload error:', error);
        continue;
      }

      if (data) {
        const { data: urlData } = supabase.storage
          .from('property-photos')
          .getPublicUrl(fileName);

        uploadedPhotos.push({
          url: urlData.publicUrl,
          category: photo.category,
          fileName: photo.file.name,
        });
      }
    }

    return uploadedPhotos;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    trackClick('seller_lead_with_photos_submit', { source, hasPhotos: photos.length > 0 });

    try {
      const utmParams = getUTMParams();
      
      // Generate a temporary lead ID for photo uploads
      const tempLeadId = `lead-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      
      // Upload photos first
      let uploadedPhotos: Array<{url: string; category: string; fileName: string}> = [];
      if (photos.length > 0) {
        uploadedPhotos = await uploadPhotosToStorage(tempLeadId);
      }

      // Insert lead into database
      const { error } = await supabase.from('seller_leads').insert([{
        email: email.trim(),
        phone: phone.trim() || null,
        property_address: address.trim() || null,
        property_zone: propertyData?.zone || null,
        property_sqm: propertyData?.sqm || null,
        property_condition: propertyData?.condition || null,
        has_cellar: hasCellar,
        has_terrace: hasTerrace,
        num_rooms: numRooms ? parseInt(numRooms) : null,
        num_bathrooms: numBathrooms ? parseInt(numBathrooms) : null,
        estimated_value: propertyData?.estimatedValue || null,
        photos: uploadedPhotos as unknown as null,
        source,
        utm_data: Object.keys(utmParams).length > 0 ? utmParams as unknown as null : null,
      }]);

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      toast({
        title: "Richiesta inviata!",
        description: "Ti contatteremo entro 48 ore",
      });
    } catch (error) {
      console.error("Seller lead submission error:", error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore. Riprova.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Cleanup photo previews
      photos.forEach(p => URL.revokeObjectURL(p.preview));
      // Reset form
      setStep(1);
      setIsSubmitted(false);
      setEmail("");
      setPhone("");
      setAddress("");
      setNumRooms("");
      setNumBathrooms("");
      setHasTerrace(false);
      setHasCellar(false);
      setPhotos([]);
    }
    onOpenChange(newOpen);
  };

  const handleCalendlyClick = () => {
    trackClick('seller_lead_calendly', { source });
    openCalendly();
    onOpenChange(false);
  };

  const getPhotosForCategory = (categoryId: string) => 
    photos.filter(p => p.category === categoryId);

  const visibleCategories = PHOTO_CATEGORIES.filter(cat => {
    if (cat.conditionalField === 'has_terrace') return hasTerrace;
    if (cat.conditionalField === 'has_cellar') return hasCellar;
    return true;
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-gradient-to-br from-background via-background to-primary/5 border-primary/20">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-6 space-y-6"
            >
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Richiesta inviata!
                </h3>
                <p className="text-muted-foreground mt-2">
                  Ti contatteremo entro 48 ore per la valutazione
                </p>
                {photos.length > 0 && (
                  <p className="text-sm text-primary mt-2">
                    📸 {photos.length} foto caricate correttamente
                  </p>
                )}
              </div>
              <div className="space-y-3">
                <Button
                  onClick={handleCalendlyClick}
                  className="w-full h-12 font-semibold"
                  variant="default"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Prenota una chiamata ora
                </Button>
                <Button
                  onClick={() => handleOpenChange(false)}
                  variant="ghost"
                  className="w-full"
                >
                  Chiudi
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <DialogTitle className="text-xl font-bold text-foreground">
                  {step === 1 && "I tuoi contatti"}
                  {step === 2 && "Dettagli immobile"}
                  {step === 3 && "Foto dell'immobile"}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {step === 1 && "Come possiamo ricontattarti?"}
                  {step === 2 && "Aggiungi informazioni sull'immobile"}
                  {step === 3 && "Opzionale: carica foto per velocizzare la valutazione"}
                </DialogDescription>
                
                {/* Progress indicator */}
                <div className="flex justify-center gap-2 mt-4">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        s === step ? 'bg-primary' : s < step ? 'bg-primary/50' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </DialogHeader>

              <div className="space-y-4 mt-6">
                {/* Step 1: Contact Info */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="seller-email" className="text-sm font-medium">
                        Email *
                      </Label>
                      <Input
                        id="seller-email"
                        type="email"
                        placeholder="tuo@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12"
                        autoFocus
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="seller-phone" className="text-sm font-medium">
                        Telefono (opzionale)
                      </Label>
                      <Input
                        id="seller-phone"
                        type="tel"
                        placeholder="+39 123 456 7890"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="seller-address" className="text-sm font-medium">
                        Indirizzo immobile (opzionale)
                      </Label>
                      <Input
                        id="seller-address"
                        type="text"
                        placeholder="Via Roma 1, Torino"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="h-12"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Property Details */}
                {step === 2 && (
                  <div className="space-y-4">
                    {propertyData && (
                      <div className="p-3 bg-muted/50 rounded-lg text-sm space-y-1">
                        <p className="font-medium text-foreground">Dati già inseriti:</p>
                        {propertyData.sqm && <p className="text-muted-foreground">📐 {propertyData.sqm} mq</p>}
                        {propertyData.zone && <p className="text-muted-foreground">📍 {propertyData.zone}</p>}
                        {propertyData.condition && <p className="text-muted-foreground">🏠 {propertyData.condition}</p>}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="num-rooms" className="text-sm font-medium">
                          Numero stanze
                        </Label>
                        <Input
                          id="num-rooms"
                          type="number"
                          min="1"
                          max="20"
                          placeholder="3"
                          value={numRooms}
                          onChange={(e) => setNumRooms(e.target.value)}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="num-bathrooms" className="text-sm font-medium">
                          Numero bagni
                        </Label>
                        <Input
                          id="num-bathrooms"
                          type="number"
                          min="1"
                          max="10"
                          placeholder="1"
                          value={numBathrooms}
                          onChange={(e) => setNumBathrooms(e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="has-terrace"
                          checked={hasTerrace}
                          onCheckedChange={(checked) => setHasTerrace(checked === true)}
                        />
                        <Label htmlFor="has-terrace" className="text-sm font-medium cursor-pointer flex items-center gap-2">
                          <Sun className="w-4 h-4 text-amber-500" />
                          Ha terrazzo/balcone
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="has-cellar"
                          checked={hasCellar}
                          onCheckedChange={(checked) => setHasCellar(checked === true)}
                        />
                        <Label htmlFor="has-cellar" className="text-sm font-medium cursor-pointer flex items-center gap-2">
                          <Package className="w-4 h-4 text-stone-500" />
                          Ha cantina
                        </Label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Photo Upload */}
                {step === 3 && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground text-center">
                      Carica foto stanza per stanza per una valutazione più precisa
                    </p>
                    
                    <div className="space-y-3">
                      {visibleCategories.map((category) => {
                        const categoryPhotos = getPhotosForCategory(category.id);
                        
                        return (
                          <div 
                            key={category.id}
                            className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-3 hover:border-primary/50 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <Label className="text-sm font-medium flex items-center gap-2">
                                {category.icon}
                                {category.label}
                                {categoryPhotos.length > 0 && (
                                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                    {categoryPhotos.length}
                                  </span>
                                )}
                              </Label>
                              <label className="cursor-pointer">
                                <input
                                  type="file"
                                  accept="image/*"
                                  multiple={category.multiple}
                                  className="hidden"
                                  onChange={(e) => handleFileSelect(category.id, e.target.files)}
                                />
                                <span className="text-xs bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors">
                                  <Camera className="w-3 h-3" />
                                  Aggiungi
                                </span>
                              </label>
                            </div>
                            
                            {categoryPhotos.length > 0 && (
                              <div className="grid grid-cols-4 gap-2 mt-2">
                                {categoryPhotos.map((photo, idx) => {
                                  const globalIdx = photos.findIndex(p => p === photo);
                                  return (
                                    <div key={idx} className="relative aspect-square">
                                      <img
                                        src={photo.preview}
                                        alt={`${category.label} ${idx + 1}`}
                                        className="w-full h-full object-cover rounded-md"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => removePhoto(globalIdx)}
                                        className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs hover:bg-destructive/80"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {photos.length > 0 && (
                      <p className="text-center text-sm text-primary font-medium">
                        📸 {photos.length} foto pronte per l'invio
                      </p>
                    )}
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="flex gap-3 pt-4">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevStep}
                      className="flex-1 h-12"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Indietro
                    </Button>
                  )}
                  
                  {step < totalSteps ? (
                    <Button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1 h-12"
                    >
                      Avanti
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      variant="premium"
                      className="flex-1 h-12 font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Invio in corso...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Invia richiesta
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {step === 3 && (
                  <p className="text-xs text-center text-muted-foreground">
                    Puoi anche saltare le foto e inviarle successivamente via email
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
