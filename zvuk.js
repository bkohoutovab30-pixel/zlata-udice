/*
  ========================================
  ZLATÁ UDICE 2026 – SPOLEČNÝ ZVUK
  OFFLINE VERZE
  ========================================

  Společný zvuk pro:
  - ryby
  - rostliny
  - živočichy
  - otázky
  - odpovědi
  - systémové hlášky

  Priorita:

  1. MP3
  2. český hlas zařízení
*/


(function () {

  let currentAudio = null;


  /* ========================================
     ZASTAVENÍ ZVUKU
  ======================================== */

  function stopSound() {

    if (currentAudio) {

      try {

        currentAudio.pause();

        currentAudio.currentTime = 0;

      }
      catch (error) {

        console.log(
          "Zvuk se nepodařilo zastavit:",
          error
        );

      }

      currentAudio = null;

    }


    if (
      "speechSynthesis" in window
    ) {

      window.speechSynthesis.cancel();

    }

  }


  /* ========================================
     TEXT -> NÁZEV SOUBORU
  ======================================== */

  function createSoundName(text) {

    return String(text)

      .normalize("NFD")

      .replace(
        /[\u0300-\u036f]/g,
        ""
      )

      .toLowerCase()

      .replace(
        /[^a-z0-9]+/g,
        "-"
      )

      .replace(
        /^-+|-+$/g,
        ""
      );

  }


  /* ========================================
     NAJÍT ČESKÝ HLAS
  ======================================== */

  function getCzechVoice() {

    if (
      !("speechSynthesis" in window)
    ) {

      return null;

    }


    const voices =
      window.speechSynthesis.getVoices();


    return voices.find(

      function (voice) {

        return (

          voice.lang &&

          voice.lang
            .toLowerCase()
            .startsWith("cs")

        );

      }

    ) || null;

  }


  /* ========================================
     ČTENÍ ZAŘÍZENÍM
  ======================================== */

  function speakText(text) {

    stopSound();


    if (
      !("speechSynthesis" in window)
    ) {

      console.log(
        "Zařízení nepodporuje hlasové čtení."
      );

      return;

    }


    const speech =
      new SpeechSynthesisUtterance(
        String(text)
      );


    speech.lang =
      "cs-CZ";


    speech.rate =
      0.85;


    speech.pitch =
      1;


    const czechVoice =
      getCzechVoice();


    if (czechVoice) {

      speech.voice =
        czechVoice;

    }


    try {

      window.speechSynthesis.speak(
        speech
      );

    }
    catch (error) {

      console.log(
        "Text se nepodařilo přečíst:",
        error
      );

    }

  }


  /* ========================================
     PŘEHRÁNÍ MP3
  ======================================== */

  function playText(
    text,
    audioFile
  ) {

    stopSound();


    /*
      Pokud není MP3 zadaná,
      použijeme hlas zařízení.
    */

    if (!audioFile) {

      speakText(text);

      return;

    }


    const audio =
      new Audio();


    currentAudio =
      audio;


    let fallbackStarted =
      false;


    /* ----------------------------------------
       MP3 SE NEPODAŘILO PŘEHRÁT
    ---------------------------------------- */

    function fallback() {

      if (fallbackStarted) {

        return;

      }


      fallbackStarted =
        true;


      if (
        currentAudio === audio
      ) {

        currentAudio = null;

      }


      /*
        Pokud MP3 není dostupná,
        zkusíme český hlas zařízení.
      */

      speakText(text);

    }


    /* ----------------------------------------
       MP3 DOHRÁLA
    ---------------------------------------- */

    audio.onended =
      function () {

        if (
          currentAudio === audio
        ) {

          currentAudio = null;

        }

      };


    /* ----------------------------------------
       CHYBA MP3
    ---------------------------------------- */

    audio.onerror =
      function () {

        fallback();

      };


    /* ----------------------------------------
       NASTAVENÍ SOUBORU
    ---------------------------------------- */

    audio.preload =
      "auto";


    audio.src =
      audioFile;


    /* ----------------------------------------
       PŘEHRÁNÍ
    ---------------------------------------- */

    try {

      const playPromise =
        audio.play();


      if (
        playPromise &&
        typeof playPromise.catch ===
          "function"
      ) {

        playPromise.catch(

          function () {

            fallback();

          }

        );

      }

    }
    catch (error) {

      fallback();

    }

  }


  /* ========================================
     AUTOMATICKÝ NÁZEV MP3
  ======================================== */

  function playNamedSound(
    text,
    folder
  ) {

    const fileName =
      createSoundName(
        text
      );


    const cleanFolder =
      String(folder || "")

        .replace(
          /\/+$/,
          ""
        );


    /*
      Není určena složka.
    */

    if (!cleanFolder) {

      speakText(text);

      return;

    }


    const audioFile =

      cleanFolder +

      "/" +

      fileName +

      ".mp3";


    playText(
      text,
      audioFile
    );

  }


  /* ========================================
     SYSTÉMOVÉ HLÁŠKY

     Tyto funkce můžeme používat
     na stránkách procvičování.
  ======================================== */

  function playKnown() {

    playNamedSound(
      "Věděl jsem",
      "audio/system"
    );

  }


  function playUnknown() {

    playNamedSound(
      "Nevěděl jsem",
      "audio/system"
    );

  }


  function playCorrect() {

    playNamedSound(
      "Správně",
      "audio/system"
    );

  }


  function playWrong() {

    playNamedSound(
      "Špatně",
      "audio/system"
    );

  }


  /* ========================================
     PŘÍPRAVA ZVUKU DO CACHE

     Service worker si při načtení
     těchto souborů uloží MP3.
  ======================================== */

  async function cacheSound(
    text,
    folder
  ) {

    const fileName =
      createSoundName(
        text
      );


    const cleanFolder =
      String(folder || "")

        .replace(
          /\/+$/,
          ""
        );


    if (!cleanFolder) {

      return false;

    }


    const audioFile =

      cleanFolder +

      "/" +

      fileName +

      ".mp3";


    try {

      const response =
        await fetch(
          audioFile
        );


      return response.ok;

    }
    catch (error) {

      return false;

    }

  }


  /* ========================================
     PŘÍPRAVA VÍCE ZVUKŮ
  ======================================== */

  async function cacheSounds(
    items,
    folder
  ) {

    if (
      !Array.isArray(items)
    ) {

      return {
        total: 0,
        saved: 0
      };

    }


    let saved = 0;


    for (
      let i = 0;
      i < items.length;
      i++
    ) {

      let text;


      if (
        typeof items[i] === "string"
      ) {

        text =
          items[i];

      }

      else if (
        items[i] &&
        items[i].name
      ) {

        text =
          items[i].name;

      }

      else {

        continue;

      }


      const result =
        await cacheSound(
          text,
          folder
        );


      if (result) {

        saved++;

      }

    }


    return {

      total:
        items.length,

      saved:
        saved

    };

  }


  /* ========================================
     FUNKCE PRO OSTATNÍ STRÁNKY
  ======================================== */

  window.stopSound =
    stopSound;


  window.speakText =
    speakText;


  window.playText =
    playText;


  window.playNamedSound =
    playNamedSound;


  window.createSoundName =
    createSoundName;


  window.cacheSound =
    cacheSound;


  window.cacheSounds =
    cacheSounds;


  window.playKnown =
    playKnown;


  window.playUnknown =
    playUnknown;


  window.playCorrect =
    playCorrect;


  window.playWrong =
    playWrong;


})();
