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
import { CalendarDays } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function Forecast() {
  const { forecast, isLoading } = useWeatherData();

  if (isLoading) {
    return <Skeleton className="h-full w-full min-h-[250px]" />;
  }

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4">
        <CalendarDays className="h-8 w-8 text-primary" />
        <div>
          <CardTitle className="text-2xl font-bold animated-gradient-text">7-Day Forecast</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Upcoming weather conditions.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center p-0">
        {!forecast || forecast.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">No forecast data available.</p>
          </div>
        ) : (
          <ScrollArea className="h-full">
            <div className="flex flex-col p-6 pt-0">
              {forecast.map((day, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b last:border-b-0"
                >
                  <p className="text-sm font-medium w-12">{day.date}</p>
                  <div className="h-6 w-6 text-primary flex-shrink-0">
                    <WeatherIcon condition={day.condition} />
                  </div>
                  <div className="flex items-center space-x-2 text-sm w-24 justify-end">
                    <p className="font-semibold">{day.maxTemp}°</p>
                    <p className="text-muted-foreground">{day.minTemp}°</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
