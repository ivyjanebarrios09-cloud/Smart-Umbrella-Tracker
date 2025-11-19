import { collection, query, where, getDocs, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { format } from 'date-fns';

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

// This function now fetches data from Firestore.
// It's a server-side function.
export const getDashboardData = async (): Promise<{
  currentWeather: CurrentWeather | null;
  forecast: ForecastDay[] | null;
  umbrellaLocation: UmbrellaLocation | null;
}> => {
  try {
    // Fetch latest weather data
    const weatherQuery = query(collection(db, 'weather'), limit(1)); // Simplified: get any document
    const weatherSnapshot = await getDocs(weatherQuery);

    let currentWeather: CurrentWeather | null = null;
    let forecast: ForecastDay[] | null = null;

    if (!weatherSnapshot.empty) {
      const weatherData = weatherSnapshot.docs[0].data();
      if (weatherData.current) {
        currentWeather = {
          temperature: weatherData.current.temperature,
          condition: weatherData.current.condition,
          windSpeed: weatherData.current.wind_speed,
        };
      }
      if (weatherData.forecast_daily_raw) {
        forecast = weatherData.forecast_daily_raw.time.map((t: string, i: number) => ({
           date: format(new Date(t), 'EEE'),
           condition: 'Cloudy', // Placeholder, real app would map weather_code
           maxTemp: weatherData.forecast_daily_raw.temperature_2m_max[i],
           minTemp: weatherData.forecast_daily_raw.temperature_2m_min[i],
        }));
      }
    }

    // Fetch latest umbrella location
    const locationQuery = query(collection(db, 'locations'), limit(1));
    const locationSnapshot = await getDocs(locationQuery);
    let umbrellaLocation: UmbrellaLocation | null = null;

    if (!locationSnapshot.empty) {
      const locationData = locationSnapshot.docs[0].data();
      umbrellaLocation = {
        lat: locationData.latitude,
        lng: locationData.longitude,
        lastSeen: format(locationData.timestamp.toDate(), "MMM d, yyyy 'at' h:mm a"),
      };
    }
    
    return { currentWeather, forecast, umbrellaLocation };

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      currentWeather: null,
      forecast: [],
      umbrellaLocation: null,
    };
  }
};

// Client-side function to get umbrella location, using a hook is better
export const getUmbrellaLocation = async (): Promise<UmbrellaLocation | null> => {
    try {
        const locationQuery = query(collection(db, 'locations'), limit(1));
        const locationSnapshot = await getDocs(locationQuery);

        if (!locationSnapshot.empty) {
            const locationData = locationSnapshot.docs[0].data();
            return {
                lat: locationData.latitude,
                lng: locationData.longitude,
                lastSeen: format(locationData.timestamp.toDate(), "MMM d, yyyy 'at' h:mm a"),
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching umbrella location:", error);
        return null;
    }
};

// Client-side function to get current weather, using a hook is better
export const getCurrentWeather = async (): Promise<CurrentWeather | null> => {
    try {
        const weatherQuery = query(collection(db, 'weather'), limit(1));
        const weatherSnapshot = await getDocs(weatherQuery);

        if (!weatherSnapshot.empty) {
            const weatherData = weatherSnapshot.docs[0].data();
             if (weatherData.current) {
                return {
                    temperature: weatherData.current.temperature,
                    condition: weatherData.current.condition,
                    windSpeed: weatherData.current.wind_speed,
                };
            }
        }
        return null;
    } catch (error) {
        console.error("Error fetching current weather:", error);
        return null;
    }
};
