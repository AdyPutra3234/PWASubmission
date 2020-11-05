const CACHE_NAME = "GF-V0.0";
const urlsToCache = [
    "/",
    "/manifest.json",
    "/favicon.ico",
    "/index.html",
    "/infoClub.html",
    "/nav.html",
    "/pages/klasemen.html",
    "/pages/match.html",
    "/pages/saved.html",
    "/js/data-source.js",
    "/js/database.js",
    "/js/idb.js",
    "/js/klasemen.js",
    "/js/match.js",
    "/js/main.index.js",
    "/js/main.infoClub.js",
    "/js/materialize.min.js",
    "/js/handle.js",
    "/js/saved.js",
    "/css/style.css",
    "/css/materialize.min.css",
    "/css/infoClub.css",
    "/css/custom.scrollBar.css",
    "/assets/background1.jpg",
    "/assets/background-infoClub.jpg",
    "/assets/icons/icon-32x32.png",
    "/assets/icons/icon-57x57.png",
    "/assets/icons/icon-76x76.png",
    "/assets/icons/icon-144x144.png",
    "/assets/icons/icon-192x192.png",
    "/assets/icons/icon-512x512.png",
    "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.googleapis.com/css2?family=Lobster&family=Montserrat&display=swap",
]

// Create Cache
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
})

// Hapus Cache yg tidak diperlukan
self.addEventListener("activate" , function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheName) {
            return Promise.all(
                cacheName.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log(`ServiceWorker: cache ${cacheName} dihapus`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


// Hijacking request
self.addEventListener("fetch" ,function(event) {
    const baseURL = "https://api.football-data.org/";
    const online = self.navigator.onLine;
    const request = event.request;

    if (request.url.indexOf(baseURL) > -1 && online) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(request).then(function(response) {
                    cache.put(request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(request, {ignoreSearch: true}).then(response => {
                return response || fetch(request);
            })
        );
    }
})

self.addEventListener("push", event => {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = "Push message no payload" ;
    }

    var options = {
        body: body,
        icon:"assets/icon.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification("GoalsFootbal", options)
    );
});

