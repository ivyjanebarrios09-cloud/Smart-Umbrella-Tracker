'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherIcon } from '@/lib/icons';
import { Thermometer, Wind } from 'lucide-react';
import type { CurrentWeather } from '@/lib/data';
import { getCurrentWeather } from '@/lib/data';

export function CurrentWeatherCard({ initialWeather }: { initialWeather: CurrentWeather }) {
  const [weather, setWeather] = useState(initialWeather);

  useEffect(() => {
    const interval = setInterval(async () => {
      const newWeather = await getCurrentWeather();
      setWeather(newWeather);
    }, 30000); // Auto-refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

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
                <Wind className="mr-1 h-4 w-4" /> {weather.windSpeed} km/h
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
