import { getDashboardData } from '@/lib/data';
import { CurrentWeatherCard } from '@/components/dashboard/current-weather';
import { Forecast } from '@/components/dashboard/forecast';
import { UmbrellaMap } from '@/components/dashboard/umbrella-map';
import { AlertSection } from '@/components/dashboard/alert-section';
import { Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="grid auto-rows-min gap-4 md:gap-8 lg:col-span-1 xl:col-span-1">
        <Suspense fallback={<Skeleton className="h-[220px]" />}>
          <CurrentWeatherCard initialWeather={data.currentWeather} />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[180px]" />}>
          <AlertSection initialLocation={data.umbrellaLocation.lastSeen} initialForecast={JSON.stringify(data.forecast)} />
        </Suspense>
      </div>
      <div className="grid auto-rows-min gap-4 md:gap-8 lg:col-span-1 xl:col-span-2">
         <Suspense fallback={<Skeleton className="h-[434px]" />}>
            <UmbrellaMap initialLocation={data.umbrellaLocation} />
        </Suspense>
      </div>
      <div className="xl:col-span-3">
        <Suspense fallback={<Skeleton className="h-[220px]" />}>
          <Forecast initialForecast={data.forecast} />
        </Suspense>
      </div>
    </div>
  );
}
