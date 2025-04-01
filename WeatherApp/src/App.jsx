import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WeatherDashboard from "./Pages/WeatherDashboard";
import LoadingScreen from "./Components/LoadingScreen";
import { getWeatherData } from "./Services/weatherService";
import { useLocalStorage } from "./Hooks/useLocalStorage";
import LocationModal from "./Components/LocationModal";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [savedLocations, setSavedLocations] = useLocalStorage(
    "savedLocations",
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
              );
              const data = await response.json();
              const locationName =
                data.address.city ||
                data.address.town ||
                data.address.village ||
                "Unknown Location";

              setCurrentLocation({
                lat,
                lon,
                name: locationName,
              });
            } catch (error) {
              console.error("Error fetching location name:", error);
              setCurrentLocation({
                lat,
                lon,
                name: "Unknown Location",
              });
            }
          },
          (err) => {
            console.error(err);
            setError("No se puede acceder a la ubicación actual");
          }
        );
      } else {
        setError("Tu navegador no soporta geolocalización");
      }
    }, 1500);
  }, []);

  useEffect(() => {
    // Load weather data
    const fetchAllWeatherData = async () => {
      if (currentLocation && currentLocation.name !== "Unknown Location") {
        try {
          const data = await getWeatherData(
            currentLocation.lat,
            currentLocation.lon
          );
          setWeatherData((prev) => ({
            ...prev,
            [currentLocation.name]: data,
          }));
        } catch (error) {
          console.error("Error fetching current location data:", error);
        }
      }

      for (const location of savedLocations) {
        try {
          const data = await getWeatherData(location.lat, location.lon);
          setWeatherData((prev) => ({
            ...prev,
            [location.name]: data,
          }));
        } catch (error) {
          console.error(
            `Error fetching saved location data for ${location.name}:`,
            error
          );
        }
      }
    };

    fetchAllWeatherData();
  }, [currentLocation, savedLocations]);

  const addLocation = (newLocation) => {
    setSavedLocations((prev) => [...prev, newLocation]);
    setIsModalOpen(false);
  };

  const removeLocation = (locationName) => {
    setSavedLocations((prev) =>
      prev.filter((loc) => loc.name !== locationName)
    );
    setWeatherData((prev) => {
      const newData = { ...prev };
      delete newData[locationName];
      return newData;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <AnimatePresence>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <WeatherDashboard
              currentLocation={currentLocation}
              savedLocations={savedLocations}
              weatherData={weatherData}
              onAddLocation={() => setIsModalOpen(true)}
              onRemoveLocation={removeLocation}
              error={error}
            />

            <AnimatePresence>
              {isModalOpen && (
                <LocationModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onAddLocation={addLocation}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
