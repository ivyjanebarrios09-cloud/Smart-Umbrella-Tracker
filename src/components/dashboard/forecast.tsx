'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherIcon } from '@/lib/icons';
import type { ForecastDay } from '@/lib/data';
import { useWeatherData } from '@/hooks/use-weather-data';
import { Skeleton } from '@/components/ui/skeleton';

export function Forecast() {
  const { forecast, isLoading } = useWeatherData();

  if (isLoading) {
      return <Skeleton className="h-full w-full" />
  }

  if (!forecast || forecast.length === 0) {
    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle className="text-base">7-Day Forecast</CardTitle>
            </CardHeader>
            <CardContent>
                 <p>Forecast data not available.</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card className="flex-1 flex flex-col">
        <CardHeader>
            <CardTitle className="text-base">7-Day Forecast</CardTitle>
        </CardHeader>
      <CardContent className="p-4 flex-1 flex items-center">
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent>
            {forecast.map((day, index) => (
              <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/4">
                <div className="p-1 h-full">
                  <div className="flex flex-col h-full items-center justify-center space-y-1 rounded-lg border bg-card p-2">
                    <p className="text-xs font-medium">{day.date}</p>
                    <div className="h-6 w-6 text-primary">
                        <WeatherIcon condition={day.condition} />
                    </div>
                    <div className="text-center">
                        <p className="font-semibold text-sm">{day.maxTemp}°</p>
                        <p className="text-muted-foreground text-xs">{day.minTemp}°</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </CardContent>
    </Card>
  );
}
