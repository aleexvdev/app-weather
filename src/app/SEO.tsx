import Head from "next/head";

export const SEO = () => {
  return (
    <Head>
      <title>Weather Dashboard App | Real-Time Weather, Forecast & More</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="keywords"
        content="Weather app, real-time weather, 5-day forecast, responsive weather app, air quality, UV index, sunrise times, weather dashboard"
      />
      <meta name="author" content="aleexvdev" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph para redes sociales */}
      <meta
        property="og:title"
        content="Weather Dashboard App | Real-Time Weather, Forecast & More"
      />
      <meta
        property="og:description"
        content="Get instant access to real-time weather data, 5-day forecasts, and detailed information on temperature, wind, and air quality. Available on any device."
      />
      <meta property="og:url" content="https://app-weather-v2.vercel.app/" />
      <meta
        property="og:image"
        content="https://app-weather-v2.vercel.app/og-image.png"
      />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Weather Dashboard App | Real-Time Weather, Forecast & More"
      />
      <meta
        name="twitter:description"
        content="Plan your week with detailed weather forecasts and real-time updates for any city worldwide."
      />
      <meta
        name="twitter:image"
        content="https://app-weather-v2.vercel.app/og-image.png"
      />
      <meta name="twitter:creator" content="@aleexvdev" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />

      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />

      <link
        href="https://unpkg.com/maplibre-gl@^4.7.1/dist/maplibre-gl.css"
        rel="stylesheet"
      />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Weather Dashboard App",
          description:
            "An interactive weather dashboard providing real-time weather updates, 5-day forecasts, and detailed weather information such as UV index, air quality, sunrise times, and more.",
          url: "https://app-weather-v2.vercel.app/",
          applicationCategory: "Weather",
          operatingSystem: "All",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          features: [
            "Real-Time Weather Data",
            "5-Day Forecast",
            "Dark/Light Mode",
            "Recent Searches",
            "Responsive Design",
            "Weather Details including Temperature, Humidity, Wind Speed, and more",
          ],
          image: "https://app-weather-v2.vercel.app/og-image.png",
          creator: {
            "@type": "Person",
            name: "aleexvdev",
          },
        })}
      </script>
    </Head>
  );
};
