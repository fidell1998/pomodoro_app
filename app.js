const bells = new Audio("./sounds/bell.wav");
const startBtn = document.querySelector(".btn-start");
const pauseBtn = document.querySelector(".btn-pause");
const resetBtn = document.querySelector(".btn-reset");
const minuteDiv = document.querySelector(".minutes");
const secondDiv = document.querySelector(".seconds");

let myInterval;
let totalSeconds = 0;
let isRunning = false;
let isPaused = false;

const updateDisplay = () => {
  let minutesLeft = Math.floor(totalSeconds / 60);
  let secondsLeft = totalSeconds % 60;

  minuteDiv.textContent = `${minutesLeft}`;
  secondDiv.textContent = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;
};

const startCountdown = () => {
  myInterval = setInterval(() => {
    totalSeconds--;

    updateDisplay();

    if (totalSeconds <= 0) {
      bells.play();
      clearInterval(myInterval);
      isRunning = false;
      isPaused = false;
    }
  }, 1000);
};

const appTimer = () => {
  if (!isRunning && !isPaused) {
    const sessionAmount = Number.parseInt(minuteDiv.textContent);
    totalSeconds = sessionAmount * 60;
    updateDisplay();
    startCountdown();
    isRunning = true;
    isPaused = false;
  } else if (isPaused) {
    startCountdown();
    isRunning = true;
    isPaused = false;
  } else {
    alert("Session is already running.");
  }
};

const appPause = () => {
  if (isRunning) {
    clearInterval(myInterval);
    isRunning = false;
    isPaused = true;
  } else if (isPaused) {
    startCountdown();
    isRunning = true;
    isPaused = false;
  }
};

const appReset = () => {
  clearInterval(myInterval);
  isRunning = false;
  isPaused = false;

  const defaultMinutes = 25;
  minuteDiv.textContent = defaultMinutes;
  secondDiv.textContent = "00";

  totalSeconds = 0;
};

startBtn.addEventListener("click", appTimer);
pauseBtn.addEventListener("click", appPause);
resetBtn.addEventListener("click", appReset);
