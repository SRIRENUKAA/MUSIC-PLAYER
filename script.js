"use strict";

const imgEl = document.getElementById('bg_img');
const imgCoverEl = document.getElementById('cover');
const musicTitleEl = document.getElementById('music_title');
const musicArtistEl = document.getElementById('music_artist');
const playerProgressEl = document.getElementById('player_progress');
const progressEl = document.getElementById('progress');
const currentTimeEl = document.getElementById('current_time');
const durationEl = document.getElementById('duration');

const prevBtnEl = document.getElementById('prev');
const playvBtnEl = document.getElementById('play');
const nextvBtnEl = document.getElementById('next');



const songs = [
    {
    path: "imgs_audio/3.mp3",
    displayName: "Sirukki Vaasam",
    cover: "imgs_audio/img-3.jpg",
    artist: "Dhanush",
    },
    {
    path: "imgs_audio/2.mp3",
    displayName: "The Life Of Ram",
    cover: "imgs_audio/img-2.jpg",
    artist: "Govind Vasantha, Pradeep Kumar",
    },
    {
    path: "imgs_audio/1.mp3",
    displayName: "Oru Nallil Song",
    cover: "imgs_audio/img-1.jpg",
    artist: "Yuvan Shankar Raja",
    },
    {
    path: "imgs_audio/4.mp3",
    displayName: "Nee Partha Vizhikal",
    cover: "imgs_audio/img-4.jpg",
    artist: "Vijay Yesudas,Swetha Mohan",
    },
];

const music = new Audio();

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    } else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;
    playvBtnEl.classList.replace("fa-play", "fa-pause");
    playvBtnEl.setAttribute("title", "pause");
    music.play();
}

function pauseMusic(){
    isPlaying = false;
    playvBtnEl.classList.replace("fa-pause", "fa-play");
    playvBtnEl.setAttribute("pause", "title");
    music.pause();
}

//--------------------load songs---------------------------------------
function loadMusic(songs){
    music.src = songs.path;
    musicTitleEl.textContent = songs.displayName;
    musicArtistEl.textContent = songs.artist;
    imgCoverEl.src = songs.cover;
    imgEl.src = songs.cover;
}

//----------------------------------change music-----------------------------------
function changeMusic(direction){
    musicIndex = musicIndex + direction + (songs.length % songs.length);
    loadMusic(songs[musicIndex]);
    playMusic();
}

//-------------set progress----------------------
function setProgressBar(e){
    const width = playerProgressEl.clientWidth;
    const xValue = e.offsetX;
    music.currentTime = (xValue / width ) * music.duration;
}

function updateProgressBar(){
    const {duration, currentTime} = music;
    const ProgressPercent = (currentTime / duration) * 100;
    progressEl.style.width = `${ProgressPercent}%`;

    const formattime = (TimeRanges) => String(Math.floor(TimeRanges)).padStart(2,"0");
    durationEl.textContent = `${formattime(duration / 60)} : ${formattime(
        duration % 60,
    )}`;
    currentTimeEl.textContent = `${formattime(currentTime / 60)} : ${formattime(
        currentTime % 60,
    )}`;
}

const btnEvents = () => {
    playvBtnEl.addEventListener('click',togglePlay);
    nextvBtnEl.addEventListener("click", () => changeMusic(1));
    prevBtnEl.addEventListener("click", () => changeMusic(-1));

    //-------------------progressbar----------------------------
    music.addEventListener("ended", () => changeMusic(1));
    music.addEventListener("timeupdate", updateProgressBar);
    playerProgressEl.addEventListener("click", setProgressBar);
};

document.addEventListener("DOMContentLoaded", btnEvents)

//-------------------calling load music-------------------

loadMusic(songs[musicIndex]);