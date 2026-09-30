/* =========================================================
   ZLATÁ UDICE 2026
   SERVICE WORKER – OFFLINE REŽIM v8

   - HTML: NETWORK FIRST
     -> při internetu vždy zkusí nejnovější verzi

   - DATA / JS / MANIFEST: NETWORK FIRST
     -> změny se projeví bez držení staré verze

   - AUDIO: CACHE FIRST
     -> stažené zvuky fungují offline
     -> cache zvuků se při aktualizaci aplikace nemaže

   - OBRÁZKY: CACHE FIRST
     -> jednou stažené obrázky zůstávají offline
     -> cache obrázků se při aktualizaci aplikace nemaže

   - ?offline=1
     -> umožňuje vynutit aktualizaci zvuku nebo obrázku
     -> do cache se vždy uloží čistá adresa bez parametru

   - ZKUŠEBNÍ TEST:
     -> je součástí offline aplikace
========================================================= */


/*
  Aplikační cache má novou verzi.

  Audio a obrázky záměrně ponecháváme
  ve stejné cache jako ve verzi v7.

  Díky tomu se již stažené soubory
  při aktualizaci aplikace nesmažou.
*/

const APP_CACHE =
  "zlata-udice-app-v8";

const AUDIO_CACHE =
  "zlata-udice-audio-v7";

const IMAGE_CACHE =
  "zlata-udice-images-v7";


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
  "./zkusebni-test.html",


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
      "Zlatá udice: instaluji offline režim v8."
    );


    event.waitUntil(

      caches
        .open(APP_CACHE)

        .then(
          async cache => {

            /*
              Soubory ukládáme jednotlivě.

              Když jeden soubor neexistuje,
              instalace celého service workeru
              kvůli tomu nespadne.
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
                  "Nepodařilo se předem uložit:",
                  file
                );

              }

            }

          }
        )

    );


    /*
      Nový service worker nemusí čekat,
      až zmizí starý.
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

    console.log(
      "Zlatá udice: aktivuji offline režim v8."
    );


    /*
      DŮLEŽITÉ:

      Zachováváme:
      - novou aplikační cache v8
      - původní audio cache v7
      - původní image cache v7

      Staré aplikační cache se smažou,
      ale stažené zvuky a fotografie zůstanou.
    */

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

                  if (
                    !allowedCaches.includes(
                      cacheName
                    )
                  ) {

                    console.log(
                      "Mažu starou aplikační cache:",
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
              Nový worker okamžitě převezme
              otevřené stránky.
            */

            return self.clients.claim();

          }
        )

    );

  }
);


/* =========================================================
   POMOCNÁ FUNKCE

   Odstraní pomocný parametr ?offline=1.

   Díky tomu se soubor v cache uloží
   pod normální adresou.
========================================================= */

function cleanRequest(
  request
) {

  const url =
    new URL(
      request.url
    );


  url.searchParams.delete(
    "offline"
  );


  return new Request(
    url.toString(),
    {
      method: "GET",
      headers: request.headers,
      mode: request.mode,
      credentials: request.credentials,
      redirect: request.redirect
    }
  );

}


/* =========================================================
   JE VYNUCENÁ OFFLINE AKTUALIZACE?
========================================================= */

function isOfflineUpdate(
  request
) {

  const url =
    new URL(
      request.url
    );


  return (
    url.searchParams.get(
      "offline"
    ) === "1"
  );

}


/* =========================================================
   JE TO ZVUK?
========================================================= */

