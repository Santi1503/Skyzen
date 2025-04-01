import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ForecastList = ({ forecastData, locationName }) => {
  if (!forecastData || forecastData.length === 0) return null;

  const fiveDayForecast = forecastData.slice(0, 5);

  return (
    <motion.div
      className="glass p-6 rounded-3xl"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <h3 className="text-xl font-semibold text-blue-900 mb-4">
        Forecast for {locationName}
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {fiveDayForecast.map((day, index) => (
          <motion.div
            key={day.date}
            className="glass p-4 rounded-2xl flex flex-col justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="font-medium text-blue-800">
              {new Date(day.date).toLocaleDateString("en-EN", {
                weekday: "short",
                day: "numeric",
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}.png`}
              alt={day.most_common_weather}
              className="w-16 h-16 my-2"
            />
            <p className="text-sm text-blue-700 capitalize mb-1">
              {day.most_common_weather}
            </p>
            <p className="text-blue-900 font-semibold">
              {Math.round(day.temp_min)}°C / {Math.round(day.temp_max)}°C
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

ForecastList.propTypes = {
  forecastData: PropTypes.array,
  locationName: PropTypes.string,
};

export default ForecastList;
