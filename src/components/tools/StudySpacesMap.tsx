import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DetailedStudySpace, getCategoryLabel, DetailedStudySpaceCategory } from '@/data/detailedStudySpaces';

// Fix for default marker icons in Leaflet with Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Coordinates for each study space in Turin
export const studySpaceCoordinates: Record<number, [number, number]> = {
  1: [45.0663, 7.6583],   // Sala Studio Michelangelo Buonarroti
  2: [45.0697, 7.6885],   // Sala Studio Verdi
  3: [45.0620, 7.6833],   // Sala Studio Pietro Giuria
  4: [45.0670, 7.6750],   // Sala Studio Principe Amedeo
  5: [45.0628, 7.6920],   // Murazzi Student Zone
  6: [45.0680, 7.6870],   // BNUTO
  7: [45.0720, 7.6760],   // Biblioteca Civica Centrale
  8: [45.0580, 7.6800],   // Biblioteca Natalia Ginzburg
  9: [45.0695, 7.6880],   // Circolo dei Lettori
  10: [45.0620, 7.6850],  // Mara dei Boschi Berthollet
  11: [45.0680, 7.6900],  // Mara dei Boschi Piazza Carlo Emanuele II
  12: [45.0700, 7.6850],  // EXKi
  13: [45.0690, 7.6870],  // Convitto Cafè
  14: [45.0450, 7.6700],  // Talent Garden Fondazione Agnelli
  15: [45.0730, 7.6760],  // Copernico Garibaldi
  16: [45.0820, 7.6350],  // Bliss Coworking
  17: [45.0700, 7.7050],  // SmarTOwork
  18: [45.0550, 7.6870],  // Parco del Valentino
  19: [45.0530, 7.6880],  // Imbarchino
  20: [45.0750, 7.6600],  // Comala
};

// Category colors
const categoryColors: Record<DetailedStudySpaceCategory, string> = {
  edisu: '#10b981',        // Green
  biblioteca: '#3b82f6',   // Blue
  spazi_polivalenti: '#8b5cf6', // Purple
  caffetteria: '#f59e0b',  // Amber
  coworking: '#ef4444',    // Red
  spazi_alternativi: '#22c55e', // Light green
};

interface StudySpacesMapProps {
  spaces: DetailedStudySpace[];
  lang: 'it' | 'en';
  onMarkerClick?: (spaceId: number) => void;
}

export const StudySpacesMap = ({ spaces, lang, onMarkerClick }: StudySpacesMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Create custom icon for category
  const createCategoryIcon = (category: DetailedStudySpaceCategory) => {
    const color = categoryColors[category];
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: ${color};
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: 10px;
            height: 10px;
            background: white;
            border-radius: 50%;
          "></div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14],
    });
  };

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map centered on Turin
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [45.0678, 7.6825],
        zoom: 13,
        scrollWheelZoom: true,
        zoomControl: true,
      });

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);
    }

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add markers for each space
    spaces.forEach(space => {
      const coords = studySpaceCoordinates[space.id];
      if (!coords || !mapInstanceRef.current) return;

      const marker = L.marker(coords, {
        icon: createCategoryIcon(space.category),
      });

      // Create popup content
      const popupContent = `
        <div style="min-width: 200px; font-family: system-ui, sans-serif;">
          <div style="
            background: ${categoryColors[space.category]}; 
            color: white; 
            padding: 4px 8px; 
            border-radius: 4px; 
            font-size: 11px; 
            margin-bottom: 8px;
            display: inline-block;
          ">
            ${getCategoryLabel(space.category, lang)}
          </div>
          <h3 style="font-weight: 600; font-size: 14px; margin: 0 0 4px 0; color: #1a1a1a;">
            ${space.name}
          </h3>
          <p style="font-size: 12px; color: #666; margin: 0 0 8px 0;">
            📍 ${space.address}
          </p>
          ${space.phone ? `
            <a href="tel:${space.phone}" style="
              display: inline-flex;
              align-items: center;
              gap: 4px;
              font-size: 12px;
              color: #10b981;
              text-decoration: none;
            ">
              📞 ${space.phone}
            </a>
          ` : ''}
          ${space.note ? `
            <p style="font-size: 11px; color: #888; margin-top: 8px; font-style: italic;">
              ${space.note}
            </p>
          ` : ''}
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 280,
        className: 'study-space-popup',
      });

      marker.on('click', () => {
        onMarkerClick?.(space.id);
      });

      marker.addTo(mapInstanceRef.current!);
      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers
    if (markersRef.current.length > 0) {
      const group = L.featureGroup(markersRef.current);
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
    }

    return () => {
      // Cleanup markers on unmount or when spaces change
    };
  }, [spaces, lang, onMarkerClick]);

  // Cleanup map on component unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-border shadow-lg">
      <div ref={mapRef} className="w-full h-[400px] md:h-[500px]" />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm p-3 rounded-lg shadow-md border border-border z-[1000]">
        <p className="text-xs font-medium text-foreground mb-2">
          {lang === 'it' ? 'Legenda' : 'Legend'}
        </p>
        <div className="space-y-1">
          {(Object.entries(categoryColors) as [DetailedStudySpaceCategory, string][]).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full border border-white shadow-sm" 
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-muted-foreground">
                {getCategoryLabel(category, lang)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
