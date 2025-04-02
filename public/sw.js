// Nombre del cache
const CACHE_NAME = 'clima-app-cache-v1';

// Archivos para cachear inicialmente
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/index.css', // Ajusta según la estructura que genera Vite
  '/assets/index.js',  // Ajusta según la estructura que genera Vite
  // Agrega otros recursos estáticos que necesites cachear
  '/icons/sun.svg',
  '/icons/cloud.svg',
  '/icons/rain.svg',
  '/icons/snow.svg',
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Elimina los caches antiguos que no estén en la lista blanca
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estrategia "Cache First, then Network"
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - retorna la respuesta del cache
        if (response) {
          return response;
        }

        // Clona la petición
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          (response) => {
            // Verifica si la respuesta es válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clona la respuesta
            const responseToCache = response.clone();

            // Guarda la respuesta en el cache
            caches.open(CACHE_NAME)
              .then((cache) => {
                // No cachear llamadas a la API de clima
                if (!event.request.url.includes('api.weather')) {
                  cache.put(event.request, responseToCache);
                }
              });

            return response;
          }
        ).catch(() => {
          // Si la red falla y es una solicitud de página, muestra una página offline
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        });
      })
  );
});

// Manejador para cuando la app está offline
self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});