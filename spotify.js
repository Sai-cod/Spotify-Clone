
console.log('Welcome to Spotify');

let song = document.getElementsByClassName('song-title');
let gif = document.getElementById('music-gif');


let sample = document.getElementById('music-gif');
let audio = new Audio('songs/2.mp3');
let progressbar = document.getElementById('progressBar');
audio.currentTime = 0;
let songbut = document.getElementsByClassName('song-but');
let masterplay = document.getElementById('play-button');
let nextbut = document.getElementById('forward-button');
let prevbut = document.getElementById('previous-button');


let listofsongs = [
    {songname: 'Galti Se Mistake', songpath: 'songs/2.mp3',cover: 'photos/galti.jpg'},
    {songname: 'Channa Mereya', songpath: 'songs/1.mp3',cover: 'photos/channa.jpg'},
    {songname: 'Dua', songpath: 'songs/3.mp3',cover: 'photos/dua.jpg'},
    {songname: 'Bandeya', songpath: 'songs/4.mp3',cover: 'photos/bandeya2.jpg'}
]

let heartplayer = [0,0,0,0]

let arrayAudio = [0,0,0,0]

let refindex = 0, newind = 0;

Array.from(document.getElementsByClassName('song')).forEach((any,i)=>{

    any.getElementsByTagName('img')[0].src = listofsongs[i].cover;
    any.getElementsByClassName('song-title')[0].innerHTML = listofsongs[i].songname;
    
})

const gifoff=()=>{
    Array.from(document.getElementsByClassName('menu-gif')).forEach((element)=>{
        element.style.opacity = '0';
    })
}

audio.src = listofsongs[refindex].songpath;

masterplay.addEventListener('click',()=>{
    if(audio.paused || audio.currentTime<=0) {
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        gif.style.opacity = 1;
        document.getElementsByClassName('menu-gif')[refindex].style.opacity = '1';
        songbut[refindex].classList.remove('fa-play');
        songbut[refindex].classList.add('fa-pause');
        audio.play();
    }
    else {
        gifoff();
        makeallplay();
        masterplay.classList.remove('fa-pause');
        masterplay.classList.add('fa-play');
        songbut[refindex].classList.remove('fa-pause');
        songbut[refindex].classList.add('fa-play');
        gif.style.opacity = 0;
        audio.pause();
    }
})


    // Progression of progressbar
audio.addEventListener('timeupdate',()=>{
    progress = parseInt((audio.currentTime/audio.duration) * 100);
    progressbar.value = progress;
})

// seeker

progressbar.addEventListener('change',()=>{
    audio.currentTime = (progressbar.value * audio.duration) / 100;
})

const makeallplay=()=>{
    Array.from(songbut).forEach((any)=>{
        any.classList.remove('fa-pause');
        any.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('song-but')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeallplay();
        gifoff();
        
        index = parseInt(e.target.id);
        audio.currentTime = 0;
        if(audio.paused || audio.currentTime<=0 && arrayAudio[index]==0) {
            gif.style.opacity = 1;
            refindex = index;
            arrayAudio[index] = 1;
            audio.src = listofsongs[index].songpath;
            document.getElementById('topofmaster').innerHTML = listofsongs[index].songname;
            audio.play();
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            masterplay.classList.remove('fa-play');
            masterplay.classList.add('fa-pause');
            document.getElementsByClassName('menu-gif')[index].style.opacity = '1';
        }
        else if(audio.played || audio.currentTime>0) {
            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play');
            masterplay.classList.remove('fa-pause');
            masterplay.classList.add('fa-play');
            gif.style.opacity = 0;
            audio.pause();
            document.getElementsByClassName('menu-gif')[index].style.opacity = '0';
        }
    })
})

nextbut.addEventListener('click',()=>{
    makeallplay();
    gifoff();
    audio.currentTime = 0;
    newind = (refindex+1)%4;
    audio.src = listofsongs[newind].songpath;
    audio.play();
    refindex = newind;
    document.getElementById('topofmaster').innerHTML = listofsongs[refindex].songname;
    document.getElementsByClassName('menu-gif')[refindex].style.opacity = '1';
    songbut[refindex].classList.remove('fa-play');
    songbut[refindex].classList.add('fa-pause');
})

prevbut.addEventListener('click',()=>{
    makeallplay();
    gifoff();
    audio.currentTime = 0;
    if(refindex-1 < 0) {
        refindex = 4;
    }
    else { 
        refindex--;
    }        
    audio.src = listofsongs[refindex].songpath;
    audio.play();
    document.getElementById('topofmaster').innerHTML = listofsongs[refindex].songname;
    document.getElementsByClassName('menu-gif')[refindex].style.opacity = '1';
    songbut[refindex].classList.remove('fa-play');
    songbut[refindex].classList.add('fa-pause');
    masterplay.classList.remove('fa-play');
    masterplay.classLis.add('fa-pause');
})

let str = "sai";

Array.from(document.getElementsByClassName("song")).forEach((element,i)=>{
    element.getElementsByClassName('fa-heart')[0].addEventListener('click',(any)=>{
        str = any.target.id.slice(0,-1);
        heartindex = parseInt(str);
        if(heartplayer[heartindex]==0) {
            heartplayer[heartindex] = 1;
            any.target.style.color = 'red';
        }
        else {
            heartplayer[heartindex] = 0;
            any.target.style.color = 'white';
   
        }
    })
})











