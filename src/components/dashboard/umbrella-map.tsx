'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { UmbrellaLocation } from '@/lib/data';
import L from 'leaflet';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import React, { useEffect } from 'react';

// Leaflet's default icon path doesn't work well with bundlers
const icon = new L.Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface UmbrellaMapProps {
  location: UmbrellaLocation;
}

// A component to update the map view when location changes
function MapUpdater({ location }: { location: UmbrellaLocation }) {
  const map = useMap();
  useEffect(() => {
    map.setView([location.lat, location.lng], map.getZoom());
  }, [location, map]);
  return null;
}

export const UmbrellaMap: React.FC<UmbrellaMapProps> = ({ location }) => {
  const position: [number, number] = [location.lat, location.lng];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Live Map Tracker</CardTitle>
            <CardDescription className="mt-1">
              Last known location of your umbrella
            </CardDescription>
          </div>
          <MapPin className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-2 text-sm text-muted-foreground">{location.address}</p>
        <div className="h-[350px] rounded-md overflow-hidden border">
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
              <Popup>Your umbrella is here!</Popup>
            </Marker>
            <MapUpdater location={location} />
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
};
