 import React, { useEffect, useRef, useState } from 'react';
 import L from 'leaflet';
 import 'leaflet/dist/leaflet.css';
 import { InvestorZone, investorZones } from '@/data/investorZoneData';
 import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Filter, X } from 'lucide-react';
 import { useNavigate } from 'react-router-dom';
 
type ZoneType = 'Centro' | 'Semicentro' | 'Periferia';

interface MapFilters {
  types: ZoneType[];
  renewalOnly: boolean;
}

 interface InvestorZonesMapProps {
   zones?: InvestorZone[];
   lang: 'it' | 'en';
   onZoneClick?: (zone: InvestorZone) => void;
   selectedZoneIds?: string[];
 }
 
 type DemandKey = 'very_high' | 'high' | 'medium' | 'low';

 // Demand color scale (replaces previous yield-based scale)
 const DEMAND_COLOR: Record<DemandKey, string> = {
   very_high: '#16a34a',
   high: '#22c55e',
   medium: '#eab308',
   low: '#f97316',
 };

 const getDemandColor = (demand: string): string =>
   DEMAND_COLOR[(demand as DemandKey)] || '#f97316';
 
 const getDemandLabel = (demand: string, lang: 'it' | 'en'): string => {
   const labels: Record<string, { it: string; en: string }> = {
     very_high: { it: 'Molto alta', en: 'Very high' },
     high: { it: 'Alta', en: 'High' },
     medium: { it: 'Media', en: 'Medium' },
     low: { it: 'Bassa', en: 'Low' }
   };
   return labels[demand]?.[lang] || demand;
 };
 
const createZoneIcon = (zone: InvestorZone, isSelected: boolean, selectionIndex: number): L.DivIcon => {
   const color = getDemandColor(zone.demand);
   const size = isSelected ? 44 : 36;
   const hasRenewal = zone.urbanRenewal.active;
  const selectionBadge = isSelected && selectionIndex >= 0 
    ? `<span style="position:absolute;top:-8px;left:-8px;font-size:10px;background:hsl(var(--primary));color:white;border-radius:50%;width:18px;height:18px;display:flex;align-items:center;justify-content:center;font-weight:700;box-shadow:0 1px 3px rgba(0,0,0,0.3);border:2px solid white;">${selectionIndex + 1}</span>`
    : '';
   
   return L.divIcon({
     className: 'investor-zone-marker',
     html: `
       <div style="
         width: ${size}px;
         height: ${size}px;
         border-radius: 50%;
         background: ${color};
        border: 3px solid ${isSelected ? 'hsl(var(--primary))' : 'white'};
         box-shadow: 0 2px 8px rgba(0,0,0,0.3);
         display: flex;
         align-items: center;
         justify-content: center;
         font-size: 11px;
         font-weight: 700;
         color: white;
         position: relative;
         cursor: pointer;
         transition: transform 0.2s ease;
         ${isSelected ? 'transform: scale(1.15); z-index: 1000 !important;' : ''}
       ">
         ${yieldValue}%
         ${hasRenewal ? '<span style="position:absolute;top:-6px;right:-6px;font-size:10px;background:white;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 3px rgba(0,0,0,0.2);">🏗️</span>' : ''}
        ${selectionBadge}
       </div>
     `,
     iconSize: [size, size],
     iconAnchor: [size / 2, size / 2],
     popupAnchor: [0, -size / 2]
   });
 };
 
 const texts = {
   it: {
     mapTitle: 'Mappa rendimenti',
     legend: 'Rendimento',
     excellent: 'Eccellente (≥6.5%)',
     high: 'Alto (5.5-6.5%)',
     medium: 'Medio (5-5.5%)',
     low: 'Basso (<5%)',
     viewDetails: 'Vedi dettagli',
     grossYield: 'Lordo',
     netYield: 'Netto',
     renewal: 'Riqualificazione',
     zones: 'quartieri',
     priceAvg: 'Prezzo medio',
     demand: 'Domanda',
     vacancy: 'Sfitto',
     trend: 'Trend 2024'
   },
   en: {
     mapTitle: 'Yield map',
     legend: 'Yield',
     excellent: 'Excellent (≥6.5%)',
     high: 'High (5.5-6.5%)',
     medium: 'Medium (5-5.5%)',
     low: 'Low (<5%)',
     viewDetails: 'View details',
     grossYield: 'Gross',
     netYield: 'Net',
     renewal: 'Urban renewal',
     zones: 'neighborhoods',
     priceAvg: 'Avg price',
     demand: 'Demand',
     vacancy: 'Vacancy',
     trend: '2024 trend'
   }
 };

