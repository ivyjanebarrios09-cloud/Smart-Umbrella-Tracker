import { CurrentWeatherCard } from '@/components/dashboard/current-weather';
import { Forecast } from '@/components/dashboard/forecast';
import { AlertSection } from '@/components/dashboard/alert-section';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

const UmbrellaMap = dynamic(() => import('@/components/dashboard/umbrella-map').then(mod => mod.UmbrellaMap), {
  ssr: false,
  loading: () => <Skeleton className="h-[434px]" />
});


export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="grid auto-rows-min gap-4 md:gap-8 lg:col-span-1 xl:col-span-1">
        <Suspense fallback={<Skeleton className="h-[220px]" />}>
          <CurrentWeatherCard />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[180px]" />}>
          <AlertSection />
        </Suspense>
      </div>
      <div className="grid auto-rows-min gap-4 md:gap-8 lg:col-span-1 xl:col-span-2">
         <UmbrellaMap />
      </div>
      <div className="xl:col-span-3">
        <Suspense fallback={<Skeleton className="h-[220px]" />}>
            <Forecast />
        </Suspense>
      </div>
    </div>
  );
}
