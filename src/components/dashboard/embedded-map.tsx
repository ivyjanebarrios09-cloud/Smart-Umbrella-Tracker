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
    return <Skeleton className="h-[220px] w-full" />;
  }

  if (!location) {
    return (
      <Card className="flex h-[220px] w-full items-center justify-center">
        <CardContent>
          <p className="text-muted-foreground">Location data not available.</p>
        </CardContent>
      </Card>
    );
  }

  const mapSrc = `https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`;

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Last Known Location</CardTitle>
            <CardDescription className="mt-1">
              {location.address}
            </CardDescription>
          </div>
          <MapPin className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[135px] rounded-md overflow-hidden border">
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
