'use client';
import { useMemoFirebase, useDoc, useFirestore, useUser } from '@/firebase';
import { doc } from 'firebase/firestore';
import { format } from 'date-fns';
import type { CurrentWeather, ForecastDay } from '@/lib/data';
import { useMemo } from 'react';

// Helper to safely parse JSON
const safeJsonParse = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
};

const mapWeatherCodeToCondition = (code: number): string => {
    if (code <= 1) return 'Sunny';
    if (code <= 3) return 'Cloudy';
    if (code >= 51 && code <= 67) return 'Rain';
    if (code >= 71 && code <= 77) return 'Snow';
    if (code >= 95) return 'Thunderstorm';
    return 'Cloudy';
}


export function useWeatherData() {
  const firestore = useFirestore();
  const { user } = useUser();

  const weatherDocRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid, 'weather', 'current');
  }, [firestore, user]);

  const { data, isLoading, error } = useDoc<{
    condition: string;
    temperature: number;
    windspeed: number;
    forecast_daily_raw: string;
  }>(weatherDocRef);

  const weather: CurrentWeather | null = useMemo(() => {
    if (data) {
      return {
        condition: data.condition,
        temperature: data.temperature,
        windspeed: data.windspeed,
      };
    }
    return null;
  }, [data]);

  const forecast: ForecastDay[] | null = useMemo(() => {
    if (data && data.forecast_daily_raw) {
      const rawForecast = safeJsonParse(data.forecast_daily_raw);
      if (rawForecast && rawForecast.time) {
        return rawForecast.time.map((t: string, i: number) => ({
          date: format(new Date(t), 'EEE'),
          condition: mapWeatherCodeToCondition(rawForecast.weathercode[i]),
          maxTemp: rawForecast.temperature_2m_max[i],
          minTemp: rawForecast.temperature_2m_min[i],
        }));
      }
    }
    return [];
  }, [data]);

  return { weather, forecast, isLoading, error };
}
