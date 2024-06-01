let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
lapBtn.addEventListener('click', lap);
resetBtn.addEventListener('click', reset);

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1);
        startStopBtn.innerHTML = 'Stop';
        lapBtn.disabled = false;
        resetBtn.disabled = false;
        running = true;
    } else {
        clearInterval(tInterval);
        startStopBtn.innerHTML = 'Start';
        running = false;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.innerHTML = formatTime(difference);
}

function formatTime(ms) {
    let milliseconds = parseInt((ms % 1000) / 10);
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

function lap() {
    lapCounter++;
    const lapTime = formatTime(difference);
    const lapDiv = document.createElement('div');
    lapDiv.innerHTML = `Lap ${lapCounter}: ${lapTime}`;
    laps.appendChild(lapDiv);
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startTime = 0;
    updatedTime = 0;
    difference = 0;
    lapCounter = 0;
    display.innerHTML = "00:00:00.000";
    startStopBtn.innerHTML = "Start";
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    laps.innerHTML = "";
}
