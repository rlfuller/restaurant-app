let restaurantStaticCache =  "restaurant-app-v2";

/**
 * During the install event, cache our assets so we can speed up loading times and have some off-network 
 * functionality
 */
self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(restaurantStaticCache).then(function(cache){
            return cache.addAll(
                [
                    "/",
                    "/js/dbhelper.js",
                    "/js/main.js", 
                    "/js/restaurant_info.js",
                    "/index.html",
                    "/restaurant.html",
                    "/css/styles.css",
                    "/img/1.jpg",
                    "/img/2.jpg",
                    "/img/3.jpg",
                    "/img/4.jpg",
                    "/img/5.jpg",
                    "/img/6.jpg",
                    "/img/7.jpg",
                    "/img/8.jpg",
                    "/img/9.jpg",
                    "/img/10.jpg",
                    "/data/restaurants.json"
                ]
            );
        })
    );
});

/**
 * During the activate event, we will remove any old caches and return the preferred static cache
 */
self.addEventListener("activate", function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName){
                    return cacheName.startsWith("restaurant-") && cacheName != restaurantStaticCache;
                }).map(function(cacheName){
                    return cache.delete(cacheName);
                })
            );
        })
    );
});

/**
 * During the fetch event, fetch the resource from cache if available, otherwise, fetch from the network
 */
self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            if (response) 
                return response;
            return fetch(event.request);
        })
    );
});