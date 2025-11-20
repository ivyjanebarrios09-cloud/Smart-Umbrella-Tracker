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
    return <Skeleton className="h-full w-full min-h-[250px]" />;
  }

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4">
        <MapPin className="h-6 w-6 text-muted-foreground" />
        <div>
          <CardTitle className="text-2xl font-bold animated-gradient-text">Last Known Location</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            The umbrella's last reported coordinates.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 relative">
        {!location ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Location data not available.</p>
          </div>
        ) : (
          <div className="h-full w-full rounded-b-md overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
              title="Umbrella Location"
              style={{ border: 0 }}
            ></iframe>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
