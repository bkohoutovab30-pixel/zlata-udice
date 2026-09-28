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

        .then(
          async cache => {

            /*
              Soubory ukládáme jednotlivě.

              Výhoda:
              pokud by jeden soubor chyběl,
              nespadne kvůli tomu instalace
              celého Service Workeru.
            */

            for (
              const file of APP_FILES
            ) {

              try {

                await cache.add(
                  file
                );

              }

              catch (error) {

                console.warn(
                  "Nepodařilo se uložit do APP cache:",
                  file,
                  error
                );

              }

            }

          }
        )

    );


    /*
      Nová verze nemusí čekat,
      až se zavřou všechny staré stránky.
    */

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

        .then(
          cacheNames => {

            return Promise.all(

              cacheNames.map(
                cacheName => {

                  /*
                    Staré cache v1, v2, v3,
                    v4, v5 atd. odstraníme.
                  */

                  if (
                    !allowedCaches.includes(
                      cacheName
                    )
                  ) {

                    console.log(
                      "Mažu starou cache:",
                      cacheName
                    );


                    return caches.delete(
                      cacheName
                    );

                  }

                }
              )

            );

          }
        )

        .then(
          () => {

            /*
              Nový Service Worker převezme
              otevřenou aplikaci.
            */

            return self.clients.claim();

          }
        )

    );

  }
);


/* =========================================================
   POMOCNÁ FUNKCE
   ODSTRANĚNÍ QUERY PARAMETRŮ
========================================================= */

function cleanRequest(
  request
) {

  const url =
    new URL(
      request.url
    );


  /*
    Například:

    audio/ryby/kapr-obecny.mp3?offline=1

    převedeme na:

    audio/ryby/kapr-obecny.mp3
  */

  url.search = "";


  return new Request(
    url.toString(),
    {
      method: "GET"
    }
  );

}


/* =========================================================
   JE TO AUDIO?
========================================================= */

function isAudioRequest(
  request
) {

  const url =
    new URL(
      request.url
    );


  const pathname =
    url.pathname
      .toLowerCase();


  return (

    request.destination ===
      "audio"

    ||

    pathname.endsWith(
      ".mp3"
    )

    ||

    pathname.endsWith(
      ".wav"
    )

    ||

    pathname.endsWith(
      ".ogg"
    )

    ||

    pathname.endsWith(
      ".m4a"
    )

  );

}


/* =========================================================
   JE TO OBRÁZEK?
========================================================= */

function isImageRequest(
  request
) {

  const url =
    new URL(
      request.url
    );


  const pathname =
    url.pathname
      .toLowerCase();


  return (

    request.destination ===
      "image"

    ||

    pathname.endsWith(
      ".jpg"
    )

    ||

    pathname.endsWith(
      ".jpeg"
    )

    ||

    pathname.endsWith(
      ".png"
    )

    ||

    pathname.endsWith(
      ".webp"
    )

  );

}


/* =========================================================
   AUDIO
   CACHE FIRST
========================================================= */

async function handleAudio(
  request
) {

  const cache =
    await caches.open(
      AUDIO_CACHE
    );


  /*
    Použijeme URL bez query parametrů.
  */

  const clean =
    cleanRequest(
      request
    );


  /*
    Nejdříve hledáme zvuk v cache.
  */

  const cached =
    await cache.match(
      clean
    );


  if (
    cached
  ) {

    return cached;

  }


  /*
    Zvuk v cache není.

    Zkusíme internet.
  */

  try {

    const response =
      await fetch(
        clean
      );


    /*
      Uložíme pouze skutečně
      existující soubor.
    */

    if (
      response &&
      response.ok
    ) {

      await cache.put(
        clean,
        response.clone()
      );

    }


    return response;

  }


  catch (
    error
  ) {

    console.warn(
      "Zvuk není dostupný offline:",
      clean.url
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
   OBRÁZKY
   CACHE FIRST
========================================================= */

async function handleImage(
  request
) {

  const cache =
    await caches.open(
      IMAGE_CACHE
    );


  const clean =
    cleanRequest(
      request
    );


  /*
    Nejprve cache.
  */

  const cached =
    await cache.match(
      clean
    );


  if (
    cached
  ) {

    return cached;

  }


  /*
    Potom internet.
  */

  try {

    const response =
      await fetch(
        clean
      );


    if (
      response &&
      response.ok
    ) {

      await cache.put(
        clean,
        response.clone()
      );

    }


    return response;

  }


  catch (
    error
  ) {

    console.warn(
      "Obrázek není dostupný offline:",
      clean.url
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
   HTML / JS / JSON / OSTATNÍ SOUBORY
========================================================= */

async function handleAppRequest(
  request
) {

  /*
    Nejdříve se podíváme do cache.
  */

  const cached =
    await caches.match(
      request
    );


  if (
    cached
  ) {

    return cached;

  }


  /*
    Pokud soubor není v cache,
    zkusíme internet.
  */

  try {

    const response =
      await fetch(
        request
      );


    /*
      Úspěšnou odpověď ze stejné
      domény uložíme.
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


  catch (
    error
  ) {

    /*
      Pokud jsme úplně offline
      a požadavek není v cache.
    */

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


    /*
      Řešíme pouze GET.
    */

    if (
      request.method !==
      "GET"
    ) {

      return;

    }


    const url =
      new URL(
        request.url
      );


    /*
      Ignorujeme jiné protokoly.
    */

    if (
      url.protocol !==
        "http:"

      &&

      url.protocol !==
        "https:"
    ) {

      return;

    }


    /* =====================================================
       AUDIO
    ===================================================== */

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


    /* =====================================================
       OBRÁZKY
    ===================================================== */

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


    /* =====================================================
       O
