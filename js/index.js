//@import quotes;

/* Добавляем время на страницу*/
const time = document.querySelector('.time');

function showTime() {
const date = new Date();
const currentTime = date.toLocaleTimeString();
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
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${daypart}/${rand}.jpg')`

}
else {
    rand--;
    if (rand < 10) {
        rand = "0"+rand;
    }
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${daypart}/${rand}.jpg')`

}
});


rightBtn.addEventListener('click', () => {

    let daypart = getTimeOfDay();
    if (rand == 20) {
      rand = 1;
      if (rand < 10) {
          rand = "0"+rand;
      }
      body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${daypart}/${rand}.jpg')`
  
  }
  else {
      rand++;
      if (rand < 10) {
          rand = "0"+rand;
      }
      body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${daypart}/${rand}.jpg')`
  
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
    if(localStorage.city == undefined || localStorage.city.length == 0) {
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
        if(error.message === "Not Found") { 
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
      title: 'Aqua Caelestis',
      src: '../assets/sounds/Aqua Caelestis.mp3',
      duration: '00:58'
    },  
    {      
      title: 'River Flows In You',
      src: '../assets/sounds/River Flows In You.mp3',
      duration: '03:50'
    },
    {      
        title: 'Summer Wind',
        src: '../assets/sounds/Summer Wind.mp3',
        duration: '01:50'
      },
      {      
        title: 'Ennio Morricone',
        src: '../assets/sounds/Ennio Morricone.mp3',
        duration: '01:37'
      }
  ]
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
const audio = new Audio();
function playAudio() {
    if(isPlay == false) {
        audio.src = `./assets/sounds/${playList[startAudio].title}.mp3`;
        songsList.forEach(el => el.classList.remove('item-active'))
       songsList[startAudio].classList.add('item-active');
        audio.play(); 
        isPlay = true;
    }
   else if( isPlay == true) {
    audio.pause();
    isPlay = false;
   }
  }
  
  playBtn.addEventListener('click', playAudio);
 
const rightBtnPlayer = document.querySelector('.play-next'); 

rightBtnPlayer.addEventListener('click', () => {
    startAudio++;

    if(startAudio > 3) {
        startAudio = 0;
    }
    isPlay = false;
    changePlayBtn();
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
    playAudio();
   
})
