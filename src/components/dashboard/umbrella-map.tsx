'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useMemo } from 'react';
import type { UmbrellaLocation } from '@/lib/data';
import L from 'leaflet';

// Leaflet's default icon path might not work with bundlers like Webpack.
// This manually sets the paths to the icon images.
const icon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});


interface UmbrellaMapProps {
  location: UmbrellaLocation;
}

export function UmbrellaMap({ location }: UmbrellaMapProps) {
  const position = useMemo<LatLngExpression>(
    () => [location.lat, location.lng],
    [location.lat, location.lng]
  );

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Last Known Location</CardTitle>
        <CardDescription>
          {location.address || 'Loading address...'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] rounded-md overflow-hidden">
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
            <Marker position={position} icon={icon}>
              <Popup>Your umbrella's last known location.</Popup>
            </Marker>
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}
