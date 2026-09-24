/*
  ========================================
  ZLATÁ UDICE 2026 – TESTOVÉ OTÁZKY
  ========================================

  Každá otázka obsahuje:

  category = oblast
  number   = číslo otázky
  question = otázka
  answers  = možnosti odpovědí
  correct  = správná odpověď

  Správná odpověď je uložená jako písmeno:
  "a", "b" nebo "c".
*/


const questions = [

  /* =====================================
     I. PŘÍRODOVĚDNÉ ZNALOSTI
  ===================================== */

  {
    category: "I. Přírodovědné znalosti",
    number: 1,

    question:
      "Která z následujících ryb má typické spodní postavení úst:",

    answers: [
      {
        id: "a",
        text: "pstruh obecný"
      },
      {
        id: "b",
        text: "jelec tloušť"
      },
      {
        id: "c",
        text: "jeseter malý"
      }
    ],

    correct: ["c"]
  },


  {
    category: "I. Přírodovědné znalosti",
    number: 2,

    question:
      "Která z následujících druhů ryb má střední postavení úst:",

    answers: [
      {
        id: "a",
        text: "štika obecná"
      },
      {
        id: "b",
        text: "ouklej obecná"
      },
      {
        id: "c",
        text: "podoustev říční"
      }
    ],

    correct: ["a"]
  },


  {
    category: "I. Přírodovědné znalosti",
    number: 3,

    question:
      "Z uvedené skupiny ryb označ ty, které mají tukovou ploutvičku:",

    answers: [
      {
        id: "a",
        text: "vranka obecná, slunečnice pestrá, perlín ostrobřichý, střevle potoční"
      },
      {
        id: "b",
        text: "sumeček americký, losos obecný, hlavatka obecná, lipan podhorní"
      },
      {
        id: "c",
        text: "piskoř pruhovaný, mřenka mramorovaná, cejn velký, štika obecná"
      }
    ],

    correct: ["b"]
  },


  {
    category: "I. Přírodovědné znalosti",
    number: 4,

    question:
      "Která z uvedených lososovitých ryb má skvrnami pokrytou ocasní ploutev:",

    answers: [
      {
        id: "a",
        text: "pstruh obecný"
      },
      {
        id: "b",
        text: "pstruh duhový"
      },
      {
        id: "c",
        text: "siven americký"
      }
    ],

    correct: ["b"]
  },


  {
    category: "I. Přírodovědné znalosti",
    number: 5,

    question:
      "Který z uvedených jelců má vypouklý tvar hřbetní a řitní ploutve:",

    answers: [
      {
        id: "a",
        text: "jelec tloušť"
      },
      {
        id: "b",
        text: "jelec jesen"
      },
      {
        id: "c",
        text: "jelec proudník"
      }
    ],

    correct: ["a"]
  }

];
