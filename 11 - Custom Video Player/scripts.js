const player = document.querySelector(".player");
const video = document.querySelector("video");
const progress = document.querySelector(".progress");
const progressFilled = document.querySelector(".progress__filled");
const playButton = document.querySelector(".player__button");
const volumeRange = document.querySelector(`input[name="volume"]`);
const playbackRateInput = document.querySelector(`input[name="playbackRate"]`);
const rewindButton = document.querySelector(`button[data-skip="-10"]`);
const fastForwardButton = document.querySelector(`button[data-skip="25"]`);

var mousedown = false;

function togglePlay() {
    if(video.paused) {
        video.play();
        playButton.innerHTML = "❚ ❚";
    }
    else {
        video.pause();
        playButton.innerHTML = "►";
    }
}

function changeVolume() {
    let volume = this.value;
    video.volume = volume;
}

function changePlaybackRate() {
    let playbackRate = this.value;
    video.playbackRate = playbackRate;
}

function handleVideoPlaying() {
    let progress = (video.currentTime / video.duration)*100;
    progressFilled.style.setProperty("flex-basis",progress+"%");
}

function changeProgressSeconds(change) {
    console.log(change);
    let currentTime = video.currentTime;
    currentTime = currentTime + change;
    if(currentTime<0) currentTime =0;
    video.currentTime = currentTime;
}

function changeProgressPercent(e) {
    if(mousedown){
        let currentTime = video.currentTime;
        let duration = video.duration;
        let percent = e.offsetX / progress.offsetWidth;
        console.log(percent);
        video.currentTime = percent*duration;
    }

}



playButton.addEventListener("click",togglePlay);
video.addEventListener("click",togglePlay);
volumeRange.addEventListener("input",changeVolume);
playbackRateInput.addEventListener("input",changePlaybackRate);
video.addEventListener("timeupdate",handleVideoPlaying);
rewindButton.addEventListener("click",e => changeProgressSeconds(-10));
fastForwardButton.addEventListener("click",e=> changeProgressSeconds(25));
progress.addEventListener("mousemove",e => changeProgressPercent(e));
progress.addEventListener("mousedown",() => mousedown = true);
progress.addEventListener("mouseup", () => mousedown=false);