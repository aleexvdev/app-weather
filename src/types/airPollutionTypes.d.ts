export interface AirPollution {
  coord: [number, number];
  list: {
    dt: number;
    main: { aqi: number };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
  }[];
}

export interface AirPollutionState {
  airPollution: AirPollution | null;
  loading: boolean;
  error: string | null;
  setAirPollution: (airPollution: AirPollution) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchAirPollution: (lat: number, lon: number) => Promise<void>;
}