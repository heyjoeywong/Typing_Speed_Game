const typingText = document.querySelector(".typing-text p");
const inField = document.querySelector(".container .input-field");
const timeTag = document.querySelector(".timer span b");
const mistakeTag = document.querySelector(".mistakes span");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
tryAgainBtn = document.querySelector("button");

let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = (mistakes = isTyping = 0);

randomParagraph = () => {
  // GETTING RANDOM NUMBER THAT'S ALWAYS LESS THAN PARAGRAPHS LENGTH
  let randomIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  // console.log(paragraphs[randomIndex]);
  // GETTING RANDOM ITEM FROM THE PARAGRAPHS ARRAY, SPLITTING ALL CHARACTERS AND ADDING EACH INSIDE A SPAN INSIDE <P>
  paragraphs[randomIndex].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });

  typingText.querySelectorAll("span")[0].classList.add("active");

  // FOCUSING ON INPUT FIELD ON KEYDOWN OR CLICK EVENT
  document.addEventListener("keydown", () => inField.focus());
  typingText.addEventListener("click", () => inField.focus());
};

initTyping = () => {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inField.value.split("")[charIndex];
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      // ONCE TIMER STARTS, IT WON'T RESTART AGAIN
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }

    // IF USER HASN'T ENTERED ANY CHARACTER OR BACKSPACED
    if (typedChar == null) {
      charIndex--;
      if (characters[charIndex].classList.contains("incorrect")) {
        mistakes--;
      }
      characters[charIndex].classList.remove("correct", "incorrect");
    } else {
      if (characters[charIndex].innerText === typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++; // INCREMENT CHARINDEX ON EITHER CORRECT OR INCORRECT INPUT
    }
    characters.forEach((span) => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    mistakeTag.innerText = mistakes;

    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    // IF WPM IS 0, EMPTY, OR INFINITY, THEN THE VALUE WILL BE RESET TO 0
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    wpmTag.innerText = wpm;

    // CPM WILL NOT COUNT MISTAKES
    cpmTag.innerText = charIndex - mistakes;
  } else {
    clearInterval(timer);
  }
};

initTimer = () => {
  // IF TIME LEFT > 0 THEN DECREMENT
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    inField.value = "";
    clearInterval(timer);
  }
};

resetGame = () => {
  // CALLING LOADPARAGRAPH FUNCTION AND RESETTING EACH VARIABLES
  randomParagraph();
  inField.value = "";
  clearInterval(timer);
  (timeLeft = maxTime), (charIndex = mistakes = isTyping = 0);
  timeTag.innerText = timeLeft;
  mistakeTag.innerText = mistakes;
  wpmTag.innerText = 0;
  cpmTag.innerText = 0;
  /*   location.reload(); */
};

randomParagraph();
inField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
