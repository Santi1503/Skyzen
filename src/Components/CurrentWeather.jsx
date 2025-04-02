import { motion } from "framer-motion";
import { FiDroplet, FiWind, FiEye } from "react-icons/fi";
import PropTypes from "prop-types";

const CurrentWeather = ({ weatherData, locationName }) => {
  if (!weatherData) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;

  return (
    <motion.div
      className="glass p-6 rounded-3xl overflow-hidden"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-blue-900">{locationName}</h2>
            <p className="text-blue-800 text-lg">
              {new Date().toLocaleString("en-EN", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
          </div>

          <div className="flex items-center mt-4">
            <div className="flex-1">
              <motion.div
                className="text-6xl font-bold text-blue-900"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {Math.round(weatherData.main.temp)}°C
              </motion.div>
              <p className="text-blue-800 capitalize">
                {weatherData.weather[0].description}
              </p>

              <div className="flex mt-2 text-blue-800">
                <span className="mx-2">
                  Min: {Math.round(weatherData.main.temp_min)}°C
                </span>
                <span className="mx-2"> | </span>
                <span className="mx-2">
                  Max: {Math.round(weatherData.main.temp_max)}°C
                </span>
              </div>
            </div>

            <motion.img
              src={iconUrl}
              alt={weatherData.weather[0].description}
              className="w-32 h-32"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.3 }}
            />
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-4 rounded-2xl">
              <div className="flex items-center text-blue-800 mb-1">
                <FiDroplet className="mr-2" />
                <span>Humidity</span>
              </div>
              <p className="text-2xl font-semibold text-blue-900">
                {weatherData.main.humidity}%
              </p>
            </div>

            <div className="glass p-4 rounded-2xl">
              <div className="flex items-center text-blue-800 mb-1">
                <FiWind className="mr-2" />
                <span>Wind</span>
              </div>
              <p className="text-2xl font-semibold text-blue-900">
                {(weatherData.wind.speed * 3.6).toFixed(1)} km/h
              </p>
            </div>

            <div className="glass p-4 rounded-2xl">
              <div className="flex items-center text-blue-800 mb-1">
                <FiEye className="mr-2" />
                <span>Vision</span>
              </div>
              <p className="text-2xl font-semibold text-blue-900">
                {(weatherData.visibility / 1000).toFixed(1)} km
              </p>
            </div>

            <div className="glass p-4 rounded-2xl">
              <div className="flex items-center text-blue-800 mb-1">
                <span className="mr-2">🌡️</span>
                <span>Feels like</span>
              </div>
              <p className="text-2xl font-semibold text-blue-900">
                {Math.round(weatherData.main.feels_like)}°C
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

CurrentWeather.propTypes = {
  weatherData: PropTypes.object,
  locationName: PropTypes.string,
};

export default CurrentWeather;
