'use client';

import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useUmbrellaLocation } from '@/hooks/use-umbrella-location';
import { Skeleton } from '@/components/ui/skeleton';

export function UmbrellaMap() {
  const { location, isLoading } = useUmbrellaLocation();
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
