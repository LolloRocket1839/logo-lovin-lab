// Jungle Rent Service Worker for Push Notifications + Asset Caching

const CACHE_NAME = 'jungle-rent-v2';
const STATIC_CACHE = 'jungle-rent-static-v1';

// Static assets to cache on install
const PRECACHE_URLS = [
  '/jungle-rent-logo.svg',
  '/favicon.ico',
];

// Install event - precache critical assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME && key !== STATIC_CACHE)
          .map(key => caches.delete(key))
      )
    ).then(() => clients.claim())
  );
});

// Fetch event - stale-while-revalidate for assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Only cache same-origin GET requests
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  
  // Cache JS, CSS, images, fonts
  const isAsset = /\.(js|css|png|jpg|jpeg|webp|svg|woff2?|ttf)(\?|$)/.test(url.pathname);
  const isImage = url.pathname.startsWith('/images/');
  
  if (isAsset || isImage) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(cache =>
        cache.match(request).then(cached => {
          const fetchPromise = fetch(request).then(response => {
            if (response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          }).catch(() => cached);
          
          return cached || fetchPromise;
        })
      )
    );
  }
});

// Push notification event
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  
  let data = {
    title: 'Jungle Rent',
    body: 'Nuovi aggiornamenti sui prezzi degli affitti a Torino',
    icon: '/jungle-rent-logo.svg',
    badge: '/favicon.ico',
    url: '/studenti/strumenti/calcolatore-budget'
  };
  
  if (event.data) {
    try {
      const payload = event.data.json();
      data = {
        title: payload.title || data.title,
        body: payload.body || payload.message || data.body,
        icon: payload.icon || data.icon,
        badge: payload.badge || data.badge,
        url: payload.url || data.url
      };
    } catch (e) {
      data.body = event.data.text();
    }
  }
  
  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
    vibrate: [100, 50, 100],
    data: {
      url: data.url,
      dateOfArrival: Date.now()
    },
    actions: [
      { action: 'view', title: 'Vedi dettagli' },
      { action: 'close', title: 'Chiudi' }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/studenti/strumenti/calcolatore-budget';
  
  if (event.action === 'view' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then((windowClients) => {
          for (const client of windowClients) {
            if (client.url.includes(self.location.origin) && 'focus' in client) {
              client.navigate(url);
              return client.focus();
            }
          }
          if (clients.openWindow) {
            return clients.openWindow(url);
          }
        })
    );
  }
});

self.addEventListener('notificationclose', () => {});
self.addEventListener('sync', () => {});
