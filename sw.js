// ¡IMPORTANTE! Cada vez que modifiques tu index.html, 
// debes cambiar este nombre (ej. v2 a v3, v3 a v4, etc.)
const CACHE_NAME = "cfe-tacuba-v2";

const archivosParaCache = [
    "./",
    "./index.html",
    "./manifest.json",
    "./icono-192.png",
    "./icono-512.png"
];

// Instala la nueva versión
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Instalado y guardando caché ⚡');
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(archivosParaCache);
        })
    );
    self.skipWaiting(); // Fuerza al SW a no esperar y actualizarse
});

// NUEVO: Borra el caché viejo cuando cambia la versión
self.addEventListener('activate', (e) => {
    console.log('[Service Worker] Activado, limpiando caché viejo 🧹');
    e.waitUntil(
        caches.keys().then((nombresDeCache) => {
            return Promise.all(
                nombresDeCache.map((nombre) => {
                    // Si el nombre del caché no es el actual, lo borra
                    if (nombre !== CACHE_NAME) {
                        console.log('[Service Worker] Borrando caché antiguo:', nombre);
                        return caches.delete(nombre);
                    }
                })
            );
        })
    );
    return self.clients.claim(); // Toma el control inmediato de la app
});

// Responde a las peticiones usando el caché o buscando en la red
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
