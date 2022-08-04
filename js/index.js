//@import quotes;

/* Добавляем время на страницу*/
const time = document.querySelector('.time');

function showTime() {
const date = new Date();
const currentTime = date.toLocaleTimeString('en-US', { hour12: false });
time.textContent=`${currentTime}`;
setTimeout(showTime, 1000);
setTimeout(showDate, 1000);
setTimeout(getTimeOfDay, 1000);
setTimeout(bgChange, 1000);
}
  showTime();

/* Добавляем дату на страницу */

const currentDate = document.querySelector('.date');

function showDate() {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const dateInfo = date.toLocaleDateString('en-US', options);
    currentDate.textContent=`${dateInfo}`;
    }

/* Добавляем приветствие + Local Storage для хранения приветствия*/
const greeting = document.querySelector('.greeting');


     function getTimeOfDay() {
     const date = new Date();
     const timeOfTheDay = ['night', 'morning', 'afternoon', 'evening'];
     const hours = date.getHours();
     let daytime =  Math.floor(hours/6);
     let daypart = timeOfTheDay[daytime];
     greeting.textContent = `Good ${timeOfTheDay[daytime]} `; 
     return daypart;
}
const name = document.querySelector('.name');

function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
    }

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
        if(localStorage.getItem('name')) {
         name.value = localStorage.getItem('name');
        }
        if(localStorage.getItem('city')) {
            city.value = localStorage.getItem('city');
        }
     
        }

window.addEventListener('load', getLocalStorage);

/* Делаем слайдер изображений активным */

const body = document.querySelector('body');
function getRandom() {
    let rand = Math.floor(Math.random() * 20) + 1;
    if (rand < 10) {
        rand = "0"+rand;
    }
    return rand;
}
let rand = getRandom();
function bgChange(){
    
    const date = new Date();
    const timeOfTheDay = ['night', 'morning', 'afternoon', 'evening'];
    const hours = date.getHours();
    let daytime =  Math.floor(hours/6);
    let number = rand;
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfTheDay[daytime]}/${number}.jpg')`;
  
}
bgChange();

const leftBtn = document.querySelector('.slide-prev');
const rightBtn = document.querySelector('.slide-next');

leftBtn.addEventListener('click', () => {
  let daypart = getTimeOfDay();
  if (rand == 1) {
    rand = 20;
    if (rand < 10) {
        rand = "0"+rand;
    }
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${daypart}/${rand}.jpg`;
    img.onload = () => {      
   body.style.backgroundImage =  `url(${img.src})`;

    }; 

}
else {
    rand--;
    if (rand < 10) {
        rand = "0"+rand;
    }
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${daypart}/${rand}.jpg`;
    img.onload = () => {      
        body.style.backgroundImage =  `url(${img.src})`;
    }; 
}
});


rightBtn.addEventListener('click', () => {

    let daypart = getTimeOfDay();
    if (rand == 20) {
      rand = 1;
      if (rand < 10) {
          rand = "0"+rand;
      }
      const img = new Image();
      img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${daypart}/${rand}.jpg`;
      img.onload = () => {      

        body.style.backgroundImage =  `url(${img.src})`;
    };   
  }
  else {
      rand++;
      if (rand < 10) {
          rand = "0"+rand;
      }
      const img = new Image();
      img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${daypart}/${rand}.jpg`;
      img.onload = () => {      
        body.style.backgroundImage =  `url(${img.src})`;
    };   
  }
})
/*Добавляем виджет погоды*/

