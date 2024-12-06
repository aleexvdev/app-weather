// import { ApiResponse } from "@/types/forecastTypes";
import { NextRequest, NextResponse } from "next/server";

interface WeatherData {
  coord: { lon: number; lat: number };
  weather: { id: number; main: string; description: string; icon: string }[];
  main: { temp: number; feels_like: number; temp_min: number; temp_max: number; pressure: number; humidity: number };
  wind: { speed: number; deg: number };
  clouds: { all: number };
  sys: { country: string; sunrise: number; sunset: number };
  name: string;
}


async function fetchWeatherData(lat: string, lon: string, apiKey: string): Promise<WeatherData> {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: "API key is missing" },
        { status: 500 }
      );
    }

    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json(
        { success: false, message: "Latitude and longitude are required" },
        { status: 400 }
      );
    }

    const weatherData = await fetchWeatherData(lat, lon, apiKey);

    return NextResponse.json({
      success: true,
      data: weatherData,
    });
  } catch (error) {
    const errorMessage = (error as Error).message || "Unknown error occurred";
    console.error("Error fetching forecast data:", errorMessage);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch forecast data",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}