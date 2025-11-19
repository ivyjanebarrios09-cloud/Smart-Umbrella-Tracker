'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Wind } from 'lucide-react';
import { useWeatherData } from '@/hooks/use-weather-data';
import { Skeleton } from '@/components/ui/skeleton';

export function WindCard() {
  const { weather, isLoading } = useWeatherData();

  if (isLoading) {
    return <Skeleton className="h-full w-full min-h-[250px]" />;
  }

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4">
        <Wind className="h-6 w-6 text-muted-foreground" />
        <div>
            <CardTitle className="text-base font-semibold">Wind</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
                Current wind speed.
            </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 flex-1 flex flex-col justify-center items-center">
        {!weather ? (
            <p className="text-sm text-muted-foreground">No data available.</p>
        ) : (
             <div className="flex items-baseline">
                <div className="text-5xl font-bold">{weather.windspeed}</div>
                <span className="text-2xl text-muted-foreground">km/h</span>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
