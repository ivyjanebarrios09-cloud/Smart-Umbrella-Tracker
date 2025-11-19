'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { useUmbrellaLocation } from '@/hooks/use-umbrella-location';
import React from 'react';

// Dynamically import the map component with SSR turned off.
const UmbrellaMap = dynamic(() => import('@/components/dashboard/umbrella-map').then(mod => mod.UmbrellaMap), {
  ssr: false,
  loading: () => <Skeleton className="h-[434px]" />,
});

// This new loader component will manage fetching the location and passing it to the map.
// This isolates the client-side logic.
export function UmbrellaMapLoader() {
  const { location, isLoading } = useUmbrellaLocation();

  if (isLoading) {
    return <Skeleton className="h-[434px]" />;
  }

  // Pass the location data as props to the now pure client-side map component
  return <UmbrellaMap location={location} />;
}
