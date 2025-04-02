# Weather Application

Una aplicación web moderna para consultar el clima en tiempo real, desarrollada con React y Vite.

## Características

- 🌍 Geolocalización automática para obtener el clima de tu ubicación actual
- 📍 Búsqueda y guardado de múltiples ubicaciones
- 🌤️ Visualización del clima actual con detalles completos
- 📅 Pronóstico del tiempo para los próximos días
- 💾 Persistencia de datos usando localStorage
- 🎨 Interfaz de usuario moderna y responsiva
- ⚡ Animaciones suaves con Framer Motion

## Tecnologías Utilizadas

- React + Vite
- Tailwind CSS para estilos
- Framer Motion para animaciones
- OpenStreetMap para geocodificación
- OpenWeather API para datos meteorológicos

## Estructura del Proyecto

```
src/
├── Components/
│   ├── CurrentWeather.jsx
│   ├── ForecastList.jsx
│   ├── LoadingScreen.jsx
│   ├── LocationModal.jsx
│   └── SavedLocationsList.jsx
├── Pages/
│   └── WeatherDashboard.jsx
├── Services/
│   └── weatherService.js
├── Hooks/
│   └── useLocalStorage.js
├── App.jsx
└── main.jsx
```

## Instalación

1. Clona el repositorio
2. Instala las dependencias:
```bash
npm install
```
3. Crea un archivo `.env` en la raíz del proyecto y añade tu API key de OpenWeather:
```
VITE_OPENWEATHER_API_KEY=tu_api_key
```
4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## Uso

- La aplicación detectará automáticamente tu ubicación al cargar
- Puedes añadir nuevas ubicaciones usando el botón "+"
- Las ubicaciones guardadas se mantienen incluso después de cerrar el navegador
- Puedes eliminar ubicaciones guardadas usando el botón de eliminar
- Navega entre las diferentes ubicaciones para ver su clima actual y pronóstico

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

## Licencia

MIT
