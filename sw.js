const cacheName = 'fudbal-radar-v1';
const assetsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});

self.addEventListener('push', event => {
  const data = event.data ? event.data.text() : 'Nova fudbalska dešavanja na radaru!';
  event.waitUntil(
    self.registration.showNotification('Fudbal Radar', {
      body: data,
      icon: 'https://img.icons8.com/color/192/soccer-ball--v1.png',
      vibrate: [300, 110, 300]
    })
  );
});
