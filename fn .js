// Global variables
const time_el = document.querySelector('.box .clock');
var lap_el = document.getElementById("lt");
var his_el = document.getElementById("hi");
var hil_el = document.getElementById("idk");
const start_btn = document.getElementById('start');
const stop_btn = document.getElementById("stop");
const reset_btn = document.getElementById("reset");
const lap_btn = document.getElementById("lap");
const rec_btn = document.getElementById("but");

let seconds = 0;
let interval = null;
let lap_time = null;
let counter = 1;
let counter2 = 1;
let x;
const history = [];
const myArray3 = [];
// for color scheme
const btn = document.querySelector(".btn-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.toggle("dark-theme");
} else if (currentTheme == "light") {
  document.body.classList.toggle("light-theme");
}

btn.addEventListener("click", function () {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
    var theme = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";
  } else {
    document.body.classList.toggle("dark-theme");
    var theme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
  }
  localStorage.setItem("theme", theme);
});

// Event listeners
start_btn.addEventListener('click', start);
stop_btn.addEventListener("click", stop);
reset_btn.addEventListener("click", reset);
lap_btn.addEventListener("click", lap);
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 's' && e.altKey) {
        // Add your code here
        start();
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 't' && e.altKey) {
        // Add your code here
        stop();
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'r' && e.altKey) {
        // Add your code here
        reset();
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'l' && e.altKey) {
        // Add your code here
        lap();
    }
});
// Update the timer
function timer() {
    seconds++;

    // Format our time
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - (hrs * 3600)) / 60);
    let secs = seconds % 60;

    if (secs < 10) secs = '0' + secs;
    if (mins < 10) mins = "0" + mins;
    if (hrs < 10) hrs = "0" + hrs;

    time_el.innerText = `${hrs}:${mins}:${secs}`;
}

function start() {
    if (interval) {
        return
    }

    interval = setInterval(timer, 1000);
}

function stop() {
    clearInterval(interval);
    interval = null;
}

function reset() {
    stop();
    history[counter2] = seconds;
    print();
    seconds = 0;
    time_el.innerText = '00:00:00';
    counter = 1;
    lap_el.innerText = "";
    counter2++;
}

function lap() {
    lap_time = seconds;
    myArray3[counter] = lap_time;
    let hrs = Math.floor(lap_time / 3600);
    let mins = Math.floor((lap_time - (hrs * 3600)) / 60);
    let secs = lap_time % 60;
    myArray3[counter2][counter] = seconds;
    if (secs < 10) secs = '0' + secs;
    if (mins < 10) mins = "0" + mins;
    if (hrs < 10) hrs = "0" + hrs;
    if (counter < 10) {
        counter = "0" + counter;
    }
    lap_el.innerText += ` ${counter}. ${hrs}:${mins}:${secs} \n`;
    counter++;
}

function print() {
    x = history[counter2];
    let hrs = Math.floor(x / 3600);
    let mins = Math.floor((x - (hrs * 3600)) / 60);
    let secs = x % 60;

    if (secs < 10) secs = '0' + secs;
    if (mins < 10) mins = "0" + mins;
    if (hrs < 10) hrs = "0" + hrs;
    if (counter2 < 10) {
        counter2 = "0" + counter2;
    }
    his_el.innerText += ` ${counter2}. ${hrs}:${mins}:${secs} \n lapped times\n`;
    for (let i = 1; i < counter; i++) {
        x = myArray3[i];
        let hrs = Math.floor(x / 3600);
        let mins = Math.floor((x - (hrs * 3600)) / 60);
        let secs = x % 60;

        if (secs < 10) secs = '0' + secs;
        if (mins < 10) mins = "0" + mins;
        if (hrs < 10) hrs = "0" + hrs;
        if (i < 10) {
            i = "0" + i;
        }
        his_el.innerText += `      ${i}. ${hrs}:${mins}:${secs} \n`;
    }
    his_el.innerText += `-------------- \n`;
}

