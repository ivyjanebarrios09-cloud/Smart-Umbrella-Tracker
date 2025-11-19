'use client';

import { useState, useEffect } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { UmbrellaLocation } from '@/lib/data';
import { getUmbrellaLocation } from '@/lib/data';

export function UmbrellaMap({ initialLocation }: { initialLocation: UmbrellaLocation }) {
  const [location, setLocation] = useState(initialLocation);

  useEffect(() => {
    // This simulates real-time updates from Firestore
    const interval = setInterval(async () => {
      const newLocation = await getUmbrellaLocation();
      if (newLocation) {
        setLocation(newLocation);
      }
    }, 60000); // Update every 60 seconds

    return () => clearInterval(interval);
  }, []);
  
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Umbrella Location</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[350px] flex items-center justify-center bg-muted rounded-md">
                    <p className="text-muted-foreground">Google Maps API Key not configured.</p>
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
                <APIProvider apiKey={apiKey}>
                    <Map
                        defaultCenter={{ lat: location.lat, lng: location.lng }}
                        center={{ lat: location.lat, lng: location.lng }}
                        defaultZoom={13}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                        mapId="b1d740c31c6f889"
                    >
                        <Marker position={{ lat: location.lat, lng: location.lng }} />
                    </Map>
                </APIProvider>
            </div>
      </CardContent>
    </Card>
  );
}
