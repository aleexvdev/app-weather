import { create } from 'zustand';
import { DailyForecastState } from '@/types/dailyForecastTypes';

const BASE_URL = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

export const useDailyForecastStore = create<DailyForecastState>((set) => ({
  dailyForecast: null,
  city: null,
  loading: false,
  error: null,
  setDailyForecast: (forecast) => set({ dailyForecast: forecast }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  fetchDailyForecast: async (lat, lon) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error('Failed to fetch weather data');
      const data = await response.json();
      set({ dailyForecast: data.list, city: data.city, loading: false });  
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    } finally {
      set({ loading: false })
    }
  },
}));