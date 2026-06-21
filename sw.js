const CACHE_NAME = "cfe-tacuba-v1";

// Aquí le decimos qué archivos debe descargar y guardar en el celular
const archivosParaCache = [
    "./",
    "./index.html",
    "./manifest.json",
    "./icono-192.png",
    "./icono-512.png"
];

// Al instalarse, el motor guarda los archivos en la memoria del teléfono
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Instalado y guardando caché ⚡');
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(archivosParaCache);
        })
    );
    self.skipWaiting();
});

// Cuando la app pide un archivo, primero lo busca en el celular (offline) y si no, usa internet
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
