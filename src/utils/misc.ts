import moment from "moment";

export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

export const airQulaityIndexText = [
  { rating: 10, description: "Very Good", color: "bg-green-400" },
  { rating: 20, description: "Good", color: "bg-yellow-300" },
  { rating: 30, description: "Moderate", color: "bg-orange-400" },
  { rating: 40, description: "Poor", color: "bg-red-500" },
  { rating: 50, description: "Very Poor", color: "bg-purple-500" },
  { rating: 60, description: "Hazardous", color: "bg-burgundy" },
];


export const unixToTime = (unix: number, timezone: number) => {
  return moment
    .unix(unix)
    .utcOffset(timezone / 60)
    .format("HH:mm");
};