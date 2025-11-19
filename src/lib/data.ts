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
