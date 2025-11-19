import { subDays, format } from 'date-fns';

export type CurrentWeather = {
  temperature: number;
  condition: string;
  windSpeed: number;
};

export type ForecastDay = {
  date: string;
  condition: string;
  maxTemp: number;
  minTemp: number;
};

export type UmbrellaLocation = {
  lat: number;
  lng: number;
  lastSeen: string;
};

export const getDashboardData = async (): Promise<{
  currentWeather: CurrentWeather;
  forecast: ForecastDay[];
  umbrellaLocation: UmbrellaLocation;
}> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const today = new Date();

  return {
    currentWeather: {
      temperature: 18,
      condition: 'Rain',
      windSpeed: 15,
    },
    forecast: Array.from({ length: 7 }).map((_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const conditions = ['Sunny', 'Cloudy', 'Rain', 'Cloudy', 'Sunny', 'Rain', 'Sunny'];
      return {
        date: format(date, 'EEE'),
        condition: conditions[i],
        maxTemp: 20 + Math.floor(Math.random() * 5),
        minTemp: 10 + Math.floor(Math.random() * 5),
      };
    }),
    umbrellaLocation: {
      lat: 34.052235,
      lng: -118.243683,
      lastSeen: format(subDays(today, 2), "MMM d, yyyy 'at' h:mm a"),
    },
  };
};

// Functions for client-side updates
export const getCurrentWeather = async (): Promise<CurrentWeather> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return {
    temperature: 18 + Math.round(Math.random() * 2 - 1),
    condition: Math.random() > 0.5 ? 'Rain' : 'Cloudy',
    windSpeed: 15 + Math.round(Math.random() * 4 - 2),
  };
};

export const getUmbrellaLocation = async (): Promise<UmbrellaLocation> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return {
      lat: 34.052235 + (Math.random() - 0.5) * 0.01,
      lng: -118.243683 + (Math.random() - 0.5) * 0.01,
      lastSeen: format(new Date(), "MMM d, yyyy 'at' h:mm a"),
  };
};
