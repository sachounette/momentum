
/* Добавляем время на страницу*/
const time = document.querySelector('.time');

function showTime() {
const date = new Date();
const currentTime = date.toLocaleTimeString();
time.textContent=`${currentTime}`;
setTimeout(showTime, 1000);
setTimeout(showDate, 1000);
setTimeout(getTimeOfDay, 1000);

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
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.city}&lang=en&appid=0a550266da79451fc790ccf274c95beb&units=metric`;
    const res = await fetch(url);
    const data = await res.json();    
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)} %`
}

defaultWeather();

async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=0a550266da79451fc790ccf274c95beb&units=metric`;
    const res = await fetch(url);
    const data = await res.json();    
    
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)} %`;
  }

  city.addEventListener('change', () => {
    weatherIcon.className = 'weather-icon owf';
    getWeather()
  });


