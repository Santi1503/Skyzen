import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster, toast } from 'react-hot-toast'

// Función para manejar actualizaciones del Service Worker
function ServiceWorkerUpdater() {
  const [waitingWorker, setWaitingWorker] = useState(null);
  const [showReload, setShowReload] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Escuchar actualizaciones del Service Worker
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });

      // Escuchar mensajes del Service Worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SKIP_WAITING') {
          setWaitingWorker(event.data.worker);
          setShowReload(true);
        }
      });
    }
  }, []);

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    setShowReload(false);
    toast.success('Nueva versión disponible. Actualizando...');
  };

  return showReload ? (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={reloadPage}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg"
      >
        Actualizar aplicación
      </button>
    </div>
  ) : null;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ServiceWorkerUpdater />
    <Toaster position="bottom-right" />
  </StrictMode>,
)
