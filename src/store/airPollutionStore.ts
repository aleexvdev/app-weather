import { AirPollutionState } from '@/types/airPollutionTypes';
import { create } from 'zustand';

const BASE_URL = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

export const useAirPollutionStore = create<AirPollutionState>((set) => ({
  airPollution: null,
  loading: false,
  error: null,
  setAirPollution: (airPollution) => set({ airPollution: airPollution }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  fetchAirPollution: async (lat, lon) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `${BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error('Failed to fetch air pollution data');
      const data = await response.json();
      set({ airPollution: data, loading: false });  
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    } finally {
      set({ loading: false })
    }
  },
}));
