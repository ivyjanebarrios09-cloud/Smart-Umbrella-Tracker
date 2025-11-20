'use client';

import { CurrentWeatherCard } from '@/components/dashboard/current-weather';
import { Forecast } from '@/components/dashboard/forecast';
import { AlertSection } from '@/components/dashboard/alert-section';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmbeddedMap } from '@/components/dashboard/embedded-map';
import { WindCard } from '@/components/dashboard/wind-card';
import { RealTimeClockCard } from '@/components/dashboard/real-time-clock';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Here's a quick overview of your smart umbrella's status.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<Skeleton className="h-full w-full min-h-[250px]" />}>
          <CurrentWeatherCard />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-full w-full min-h-[250px]" />}>
          <WindCard />
        </Suspense>
         <Suspense fallback={<Skeleton className="h-full w-full min-h-[250px]" />}>
          <RealTimeClockCard />
        </Suspense>
        <div className="lg:col-span-2">
            <Suspense fallback={<Skeleton className="h-full w-full min-h-[250px]" />}>
            <Forecast />
            </Suspense>
        </div>
        <Suspense fallback={<Skeleton className="h-full w-full min-h-[250px]" />}>
          <EmbeddedMap />
        </Suspense>
      </div>

       <div className="grid grid-cols-1 gap-6">
         <Suspense fallback={<Skeleton className="h-full w-full min-h-[150px]" />}>
           <AlertSection />
         </Suspense>
       </div>
    </div>
  );
}
