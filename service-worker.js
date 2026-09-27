/* =========================================================
   ZLATÁ UDICE 2026
   SERVICE WORKER – OFFLINE REŽIM v5
========================================================= */

const APP_CACHE = "zlata-udice-app-v5";
const AUDIO_CACHE = "zlata-udice-audio-v5";
const IMAGE_CACHE = "zlata-udice-images-v5";


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
    "Zlatá udice: instaluji offline režim v5."
  );

  event.waitUntil(

    caches
      .open(APP_CACHE)
      .then(cache => {

        return cache.addAll(APP_FILES);

      })

  );

  self.skipWaiting();

});


/* =========================================================
   AKTIVACE
========================================================= */

self.addEventListener("activate", event => {

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

          cacheNames.map(cacheName => {

            if (
              !allowedCaches.includes(cacheName)
            ) {

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
   POMOCNÉ FUNKCE
========================================================= */

function isAudioRequest(request) {

  const url =
    request.url.toLowerCase();


  return (
    request.destination === "audio" ||
    url.endsWith(".mp3") ||
    url.endsWith(".wav") ||
    url.endsWith(".ogg") ||
    url.endsWith(".m4a")
  );

}


function isImageRequest(request) {

  const url =
    request.url.toLowerCase();


  return (
    request.destination === "image" ||
    url.endsWith(".jpg") ||
    url.endsWith(".jpeg") ||
    url.endsWith(".png") ||
    url.endsWith(".webp")
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


  const cached =
    await cache.match(
      request
    );


  /*
    Zvuk už máme uložený.
    Internet vůbec nepotřebujeme.
  */

  if (cached) {

    return cached;

  }


  /*
    Zvuk ještě nemáme.
    Stáhneme ho a uložíme.
  */

  try {

    const response =
      await fetch(request);


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
      request
    );


  if (cached) {

    return cached;

  }


  try {

    const response =
      await fetch(request);


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
      request
    );


  if (cached) {

    return cached;

  }


  try {

    const response =
      await fetch(request);


    /*
      Ukládáme pouze úspěšné odpovědi
      ze stejné domény.
    */

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

self.addEventListener("fetch", event => {

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
    isAudioRequest(request)
  ) {

    event.respondWith(
      handleAudio(request)
    );

    return;

  }


  /* OBRÁZEK */

  if (
    isImageRequest(request)
  ) {

    event.respondWith(
      handleImage(request)
    );

    return;

  }


  /* OSTATNÍ */

  event.respondWith(
    handleAppRequest(request)
  );

});
