'use client';

import { CurrentWeatherCard } from '@/components/dashboard/current-weather';
import { Forecast } from '@/components/dashboard/forecast';
import { AlertSection } from '@/components/dashboard/alert-section';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmbeddedMap } from '@/components/dashboard/embedded-map';
import { WindCard } from '@/components/dashboard/wind-card';
import { cn } from '@/lib/utils';

const cardContainerClasses = "aspect-square flex flex-col";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        <div className={cardContainerClasses}>
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
                <CurrentWeatherCard />
            </Suspense>
        </div>
        <div className={cardContainerClasses}>
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
                <WindCard />
            </Suspense>
        </div>
        <div className={cardContainerClasses}>
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
                <AlertSection />
            </Suspense>
        </div>
        <div className={cn(cardContainerClasses, "col-span-2 md:col-span-1 lg:col-span-2")}>
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
                <Forecast />
            </Suspense>
        </div>
        <div className={cardContainerClasses}>
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
                <EmbeddedMap />
            </Suspense>
        </div>
    </div>
  );
}
