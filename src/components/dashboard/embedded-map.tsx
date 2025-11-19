'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useUmbrellaLocation } from '@/hooks/use-umbrella-location';
import { MapPin } from 'lucide-react';

export function EmbeddedMap() {
  const { location, isLoading } = useUmbrellaLocation();

  if (isLoading) {
    return <Skeleton className="h-full w-full" />;
  }

  if (!location) {
    return (
      <Card className="flex-1 flex items-center justify-center">
        <CardContent className="p-6 text-center">
             <MapPin className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Location data not available.</p>
        </CardContent>
      </Card>
    );
  }

  const mapSrc = `https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`;

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader>
          <div>
            <CardTitle className="text-base">Last Known Location</CardTitle>
            <CardDescription className="mt-1 text-xs truncate">
              {location.address}
            </CardDescription>
          </div>
      </CardHeader>
      <CardContent className="p-0 flex-1">
        <div className="h-full w-full rounded-b-md overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            src={mapSrc}
            title="Umbrella Location"
            style={{ border: 0 }}
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
}