function isAudioRequest(
  request
) {

  const url =
    new URL(
      request.url
    );


  const path =
    url.pathname.toLowerCase();


  return (

    request.destination ===
      "audio"

    ||

    path.endsWith(
      ".mp3"
    )

    ||

    path.endsWith(
      ".wav"
    )

    ||

    path.endsWith(
      ".ogg"
    )

    ||

    path.endsWith(
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


  const path =
    url.pathname.toLowerCase();


  return (

    request.destination ===
      "image"

    ||

    path.endsWith(
      ".jpg"
    )

    ||

    path.endsWith(
      ".jpeg"
    )

    ||

    path.endsWith(
      ".png"
    )

    ||

    path.endsWith(
      ".webp"
    )

  );

}


/* =========================================================
   JE TO HTML?
========================================================= */

function isHTMLRequest(
  request
) {

  const url =
    new URL(
      request.url
    );


  return (

    request.mode ===
      "navigate"

    ||

    request.destination ===
      "document"

    ||

    url.pathname.endsWith(
      ".html"
    )

  );

}


/* =========================================================
   JE TO SOUBOR APLIKACE,
   KTERÝ CHCEME AKTUALIZOVAT Z INTERNETU?
========================================================= */

function isUpdateableAppFile(
  request
) {

  const url =
    new URL(
      request.url
    );


  const path =
    url.pathname.toLowerCase();


  return (

    path.endsWith(
      ".js"
    )

    ||

    path.endsWith(
      ".json"
    )

  );

}


/* =========================================================
   AUDIO

   Normální použití:
   CACHE FIRST

   ?offline=1:
   NETWORK FIRST + přepsání cache

   To znamená:
   - běžné přehrávání je rychlé
   - funguje offline
   - tlačítko Aktualizovat offline obsah
     může stáhnout novou verzi MP3
========================================================= */

async function handleAudio(
  request
) {

  const cache =
    await caches.open(
      AUDIO_CACHE
    );


  const clean =
    cleanRequest(
      request
    );


  /*
    Pokud přišel parametr ?offline=1,
    chceme soubor skutečně aktualizovat.
  */

  if (
    isOfflineUpdate(
      request
    )
  ) {

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

    catch (error) {

      /*
        Pokud aktualizace selže,
        použijeme alespoň starou
        offline verzi.
      */

      const cached =
        await cache.match(
          clean
        );


      if (cached) {

        return cached;

      }


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


  /*
    Normální použití:
    nejdříve cache.
  */

  const cached =
    await cache.match(
      clean
    );


  if (cached) {

    return cached;

  }


  /*
    V cache není.
    Zkusíme internet.
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

  catch (error) {

    console.warn(
      "Zvuk není dostupný:",
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

   Normální použití:
   CACHE FIRST

   ?offline=1:
   NETWORK FIRST + přepsání cache
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
    Vynucená aktualizace obrázku.
  */

  if (
    isOfflineUpdate(
      request
    )
  ) {

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

    catch (error) {

      const cached =
        await cache.match(
          clean
        );


      if (cached) {

        return cached;

      }


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


  /*
    Normální použití:
    nejdříve cache.
  */

  const cached =
    await cache.match(
      clean
    );


  if (cached) {

    return cached;

  }


  /*
    Obrázek v cache není.
    Zkusíme internet.
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

  catch (error) {

    console.warn(
      "Obrázek není dostupný:",
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
   HTML / JS / DATA
   NETWORK FIRST

   Pokud internet funguje:
   -> dostaneme nejnovější soubor.

   Pokud internet nefunguje:
   -> použijeme uloženou verzi.
========================================================= */

async function handleNetworkFirst(
  request
) {

  const cache =
    await caches.open(
      APP_CACHE
    );


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

    const cached =
      await cache.match(
        request
      );


    if (cached) {

      return cached;

    }


    /*
      U navigace zkusíme jako poslední
      možnost hlavní stránku.
    */

    if (
      request.mode ===
        "navigate"
    ) {

      const fallback =
        await cache.match(
          "./index.html"
        );


      if (fallback) {

        return fallback;

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
   OSTATNÍ SOUBORY
   CACHE FIRST
========================================================= */

async function handleCacheFirst(
  request
) {

  const cached =
    await caches.match(
      request
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


      /*
        Ukládáme pouze soubory
        z vlastní aplikace.
      */

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

self.addEventListener(
  "fetch",
  event => {

    const request =
      event.request;


    /*
      Řešíme pouze GET požadavky.
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
       HTML
       INTERNET PRVNÍ
    ===================================================== */

    if (
      isHTMLRequest(
        request
      )
    ) {

      event.respondWith(

        handleNetworkFirst(
          request
        )

      );


      return;

    }


    /* =====================================================
       JS + JSON
       INTERNET PRVNÍ
    ===================================================== */

    if (
      isUpdateableAppFile(
        request
      )
    ) {

      event.respondWith(

        handleNetworkFirst(
          request
        )

      );


      return;

    }


    /* =====================================================
       OSTATNÍ
    ===================================================== */

    event.respondWith(

      handleCacheFirst(
        request
      )

    );

  }
);
