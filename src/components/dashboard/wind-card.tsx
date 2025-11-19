'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wind } from 'lucide-react';
import { useWeatherData } from '@/hooks/use-weather-data';
import { Skeleton } from '@/components/ui/skeleton';

export function WindCard() {
  const { weather, isLoading } = useWeatherData();

  if (isLoading) {
    return <Skeleton className="h-full w-full" />;
  }

  if (!weather) {
    return (
      <Card className="flex-1">
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
    <Card className="flex-1 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Wind Speed</CardTitle>
        <Wind className="h-6 w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1 flex-1 flex flex-col justify-center items-center">
        <div className="text-4xl md:text-5xl font-bold">{weather.windspeed}</div>
        <p className="text-xs text-muted-foreground">km/h</p>
      </CardContent>
    </Card>
  );
}
