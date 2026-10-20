const CACHE_NAME = 'barrelorgan-v1';
const OFFLINE_URL = './index.html';
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        "/",
        "./index.html",
        "./index2.html",
        "./script.js",
          "./style.css",
          "./teclado.js",
          "./samples.js",
      ])
    )
  );
});
self.addEventListener('activate', e => { self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
