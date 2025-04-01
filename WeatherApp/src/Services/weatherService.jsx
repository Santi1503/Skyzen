import axios from "axios";

export async function getWeatherData(lat, lon) {
  const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API;

  try {
    // Get current weather
    const currentResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${API_KEY}`
    );

    // Get future forecast
    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${API_KEY}`
    );

    return {
      current: currentResponse.data,
      forecast: processForecastData(forecastResponse.data),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

function processForecastData(data) {
  const dailyData = {};
  // Process forecast data to extract relevant information
  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();

    if (!dailyData[date]) {
      dailyData[date] = {
        date,
        temps: [],
        humidity: [],
        weather: [],
        wind: [],
        icons: [],
      };
    }

    dailyData[date].temps.push(item.main.temp);
    dailyData[date].humidity.push(item.main.humidity);
    dailyData[date].weather.push(item.weather[0].description);
    dailyData[date].wind.push(item.wind.speed);

    const hour = new Date(item.dt * 1000).getHours();
    if (hour >= 11 && hour <= 13) {
      dailyData[date].icon = item.weather[0].icon;
    }
  });

  return Object.values(dailyData)
    .slice(0, 5)
    .map((day) => {
      return {
        date: day.date,
        temp_min: Math.min(...day.temps),
        temp_max: Math.max(...day.temps),
        avg_humidity: Math.round(
          day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length
        ),
        most_common_weather: getMostFrequent(day.weather),
        avg_wind: (
          day.wind.reduce((a, b) => a + b, 0) / day.wind.length
        ).toFixed(1),
        icon: day.icon || day.icon || data.list[0].weather[0].icon,
      };
    });
}

function getMostFrequent(arr) {
  const hashmap = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(hashmap).reduce((a, b) =>
    hashmap[a] > hashmap[b] ? a : b
  );
}
