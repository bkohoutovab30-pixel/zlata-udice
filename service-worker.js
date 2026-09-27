/* =========================================================
   ZLATÁ UDICE 2026
   SERVICE WORKER – OFFLINE REŽIM
========================================================= */

const CACHE_NAME = "zlata-udice-v4";


/* =========================================================
   ZÁKLADNÍ SOUBORY APLIKACE
========================================================= */

const APP_FILES = [

  "./",
  "./index.html",

  /* PROFILY */
  "./profily.html",

  /* HLAVNÍ STRÁNKY */
  "./ryby.html",
  "./rostliny.html",
  "./zivocichove.html",
  "./otazky.html",

  /* RYBY */
  "./ryby-uceni.html",
  "./ryby-procvicovani.html",
  "./ryby-chyby.html",

  /* ROSTLINY */
  "./rostliny-uceni.html",
  "./rostliny-procvicovani.html",
  "./rostliny-chyby.html",

  /* ŽIVOČICHOVÉ */
  "./zivocichove-uceni.html",
  "./zivocichove-procvicovani.html",
  "./zivocichove-chyby.html",

  /* OTÁZKY */
  "./otazky-procvicovani.html",

  /* DATA */
  "./otazky-data.js",
  "./rostliny-data.js",
  "./zivocichove-data.js",

  /* ZVUK */
  "./zvuk.js",

  /* PWA */
  "./manifest.json"

];


/* =========================================================
   INSTALACE
========================================================= */

self.addEventListener("install", event => {

  console.log(
    "Zlatá udice: instaluji offline režim v4."
  );

  event.waitUntil(

    caches
      .open(CACHE_NAME)
      .then(cache => {

        console.log(
          "Zlatá udice: ukládám základ aplikace."
        );

        return cache.addAll(APP_FILES);

      })

  );

  self.skipWaiting();

});


/* =========================================================
   AKTIVACE
   SMAZÁNÍ STARÝCH CACHE
========================================================= */

self.addEventListener("activate", event => {

  console.log(
    "Zlatá udice: aktivuji offline režim v4."
  );

  event.waitUntil(

    caches
      .keys()
      .then(cacheNames => {

        return Promise.all(

          cacheNames.map(cacheName => {

            if (cacheName !== CACHE_NAME) {

              console.log(
                "Mažu starou cache:",
                cacheName
              );

              return caches.delete(
                cacheName
              );

            }

          })

        );

      })

      .then(() => {

        return self.clients.claim();

      })

  );

});


/* =========================================================
   NAČÍTÁNÍ SOUBORŮ
========================================================= */

self.addEventListener("fetch", event => {


  /* Pouze GET požadavky */

  if (
    event.request.method !== "GET"
  ) {

    return;

  }


  const url =
    new URL(
      event.request.url
    );


  /* Pouze HTTP / HTTPS */

  if (
    url.protocol !== "http:" &&
    url.protocol !== "https:"
  ) {

    return;

  }


  event.respondWith(

    caches
      .match(event.request)

      .then(cachedResponse => {


        /* =============================
           SOUBOR UŽ MÁME
        ============================= */

        if (cachedResponse) {

          return cachedResponse;

        }


        /* =============================
           SOUBOR JEŠTĚ NEMÁME
        ============================= */

        return fetch(event.request)

          .then(networkResponse => {


            if (
              !networkResponse ||
              networkResponse.status !== 200
            ) {

              return networkResponse;

            }


            /*
              Ukládáme pouze soubory
              ze stejné domény.
            */

            if (
              url.origin ===
              self.location.origin
            ) {


              const responseClone =
                networkResponse.clone();


              caches
                .open(CACHE_NAME)

                .then(cache => {

                  cache.put(
                    event.request,
                    responseClone
                  );

                });

            }


            return networkResponse;

          })


          .catch(error => {


            console.log(
              "Offline soubor není dostupný:",
              event.request.url
            );


            throw error;

          });

      })

  );

});
