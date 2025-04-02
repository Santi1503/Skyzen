/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";
import PropTypes from "prop-types";

const SavedLocationsList = ({
  locations,
  selectedLocation,
  onSelectLocation,
  onRemoveLocation,
  weatherData,
}) => {
  if (!locations || locations.length === 0) {
    return (
      <div className="text-center p-4 text-blue-800">
        <p>There are 0 Saved Locations</p>
        <p className="text-sm mt-2">Click on + to add</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {locations.map((location) => (
        <motion.div
          key={location.name}
          className={`flex justify-between items-center p-3 rounded-lg cursor-pointer ${
            selectedLocation === location.name
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-100"
          }`}
          onClick={() => onSelectLocation(location.name)}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex flex-col">
            <span className="font-medium">{location.name}</span>
            {weatherData[location.name] && (
              <span className="text-sm">
                {Math.round(weatherData[location.name].current.main.temp)}°C
              </span>
            )}
          </div>
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveLocation(location.name);
            }}
            className={`p-1 rounded-full ${
              selectedLocation === location.name
                ? "text-white hover:bg-blue-600"
                : "text-red-500 hover:bg-red-100"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiTrash2 size={16} />
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
};

SavedLocationsList.propTypes = {
  locations: PropTypes.array,
  locationName: PropTypes.string,
};

export default SavedLocationsList;
