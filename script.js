const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const preBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Song Title
const songs = ["Press Start","Sharpshooter","X Buster"];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `cover/${song}.png`;
}

// Paly Song 
function playSong(){
    musicContainer.classList.add("play");
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.volume = 0.2;
    audio.play();
}

// Pause Song
function puaseSong(){
    musicContainer.classList.remove("play");
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// Previous Song
function prevSong(){
    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length -1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong(){
    songIndex++;

    if(songIndex > songs.length -1){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Update progress banner
function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) *100;
    progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}


// Event Listener
playBtn.addEventListener("click", ()=>{
    const isPlaying = musicContainer.classList.contains("play");
    if(isPlaying){
        puaseSong();
    }else{
        playSong();
    }
});

// Change Song
preBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/Song update
audio.addEventListener('timeupdate',updateProgress);

// Click on progress bar
progressContainer.addEventListener("click",setProgress);

// Song ends
audio.addEventListener("ended",nextSong);