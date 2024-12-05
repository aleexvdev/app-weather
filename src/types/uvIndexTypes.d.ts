interface DailyUnits {
  time: string;
  uv_index_max: string;
}

interface DailyData {
  time: number[]; 
  uv_index_max: number[];
}

interface UvIndex {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: DailyUnits;
  daily: DailyData;
}

export interface UvIndexState {
  uvIndex: number | null;
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUvIndex: (uvIndex: number) => void;
  fetchUvIndex: (lat: number, lon: number) => Promise<void>;
}