//ключ апи: https://api.openweathermap.org/data/2.5/weather?q=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA&lang=en&appid=0a550266da79451fc790ccf274c95beb&units=metric
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
async function defaultWeather() {
    if(localStorage.city == undefined) {
        city.value = "Minsk";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=0a550266da79451fc790ccf274c95beb&units=metric`;
        const res = await fetch(url);
        const data = await res.json();  
        
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)} %`


    }
    else {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.city}&lang=en&appid=0a550266da79451fc790ccf274c95beb&units=metric`;
        const res = await fetch(url);
        const data = await res.json();  
        let error = new Error(res.statusText);
        if(error.message === "Not Found" || localStorage.city.length == 0) { 
            weatherIcon.className = 'weather-icon owf';
            temperature.textContent = "";
            weatherDescription.textContent = "The city name is either empty, or incorrect. Please try again ^_^"
            wind.textContent = "";
            humidity.textContent = "";

        }
        else {
            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
            temperature.textContent = `${Math.floor(data.main.temp)}°C`;
            weatherDescription.textContent = data.weather[0].description;
            wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
            humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)} %`
        }
}
}
defaultWeather();
async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=0a550266da79451fc790ccf274c95beb&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 
    let error = new Error(res.statusText);
    if(error.message == "Not Found" || city.value.length ==0) {
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = "";
        weatherDescription.textContent = "The city name is either empty, or incorrect. Please try again ^_^"
        wind.textContent = "";
        humidity.textContent = "";
        
    }
   else {
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)} %`;
   }
  }
  city.addEventListener('change', () => {
        weatherIcon.className = 'weather-icon owf';
        getWeather();
  });

/* Добавляем цитаты */

function getRandomQuoteIndex() {
    let randIndex = Math.floor(Math.random() * 1642) + 1;
    return randIndex;
}
let randIndex = getRandomQuoteIndex();

const author = document.querySelector('.author'); 
const quote = document.querySelector('.quote');
const quoteBtn = document.querySelector('.change-quote');
  async function getQuotes() {  
    const quotes = './js/quotes.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    author.textContent = data[randIndex].author;
    quote.textContent = `"${data[randIndex].text}"`;
     randIndex = getRandomQuoteIndex();

  }
getQuotes();

quoteBtn.addEventListener('click', () => {
    author.textContent = "";
    quote.textContent = "";
    getQuotes();

});


/*АУДИОПЛЕЕР*/

const playList = [
    {      
      title: 'Thousand Foot Krutch - War of Change',
      src: '../assets/sounds/Thousand Foot Krutch - War of Change.mp3',
      duration: '03:51'
    },  
    {      
      title: 'My Chemical Romance - The Sharpest Lives',
      src: '../assets/sounds/My Chemical Romance - The Sharpest Lives.mp3',
      duration: '03:20'
    },
    {      
        title: 'Deuce - I Came to Party ',
        src: '../assets/sounds/Deuce - I Came to Party.mp3',
        duration: '03:39'
      },
      {      
        title: 'Lindemann - Yukon',
        src: '../assets/sounds/Lindemann - Yukon.mp3',
        duration: '04:45'
      }
  ]
  const length = document.querySelector('.length');
  const current = document.querySelector('.current');
  const songs = document.querySelector('.play-list');

  for (let i = 0; i < playList.length; i++) {
  let liChild = document.createElement("li");
  liChild.classList.add('play-item')
  liChild.textContent = `${playList[i].title}`;
  songs.appendChild(liChild);
  }

let isPlay = false;
const playBtn = document.querySelector('.play');
function changePlayBtn() {
    if (!isPlay) {
        playBtn.classList.remove('play');
        playBtn.classList.add('pause');
    }
    else {
        playBtn.classList.add('play');
        playBtn.classList.remove('pause');

    }
}
playBtn.addEventListener('click', changePlayBtn);
let startAudio = 0;
const songsList = document.querySelectorAll('.play-item');
const playingAudio = document.querySelector('marquee');
playingAudio.textContent = ` `;
const audio = new Audio();
audio.volume= 0.5;
let stopTime = 0;

function playAudio() {
     stopTime = audio.currentTime;
   // console.log(stopTime)
    if(isPlay == false) {
        audio.src = `./assets/sounds/${playList[startAudio].title}.mp3`;
        audio.currentTime = stopTime;

        playingAudio.textContent = `${playList[startAudio].title}`;
        songsList.forEach(el => el.classList.remove('item-active'));
        songsList[startAudio].classList.add('item-active');
        length.textContent = `${playList[startAudio].duration}`;
        audio.play(); 
        isPlay = true;

    }
   else if( isPlay == true) {
    audio.pause();
    stopTime = audio.currentTime;
    isPlay = false;

   }
  }

  audio.addEventListener("ended", function () {
    startAudio++;
    if(startAudio > 3) {
        startAudio = 0;
    }
    isPlay = false;
    
    playAudio();
});
  
 playBtn.addEventListener('click', (event) => {
    if (event.target.classList.contains('play')) {
        let stopTime = audio.currentTime;
    }
    playAudio ()

});
 
const rightBtnPlayer = document.querySelector('.play-next'); 

rightBtnPlayer.addEventListener('click', () => {
    startAudio++;

    if(startAudio > 3) {
        startAudio = 0;
    }
    isPlay = false;
    changePlayBtn();
    audio.currentTime = 0;
    playAudio();
   
})

const leftBtnPlayer = document.querySelector('.play-prev'); 

leftBtnPlayer.addEventListener('click', () => {
    startAudio--;
    if(startAudio < 0) {
        startAudio = 3;
    }
    isPlay = false;
    changePlayBtn();
    audio.currentTime = 0;
    playAudio();
   
});

function audioCurrentTime () {
    let minutes = Math.floor( audio.currentTime / 60 )
    let timeForSeconds = audio.currentTime - ( minutes * 60 ) // seconds without counted minutes 
    let seconds = Math.floor( timeForSeconds )
    let secondsReadable = seconds > 9 ? seconds : `0${seconds}` // To change 2:2 into 2:02
    current.textContent =  `${minutes}:${secondsReadable}`;
    setTimeout(audioCurrentTime, 1000);
}
audioCurrentTime ();
const timeline = document.querySelector(".timeline");
const progressBar = document.querySelector(".progress");

timeline.addEventListener("click", e => {
 let timelineWidth = window.getComputedStyle(timeline).width;
const timeToSeek = e.offsetX / parseInt(timelineWidth) *  audio.duration ;
  audio.currentTime = timeToSeek;
}, false);

setInterval(() => {
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
   
  }, 500);
const volumeBtn = document.querySelector('.volume-button');
const volumeSLider = document.querySelector('.volume-slider-btn');
const volumeProgress = document.querySelector('.volume-percentage');
volumeSLider.addEventListener("click", e => {
let volumeSLiderWidth = window.getComputedStyle(volumeSLider).width;
   let volumeToSeek =  e.offsetX / parseInt(volumeSLiderWidth);
   audio.volume = volumeToSeek;
   volumeProgress.style.width = volumeToSeek * 100 + "%";
   if (volumeToSeek > 0) {
    volumeBtn.style.backgroundImage = "url('../assets/svg/volume.svg')";

   }
   else {
    volumeBtn.style.backgroundImage = "url('../assets/svg/no-volume.svg')";

   }

   }, false);


   volumeBtn.addEventListener('click', (event) => {
   let targetVolume = window.getComputedStyle(volumeProgress).width;
   let volumeSLiderWidth = window.getComputedStyle(volumeSLider).width;

  let rememberVolume = parseInt(targetVolume)/parseInt(volumeSLiderWidth);

    if (event.target.classList.contains('unmute')) {
        volumeBtn.classList.remove('unmute');
        volumeBtn.classList.add('mute');
        volumeBtn.style.backgroundImage = "url('./assets/svg/no-volume.svg')";
      //  volumeProgress.style.width = 0 + "%";
        audio.volume = 0;

    }
    else if (event.target.classList.contains('mute')) {
        
        volumeBtn.classList.remove('mute');
        volumeBtn.classList.add('unmute');
        volumeBtn.style.backgroundImage = "url('./assets/svg/volume.svg')";
       /* volumeProgress.style.width = rememberVolume * 100 + "%";
        console.log(rememberVolume)
        console.log(rememberVolume * 100 + "%")*/
        audio.volume = rememberVolume;
    }
   });

   songs.addEventListener('click', (event) => {
    songsList.forEach(el => el.classList.remove('item-active'));
    event.target.classList.add('item-active');
    let platingId = playList.find(el => el.title == event.target.textContent);
    platingId  = playList.indexOf(platingId);
    startAudio = platingId;

    //if (event.target == )

    isPlay = false;
    changePlayBtn();
    audio.currentTime = 0;
    playAudio();
   })