const filterTexts = {
  it: {
    filters: 'Filtri',
    allTypes: 'Tipo zona',
    center: 'Centro',
    semicenter: 'Semicentro',
    periphery: 'Periferia',
    renewalOnly: 'Solo riqualificazione',
    clearFilters: 'Reset'
  },
  en: {
    filters: 'Filters',
    allTypes: 'Zone type',
    center: 'Center',
    semicenter: 'Semi-center',
    periphery: 'Periphery',
    renewalOnly: 'Renewal only',
    clearFilters: 'Clear'
  }
};
 
 const InvestorZonesMap: React.FC<InvestorZonesMapProps> = ({ 
   zones = investorZones, 
   lang, 
   onZoneClick,
  selectedZoneIds = [],
   showYieldMode = 'gross'
 }) => {
   const mapContainerRef = useRef<HTMLDivElement>(null);
   const mapRef = useRef<L.Map | null>(null);
   const markersRef = useRef<L.Marker[]>([]);
   const [yieldMode, setYieldMode] = useState<'gross' | 'net'>(showYieldMode);
  const [filters, setFilters] = useState<MapFilters>({
    types: ['Centro', 'Semicentro', 'Periferia'],
    renewalOnly: false
  });
   const navigate = useNavigate();
   
   const t = texts[lang];
  const ft = filterTexts[lang];
   const zonesPath = lang === 'it' ? '/investitori/zone' : '/investors/zones';

  // Filter zones based on current filters
  const filteredZones = React.useMemo(() => {
    return zones.filter(zone => {
      const matchesType = filters.types.includes(zone.zone as ZoneType);
      const matchesRenewal = !filters.renewalOnly || zone.urbanRenewal.active;
      return matchesType && matchesRenewal;
    });
  }, [zones, filters]);

  const activeFilterCount = (3 - filters.types.length) + (filters.renewalOnly ? 1 : 0);

  const toggleType = (type: ZoneType) => {
    setFilters(prev => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type]
    }));
  };

  const clearFilters = () => {
    setFilters({
      types: ['Centro', 'Semicentro', 'Periferia'],
      renewalOnly: false
    });
  };
 
   // Initialize map
   useEffect(() => {
     if (!mapContainerRef.current || mapRef.current) return;
 
     mapRef.current = L.map(mapContainerRef.current).setView([45.0650, 7.6800], 12);
 
     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attribution: '© OpenStreetMap'
     }).addTo(mapRef.current);
 
     return () => {
       mapRef.current?.remove();
       mapRef.current = null;
     };
   }, []);
 
   // Update zone markers
   useEffect(() => {
     if (!mapRef.current) return;
 
     // Clear existing markers
     markersRef.current.forEach(marker => marker.remove());
     markersRef.current = [];
 
     // Add new markers
    filteredZones.forEach(zone => {
       if (!mapRef.current) return;
 
      const isSelected = selectedZoneIds.includes(zone.id);
      const selectionIndex = selectedZoneIds.indexOf(zone.id);
       const yieldValue = yieldMode === 'gross' ? zone.grossYield : zone.netYield;
       
       const marker = L.marker(
         [zone.coordinates.lat, zone.coordinates.lng], 
        { icon: createZoneIcon(zone, isSelected, selectionIndex, yieldMode) }
       ).addTo(mapRef.current);
 
       // Popup content
       const popupContent = `
         <div style="min-width: 220px; font-family: system-ui, sans-serif;">
           <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
             <h3 style="margin: 0; font-size: 15px; font-weight: 700;">${zone.name}</h3>
             <span style="
               background: hsl(var(--muted));
               color: hsl(var(--muted-foreground));
               padding: 2px 8px;
               border-radius: 4px;
               font-size: 10px;
               font-weight: 500;
             ">${zone.zone}</span>
           </div>
           
           <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
             <div style="background: hsl(var(--muted) / 0.5); padding: 6px 8px; border-radius: 6px;">
               <div style="font-size: 10px; color: #666; margin-bottom: 2px;">💰 ${t.priceAvg}</div>
               <div style="font-size: 13px; font-weight: 600;">€${zone.pricePerSqm.avg.toLocaleString()}/mq</div>
             </div>
             <div style="background: hsl(var(--muted) / 0.5); padding: 6px 8px; border-radius: 6px;">
               <div style="font-size: 10px; color: #666; margin-bottom: 2px;">📈 ${t.trend}</div>
               <div style="font-size: 13px; font-weight: 600; color: ${zone.variation2024 > 0 ? '#16a34a' : '#666'};">+${zone.variation2024}%</div>
             </div>
             <div style="background: hsl(var(--muted) / 0.5); padding: 6px 8px; border-radius: 6px;">
               <div style="font-size: 10px; color: #666; margin-bottom: 2px;">📊 ${yieldMode === 'gross' ? t.grossYield : t.netYield}</div>
               <div style="font-size: 13px; font-weight: 600; color: ${getYieldColor(yieldValue.max)};">${yieldValue.min}-${yieldValue.max}%</div>
             </div>
             <div style="background: hsl(var(--muted) / 0.5); padding: 6px 8px; border-radius: 6px;">
               <div style="font-size: 10px; color: #666; margin-bottom: 2px;">📍 ${t.demand}</div>
               <div style="font-size: 13px; font-weight: 600;">${getDemandLabel(zone.demand, lang)}</div>
             </div>
           </div>
           
           ${zone.urbanRenewal.active ? `
             <div style="background: #fef3c7; padding: 6px 8px; border-radius: 6px; margin-bottom: 12px;">
               <div style="font-size: 11px; color: #92400e;">
                 🏗️ ${zone.urbanRenewal.projects[0]?.name || t.renewal}
               </div>
             </div>
           ` : ''}
           
           <button 
             onclick="window.location.href='${zonesPath}/${zone.slug}'"
             style="
               width: 100%;
               padding: 8px 12px;
               background: hsl(var(--primary));
               color: white;
               border: none;
               border-radius: 6px;
               font-size: 12px;
               font-weight: 600;
               cursor: pointer;
             "
           >
             ${t.viewDetails} →
           </button>
         </div>
       `;
 
       marker.bindPopup(popupContent, { maxWidth: 280 });
       
       marker.on('click', () => {
         if (onZoneClick) {
           onZoneClick(zone);
         }
       });
 
       markersRef.current.push(marker);
     });
 
     // Fit bounds
    if (filteredZones.length > 0) {
      const bounds = L.latLngBounds(filteredZones.map(z => [z.coordinates.lat, z.coordinates.lng]));
       mapRef.current.fitBounds(bounds, { padding: [50, 50] });
     }
  }, [filteredZones, lang, selectedZoneIds, yieldMode, onZoneClick, navigate, zonesPath, t]);
 
   return (
     <div className="relative w-full h-[450px] md:h-[500px] rounded-lg overflow-hidden">
       <div ref={mapContainerRef} className="absolute inset-0" />
       
       {/* Yield mode toggle */}
      <div className="absolute top-4 right-4 z-[1000] flex items-center gap-2">
        {/* Filters dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs bg-background/95 backdrop-blur-sm shadow-lg gap-1"
            >
              <Filter className="w-3 h-3" />
              {ft.filters}
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="h-4 px-1 text-[10px] ml-1">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-xs">{ft.allTypes}</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={filters.types.includes('Centro')}
              onCheckedChange={() => toggleType('Centro')}
            >
              {ft.center}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.types.includes('Semicentro')}
              onCheckedChange={() => toggleType('Semicentro')}
            >
              {ft.semicenter}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.types.includes('Periferia')}
              onCheckedChange={() => toggleType('Periferia')}
            >
              {ft.periphery}
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={filters.renewalOnly}
              onCheckedChange={(checked) => setFilters(prev => ({ ...prev, renewalOnly: !!checked }))}
            >
              🏗️ {ft.renewalOnly}
            </DropdownMenuCheckboxItem>
            {activeFilterCount > 0 && (
              <>
                <DropdownMenuSeparator />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full h-7 text-xs justify-start gap-1 text-muted-foreground"
                  onClick={clearFilters}
                >
                  <X className="w-3 h-3" />
                  {ft.clearFilters}
                </Button>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Yield mode toggle */}
        <div className="flex gap-1 bg-background/95 backdrop-blur-sm rounded-lg p-1 shadow-lg">
         <Button
           variant={yieldMode === 'gross' ? 'default' : 'ghost'}
           size="sm"
           onClick={() => setYieldMode('gross')}
           className="h-7 text-xs"
         >
           {t.grossYield}
         </Button>
         <Button
           variant={yieldMode === 'net' ? 'default' : 'ghost'}
           size="sm"
           onClick={() => setYieldMode('net')}
           className="h-7 text-xs"
         >
           {t.netYield}
         </Button>
        </div>
       </div>
       
       {/* Legend */}
       <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg z-[1000] max-w-[180px]">
         <h4 className="text-xs font-semibold mb-2 text-foreground">
           {t.legend} ({yieldMode === 'gross' ? t.grossYield.toLowerCase() : t.netYield.toLowerCase()})
         </h4>
         <div className="space-y-1.5">
           <div className="flex items-center gap-2 text-xs">
             <div className="w-4 h-4 rounded-full border-2 border-white shadow-sm flex-shrink-0" style={{ backgroundColor: '#16a34a' }} />
             <span className="text-foreground/80">{t.excellent}</span>
           </div>
           <div className="flex items-center gap-2 text-xs">
             <div className="w-4 h-4 rounded-full border-2 border-white shadow-sm flex-shrink-0" style={{ backgroundColor: '#22c55e' }} />
             <span className="text-foreground/80">{t.high}</span>
           </div>
           <div className="flex items-center gap-2 text-xs">
             <div className="w-4 h-4 rounded-full border-2 border-white shadow-sm flex-shrink-0" style={{ backgroundColor: '#eab308' }} />
             <span className="text-foreground/80">{t.medium}</span>
           </div>
           <div className="flex items-center gap-2 text-xs">
             <div className="w-4 h-4 rounded-full border-2 border-white shadow-sm flex-shrink-0" style={{ backgroundColor: '#f97316' }} />
             <span className="text-foreground/80">{t.low}</span>
           </div>
         </div>
         <div className="mt-3 pt-2 border-t border-border/50">
           <div className="flex items-center gap-2 text-xs">
             <span className="text-sm">🏗️</span>
             <span className="text-foreground/80">{t.renewal}</span>
           </div>
         </div>
         <p className="text-[10px] text-muted-foreground mt-2">
          {filteredZones.length}/{zones.length} {t.zones}
         </p>
       </div>
     </div>
   );
 };
 
 export default InvestorZonesMap;