'use client';

import { useUmbrellaLocation } from '@/hooks/use-umbrella-location';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

// Dynamically import the map component with SSR turned off.
const UmbrellaMap = dynamic(
  () => import('@/components/dashboard/umbrella-map').then((mod) => mod.UmbrellaMap),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[434px] w-full" />,
  }
);

export function UmbrellaMapLoader() {
  const { location, isLoading } = useUmbrellaLocation();

  if (isLoading) {
    return <Skeleton className="h-[434px] w-full" />;
  }

  if (!location) {
    return (
      <div className="flex h-[434px] w-full items-center justify-center rounded-lg border bg-card text-muted-foreground">
        <p>Location data not available.</p>
      </div>
    );
  }

  // Pass the location data to the dynamically loaded map component.
  return <UmbrellaMap location={location} />;
}
