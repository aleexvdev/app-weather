import { UvIndexState } from '@/types/uvIndexTypes';
import { create } from 'zustand';

export const useUvIndexStore = create<UvIndexState>((set) => ({
  uvIndex: null,
  loading: false,
  error: null,
  setUvIndex: (uvIndex) => set({ uvIndex }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  fetchUvIndex: async (lat, lon) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`
      );
      if (!response.ok) throw new Error('Failed to fetch weather data');
      const data = await response.json();
      set({ uvIndex: data.daily.uv_index_max[0], loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    } finally {
      set({ loading: false })
    }
  }
}));