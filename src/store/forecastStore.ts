import { ForecastState } from '@/types';
import { create } from 'zustand';

const BASE_URL = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

export const useForecastStore = create<ForecastState>((set) => ({
  currentForecast: null,
  loading: false,
  error: null,
  location: {
    lat: 44.34,
    lon: 10.99,
    name: 'Province of Turin',
  },
  setCurrentForecast: (forecast) => set({ currentForecast: forecast }),
  setLocation: (lat, lon, name) => set({ location: { lat, lon, name } }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  fetchForecast: async (lat, lon) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error('Failed to fetch weather data');
      const data = await response.json();
      set({ currentForecast: data, loading: false });  
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    } finally {
      set({ loading: false })
    }
  },
}));
