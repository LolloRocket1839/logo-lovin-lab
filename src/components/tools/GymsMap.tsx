import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Gym, tierLabels } from '@/data/gymsDirectory';

interface GymsMapProps {
  gyms: Gym[];
  lang: 'it' | 'en';
  onMarkerClick?: (gym: Gym) => void;
  selectedGymId?: string;
}

// University locations for reference
const universities = [
  { name: 'UniTO Palazzo Nuovo', coordinates: [45.0700, 7.6950] as [number, number], color: '#3b82f6' },
  { name: 'UniTO Einaudi', coordinates: [45.0720, 7.6520] as [number, number], color: '#3b82f6' },
  { name: 'Politecnico Cittadella', coordinates: [45.0628, 7.6589] as [number, number], color: '#ef4444' },
  { name: 'Politecnico Valentino', coordinates: [45.0520, 7.6870] as [number, number], color: '#ef4444' }
];

const createGymIcon = (gym: Gym, isSelected: boolean): L.DivIcon => {
  const tierColors = {
    1: '#22c55e', // green
    2: '#eab308', // yellow
    3: '#a855f7'  // purple
  };
  
  const color = tierColors[gym.tier];
  const size = isSelected ? 36 : 28;
  const borderWidth = isSelected ? 4 : 2;
  
  return L.divIcon({
    className: 'custom-gym-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background-color: ${color};
        border: ${borderWidth}px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${isSelected ? '14px' : '12px'};
        font-weight: bold;
        color: white;
        ${isSelected ? 'transform: scale(1.2);' : ''}
      ">
        💪
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
};

const createUniversityIcon = (color: string): L.DivIcon => {
  return L.divIcon({
    className: 'custom-uni-marker',
    html: `
      <div style="
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: ${color};
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      ">
        🎓
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

const GymsMap: React.FC<GymsMapProps> = ({ gyms, lang, onMarkerClick, selectedGymId }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = L.map(mapContainerRef.current).setView([45.0700, 7.6800], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapRef.current);

    // Add university markers
    universities.forEach(uni => {
      if (mapRef.current) {
        L.marker(uni.coordinates, { icon: createUniversityIcon(uni.color) })
          .addTo(mapRef.current)
          .bindPopup(`<strong>${uni.name}</strong>`);
      }
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Update gym markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    gyms.forEach(gym => {
      if (!mapRef.current) return;

      const isSelected = gym.id === selectedGymId;
      const marker = L.marker(gym.coordinates, {
        icon: createGymIcon(gym, isSelected)
      }).addTo(mapRef.current);

      const priceDisplay = gym.priceStudent 
        ? `<span style="text-decoration: line-through; color: #999;">€${gym.priceStandard}</span> <strong style="color: #22c55e;">€${gym.priceStudent}</strong>`
        : `<strong>€${gym.priceStandard}</strong>`;

      const features = [];
      if (gym.open24h) features.push('24h');
      if (gym.hasPool) features.push(lang === 'it' ? '🏊 Piscina' : '🏊 Pool');
      if (gym.hasSauna) features.push('🧖 Sauna');

      const tierInfo = tierLabels[gym.tier];
      
      const popupContent = `
        <div style="min-width: 200px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="
              background-color: ${gym.tier === 1 ? '#22c55e' : gym.tier === 2 ? '#eab308' : '#a855f7'};
              color: white;
              padding: 2px 8px;
              border-radius: 4px;
              font-size: 11px;
              font-weight: 500;
            ">${tierInfo[lang]}</span>
            <span style="color: #f59e0b;">⭐ ${gym.rating}</span>
          </div>
          <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600;">${gym.name}</h3>
          <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">${gym.address}</p>
          <p style="margin: 0 0 8px 0; font-size: 13px;">${priceDisplay}/mese</p>
          ${features.length > 0 ? `<p style="margin: 0; font-size: 11px; color: #666;">${features.join(' • ')}</p>` : ''}
        </div>
      `;

      marker.bindPopup(popupContent);
      
      marker.on('click', () => {
        if (onMarkerClick) {
          onMarkerClick(gym);
        }
      });

      markersRef.current.push(marker);
    });

    // Fit bounds if there are gyms
    if (gyms.length > 0) {
      const bounds = L.latLngBounds(gyms.map(g => g.coordinates));
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [gyms, lang, selectedGymId, onMarkerClick]);

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden">
      <div ref={mapContainerRef} className="absolute inset-0" />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg z-[1000]">
        <h4 className="text-xs font-semibold mb-2">
          {lang === 'it' ? 'Legenda' : 'Legend'}
        </h4>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-sm" />
            <span>Best Value (€19-29)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-white shadow-sm" />
            <span>{lang === 'it' ? 'Qualità/Prezzo' : 'Quality/Price'} (€30-45)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-purple-500 border-2 border-white shadow-sm" />
            <span>Premium (€50+)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-sm flex items-center justify-center text-[8px]">
              🎓
            </div>
            <span>{lang === 'it' ? 'Università' : 'University'}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {gyms.length} {lang === 'it' ? 'palestre' : 'gyms'}
        </p>
      </div>
    </div>
  );
};

export default GymsMap;
