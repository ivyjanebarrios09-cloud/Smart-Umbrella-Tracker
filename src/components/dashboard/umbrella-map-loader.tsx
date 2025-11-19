'use client';

import { useUmbrellaLocation } from '@/hooks/use-umbrella-location';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

// Dynamically import the UmbrellaMap component (client-side only)
const UmbrellaMap = dynamic(
  () =>
    import('@/components/dashboard/umbrella-map').then((mod) => mod.UmbrellaMap),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[350px] w-full" />,
  }
);

export function UmbrellaMapLoader() {
  const { location, isLoading } = useUmbrellaLocation();

  // Show skeleton while loading
  if (isLoading) return <Skeleton className="h-[350px] w-full" />;

  // Show message if location is not available
  if (!location) {
    return (
      <div className="flex h-[350px] w-full items-center justify-center rounded-lg border bg-card text-muted-foreground">
        <p>Location data not available.</p>
      </div>
    );
  }

  // Render the map with the umbrella location
  return <UmbrellaMap location={location} />;
}
