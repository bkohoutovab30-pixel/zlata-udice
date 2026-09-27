/* =========================================================
   ZLATÁ UDICE 2026
   SERVICE WORKER – OFFLINE REŽIM
========================================================= */

const CACHE_NAME = "zlata-udice-v3";


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
  "./zivocichove-procvicovani.html",
  "./zivocichove-chyby.html",

  /* OTÁZKY */
  "./otazky-procvicovani.html",

  /* DATA */
  "./otazky-data.js",
  "./rostliny-data.js",
  "./zivocichove-data.js",

  /* SPOLEČNÝ ZVUK */
  "./zvuk.js",

  /* PWA */
  "./manifest.json"

];


/* =========================================================
   INSTALACE
========================================================= */

self.addEventListener("install", event => {

  console.log("Zlatá udice: instaluji offline režim v3.");

  event.waitUntil(

    caches.open(CACHE_NAME)
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
   SMAZÁNÍ STARÝCH VERZÍ CACHE
========================================================= */

self.addEventListener("activate", event => {

  console.log("Zlatá udice: aktivuji offline režim v3.");

  event.waitUntil(

    caches.keys()
      .then(cacheNames => {

        return Promise.all(

          cacheNames.map(cacheName => {

            if (cacheName !== CACHE_NAME) {

              console.log(
                "Mažu starou cache:",
                cacheName
              );

              return caches.delete(cacheName);

            }

          })

        );

      })

      .then(() => self.clients.claim())

  );

});


/* =========================================================
   NAČÍTÁNÍ SOUBORŮ
========================================================= */

self.addEventListener("fetch", event => {

  /* Řešíme pouze GET */
  if (event.request.method !== "GET") {
    return;
  }


  /* Řešíme pouze http / https */
  const url = new URL(event.request.url);

  if (
    url.protocol !== "http:" &&
    url.protocol !== "https:"
  ) {
    return;
  }


  event.respondWith(

    caches.match(event.request)
      .then(cachedResponse => {

        /*
          Pokud máme soubor uložený,
          vrátíme offline kopii.
        */

        if (cachedResponse) {
          return cachedResponse;
        }


        /*
          Pokud ho ještě nemáme,
          stáhneme ho z internetu.
        */

        return fetch(event.request)
          .then(networkResponse => {

            /*
              Neukládáme chybové odpovědi.
            */

            if (
              !networkResponse ||
              networkResponse.status !== 200
            ) {

              return networkResponse;

            }


            /*
              Ukládáme pouze soubory
              ze Zlaté udice / stejné domény.
            */

            if (url.origin === self.location.origin) {

              const responseClone =
                networkResponse.clone();


              caches.open(CACHE_NAME)
                .then(cache => {

                  cache.put(
                    event.request,
                    responseClone
                  );

                });

            }


            return networkResponse;

          });

      })

  );

});
