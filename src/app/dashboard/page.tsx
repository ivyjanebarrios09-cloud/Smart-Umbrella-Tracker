'use client';

import { CurrentWeatherCard } from '@/components/dashboard/current-weather';
import { Forecast } from '@/components/dashboard/forecast';
import { AlertSection } from '@/components/dashboard/alert-section';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmbeddedMap } from '@/components/dashboard/embedded-map';
import { WindCard } from '@/components/dashboard/wind-card';

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
        <Suspense fallback={<Skeleton className="h-[220px]" />}>
          <CurrentWeatherCard />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[220px]" />}>
          <WindCard />
        </Suspense>
         <Suspense fallback={<Skeleton className="h-[220px]" />}>
          <AlertSection />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[220px]" />}>
            <Forecast />
        </Suspense>
         <Suspense fallback={<Skeleton className="h-[220px] lg:col-span-2" />}>
            <EmbeddedMap />
        </Suspense>
    </div>
  );
}
