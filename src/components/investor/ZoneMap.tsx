import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { InvestorZone, formatPrice } from "@/data/investorZoneData";

// Curated, real Turin landmark coordinates (kept small & verified).
const LANDMARKS: Array<{
  name: string;
  lat: number;
  lng: number;
  category: "metro" | "education" | "health" | "market";
}> = [
  { name: "Politecnico di Torino", lat: 45.0625, lng: 7.6628, category: "education" },
  { name: "Campus Luigi Einaudi", lat: 45.0876, lng: 7.6927, category: "education" },
  { name: "Parco della Salute (Lingotto)", lat: 45.0265, lng: 7.6605, category: "health" },
  { name: "Metro 2 — Rebaudengo", lat: 45.1006, lng: 7.6905, category: "metro" },
  { name: "Porta Palazzo", lat: 45.0786, lng: 7.6826, category: "market" },
];

const NEIGHBORHOOD_RADIUS_KM = 1.6;

function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

const primaryIcon = L.divIcon({
  className: "jr-zone-marker jr-zone-marker--primary",
  html: `<div style="
    width:28px;height:28px;border-radius:50%;
    background:hsl(var(--primary));
    border:3px solid white;
    box-shadow:0 2px 8px rgba(0,0,0,0.3);
  "></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -14],
});

const secondaryIcon = L.divIcon({
  className: "jr-zone-marker jr-zone-marker--secondary",
  html: `<div style="
    width:14px;height:14px;border-radius:50%;
    background:hsl(var(--muted-foreground));
    border:2px solid white;
    box-shadow:0 1px 4px rgba(0,0,0,0.25);
    opacity:0.9;
  "></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
  popupAnchor: [0, -7],
});

interface ZoneMapProps {
  zone: InvestorZone;
  lang: "it" | "en";
}

const ZoneMap = ({ zone, lang }: ZoneMapProps) => {
  const center: [number, number] = [zone.coordinates.lat, zone.coordinates.lng];

  const projectMarkers = zone.urbanRenewal.projects.filter(
    (p): p is typeof p & { coordinates: { lat: number; lng: number } } =>
      !!p.coordinates,
  );

  const nearbyLandmarks = LANDMARKS.filter(
    (l) => distanceKm(zone.coordinates, l) <= NEIGHBORHOOD_RADIUS_KM,
  );

  const ariaLabel =
    lang === "it"
      ? `Mappa interattiva del quartiere ${zone.name}`
      : `Interactive map of the ${zone.name} neighborhood`;

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className="w-full h-[320px] md:h-[400px] rounded-xl overflow-hidden border border-border/20"
    >
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={center} icon={primaryIcon}>
          <Popup>
            <div style={{ minWidth: 160 }}>
              <strong>{zone.name}</strong>
              <div style={{ fontSize: 12, marginTop: 4 }}>
                €{formatPrice(zone.pricePerSqm.avg)}/m²
              </div>
            </div>
          </Popup>
        </Marker>

        {projectMarkers.map((p, i) => (
          <Marker
            key={`proj-${i}`}
            position={[p.coordinates.lat, p.coordinates.lng]}
            icon={secondaryIcon}
          >
            <Popup>
              <div style={{ minWidth: 160 }}>
                <strong>{p.name}</strong>
                <div style={{ fontSize: 12, marginTop: 4 }}>{p.impact[lang]}</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {nearbyLandmarks.map((l, i) => (
          <Marker
            key={`lm-${i}`}
            position={[l.lat, l.lng]}
            icon={secondaryIcon}
          >
            <Popup>
              <strong>{l.name}</strong>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ZoneMap;
