/*
  ========================================
  ZLATÁ UDICE 2026 – SPOLEČNÝ ZVUK
  ========================================

  Společný zvuk pro:
  - ryby
  - rostliny
  - živočichy
  - otázky
  - odpovědi

  Nejprve zkusí MP3.
  Pokud MP3 neexistuje, použije
  český hlas zařízení.
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


    if ("speechSynthesis" in window) {

      window.speechSynthesis.cancel();

    }

  }


  /* ========================================
     TEXT -> NÁZEV SOUBORU
  ======================================== */

  function createSoundName(text) {

    return String(text)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  }


  /* ========================================
     ČTENÍ PROHLÍŽEČEM
  ======================================== */

  function speakText(text) {

    stopSound();


    if (
      !("speechSynthesis" in window)
    ) {

      alert(
        "Toto zařízení nepodporuje automatické čtení textu."
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


    const voices =
      window.speechSynthesis.getVoices();


    const czechVoice =
      voices.find(
        function (voice) {

          return (
            voice.lang &&
            voice.lang
              .toLowerCase()
              .startsWith("cs")
          );

        }
      );


    if (czechVoice) {

      speech.voice =
        czechVoice;

    }


    window.speechSynthesis.speak(
      speech
    );

  }


  /* ========================================
     PŘEHRÁNÍ TEXTU / MP3
  ======================================== */

  function playText(
    text,
    audioFile
  ) {

    stopSound();


    if (audioFile) {

      const audio =
        new Audio(audioFile);


      currentAudio =
        audio;


      let fallbackStarted =
        false;


      function fallback() {

        if (fallbackStarted) {
          return;
        }


        fallbackStarted =
          true;


        if (
          currentAudio === audio
        ) {

          currentAudio =
            null;

        }


        speakText(text);

      }


      audio.onended =
        function () {

          if (
            currentAudio === audio
          ) {

            currentAudio =
              null;

          }

        };


      audio.onerror =
        function () {

          fallback();

        };


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


      return;

    }


    speakText(text);

  }


  /* ========================================
     AUTOMATICKÝ NÁZEV MP3
  ======================================== */

  function playNamedSound(
    text,
    folder
  ) {

    const fileName =
      createSoundName(text);


    const cleanFolder =
      String(folder || "")
        .replace(/\/+$/, "");


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

})();
