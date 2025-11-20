'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { WeatherIcon } from '@/lib/icons';
import { useWeatherData } from '@/hooks/use-weather-data';
import { Skeleton } from '@/components/ui/skeleton';
import { Thermometer } from 'lucide-react';

export function CurrentWeatherCard() {
  const { weather, isLoading } = useWeatherData();

  if (isLoading) {
    return <Skeleton className="h-full w-full min-h-[250px]" />;
  }

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4">
        <Thermometer className="h-6 w-6 text-muted-foreground" />
        <div>
          <CardTitle className="text-2xl font-bold animated-gradient-text">Temperature</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Current outdoor temperature.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 flex-1 flex flex-col justify-center items-center">
        {!weather ? (
           <p className="text-sm text-muted-foreground">No data available.</p>
        ): (
          <>
            <div className="flex items-baseline">
                <div className="text-5xl font-bold">{weather.temperature}</div>
                <span className="text-2xl text-muted-foreground">°C</span>
            </div>
            <div className="flex items-center text-muted-foreground">
                <div className="h-5 w-5 mr-1"><WeatherIcon condition={weather.condition} /></div>
                <p className="text-sm">{weather.condition}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
