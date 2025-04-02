import { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiSearch } from "react-icons/fi";
import axios from "axios";
import PropTypes from "prop-types";

const LocationModal = ({ isOpen, onClose, onAddLocation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.OPEN_WEATHER_API;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  };

  const searchLocation = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weatherq=${searchQuery}&units=metric&appid=${API_KEY}`);

      setSearchResults(
        response.data.map((item) => ({
          name:
            item.name +
            (item.state ? `, ${item.state}` : "") +
            `, ${item.country}`,
          lat: item.lat,
          lon: item.lon,
        }))
      );

      if (response.data.length === 0) {
        setError("Locations not found. Please try another search.");
      }
    } catch (err) {
      console.error("Error searching location: ", err);
      setError("Error searching location. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-59 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass p-6 rounded-3xl w-full max-w-md"
        variants={modalVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-900">Add Location</h2>
          <motion.button
            className="text-blue-900 p-2 rounded-full hover:bg-blue-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
          >
            <FiX size={24} />
          </motion.button>
        </div>

        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Search city..."
            className="glass p-3 rounded-l-lg flex-1 border-r-0 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDownCapture={(e) => e.key === "Enter" && searchLocation()}
          />
          <motion.button
            className="glass p-3 rounded-r-lg bg-blue-500 text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={searchLocation}
            disabled={isSearching}
          >
            {isSearching ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FiSearch size={20} />
            )}
          </motion.button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="max-h-60 overflow-y-auto">
          {searchResults.map((result, index) => (
            <motion.div
              key={`${result.name}-${index}`}
              className="p-3 mb-2 border border-blue-100 rounded-lg hover:bg-blue-50 cursor-pointer"
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(59, 130, 246, 0.1",
              }}
              onClick={() => onAddLocation(result)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <p className="font-medium text-blue-900">{result.name}</p>
              <p className="text-sm text-blue-700">
                {result.lat.toFixed(2)}, {result.lon.toFixed(2)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

LocationModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onAddLocation: PropTypes.func.isRequired,
};

export default LocationModal;
