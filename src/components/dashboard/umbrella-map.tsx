'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect, useRef } from 'react';
import type { UmbrellaLocation } from '@/lib/data';
import L from 'leaflet';

// Custom Leaflet icon
const icon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

interface UmbrellaMapProps {
  location: UmbrellaLocation;
}

// Component to update map view programmatically
function MapUpdater({ position }: { position: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom(), { animate: true });
  }, [position, map]);
  return null;
}

// Component to move marker smoothly
function MovingMarker({ position }: { position: LatLngExpression }) {
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng(position);
    }
  }, [position]);

  return <Marker ref={markerRef} position={position} icon={icon}>
    <Popup>Your umbrella's last known location.</Popup>
  </Marker>;
}

export function UmbrellaMap({ location }: UmbrellaMapProps) {
  const position: LatLngExpression = [location.lat, location.lng];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Last Known Location</CardTitle>
        <CardDescription>{location.address || 'Loading address...'}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] rounded-md overflow-hidden">
          <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MovingMarker position={position} />
            <MapUpdater position={position} />
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}
