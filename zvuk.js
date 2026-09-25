/*
  ========================================
  ZLATÁ UDICE 2026 – SPOLEČNÝ ZVUK
  ========================================

  Tento soubor bude obsluhovat zvuk
  v celé aplikaci:

  - názvy ryb
  - názvy rostlin
  - názvy živočichů
  - otázky
  - jednotlivé odpovědi
  - budoucí zkušební testy

  Nejprve se pokusí přehrát připravený
  zvukový soubor.

  Pokud zvukový soubor neexistuje,
  použije hlas telefonu/prohlížeče.
*/


let currentAudio = null;


/* ========================================
   ZASTAVENÍ PŘEDCHOZÍHO ZVUKU
======================================== */

function stopSound() {

  /*
    Zastavíme případný MP3 zvuk.
  */

  if (currentAudio) {

    currentAudio.pause();
    currentAudio.currentTime = 0;

    currentAudio = null;
  }


  /*
    Zastavíme případné čtení
    prohlížečem.
  */

  if ("speechSynthesis" in window) {

    window.speechSynthesis.cancel();
  }
}


/* ========================================
   TEXT -> NÁZEV SOUBORU
======================================== */

function createSoundName(text) {

  return text
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

  if (
    !("speechSynthesis" in window)
  ) {

    alert(
      "Toto zařízení nepodporuje automatické čtení textu."
    );

    return;
  }


  window.speechSynthesis.cancel();


  const speech =
    new SpeechSynthesisUtterance(text);


  speech.lang = "cs-CZ";

  speech.rate = 0.85;

  speech.pitch = 1;


  const voices =
    window.speechSynthesis.getVoices();


  const czechVoice =
    voices.find(
      voice =>
        voice.lang &&
        voice.lang
          .toLowerCase()
          .startsWith("cs")
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
   HLAVNÍ FUNKCE
======================================== */

function playText(text, audioFile = "") {

  stopSound();


  /*
    Pokud jsme zadali konkrétní
    zvukový soubor, zkusíme nejdříve ten.
  */

  if (audioFile) {

    const audio =
      new Audio(audioFile);


    currentAudio = audio;


    audio.onended = function() {

      currentAudio = null;
    };


    audio.onerror = function() {

      currentAudio = null;

      speakText(text);
    };


    const playPromise =
      audio.play();


    if (
      playPromise !== undefined
    ) {

      playPromise.catch(
        function() {

          currentAudio = null;

          speakText(text);
        }
      );
    }


    return;
  }


  /*
    Pokud zatím nemáme MP3,
    přečte text zařízení.
  */

  speakText(text);
}


/* ========================================
   AUTOMATICKÝ ZVUK PODLE NÁZVU
======================================== */

function playNamedSound(
  text,
  folder
) {

  const fileName =
    createSoundName(text);


  const audioFile =
    folder +
    "/" +
    fileName +
    ".mp3";


  playText(
    text,
    audioFile
  );
}
