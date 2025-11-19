'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useUmbrellaLocation } from '@/hooks/use-umbrella-location';
import { Skeleton } from '@/components/ui/skeleton';
import L from 'leaflet';
import React from 'react';

// Fix for default icon path issue with webpack
const icon = L.icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


export const UmbrellaMap = React.memo(function UmbrellaMap() {
  const { location, isLoading } = useUmbrellaLocation();
  
  if (isLoading) {
      return <Skeleton className="h-[434px]" />;
  }

  if (!location) {
      return (
          <Card>
              <CardHeader>
                  <CardTitle>Last Known Location</CardTitle>
              </CardHeader>
              <CardContent>
                   <div className="h-[350px] flex items-center justify-center bg-muted rounded-md">
                        <p>Location data not available.</p>
                    </div>
              </CardContent>
          </Card>
      )
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Last Known Location</CardTitle>
            <CardDescription>Last seen: {location.lastSeen}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="h-[350px] rounded-md overflow-hidden">
                <MapContainer key={`${location.lat}-${location.lng}`} center={[location.lat, location.lng]} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[location.lat, location.lng]} icon={icon}>
                        <Popup>
                            Your umbrella was last seen here.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
      </CardContent>
    </Card>
  );
});

UmbrellaMap.displayName = 'UmbrellaMap';