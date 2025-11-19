import { getDashboardData } from '@/lib/data';
import { CurrentWeatherCard } from '@/components/dashboard/current-weather';
import { Forecast } from '@/components/dashboard/forecast';
import { UmbrellaMap } from '@/components/dashboard/umbrella-map';
import { AlertSection } from '@/components/dashboard/alert-section';
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="grid auto-rows-min gap-4 md:gap-8 lg:col-span-1 xl:col-span-1">
        <Suspense fallback={<Skeleton className="h-[220px]" />}>
          {data.currentWeather ? (
            <CurrentWeatherCard initialWeather={data.currentWeather} />
          ) : (
             <Card>
                <CardHeader>
                    <CardTitle>Current Weather</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Weather data not available.</p>
                </CardContent>
            </Card>
          )}
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[180px]" />}>
          <AlertSection />
        </Suspense>
      </div>
      <div className="grid auto-rows-min gap-4 md:gap-8 lg:col-span-1 xl:col-span-2">
         <Suspense fallback={<Skeleton className="h-[434px]" />}>
            {data.umbrellaLocation ? (
                <UmbrellaMap initialLocation={data.umbrellaLocation} />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Last Known Location</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Location data not available.</p>
                    </CardContent>
                </Card>
            )}
        </Suspense>
      </div>
      <div className="xl:col-span-3">
        <Suspense fallback={<Skeleton className="h-[220px]" />}>
          {data.forecast && data.forecast.length > 0 ? (
            <Forecast initialForecast={data.forecast} />
          ) : (
             <Card>
                <CardHeader>
                    <CardTitle>7-Day Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Forecast data not available.</p>
                </CardContent>
            </Card>
          )}
        </Suspense>
      </div>
    </div>
  );
}
