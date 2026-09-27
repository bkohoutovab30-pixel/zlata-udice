<!DOCTYPE html>
<html lang="cs">

<head>
  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>Procvičování otázek | Zlatá udice</title>

  <style>

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #eef7fb;
      color: #17324d;
    }

    .app {
      max-width: 650px;
      margin: auto;
      min-height: 100vh;
      padding: 20px;
    }

    /* ==============================
       HORNÍ LIŠTA
    ============================== */

    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
      margin-bottom: 20px;
    }

    .back {
      color: #567;
      text-decoration: none;
      font-weight: bold;
    }

    .counter {
      color: #678;
      font-weight: bold;
      white-space: nowrap;
    }

    /* ==============================
       HLAVIČKA
    ============================== */

    .header {
      text-align: center;
      margin-bottom: 25px;
    }

    .header-icon {
      font-size: 45px;
    }

    .header h1 {
      margin: 6px 0;
      font-size: 28px;
    }

    .header p {
      margin: 0;
      color: #678;
      font-size: 17px;
    }

    /* ==============================
       VÝBĚR KATEGORIE
    ============================== */

    .category-box {
      background: white;
      padding: 18px;
      border-radius: 20px;
      margin-bottom: 22px;

      box-shadow:
        0 4px 15px rgba(0,0,0,0.06);
    }

    .category-box label {
      display: block;
      font-weight: bold;
      margin-bottom: 10px;
      color: #567;
    }

    .category-select {
      width: 100%;
      padding: 14px;

      border:
        2px solid #d7e4ea;

      border-radius: 13px;

      background: white;
      color: #17324d;

      font-size: 16px;
      font-weight: bold;

      outline: none;
    }

    /* ==============================
       KARTA OTÁZKY
    ============================== */

    .question-card {
      background: white;

      border-radius: 22px;

      padding: 25px;

      box-shadow:
        0 4px 15px rgba(0,0,0,0.07);
    }

    .question-category {
      color: #789;
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 12px;
    }

    .question-number {
      color: #789;
      font-size: 14px;
      margin-bottom: 20px;
    }

    .question-row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 25px;
    }

    .question-text {
      flex: 1;

      font-size: 21px;
      line-height: 1.4;
      font-weight: bold;
    }

    /* ==============================
       ZVUK OTÁZKY
    ============================== */

    .sound-button {
      flex-shrink: 0;

      width: 52px;
      height: 52px;

      border: none;
      border-radius: 50%;

      background: #e8f4f9;

      font-size: 22px;

      cursor: pointer;
    }

    .sound-button:active {
      transform: scale(0.95);
    }

    /* ==============================
       ODPOVĚDI
    ============================== */

    .answers {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .answer-row {
      display: flex;
      align-items: stretch;
      gap: 9px;
    }

    .answer-button {
      flex: 1;

      min-height: 70px;

      border:
        2px solid #dbe7ec;

      border-radius: 16px;

      background: #f8fbfc;
      color: #17324d;

      padding: 15px 18px;

      font-size: 16px;
      line-height: 1.4;
      font-weight: bold;

      text-align: left;

      cursor: pointer;
    }

    .answer-button:active {
      transform: scale(0.99);
    }

    .answer-button:disabled {
      cursor: default;
      opacity: 1;
    }

    .answer-sound {
      width: 58px;
      min-width: 58px;

      border: none;
      border-radius: 16px;

      background: #e8f4f9;

      font-size: 21px;

      cursor: pointer;
    }

    /* ==============================
       SPRÁVNĚ / CHYBNĚ
    ============================== */

    .answer-button.correct {
      background: #e5f7e9;
      border-color: #62b574;
      color: #225d2e;
    }

    .answer-button.wrong {
      background: #fde8e8;
      border-color: #dc6f6f;
      color: #8a2929;
    }

    /* ==============================
       VÝSLEDEK
    ============================== */

    .result {
      display: none;

      margin-top: 20px;

      padding: 16px;

      border-radius: 15px;

      font-size: 17px;
      line-height: 1.4;
      font-weight: bold;

      text-align: center;
    }

    .result.correct {
      display: block;
      background: #e5f7e9;
      color: #225d2e;
    }

    .result.wrong {
      display: block;
      background: #fde8e8;
      color: #8a2929;
    }

    /* ==============================
       DALŠÍ OTÁZKA
    ============================== */

    .next-button {
      display: none;

      width: 100%;

      margin-top: 16px;

      padding: 16px;

      border: none;
      border-radius: 15px;

      background: #17324d;
      color: white;

      font-size: 17px;
      font-weight: bold;

      cursor: pointer;
    }

    .next-button.show {
      display: block;
    }

    /* ==============================
       STATISTIKA
    ============================== */

    .stats {
      display: flex;
      justify-content: center;
      gap: 22px;

      margin-top: 20px;

      color: #678;

      font-size: 14px;
      font-weight: bold;
    }

    .good {
      color: #37834a;
    }

    .bad {
      color: #b84d4d;
    }

    /* ==============================
       MOBIL
    ============================== */

    @media (max-width: 480px) {

      .app {
        padding: 15px;
      }

      .question-card {
        padding: 19px;
      }

      .question-text {
        font-size: 19px;
      }

      .answer-button {
        font-size: 15px;
      }

    }

  </style>
</head>


<body>

  <div class="app">

    <!-- HORNÍ LIŠTA -->

    <div class="topbar">

      <a
        href="otazky.html"
        class="back"
      >
        ← Zpět
      </a>

      <div
        class="counter"
        id="counter"
      >
        Otázka
      </div>

    </div>


    <!-- HLAVIČKA -->

    <div class="header">

      <div class="header-icon">
        ❓
      </div>

      <h1>
        Procvičování otázek
      </h1>

      <p>
        Vyber správnou odpověď.
      </p>

    </div>


    <!-- VÝBĚR -->

    <div class="category-box">

      <label for="categorySelect">
        Co chceš procvičovat?
      </label>

      <select
        id="categorySelect"
        class="category-select"
      >

        <option value="all">
          Všechny otázky
        </option>

        <option value="1">
          Přírodovědné znalosti
        </option>

        <option value="2">
          Chov ryb
        </option>

        <option value="3">
          Zákon o rybářství
        </option>

        <option value="4">
          Stanovy ČRS
        </option>

        <option value="5">
          Znalosti z rybolovné techniky
        </option>

        <option value="6">
          Závodní lov ryb udicí
        </option>

      </select>

    </div>


    <!-- KARTA -->

    <div class="question-card">

      <div
        class="question-category"
        id="questionCategory"
      ></div>

      <div
        class="question-number"
        id="questionNumber"
      ></div>


      <!-- OTÁZKA -->

      <div class="question-row">

        <div
          class="question-text"
          id="questionText"
        >
          Načítám otázku...
        </div>

        <button
          class="sound-button"
          id="questionSound"
          type="button"
        >
          🔊
        </button>

      </div>


      <!-- ODPOVĚDI -->

      <div
        class="answers"
        id="answers"
      ></div>


      <!-- VÝSLEDEK -->

      <div
        class="result"
        id="result"
      ></div>


      <!-- DALŠÍ -->

      <button
        class="next-button"
        id="nextButton"
        type="button"
      >
        Další otázka →
      </button>

    </div>


    <!-- STATISTIKA -->

    <div class="stats">

      <span>
        Celkem:
        <strong id="totalCount">
          0
        </strong>
      </span>

      <span class="good">
        ✓
        <strong id="correctCount">
          0
        </strong>
      </span>

      <span class="bad">
        ✕
        <strong id="wrongCount">
          0
        </strong>
      </span>

    </div>

  </div>


  <!-- ==============================
       DATABÁZE OTÁZEK
  ============================== -->

  <script src="otazky-data.js"></script>


  <script>

    /* ======================================
       PROMĚNNÉ
    ====================================== */

    let questionPool = [];

    let currentQuestion = null;

    let currentAnswers = [];

    let answered = false;

    let questionPosition = 0;

    let totalAnswered = 0;

    let correctAnswered = 0;

    let wrongAnswered = 0;

    let currentAudio = null;


    /* ======================================
       HTML PRVKY
    ====================================== */

    const categorySelect =
      document.getElementById("categorySelect");

    const questionCategory =
      document.getElementById("questionCategory");

    const questionNumber =
      document.getElementById("questionNumber");

    const questionText =
      document.getElementById("questionText");

    const questionSound =
      document.getElementById("questionSound");

    const answersContainer =
      document.getElementById("answers");

    const result =
      document.getElementById("result");

    const nextButton =
      document.getElementById("nextButton");

    const counter =
      document.getElementById("counter");

    const totalCount =
      document.getElementById("totalCount");

    const correctCount =
      document.getElementById("correctCount");

    const wrongCount =
      document.getElementById("wrongCount");


    /* ======================================
       PROMÍCHÁNÍ
    ====================================== */

    function shuffleArray(array) {

      const copy = [...array];

      for (
        let i = copy.length - 1;
        i > 0;
        i--
      ) {

        const j =
          Math.floor(
            Math.random() * (i + 1)
          );

        const temporary =
          copy[i];

        copy[i] =
          copy[j];

        copy[j] =
          temporary;
      }

      return copy;
    }


    /* ======================================
       ZASTAVENÍ ZVUKU
    ====================================== */

    function stopAudio() {

      if (currentAudio) {

        currentAudio.pause();

        currentAudio.currentTime = 0;

        currentAudio = null;
      }

    }


    /* ======================================
       PŘEHRÁNÍ MP3
    ====================================== */

    function playAudio(file) {

      stopAudio();

      if (!file) {
        return;
      }

      console.log(
        "Přehrávám:",
        file
      );

      const audio =
        new Audio(file);

      currentAudio =
        audio;

      audio.onended =
        function() {

          currentAudio = null;

        };

      audio.onerror =
        function() {

          console.error(
            "Zvuk se nepodařilo načíst:",
            file
          );

          currentAudio = null;

        };

      audio.play().catch(
        function(error) {

          console.error(
            "Zvuk se nepodařilo přehrát:",
            error
          );

          currentAudio = null;

        }
      );
    }


    /* ======================================
       PŘÍPRAVA BALÍKU OTÁZEK
    ====================================== */

    function prepareQuestionPool() {

      stopAudio();

      const selected =
        categorySelect.value;

      let selectedQuestions;


      if (selected === "all") {

        selectedQuestions =
          [...questions];

      }

      else {

        selectedQuestions =
          questions.filter(
            function(question) {

              return (
                question.section ===
                Number(selected)
              );

            }
          );

      }


      questionPool =
        shuffleArray(
          selectedQuestions
        );


      questionPosition = 0;


      showQuestion();
    }


    /* ======================================
       ZOBRAZENÍ OTÁZKY
    ====================================== */

    function showQuestion() {

      stopAudio();

      answered = false;


      result.className =
        "result";

      result.textContent =
        "";


      nextButton.classList.remove(
        "show"
      );


      /* Pokud jsme projeli celý balík */

      if (
        questionPosition >=
        questionPool.length
      ) {

        questionPool =
          shuffleArray(
            questionPool
          );

        questionPosition = 0;

      }


      if (
        questionPool.length === 0
      ) {

        questionText.textContent =
          "V této oblasti nejsou žádné otázky.";

        answersContainer.innerHTML =
          "";

        return;
      }


      currentQuestion =
        questionPool[
          questionPosition
        ];


      questionPosition++;


      currentAnswers =
        shuffleArray(
          currentQuestion.answers
        );


      renderQuestion();
    }


    /* ======================================
       VYKRESLENÍ OTÁZKY
    ====================================== */

    function renderQuestion() {

      questionCategory.textContent =
        currentQuestion.sectionName;


      questionNumber.textContent =
        "Otázka " +
        currentQuestion.section +
        "/" +
        currentQuestion.number;


      questionText.textContent =
        currentQuestion.question;


      counter.textContent =
        questionPosition +
        " / " +
        questionPool.length;


      /* ZVUK OTÁZKY */

      questionSound.onclick =
        function() {

          playAudio(
            currentQuestion.questionAudio
          );

        };


      /* ODPOVĚDI */

      answersContainer.innerHTML =
        "";


      currentAnswers.forEach(
        function(answer) {

          const row =
            document.createElement(
              "div"
            );

          row.className =
            "answer-row";


          /* TEXT ODPOVĚDI */

          const answerButton =
            document.createElement(
              "button"
            );

          answerButton.type =
            "button";

          answerButton.className =
            "answer-button";

          answerButton.textContent =
            answer.text;


          answerButton.addEventListener(
            "click",
            function() {

              checkAnswer(
                answer,
                answerButton
              );

            }
          );


          /* ZVUK ODPOVĚDI */

          const soundButton =
            document.createElement(
              "button"
            );

          soundButton.type =
            "button";

          soundButton.className =
            "answer-sound";

          soundButton.textContent =
            "🔊";

          soundButton.setAttribute(
            "aria-label",
            "Přehrát odpověď"
          );


          soundButton.addEventListener(
            "click",
            function(event) {

              event.preventDefault();

              event.stopPropagation();

              playAudio(
                answer.audio
              );

            }
          );


          row.appendChild(
            answerButton
          );

          row.appendChild(
            soundButton
          );

          answersContainer.appendChild(
            row
          );

        }
      );
    }


    /* ======================================
       VYHODNOCENÍ ODPOVĚDI
    ====================================== */

    function checkAnswer(
      selectedAnswer,
      selectedButton
    ) {

      if (answered) {
        return;
      }


      answered = true;

      stopAudio();

      totalAnswered++;


      const rows =
        answersContainer.querySelectorAll(
          ".answer-row"
        );


      rows.forEach(
        function(row, index) {

          const button =
            row.querySelector(
              ".answer-button"
            );

          button.disabled =
            true;


          if (
            currentAnswers[index].correct
          ) {

            button.classList.add(
              "correct"
            );

          }

        }
      );


      /* SPRÁVNĚ */

      if (
        selectedAnswer.correct
      ) {

        correctAnswered++;

        result.textContent =
          "✓ Správně!";

        result.className =
          "result correct";

        removeMistake(
          currentQuestion.id
        );

      }


      /* CHYBNĚ */

      else {

        wrongAnswered++;

        selectedButton.classList.add(
          "wrong"
        );


        const correctAnswer =
          currentQuestion.answers.find(
            function(answer) {

              return answer.correct;

            }
          );


        result.textContent =
          "✕ Správná odpověď je: " +
          correctAnswer.text;

        result.className =
          "result wrong";


        saveMistake(
          currentQuestion.id
        );

      }


      updateStats();


      nextButton.classList.add(
        "show"
      );
    }


    /* ======================================
       STATISTIKA
    ====================================== */

    function updateStats() {

      totalCount.textContent =
        totalAnswered;

      correctCount.textContent =
        correctAnswered;

      wrongCount.textContent =
        wrongAnswered;
    }


    /* ======================================
       PROFIL
    ====================================== */

    function getProfileId() {

      return (

        localStorage.getItem(
          "activeProfile"
        )

        ||

        localStorage.getItem(
          "currentProfile"
        )

        ||

        localStorage.getItem(
          "selectedProfile"
        )

        ||

        "default"

      );
    }


    /* ======================================
       KLÍČ CHYB
    ====================================== */

    function getMistakeKey() {

      return (
        "zlataUdice_questionMistakes_" +
        getProfileId()
      );
    }


    /* ======================================
       ULOŽENÍ CHYBY
    ====================================== */

    function saveMistake(id) {

      const key =
        getMistakeKey();

      let mistakes = [];


      try {

        mistakes =
          JSON.parse(
            localStorage.getItem(key)
          ) || [];

      }

      catch (error) {

        mistakes = [];

      }


      if (
        !mistakes.includes(id)
      ) {

        mistakes.push(id);

      }


      localStorage.setItem(
        key,
        JSON.stringify(mistakes)
      );
    }


    /* ======================================
       ODSTRANĚNÍ CHYBY
    ====================================== */

    function removeMistake(id) {

      const key =
        getMistakeKey();

      let mistakes = [];


      try {

        mistakes =
          JSON.parse(
            localStorage.getItem(key)
          ) || [];

      }

      catch (error) {

        mistakes = [];

      }


      mistakes =
        mistakes.filter(
          function(item) {

            return item !== id;

          }
        );


      localStorage.setItem(
        key,
        JSON.stringify(mistakes)
      );
    }


    /* ======================================
       DALŠÍ OTÁZKA
    ====================================== */

    nextButton.addEventListener(
      "click",
      function() {

        showQuestion();

      }
    );


    /* ======================================
       ZMĚNA KATEGORIE
    ====================================== */

    categorySelect.addEventListener(
      "change",
      function() {

        prepareQuestionPool();

      }
    );


    /* ======================================
       START APLIKACE
    ====================================== */

    function startApp() {

      if (
        typeof questions ===
        "undefined"
      ) {

        questionText.textContent =
          "Chyba: databáze otázek se nenačetla.";

        answersContainer.innerHTML =
          "";

        console.error(
          "Proměnná questions neexistuje."
        );

        return;
      }


      if (
        !Array.isArray(questions)
      ) {

        questionText.textContent =
          "Chyba databáze otázek.";

        answersContainer.innerHTML =
          "";

        console.error(
          "questions není pole."
        );

        return;
      }


      console.log(
        "Databáze načtena:",
        questions.length,
        "otázek"
      );


      prepareQuestionPool();
    }


    startApp();

  </script>

</body>

</html>
