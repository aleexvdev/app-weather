interface LocalNames {
  [key: string]: string;
}

interface Geolocation {
  name: string;
  local_names: LocalNames;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export interface GeolocationState {
  geolocation: Geolocation[] | null;
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setGeolocation: (geolocation: Geolocation[]) => void;
  fetchGeolocation: (query: string) => Promise<void>;
}