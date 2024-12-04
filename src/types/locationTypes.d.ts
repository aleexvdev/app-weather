export interface Location {
  lat: number;
  lon: number;
  name: string;
}

export interface LocationState {
  location: Location;
  setLocation: (lat: number, lon: number, name: string) => void;
}