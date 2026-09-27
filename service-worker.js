const CACHE_NAME = "zlata-udice-v1";

/*
  ZÁKLADNÍ SOUBORY APLIKACE

  Sem dáváme pouze soubory,
  které potřebujeme pro spuštění aplikace.

  MP3 a obrázky budeme řešit zvlášť,
  protože jich bude velké množství.
*/

const APP_FILES = [
  "./",
  "./index.html",
  "./otazky.html",
  "./otazky-data.js",
  "./manifest.json"
];


/* ========================================
   INSTALACE SERVICE WORKERU
   ======================================== */

self.addEventListener("install", event => {

  console.log("Instaluji Zlatou udici offline...");

  event.waitUntil(

    caches
      .open(CACHE_NAME)
      .then(cache => {

        return cache.addAll(APP_FILES);

      })

  );

  self.skipWaiting();

});


/* ========================================
   AKTIVACE
   ======================================== */

self.addEventListener("activate", event => {

  event.waitUntil(

    caches
      .keys()
      .then(cacheNames => {

        return Promise.all(

          cacheNames.map(name => {

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

self.addEventListener("fetch", event => {

  if (
    event.request.method !== "GET"
  ) {
    return;
  }


  event.respondWith(

    caches
      .match(event.request)
      .then(cachedResponse => {

        /*
          Pokud soubor máme offline,
          použijeme ho.
        */

        if (cachedResponse) {

          return cachedResponse;

        }


        /*
          Jinak ho stáhneme z internetu.
        */

        return fetch(event.request)
          .then(networkResponse => {

            /*
              Kopii automaticky uložíme.

              To se nám bude hodit hlavně
              u MP3 a obrázků:
              co už dítě jednou otevřelo,
              bude dostupné i offline.
            */

            if (
              networkResponse &&
              networkResponse.status === 200
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
          .catch(() => {

            /*
              Internet není dostupný
              a soubor ještě není v cache.
            */

            console.log(
              "Soubor není dostupný offline:",
              event.request.url
            );

          });

      })

  );

});
