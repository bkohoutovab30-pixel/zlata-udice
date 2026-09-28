/* =========================================================
   ZLATÁ UDICE 2026
   SERVICE WORKER – OFFLINE REŽIM v6
========================================================= */

const APP_CACHE = "zlata-udice-app-v6";
const AUDIO_CACHE = "zlata-udice-audio-v6";
const IMAGE_CACHE = "zlata-udice-images-v6";


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
  "./ryby-data.js",
  "./rostliny-data.js",
  "./zivocichove-data.js",
  "./otazky-data.js",

  /* ZVUK */
  "./zvuk.js",

  /* PWA */
  "./manifest.json"

];


/* =========================================================
   INSTALACE
========================================================= */

self.addEventListener(
  "install",
  event => {

    console.log(
      "Zlatá udice: instaluji offline režim v6."
    );


    event.waitUntil(

      caches
        .open(APP_CACHE)
        .then(cache => {

          return cache.addAll(
            APP_FILES
          );

        })

    );


    self.skipWaiting();

  }
);


/* =========================================================
   AKTIVACE
========================================================= */

self.addEventListener(
  "activate",
  event => {

    const allowedCaches = [

      APP_CACHE,
      AUDIO_CACHE,
      IMAGE_CACHE

    ];


    event.waitUntil(

      caches
        .keys()
        .then(cacheNames => {

          return Promise.all(

            cacheNames.map(
              cacheName => {

                if (
                  !allowedCaches.includes(
                    cacheName
                  )
                ) {

                  return caches.delete(
                    cacheName
                  );

                }

              }
            )

          );

        })

        .then(() => {

          return self.clients.claim();

        })

    );

  }
);


/* =========================================================
   POMOCNÉ FUNKCE
========================================================= */

function isAudioRequest(request) {

  const url =
    new URL(request.url);


  const pathname =
    url.pathname.toLowerCase();


  return (

    request.destination === "audio" ||

    pathname.endsWith(".mp3") ||

    pathname.endsWith(".wav") ||

    pathname.endsWith(".ogg") ||

    pathname.endsWith(".m4a")

  );

}


function isImageRequest(request) {

  const url =
    new URL(request.url);


  const pathname =
    url.pathname.toLowerCase();


  return (

    request.destination === "image" ||

    pathname.endsWith(".jpg") ||

    pathname.endsWith(".jpeg") ||

    pathname.endsWith(".png") ||

    pathname.endsWith(".webp")

  );

}


/* =========================================================
   AUDIO – CACHE FIRST
========================================================= */

async function handleAudio(request) {

  const cache =
    await caches.open(
      AUDIO_CACHE
    );


  /*
    Nejprve hledáme přesný požadavek.
  */

  let cached =
    await cache.match(
      request
    );


  if (cached) {

    return cached;

  }


  /*
    Když by adresa obsahovala parametr,
    zkusíme také čistou adresu bez parametrů.
  */

  const requestUrl =
    new URL(
      request.url
    );


  requestUrl.search = "";


  const cleanRequest =
    new Request(
      requestUrl.toString(),
      {
        method: "GET"
      }
    );


  cached =
    await cache.match(
      cleanRequest
    );


  if (cached) {

    return cached;

  }


  /*
    Zvuk ještě uložený není.
    Pokusíme se ho stáhnout.
  */

  try {

    const response =
      await fetch(
        request
      );


    if (
      response &&
      response.ok
    ) {

      /*
        Uložíme ho pod čistou adresou.

        Díky tomu ho později najdeme
        bez ohledu na případné parametry.
      */

      await cache.put(
        cleanRequest,
        response.clone()
      );

    }


    return response;

  }

  catch (error) {

    console.log(
      "Zvuk není dostupný offline:",
      request.url
    );


    return new Response(
      "",
      {
        status: 503,
        statusText:
          "Audio není dostupné offline"
      }
    );

  }

}


/* =========================================================
   OBRÁZKY – CACHE FIRST
========================================================= */

async function handleImage(request) {

  const cache =
    await caches.open(
      IMAGE_CACHE
    );


  const cached =
    await cache.match(
      request,
      {
        ignoreSearch: true
      }
    );


  if (cached) {

    return cached;

  }


  try {

    const response =
      await fetch(
        request
      );


    if (
      response &&
      response.ok
    ) {

      await cache.put(
        request,
        response.clone()
      );

    }


    return response;

  }

  catch (error) {

    console.log(
      "Obrázek není dostupný offline:",
      request.url
    );


    return new Response(
      "",
      {
        status: 503,
        statusText:
          "Obrázek není dostupný offline"
      }
    );

  }

}


/* =========================================================
   OSTATNÍ SOUBORY
========================================================= */

async function handleAppRequest(request) {

  const cached =
    await caches.match(
      request,
      {
        ignoreSearch: true
      }
    );


  if (cached) {

    return cached;

  }


  try {

    const response =
      await fetch(
        request
      );


    if (
      response &&
      response.ok
    ) {

      const url =
        new URL(
          request.url
        );


      if (
        url.origin ===
        self.location.origin
      ) {

        const cache =
          await caches.open(
            APP_CACHE
          );


        await cache.put(
          request,
          response.clone()
        );

      }

    }


    return response;

  }

  catch (error) {

    /*
      Pokud jde o navigaci na HTML stránku
      a konkrétní soubor se nepodařilo najít,
      zkusíme alespoň hlavní stránku.
    */

    if (
      request.mode === "navigate"
    ) {

      const home =
        await caches.match(
          "./index.html"
        );


      if (home) {

        return home;

      }

    }


    return new Response(
      "Obsah není dostupný offline.",
      {
        status: 503,
        headers: {
          "Content-Type":
            "text/plain; charset=utf-8"
        }
      }
    );

  }

}


/* =========================================================
   FETCH
========================================================= */

self.addEventListener(
  "fetch",
  event => {

    const request =
      event.request;


    if (
      request.method !== "GET"
    ) {

      return;

    }


    const url =
      new URL(
        request.url
      );


    if (
      url.protocol !== "http:" &&
      url.protocol !== "https:"
    ) {

      return;

    }


    /* ZVUK */

    if (
      isAudioRequest(
        request
      )
    ) {

      event.respondWith(
        handleAudio(
          request
        )
      );

      return;

    }


    /* OBRÁZKY */

    if (
      isImageRequest(
        request
      )
    ) {

      event.respondWith(
        handleImage(
          request
        )
      );

      return;

    }


    /* OSTATNÍ */

    event.respondWith(
      handleAppRequest(
        request
      )
    );

  }
);
