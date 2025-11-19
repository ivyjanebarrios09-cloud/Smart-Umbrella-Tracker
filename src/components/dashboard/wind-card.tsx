'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wind } from 'lucide-react';
import { useWeatherData } from '@/hooks/use-weather-data';
import { Skeleton } from '@/components/ui/skeleton';

export function WindCard() {
  const { weather, isLoading } = useWeatherData();

  if (isLoading) {
    return <Skeleton className="h-[220px]" />;
  }

  if (!weather) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Wind Speed</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Wind data not available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Wind Speed</CardTitle>
        <Wind className="h-6 w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-5xl font-bold">{weather.windspeed} km/h</div>
        <p className="text-xs text-muted-foreground">Current wind speed</p>
      </CardContent>
    </Card>
  );
}
