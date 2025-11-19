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

// This loader component manages fetching the location and passing it to the map.
export function UmbrellaMapLoader() {
  const { location, isLoading } = useUmbrellaLocation();

  // We wait until loading is fully complete before attempting to render the map
  if (isLoading) {
    return <Skeleton className="h-[434px]" />;
  }

  // Pass the final, stable location data as props to the map component
  return <UmbrellaMap location={location} />;
}
