//Definiendo recursos a mantener (caching)
const cacheName = 'cache-v1.2'
const resourceToPrecache = [
  '/',
  'styles/main.css',
  'img/Museum.jpg'
]

// Primera navegación
self.addEventListener('install', event =>{
  console.log("[ServiceWorker]: Installed!")
  // Agregar recursos al caché
  event.waitUntil(
    caches.open(cacheName)
      .then(cache =>{
        console.log("[ServiceWorker]: sending files to cache")
        return cache.addAll(resourceToPrecache)
      })
  )
})

// Segunda y siguientes navegaciones
self.addEventListener('activate', event =>{
  console.log("[ServiceWorker]: Activated!")
})

// Solicitud de recursos
self.addEventListener('fetch', event =>{
  console.log(`[ServiceWorker]: Trying to access to ${event.request.url}`)
  // Aplicar estrategia Cache-first
  event.respondWith(caches.match(event.request)
    .then(cachedResponse =>{
      return cachedResponse || fetch (event.request)
    })
  )
})
