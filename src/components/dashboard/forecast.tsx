'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { WeatherIcon } from '@/lib/icons';
import type { ForecastDay } from '@/lib/data';

export function Forecast({ initialForecast }: { initialForecast: ForecastDay[] }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">7-Day Forecast</h3>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent>
            {initialForecast.map((day, index) => (
              <CarouselItem key={index} className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/7 xl:basis-[13%]">
                <div className="p-1">
                  <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border bg-card p-4 h-full">
                    <p className="text-sm font-medium">{day.date}</p>
                    <div className="h-8 w-8 text-primary">
                        <WeatherIcon condition={day.condition} />
                    </div>
                    <div className="text-center">
                        <p className="font-semibold">{day.maxTemp}°</p>
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
