'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherIcon } from '@/lib/icons';
import { Wind } from 'lucide-react';
import { useWeatherData } from '@/hooks/use-weather-data';
import { Skeleton } from '@/components/ui/skeleton';

export function CurrentWeatherCard() {
  const { weather, isLoading } = useWeatherData();

  if (isLoading) {
    return <Skeleton className="h-[220px]" />;
  }

  if (!weather) {
    return (
      <Card>
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Current Weather</CardTitle>
        <div className="h-6 w-6 text-muted-foreground">
          <WeatherIcon condition={weather.condition} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-5xl font-bold">{weather.temperature}°C</div>
        <p className="text-xs text-muted-foreground">{weather.condition}</p>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
                <Wind className="mr-1 h-4 w-4" /> {weather.windspeed} km/h
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
