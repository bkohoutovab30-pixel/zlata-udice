/* =========================================================
   ZLATÁ UDICE 2026
   SERVICE WORKER – OFFLINE REŽIM v6

   - HTML: NETWORK FIRST
     -> při internetu vždy zkusí nejnovější verzi

   - DATA / JS / MANIFEST: NETWORK FIRST
     -> změny se projeví bez držení staré verze

   - AUDIO: CACHE FIRST
     -> stažené zvuky fungují offline

   - OBRÁZKY: CACHE FIRST
     -> jednou načtené obrázky zůstávají offline
========================================================= */


const APP_CACHE =
  "zlata-udice-app-v6";

const AUDIO_CACHE =
  "zlata-udice-audio-v6";

const IMAGE_CACHE =
  "zlata-udice-images-v6";


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

              Když by náhodou jeden soubor
              neexistoval, nespadne kvůli tomu
              instalace celého workeru.
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
      Nový worker nemusí čekat,
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
      "Zlatá udice: aktivuji offline režim v6."
    );


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

   Odstraní pomocný parametr ?offline=1,
   který používáme při stahování zvuků.

   Díky tomu se stejný MP3 soubor
   neukládá pod dvěma různými adresami.
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
    Odstraníme ?offline=1,
    aby byl zvuk uložen pod normální adresou.
  */

  const clean =
    cleanRequest(
      request
    );


  const cached =
    await cache.match(
      clean
    );


  /*
    Zvuk už máme uložený.
  */

  if (cached) {

    return cached;

  }


  /*
    Nemáme ho.

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
   CACHE FIRST
========================================================= */

async function handleImage(
  request
) {

  const cache =
    await caches.open(
      IMAGE_CACHE
    );


  const cached =
    await cache.match(
      request
    );


  /*
    Obrázek už máme.
  */

  if (cached) {

    return cached;

  }


  /*
    Nemáme ho.

    Zkusíme internet.
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

      await cache.put(
        request,
        response.clone()
      );

    }


    return response;

  }

  catch (error) {

    console.warn(
      "Obrázek není dostupný:",
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
   HTML / JS / DATA
   NETWORK FIRST

   To je důležitá změna.

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

    /*
      Zkusíme internet jako první.
    */

    const response =
      await fetch(
        request
      );


    if (
      response &&
      response.ok
    ) {

      /*
        Novou verzi rovnou uložíme
        pro příští offline použití.
      */

      await cache.put(
        request,
        response.clone()
      );

    }


    return response;

  }

  catch (error) {

    /*
      Internet není dostupný.

      Zkusíme cache.
    */

    const cached =
      await cache.match(
        request
      );


    if (cached) {

      return cached;

    }


    /*
      U navigace zkusíme ještě
      hlavní stránku.
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
        Ukládáme jen soubory
        z naší vlastní stránky.
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
       HTML

       VŽDY INTERNET PRVNÍ
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

       Také internet první.

       Díky tomu se budou aktualizovat:
       - ryby-data.js
       - rostliny-data.js
       - zivocichove-data.js
       - otazky-data.js
       - zvuk.js
       - manifest.json
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
