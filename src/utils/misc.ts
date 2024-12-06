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

export const unixToDay = (unix: number) => {
  return moment.unix(unix).format("ddd");
};

export const unixToTime = (unix: number, timezone: number) => {
  return moment
    .unix(unix)
    .utcOffset(timezone / 60)
    .format("HH:mm");
};

export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num;
  }
};
