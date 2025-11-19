'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherIcon } from '@/lib/icons';
import { useWeatherData } from '@/hooks/use-weather-data';
import { Skeleton } from '@/components/ui/skeleton';

export function CurrentWeatherCard() {
  const { weather, isLoading } = useWeatherData();

  if (isLoading) {
    return <Skeleton className="h-full w-full" />;
  }

  if (!weather) {
    return (
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Current Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Weather data not available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Current Weather</CardTitle>
        <div className="h-6 w-6 text-muted-foreground">
          <WeatherIcon condition={weather.condition} />
        </div>
      </CardHeader>
      <CardContent className="space-y-1 flex-1 flex flex-col justify-center items-center">
        <div className="text-4xl md:text-5xl font-bold">{weather.temperature}°C</div>
        <p className="text-xs text-muted-foreground">{weather.condition}</p>
      </CardContent>
    </Card>
  );
}
