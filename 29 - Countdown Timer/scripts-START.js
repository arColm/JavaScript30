const display = document.querySelector(".display");
const timerControls = document.querySelector(".timer__controls");
const timerButtons = timerControls.querySelectorAll("button");
const timerForm = timerControls.querySelector("form");
const timerFormInput = timerForm.querySelector("input");

const displayTimeLeft = display.querySelector(".display__time-left");
const displayEndTime = display.querySelector(".display__end-time");

var timeRemaining = 0;

var countdown;

function startTimer(time) {
    clearInterval(countdown);
    timeRemaining = time;
    showTime();
    showEndTime();

    countdown = setInterval(() => {
        if(timeRemaining<=0) clearInterval(countdown);
        else {
            timeRemaining--;

            showTime();
        }
    },1000)
}

function showTime() {
    let minutes = Math.floor(timeRemaining/60);
    let seconds = timeRemaining%60;
    let formattedSeconds = seconds.toLocaleString('en-US', {
        minimumIntegerDigits: 2
    });

    let text = `${minutes}:${formattedSeconds}`;

    displayTimeLeft.innerHTML = text;
    document.title = `${minutes}:${formattedSeconds}`

}

function showEndTime() {
    let today = new Date();
    let currentHours = today.getHours();
    let currentMinutes = today.getMinutes();
    let currentSeconds = today.getSeconds();

    let hours = Math.floor(timeRemaining/3600);
    let minutes = Math.floor((timeRemaining%3600)/60);
    let seconds = timeRemaining%60;

    let endSeconds = (currentSeconds + seconds);
    let endMinutes = (currentMinutes+minutes) + Math.floor(endSeconds/60);
    let endHours = (currentHours+hours) + Math.floor(endMinutes/60);
    endSeconds = endSeconds %60;
    endMinutes = endMinutes%60;
    endHours = endHours%60;

    displayEndTime.innerHTML = `Be back at ${endHours}:${endMinutes}`;
}

function handleButtonInput(e) {
    let time = this.dataset.time;
    startTimer(time);
}

function handleFormInput(e) {
    e.preventDefault();
    let minutes = timerFormInput.value;
    let time = minutes*60;
    startTimer(time);
    
    timerFormInput.value = "";
}


timerButtons.forEach(button => {
    button.addEventListener("click",handleButtonInput);
});
timerForm.addEventListener("submit",handleFormInput);