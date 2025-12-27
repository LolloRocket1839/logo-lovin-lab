import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { StudentService, institutionLabels, Institution } from '@/data/studentServicesDirectory';

// Fix for default marker icons in Leaflet with Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface StudentServicesMapProps {
  services: StudentService[];
  lang: 'it' | 'en';
  onMarkerClick?: (serviceId: string) => void;
  selectedServiceId?: string;
  onSelectService?: (serviceId: string) => void;
}

const StudentServicesMap = ({ services, lang, onMarkerClick, selectedServiceId, onSelectService }: StudentServicesMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Create custom icon based on institution color
  const createInstitutionIcon = (institution: Institution, isSelected: boolean = false) => {
    const color = institutionLabels[institution]?.color || '#6B7280';
    const size = isSelected ? 14 : 10;
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
          ${isSelected ? 'transform: scale(1.3);' : ''}
        "></div>
      `,
      iconSize: [size + borderWidth * 2, size + borderWidth * 2],
      iconAnchor: [(size + borderWidth * 2) / 2, (size + borderWidth * 2) / 2],
      popupAnchor: [0, -size / 2]
    });
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    mapInstance.current = L.map(mapContainer.current).setView([45.0703, 7.6869], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapInstance.current);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Update markers when services change
  useEffect(() => {
    if (!mapInstance.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Filter services with valid coordinates
    const servicesWithCoords = services.filter(
      service => service.coordinates && 
      service.coordinates[0] !== 0 && 
      service.coordinates[1] !== 0
    );

    if (servicesWithCoords.length === 0) return;

    // Add markers for each service
    servicesWithCoords.forEach(service => {
      if (!service.coordinates || !mapInstance.current) return;

      const isSelected = service.id === selectedServiceId;
      const marker = L.marker(service.coordinates, {
        icon: createInstitutionIcon(service.institution, isSelected)
      });

      const popupContent = `
        <div style="min-width: 200px; max-width: 280px;">
          <div style="
            background-color: ${institutionLabels[service.institution]?.color || '#6B7280'};
            color: white;
            padding: 4px 8px;
            margin: -8px -8px 8px -8px;
            border-radius: 4px 4px 0 0;
            font-size: 11px;
            font-weight: 500;
          ">
            ${institutionLabels[service.institution]?.[lang] || service.institutionName}
          </div>
          <strong style="font-size: 14px; display: block; margin-bottom: 4px;">
            ${service.name}
          </strong>
          <p style="font-size: 12px; color: #666; margin: 4px 0;">
            📍 ${service.address}
          </p>
          ${service.phone ? `<p style="font-size: 12px; color: #666; margin: 4px 0;">📞 ${service.phone}</p>` : ''}
          <p style="font-size: 11px; color: #888; margin: 8px 0 4px 0;">
            ${service.services.slice(0, 3).join(', ')}${service.services.length > 3 ? '...' : ''}
          </p>
        </div>
      `;

      marker.bindPopup(popupContent);
      
      if (onSelectService) {
        marker.on('click', () => {
          onSelectService(service.id);
        });
      } else if (onMarkerClick) {
        marker.on('click', () => onMarkerClick(service.id));
      }

      marker.addTo(mapInstance.current!);
      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers
    if (servicesWithCoords.length > 0) {
      const bounds = L.latLngBounds(
        servicesWithCoords.map(s => s.coordinates as [number, number])
      );
      mapInstance.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [services, lang, selectedServiceId, onMarkerClick]);

  // Get unique institutions for legend
  const uniqueInstitutions = [...new Set(services.map(s => s.institution))];

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-border">
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border z-[1000]">
        <p className="text-xs font-medium text-foreground mb-2">
          {lang === 'it' ? 'Istituzioni' : 'Institutions'}
        </p>
        <div className="space-y-1.5">
          {uniqueInstitutions.map(institution => (
            <div key={institution} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: institutionLabels[institution]?.color || '#6B7280' }}
              />
              <span className="text-xs text-muted-foreground">
                {institutionLabels[institution]?.[lang] || institution}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-border z-[1000]">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{services.filter(s => s.coordinates).length}</span>
          {' '}{lang === 'it' ? 'su mappa' : 'on map'}
        </p>
      </div>
    </div>
  );
};

export default StudentServicesMap;
