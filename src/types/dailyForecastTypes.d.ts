interface DailyForecast {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  dt_txt: string;
}

export interface DailyForecastState {
  dailyForecast: DailyForecast[] | null;
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setDailyForecast: (forecast: DailyForecast[]) => void;
  fetchDailyForecast: (lat: number, lon: number) => Promise<void>;
}