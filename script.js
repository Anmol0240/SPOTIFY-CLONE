// BUTTON TOGGLE LOGIC
const btnAll = document.getElementById("btn-all");
const btnMusic = document.getElementById("btn-music");
const heroSongs = document.getElementById("heroSongs");

btnAll.addEventListener("click", () => {
    heroSongs.style.display = "block";
    btnAll.classList.add("active");
    btnMusic.classList.remove("active");
});

btnMusic.addEventListener("click", () => {
    heroSongs.style.display = "none";
    btnMusic.classList.add("active");
    btnAll.classList.remove("active");
});


// SEARCH LOGIC
const searchInput = document.getElementById("mainSearch");

searchInput.addEventListener("input", function () {
    const value = this.value.toLowerCase();
    const cards = document.querySelectorAll(".song-card");

    cards.forEach(card => {
        const title = card.querySelector(".song-title").textContent.toLowerCase();
        const artist = card.querySelector(".song-artist").textContent.toLowerCase();

        if (title.includes(value) || artist.includes(value)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
});


const audioPlayer = document.getElementById("audioPlayer");
const songCards = document.querySelectorAll(".song-card");

const playerImage = document.getElementById("playerImage");
const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");

songCards.forEach(card => {
    card.addEventListener("click", () => {

        // get audio file
        const audioSrc = card.dataset.audio;

        // get visible info from card
        const title = card.querySelector(".song-title").textContent;
        const artist = card.querySelector(".song-artist").textContent;
        const img = card.querySelector("img").src;

        // update player
        audioPlayer.src = audioSrc;
        audioPlayer.play();

        playerImage.src = img;
        playerTitle.textContent = title;
        playerArtist.textContent = artist;
    });
});

const playPauseBtn = document.getElementById("playPauseBtn");

// Play / Pause button click
playPauseBtn.addEventListener("click", () => {

    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }

});

audioPlayer.addEventListener("play", () => {
    playPauseBtn.src = "assets/pause.svg";
});

audioPlayer.addEventListener("pause", () => {
    playPauseBtn.src = "assets/play.svg";
});

const progressBar = document.getElementById("progressBar");

// Update progress while playing
audioPlayer.addEventListener("timeupdate", () => {

    if (!isNaN(audioPlayer.duration)) {
        const progress =
            (audioPlayer.currentTime / audioPlayer.duration) * 100;

        progressBar.value = progress;
    }
});

progressBar.addEventListener("input", () => {
    if (!isNaN(audioPlayer.duration)) {
        audioPlayer.currentTime =
            (progressBar.value / 100) * audioPlayer.duration;
    }
});

audioPlayer.addEventListener("loadedmetadata", () => {
    progressBar.value = 0;
});


window.addEventListener("DOMContentLoaded", () => {

    const firstSong = document.querySelector(".song-card");

    const audioSrc = firstSong.dataset.audio;
    const title = firstSong.querySelector(".song-title").textContent;
    const artist = firstSong.querySelector(".song-artist").textContent;
    const img = firstSong.querySelector("img").src;

    audioPlayer.src = audioSrc;

    playerImage.src = img;
    playerTitle.textContent = title;
    playerArtist.textContent = artist;
});
