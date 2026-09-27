const CACHE_NAME = "zlata-udice-v2";

/*
  ZÁKLADNÍ SOUBORY APLIKACE

  Tyto soubory se stáhnou automaticky,
  jakmile uživatel aplikaci poprvé otevře online.
*/

const APP_FILES = [
  "./",
  "./index.html",
  "./profily.html",
  "./ryby.html",
  "./rostliny.html",
  "./zivocichove.html",
  "./otazky.html",
  "./otazky-data.js",
  "./manifest.json"
];


/* ========================================
   INSTALACE SERVICE WORKERU
======================================== */

self.addEventListener("install", function(event) {

  console.log("Instaluji offline režim Zlaté udice...");

  event.waitUntil(

    caches
      .open(CACHE_NAME)
      .then(function(cache) {

        return cache.addAll(APP_FILES);

      })

  );

  self.skipWaiting();

});


/* ========================================
   AKTIVACE
======================================== */

self.addEventListener("activate", function(event) {

  event.waitUntil(

    caches
      .keys()
      .then(function(cacheNames) {

        return Promise.all(

          cacheNames.map(function(name) {

            if (name !== CACHE_NAME) {

              console.log(
                "Mažu starou cache:",
                name
              );

              return caches.delete(name);

            }

          })

        );

      })

  );

  self.clients.claim();

});


/* ========================================
   NAČÍTÁNÍ SOUBORŮ
======================================== */

self.addEventListener("fetch", function(event) {

  if (event.request.method !== "GET") {
    return;
  }


  event.respondWith(

    caches
      .match(event.request)
      .then(function(cachedResponse) {

        /*
          1. Pokud už soubor máme uložený,
             použijeme offline kopii.
        */

        if (cachedResponse) {

          return cachedResponse;

        }


        /*
          2. Pokud ho nemáme,
             stáhneme ho z internetu.
        */

        return fetch(event.request)
          .then(function(networkResponse) {

            /*
              Úspěšně stažený soubor
              si zároveň uložíme.

              Takto se mohou průběžně ukládat
              například MP3 a později obrázky.
            */

            if (
              networkResponse &&
              networkResponse.status === 200
            ) {

              const responseClone =
                networkResponse.clone();


              caches
                .open(CACHE_NAME)
                .then(function(cache) {

                  cache.put(
                    event.request,
                    responseClone
                  );

                });

            }


            return networkResponse;

          })
          .catch(function(error) {

            console.log(
              "Soubor není dostupný offline:",
              event.request.url
            );

            throw error;

          });

      })

  );

});
