'use client';

import { useUmbrellaLocation } from '@/hooks/use-umbrella-location';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export function LocationCard() {
  const { location, isLoading } = useUmbrellaLocation();

  if (isLoading) {
    return <Skeleton className="h-[180px] w-full" />;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Last Known Location</CardTitle>
        <MapPin className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-lg font-semibold">
          {location ? location.address : 'Location data not available.'}
        </div>
        {location && (
            <p className="text-xs text-muted-foreground">
                Lat: {location.lat}, Lon: {location.lng}
            </p>
        )}
      </CardContent>
    </Card>
  );
}
