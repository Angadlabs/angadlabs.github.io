const CACHE_NAME = "angad-store-v4";
const ASSETS_TO_CACHE = [
  "./",
  "https://cdn.jsdelivr.net/gh/Angadlabs/Angadlabs.github.io@main/index.html",
  "https://cdn.jsdelivr.net/gh/Angadlabs/Angadlabs.github.io@main/style.css",
  "https://cdn.jsdelivr.net/gh/Angadlabs/Angadlabs.github.io@main/script.js",
  "https://cdn.jsdelivr.net/gh/Angadlabs/Angadlabs.github.io@mainfetch('https://cdn.jsdelivr.net/gh/Angadlabs/Angadlabs.github.io@main/package.json?t=' + new Date().getTime())/manifest.json"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});










