import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiMapPin } from "react-icons/fi";
import CurrentWeather from "../Components/CurrentWeather";
import ForecastList from "../Components/ForecastList";
import SavedLocationsList from "../Components/SavedLocationsList";
import PropTypes from "prop-types";

const WeatherDashboard = ({
  currentLocation,
  savedLocations,
  weatherData,
  onAddLocation,
  onRemoveLocation,
  error,
}) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (currentLocation && weatherData[currentLocation.name]) {
      setSelectedLocation(currentLocation.name);
    } else if (savedLocations.length > 0) {
      setSelectedLocation(savedLocations[0].name);
    }
  }, [currentLocation, weatherData, savedLocations]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold text-blue-900">Skyzen</h1>
        <motion.button
          onClick={onAddLocation}
          className="glass p-3 rounded-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiPlus className="text-blue-900" size={24} />
        </motion.button>
      </motion.div>

      {error && (
        <motion.div
          variants={itemVariants}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
        >
          {error}
        </motion.div>
      )}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="md:col-span-1 glass p-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">
            Locations
          </h2>

          {currentLocation && weatherData[currentLocation.name] && (
            <div
              className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer ${
                selectedLocation === currentLocation.name
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => setSelectedLocation(currentLocation.name)}
            >
              <FiMapPin className="mr-2" />
              <span>Current Location - {currentLocation.name}</span>
            </div>
          )}

          <SavedLocationsList
            locations={savedLocations}
            selectedLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
            onRemoveLocation={onRemoveLocation}
            weatherData={weatherData}
          />
        </div>

        <div className="md:col-span-3">
          {selectedLocation && weatherData[selectedLocation] ? (
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 gap-4"
            >
              <CurrentWeather
                weatherData={weatherData[selectedLocation].current}
                locationName={selectedLocation}
              />

              <ForecastList
                forecastData={weatherData[selectedLocation].forecast}
                locationName={selectedLocation}
              />
            </motion.div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="glass p-6 text-center"
            >
              <p className="text-blue-900">
                {savedLocations.length === 0 && !currentLocation
                  ? "To get started, add a location or activate real time location."
                  : "Loading weather data..."}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

WeatherDashboard.propTypes = {
  currentLocation: PropTypes.object,
  savedLocations: PropTypes.array.isRequired,
  weatherData: PropTypes.object.isRequired,
  onAddLocation: PropTypes.func.isRequired,
  onRemoveLocation: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default WeatherDashboard;
