import { create } from 'zustand';
import { GeolocationState } from '@/types/geolocationTypes';

const BASE_URL = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
const defaultCities = [
  { name: "New York", lat: 40.7128, lon: -74.006, country: "US", state: "NY", local_names: { es: "Nueva York" } },
  { name: "London", lat: 51.5074, lon: -0.1278, country: "GB", state: "England", local_names: { es: "Londres" } },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503, country: "JP", state: "Tokyo", local_names: { es: "Tokio" } },
  { name: "Paris", lat: 48.8566, lon: 2.3522, country: "FR", state: "Île-de-France", local_names: { es: "París" } },
  { name: "Sydney", lat: -33.8688, lon: 151.2093, country: "AU", state: "New South Wales", local_names: { es: "Sídney" } },
];

export const useGeolocationStore = create<GeolocationState>((set) => ({
  geolocation: defaultCities,
  loading: false,
  error: null,
  setGeolocation: (geolocation) => set({ geolocation }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  fetchGeolocation: async (query) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${BASE_URL}/geo/1.0/direct?q=${query}&limit=10&appid=${API_KEY}`);
      if (!response.ok) throw new Error('Failed to fetch geolocation data');
      const data = await response.json();
      set({ geolocation: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    } finally {
      set({ loading: false });
    }
  },
}));