import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CheapEatLocation, categoryLabels, categoryColors } from '@/data/cheapEatsDirectory';

// Fix Leaflet default marker icon issue with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface CheapEatsMapProps {
  locations: CheapEatLocation[];
  lang: 'it' | 'en';
  onMarkerClick?: (location: CheapEatLocation) => void;
  selectedLocationId?: string;
}

const CheapEatsMap: React.FC<CheapEatsMapProps> = ({
  locations,
  lang,
  onMarkerClick,
  selectedLocationId,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Create custom icon based on category
  const createCategoryIcon = (category: string, isSelected: boolean = false) => {
    const color = categoryColors[category as keyof typeof categoryColors] || '#666';
    const size = isSelected ? 35 : 28;
    const borderWidth = isSelected ? 3 : 2;

    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          width: ${size}px;
          height: ${size}px;
          background-color: ${color};
          border: ${borderWidth}px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          ${isSelected ? 'transform: scale(1.2); z-index: 1000;' : ''}
        ">
          <span style="font-size: ${isSelected ? '14px' : '12px'};">🍽️</span>
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2],
    });
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Turin center
    mapRef.current = L.map(mapContainerRef.current).setView([45.0703, 7.6869], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update markers when locations change
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    const bounds: L.LatLngBoundsExpression = [];
    
    locations.forEach((location) => {
      const [lat, lng] = location.coordinates;
      if (lat && lng) {
        bounds.push([lat, lng]);
        
        const isSelected = location.id === selectedLocationId;
        const marker = L.marker([lat, lng], {
          icon: createCategoryIcon(location.category, isSelected),
        });

        const categoryLabel = categoryLabels[location.category]?.[lang] || location.category;
        
        const popupContent = `
          <div style="min-width: 200px; max-width: 280px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="
                background-color: ${categoryColors[location.category]}20;
                color: ${categoryColors[location.category]};
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 11px;
                font-weight: 500;
              ">${categoryLabel}</span>
              ${location.featured ? '⭐' : ''}
            </div>
            <h3 style="font-weight: bold; margin: 0 0 8px 0; font-size: 15px;">${location.name}</h3>
            <p style="margin: 0 0 4px 0; font-size: 13px; color: #666;">
              📍 ${location.district}
            </p>
            <p style="margin: 0 0 8px 0; font-size: 13px;">
              <strong style="color: #22c55e;">${location.priceRange}</strong> · ${location.typicalDish}
            </p>
            ${location.notes ? `<p style="margin: 0; font-size: 11px; color: #888; font-style: italic;">"${location.notes.substring(0, 80)}${location.notes.length > 80 ? '...' : ''}"</p>` : ''}
          </div>
        `;

        marker.bindPopup(popupContent);
        
        if (onMarkerClick) {
          marker.on('click', () => onMarkerClick(location));
        }

        marker.addTo(mapRef.current!);
        markersRef.current.push(marker);
      }
    });

    // Fit bounds if we have locations
    if (bounds.length > 0) {
      mapRef.current.fitBounds(bounds as L.LatLngBoundsExpression, { padding: [50, 50] });
    }
  }, [locations, lang, selectedLocationId, onMarkerClick]);

  // Unique categories for legend
  const uniqueCategories = [...new Set(locations.map((l) => l.category))];

  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-lg overflow-hidden border border-border">
      <div ref={mapContainerRef} className="absolute inset-0 z-0" />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/95 rounded-lg p-3 shadow-lg z-[1000] max-w-[200px]">
        <h4 className="text-xs font-semibold mb-2 text-foreground">
          {lang === 'it' ? 'Legenda' : 'Legend'}
        </h4>
        <div className="space-y-1.5">
          {uniqueCategories.slice(0, 6).map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: categoryColors[cat] }}
              />
              <span className="text-xs text-muted-foreground truncate">
                {categoryLabels[cat]?.[lang] || cat}
              </span>
            </div>
          ))}
          {uniqueCategories.length > 6 && (
            <div className="text-xs text-muted-foreground">
              +{uniqueCategories.length - 6} {lang === 'it' ? 'altre' : 'more'}
            </div>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="absolute top-4 right-4 bg-card/95 rounded-lg px-3 py-2 shadow-lg z-[1000]">
        <span className="text-sm font-medium">
          {locations.length} {lang === 'it' ? 'locali' : 'venues'}
        </span>
      </div>
    </div>
  );
};

export default CheapEatsMap;
