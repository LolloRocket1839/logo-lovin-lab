 import React, { useEffect, useRef, useState } from 'react';
 import L from 'leaflet';
 import 'leaflet/dist/leaflet.css';
 import { InvestorZone, investorZones } from '@/data/investorZoneData';
 import { Button } from '@/components/ui/button';
 import { useNavigate } from 'react-router-dom';
 
 interface InvestorZonesMapProps {
   zones?: InvestorZone[];
   lang: 'it' | 'en';
   onZoneClick?: (zone: InvestorZone) => void;
   selectedZoneId?: string;
   showYieldMode?: 'gross' | 'net';
 }
 
 // Yield color scale
 const getYieldColor = (yieldMax: number): string => {
   if (yieldMax >= 6.5) return '#16a34a'; // green-600 - excellent
   if (yieldMax >= 5.5) return '#22c55e'; // green-500 - high
   if (yieldMax >= 5) return '#eab308';   // yellow-500 - medium
   return '#f97316';                       // orange-500 - low
 };
 
 const getYieldLabel = (yieldMax: number, lang: 'it' | 'en'): string => {
   if (yieldMax >= 6.5) return lang === 'it' ? 'Eccellente' : 'Excellent';
   if (yieldMax >= 5.5) return lang === 'it' ? 'Alto' : 'High';
   if (yieldMax >= 5) return lang === 'it' ? 'Medio' : 'Medium';
   return lang === 'it' ? 'Basso' : 'Low';
 };
 
 const getDemandLabel = (demand: string, lang: 'it' | 'en'): string => {
   const labels: Record<string, { it: string; en: string }> = {
     very_high: { it: 'Molto alta', en: 'Very high' },
     high: { it: 'Alta', en: 'High' },
     medium: { it: 'Media', en: 'Medium' },
     low: { it: 'Bassa', en: 'Low' }
   };
   return labels[demand]?.[lang] || demand;
 };
 
 const createZoneIcon = (zone: InvestorZone, isSelected: boolean, yieldMode: 'gross' | 'net'): L.DivIcon => {
   const yieldValue = yieldMode === 'gross' ? zone.grossYield.max : zone.netYield.max;
   const color = getYieldColor(yieldValue);
   const size = isSelected ? 44 : 36;
   const hasRenewal = zone.urbanRenewal.active;
   
   return L.divIcon({
     className: 'investor-zone-marker',
     html: `
       <div style="
         width: ${size}px;
         height: ${size}px;
         border-radius: 50%;
         background: ${color};
         border: 3px solid white;
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
 
 const InvestorZonesMap: React.FC<InvestorZonesMapProps> = ({ 
   zones = investorZones, 
   lang, 
   onZoneClick,
   selectedZoneId,
   showYieldMode = 'gross'
 }) => {
   const mapContainerRef = useRef<HTMLDivElement>(null);
   const mapRef = useRef<L.Map | null>(null);
   const markersRef = useRef<L.Marker[]>([]);
   const [yieldMode, setYieldMode] = useState<'gross' | 'net'>(showYieldMode);
   const navigate = useNavigate();
   
   const t = texts[lang];
   const zonesPath = lang === 'it' ? '/investitori/zone' : '/investors/zones';
 
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
     zones.forEach(zone => {
       if (!mapRef.current) return;
 
       const isSelected = zone.id === selectedZoneId;
       const yieldValue = yieldMode === 'gross' ? zone.grossYield : zone.netYield;
       
       const marker = L.marker(
         [zone.coordinates.lat, zone.coordinates.lng], 
         { icon: createZoneIcon(zone, isSelected, yieldMode) }
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
     if (zones.length > 0) {
       const bounds = L.latLngBounds(zones.map(z => [z.coordinates.lat, z.coordinates.lng]));
       mapRef.current.fitBounds(bounds, { padding: [50, 50] });
     }
   }, [zones, lang, selectedZoneId, yieldMode, onZoneClick, navigate, zonesPath, t]);
 
   return (
     <div className="relative w-full h-[450px] md:h-[500px] rounded-lg overflow-hidden">
       <div ref={mapContainerRef} className="absolute inset-0" />
       
       {/* Yield mode toggle */}
       <div className="absolute top-4 right-4 z-[1000] flex gap-1 bg-background/95 backdrop-blur-sm rounded-lg p-1 shadow-lg">
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
           {zones.length} {t.zones}
         </p>
       </div>
     </div>
   );
 };
 
 export default InvestorZonesMap;