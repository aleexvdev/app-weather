import { LocationState } from '@/types/locationTypes';
import { initialLocation } from '@/utils/data';
import { create } from 'zustand';

export const useLocationStore = create<LocationState>((set) => ({
  location: initialLocation,
  setLocation: (lat, lon, name) => set({ location: { lat, lon, name } }),
}));