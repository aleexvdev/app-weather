export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

interface Location {
  lat: number;
  lon: number;
  name: string;
}

interface CurrentForecast {
  coord?: {
    lon: number;
    lat: number;
  };
  weather?: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main?: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  wind?: {
    speed: number;
    deg: number;
    gust?: number;
  };
  rain?: {
    "1h"?: number;
  };
  clouds?: {
    all: number;
  };
  dt?: number;
  sys?: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone?: number;
  id?: number;
  name?: string;
  cod?: number;
}

interface ForecastState {
  currentForecast: CurrentForecast | null;
  location: Location | null;
  loading: boolean;
  error: string | null;
  setLocation: (lat: number, lon: number, name: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentForecast: (forecast: CurrentForecast) => void;
  fetchForecast: (lat: number, lon: number) => Promise<void>;
}