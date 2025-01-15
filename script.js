

let startTime = 0;
let elapsedTime = 0;
let intervalId = null;
let isRunning = false;

const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const startPauseBtn = document.getElementById('startPause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('lapsList');

// Update Stopwatch Display
function updateDisplay() {
  const totalMilliseconds = elapsedTime + (Date.now() - startTime);
  const minutes = Math.floor(totalMilliseconds / 60000);
  const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
  const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
  millisecondsEl.textContent = String(milliseconds).padStart(2, '0');
}

// Start or Pause Stopwatch
startPauseBtn.addEventListener('click', () => {
  if (isRunning) {
    elapsedTime += Date.now() - startTime;
    clearInterval(intervalId);
    startPauseBtn.textContent = 'Start';
  } else {
    startTime = Date.now();
    intervalId = setInterval(updateDisplay, 10);
    startPauseBtn.textContent = 'Pause';
  }
  isRunning = !isRunning;
});

// Reset Stopwatch
resetBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  isRunning = false;
  elapsedTime = 0;
  startPauseBtn.textContent = 'Start';
  updateDisplay();
  lapsList.innerHTML = '';
});

// Record Lap Time
lapBtn.addEventListener('click', () => {
  if (!isRunning) return;

  const lapItem = document.createElement('li');
  lapItem.textContent = `${minutesEl.textContent}:${secondsEl.textContent}:${millisecondsEl.textContent}`;
  lapsList.appendChild(lapItem);
});

// Initialize Display
updateDisplay();
