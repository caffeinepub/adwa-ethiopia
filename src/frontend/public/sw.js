// Service Worker for Adwa Ethiopia
// Developed by Helen Metekiya

const CACHE_NAME = 'adwa-ethiopia-v4';
const OFFLINE_URL = '/offline.html';

const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/assets/generated/icon-512x512.dim_512x512.png',
  '/assets/generated/icon-192x192.dim_192x192.png'
];

// Install - pre-cache critical assets
self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
});

// Activate - clean old caches and claim clients
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(name) { return name !== CACHE_NAME; })
          .map(function(name) { return caches.delete(name); })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Fetch - stale-while-revalidate for assets, network-first for HTML
self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  const isNavigation = event.request.mode === 'navigate';
  const isAsset = event.request.destination === 'image' ||
                  event.request.destination === 'style' ||
                  event.request.destination === 'script' ||
                  event.request.destination === 'font';

  if (isAsset) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(cached) {
          const networkFetch = fetch(event.request).then(function(response) {
            if (response && response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          });
          return cached || networkFetch;
        });
      })
    );
  } else if (isNavigation) {
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(OFFLINE_URL);
      })
    );
  } else {
    event.respondWith(
      fetch(event.request)
        .then(function(response) {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(function() {
          return caches.match(event.request).then(function(cached) {
            return cached || caches.match(OFFLINE_URL);
          });
        })
    );
  }
});

// Background sync
self.addEventListener('sync', function(event) {
  if (event.tag === 'background-sync') {
    event.waitUntil(Promise.resolve());
  }
});

// Periodic background sync
self.addEventListener('periodicsync', function(event) {
  if (event.tag === 'content-sync') {
    event.waitUntil(Promise.resolve());
  }
});

// Push notifications
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json().catch(() => ({ title: 'Adwa Ethiopia', body: event.data.text() })) : Promise.resolve({ title: 'Adwa Ethiopia', body: 'New update from Adwa Ethiopia' });
  event.waitUntil(
    data.then(function(payload) {
      return self.registration.showNotification(payload.title || 'Adwa Ethiopia', {
        body: payload.body || 'New update from Adwa Ethiopia',
        icon: '/assets/generated/icon-512x512.dim_512x512.png',
        badge: '/assets/generated/icon-192x192.dim_192x192.png',
        vibrate: [100, 50, 100],
        data: { url: payload.url || '/', dateOfArrival: Date.now() },
        actions: [
          { action: 'open', title: 'Open', icon: '/assets/generated/icon-192x192.dim_192x192.png' },
          { action: 'close', title: 'Close' }
        ]
      });
    })
  );
});

// Push subscription change
self.addEventListener('pushsubscriptionchange', function(event) {
  event.waitUntil(
    self.registration.pushManager.subscribe(event.oldSubscription.options)
      .then(function(subscription) {
        return fetch('/api/push-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subscription)
        }).catch(() => {});
      }).catch(() => {})
  );
});

// Notification click
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'close') return;
  const url = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// Message handler
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// File handler launch
self.addEventListener('launch', function(event) {
  event.waitUntil(clients.openWindow('/'));
});
