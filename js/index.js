import i18Obj from './translate.js'
window.addEventListener('load', getLocalStorage);

function defineLang() {
    const langs = document.querySelectorAll('.lang');
    let cussrentLang;
    langs.forEach(el => el.checked?  cussrentLang = el : false);
  let myLang = cussrentLang.value;
    return myLang;
}
/* Добавляем время на страницу*/
const time = document.querySelector('.time');

function showTime() {
const date = new Date();
let currentTime = date.toLocaleTimeString('en-US', { hour12: false });
if (currentTime.slice(0,2) == "24"){
    const regex = "24";
   currentTime =  currentTime.replace(regex, '00');
    time.textContent= currentTime;
}
else {time.textContent= currentTime;
    
}
setTimeout(showTime, 1000);
setTimeout(showDate, 1000);
setTimeout(getTimeOfDay, 1000);
//setTimeout(getWeather, 1000);
}
  showTime();


/* Добавляем дату на страницу */

const currentDate = document.querySelector('.date');

function showDate(myLang) {
    myLang = defineLang();
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const dateInfo = date.toLocaleDateString(myLang, options);
    currentDate.textContent=`${dateInfo}`;
    }

/* Добавляем приветствие + Local Storage для хранения приветствия*/
const greeting = document.querySelector('.greeting');

     function getTimeOfDay(myLang) {
     myLang = defineLang();
     let daypart = dayPart();
     greeting.textContent = `Good ${daypart}`; 
     let smth = greeting.textContent;
     smth = i18Obj[myLang][greeting.textContent];
    greeting.textContent = smth;
    return greeting;

}
function dayPart(){
    const date = new Date();
    const timeOfTheDay = ['night', 'morning', 'afternoon', 'evening'];
    const hours = date.getHours();
    let daytime =  Math.floor(hours/6);
    let daypart = timeOfTheDay[daytime];
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

       if(localStorage.getItem('obj')) {
            let notes = localStorage.getItem('obj');
            notes = notes.split('').filter(el => el!= ",").join('');
            let notesList  = document.querySelector('.notes-list');
            notesList.insertAdjacentHTML('beforeend' , notes)

        }
     let settingsElemList  = document.querySelector('.popup__text');
    //   settingsElemList.innerHTML = '';
/*console.log(localStorage.getItem('settings'))
     if(localStorage.getItem('settings')) {
          let notes = localStorage.getItem('settings');
            notes = notes.split('').filter(el => el!= ",").join('');
                     settingsElemList.insertAdjacentHTML('beforeend' , notes);


        }*/
     
        }


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
   // setTimeout(bgChange, 1000);

}
bgChange();

const leftBtn = document.querySelector('.slide-prev');
const rightBtn = document.querySelector('.slide-next');

leftBtn.addEventListener('click', () => {
   
if(body.classList.contains('github-bg')) {
  let daypart = dayPart();
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
}}
else if(body.classList.contains('flickr-bg')) {
    getFlickrBg();

}
else if(body.classList.contains('unsplash-bg')) {
    getUnsplashBg();

}
});


rightBtn.addEventListener('click', () => {
    if(body.classList.contains('github-bg')) {
    let daypart = dayPart();
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
  }}
  else if(body.classList.contains('flickr-bg')) {
    getFlickrBg();

}
else if(body.classList.contains('unsplash-bg')) {
    getUnsplashBg();

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
async function defaultWeather(myLang) {
    myLang = defineLang();

    if(localStorage.city == undefined) {
        city.value = "Minsk";
        if(myLang == "ru") {
            city.value = "Минск";
        }
       
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${myLang}&appid=0a550266da79451fc790ccf274c95beb&units=metric`;
        const res = await fetch(url);
        const data = await res.json();  
        
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    
    wind.textContent = `${i18Obj[myLang]["Wind speed:"]} ${Math.floor(data.wind.speed)} ${i18Obj[myLang]["m/s"]}`;
    humidity.textContent = `${i18Obj[myLang]["Humidity:"]}: ${Math.floor(data.main.humidity)} %`;


    }
    else {
       
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.city}&lang=${myLang}&appid=0a550266da79451fc790ccf274c95beb&units=metric`;
        const res = await fetch(url);
        const data = await res.json();  
        let error = new Error(res.statusText);
        if(error.message === "Not Found" || localStorage.city.length == 0) { 
            weatherIcon.className = 'weather-icon owf';
            temperature.textContent = "";
            weatherDescription.textContent = i18Obj[myLang][weatherDescription.dataset.i18];
            wind.textContent = "";
            humidity.textContent = "";

        }
        else {
            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
            temperature.textContent = `${Math.floor(data.main.temp)}°C`;
            weatherDescription.textContent = data.weather[0].description;
            wind.textContent = `${i18Obj[myLang]["Wind speed:"]} ${Math.floor(data.wind.speed)} ${i18Obj[myLang]["m/s"]}`;
            humidity.textContent = `${i18Obj[myLang]["Humidity:"]}: ${Math.floor(data.main.humidity)} %`;
        }
}
}
defaultWeather();
async function getWeather(myLang) {  
    myLang = defineLang();
    weatherDescription.textContent = "";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${myLang}&appid=0a550266da79451fc790ccf274c95beb&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 
    let error = new Error(res.statusText);
    if(error.message === "Not Found" || city.value.length ===0) {
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = "";
        weatherDescription.textContent = "";
        weatherDescription.textContent = i18Obj[myLang][weatherDescription.dataset.i18];
        wind.textContent = "";
        humidity.textContent = "";
        
    }
   else {
    weatherDescription.textContent = data.weather[0].description;
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    wind.textContent = `${i18Obj[myLang]["Wind speed:"]} ${Math.floor(data.wind.speed)} ${i18Obj[myLang]["m/s"]}`;
    humidity.textContent = `${i18Obj[myLang]["Humidity:"]}: ${Math.floor(data.main.humidity)} %`;
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
 
async function getQuotes(myLang) {  
    myLang = defineLang();
    if(myLang == "ru") {
        let quotes = './js/rus-quotes.json';
        const res = await fetch(quotes);
        const data = await res.json(); 
        randIndex = Math.floor(Math.random() * 19) + 1;
        author.textContent = data[randIndex].author;
        quote.textContent = `"${data[randIndex].text}"`;
        
    }
    else if(myLang == "en") {
        let quotes = './js/quotes.json';
        const res = await fetch(quotes);
        const data = await res.json(); 
    
        author.textContent = data[randIndex].author;
        quote.textContent = `"${data[randIndex].text}"`;
         randIndex = getRandomQuoteIndex();
    };
    //const quotesRussian = './js/rus-quotes.json';

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
        title: 'Röyksopp - Running To The Sea',
        src: '../assets/sounds/Röyksopp - Running To The Sea.mp3',
        duration: '04:54'
      },  
      {      
        title: 'Ashes Remain - On My Own',
        src: '../assets/sounds/Ashes Remain - On My Own.mp3',
        duration: '02:53'
      },  
      {      
        title: 'Paramore - Let The Flames Begin',
        src: '../assets/sounds/Paramore - Let The Flames Begin.mp3',
        duration: '03:18'
      },  
      {      
        title: 'The Offspring - Your Gonna Go Far Kid',
        src: '../assets/sounds/The Offspring - Your Gonna Go Far Kid.mp3',
        duration: '02:57'
      },  
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
    if(startAudio > playList.length-1 ) {
        startAudio = 0;
    }
    isPlay = false;
    audio.currentTime = 0;
    playAudio();
});
  
 playBtn.addEventListener('click', (event) => {
  
    playAudio ()

});
 
const rightBtnPlayer = document.querySelector('.play-next'); 

rightBtnPlayer.addEventListener('click', () => {
    startAudio++;

    if(startAudio > playList.length-1) {
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
        startAudio = playList.length-1 ;
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
const timeline = document.querySelector(".audio-timeline");
timeline.addEventListener("click", (e) => {
let volumeSLiderWidth = window.getComputedStyle(timeline).width;
let  timelinedIS =  e.offsetX / parseInt(volumeSLiderWidth);
 audio.currentTime = (audio.duration * timelinedIS);
}, false);

setInterval(() => {
    timeline.value = audio.currentTime/audio.duration*100
  }, 500);


const volumeBtn = document.querySelector('.volume-button');
const volumeSLider = document.querySelector('.volumeBar');


volumeSLider.addEventListener("click", e => {
let volumeSLiderWidth = window.getComputedStyle(volumeSLider).width;
   let volumeToSeek =  e.offsetX / parseInt(volumeSLiderWidth);
   audio.volume = volumeToSeek;

if (volumeToSeek > 0) {
    volumeBtn.style.backgroundImage = "url('./assets/svg/volume.svg')";

   }
   else if (volumeToSeek < 0 ){
    volumeBtn.style.backgroundImage = "url('./assets/svg/no-volume.svg')";

   }

   }, false);

function rememberVOlume () {
    let remember = audio.volume;
    audio.volume = remember;
}
 volumeBtn.addEventListener('click', (event) => {
 
   if (event.target.classList.contains('unmute')) {
        volumeBtn.classList.remove('unmute');
        volumeBtn.classList.add('mute');
        volumeBtn.style.backgroundImage = "url('./assets/svg/no-volume.svg')";
        audio.volume = 0;

    }
    else if (event.target.classList.contains('mute')) {
        volumeBtn.classList.remove('mute');
        volumeBtn.classList.add('unmute');
        volumeBtn.style.backgroundImage = "url('./assets/svg/volume.svg')";
        let volumeSLiderWidth = window.getComputedStyle(volumeSLider).width;
    let   volumeToSeek = (volumeSLider.value/100 * parseInt(volumeSLiderWidth));
       volumeToSeek = volumeToSeek/parseInt(volumeSLiderWidth);
   audio.volume = volumeToSeek;

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


   /* заметочки */


   const noteInput = document.querySelector('.note-input');
   const notesList = document.querySelector('.notes-list');
   let notesArray = [];
   noteInput.addEventListener('keydown', (event) => {
    const notes = document.querySelectorAll('.in-process');
    if (event.keyCode === 13) {
      //  const notes = document.querySelectorAll('.in-process');
        let b = '';
        notes.forEach(el => {if (el.classList.contains('editing')) {b = 'not-do' }});
       if(b == 'not-do'){
       noteInput.value = "";
       notes.forEach(el => {  el.classList.remove('editing')});
       
       }
      //console.log(val)
        else if (noteInput.value == '' || noteInput.value.trim() == '') {}
        
        else {
        
       let note = document.createElement("li");
       let boxNote = document.createElement("input");
       let noteText = document.createElement("p");
       let close = document.createElement('div');
       let edit = document.createElement('div');
       close.classList.add('close');
       edit.classList.add('edit');
       noteText.classList.add('note-text');
       boxNote.classList.add('not-checked');
       boxNote.type = "checkbox";
       note.classList.add('in-process');
       notesList.appendChild(note);
       note.appendChild(boxNote);
       noteText.textContent = noteInput.value;
       note.appendChild(noteText);
       note.appendChild(close);
       note.appendChild(edit);
       noteInput.value = '';
       notesArray.push(note.outerHTML);

        }   
listStatus();

    }   
   })

function listStatus(){
    const kids = document.querySelectorAll('.in-process');
    let arr = [];
    kids.forEach(el => arr.push(el.outerHTML));
    let json = arr;
    localStorage.setItem('obj', json);
    //console.log(obj)
}

   notesList.addEventListener('click', (event) => {
    if(event.target.classList.contains('close')){
        let newValue = event.target.closest('li');
        newValue.remove();
        listStatus();
    }
   }) 
   notesList.addEventListener('click', (event) => {
    if(event.target.classList.contains('not-checked')){

        if (event.target.checked) {
            event.target.setAttribute("checked", "checked");

            let newValue = event.target.closest('li').querySelector('.note-text');
            newValue.style.textDecoration = "line-through";
            newValue.style.opacity = "0.5";
        }
        else {
            event.target.removeAttribute("checked", "checked");
            let newValue = event.target.closest('li').querySelector('.note-text');
            newValue.style.textDecoration = "none";
            newValue.style.opacity = "1";
        }
        listStatus();

    }
   }) 
   const deleteNotes = document.querySelector('.delete-notes');
   deleteNotes.addEventListener('click', () => {
    const listNotes = document.querySelectorAll('.in-process');
    listNotes.forEach(el => el.remove());
 
    listStatus();


   }
)
const toDo = document.querySelector('.to-do-list');
const notesContainer = document.querySelector('.notes-content');
toDo.addEventListener('click', () => {
    notesContainer.classList.toggle('notes-shown')  //.notes-shown
})


const edit = document.querySelector('.edit');

notesList.addEventListener('click', (event) => {

    if(event.target.classList.contains('edit')){
        const list = document.querySelectorAll('.in-process');
        list.forEach(el => el.classList.remove('editing'))
        let newValue = event.target.closest('li').querySelector('.note-text').textContent;
        let myLi = event.target.closest('li');
        event.target.closest('li').classList.add('editing');
        noteInput.value = event.target.closest('li').querySelector('.note-text').textContent;
        

        noteInput.addEventListener('input', () => {
            if (myLi.classList.contains('editing')) {
                myLi.querySelector('.note-text').textContent = noteInput.value;
            }
        })
        
    }     
    }) 

/* POPUP*/


const popupLink = document.querySelector('.popup-link');
const popup = document.querySelector('.popup');
popupLink.addEventListener('click', (e)=> {
    popup.classList.add('open');
    e.preventDefault();
})

const popupClose = document.querySelector('.close-popup');
popupClose.addEventListener('click', (e)=> {
    popup.classList.remove('open');
    e.preventDefault();
})

/* НАСТРОЙКИ */

const hideElemSettings = document.querySelectorAll('.hide-elem-item');
const inputAudio = document.getElementById('Player');
const playerContainer = document.querySelector('.player');


function turnCheckBoxSettings () {
    if (event.target.checked) {
        event.target.setAttribute("checked", "checked");
        let newValue = event.target.closest('input').name;
        let targetElement = document.querySelector(`.${newValue}`)
        targetElement.classList.remove('hidden-item');

    }
    else if (!event.target.checked ) {
        event.target.removeAttribute("checked", "checked");
        let newValue = event.target.closest('input').name;
        let targetElement = document.querySelector(`.${newValue}`)
        targetElement.classList.add('hidden-item');
    }
}

hideElemSettings.forEach(el => 
    el.addEventListener('click', (event) => {
    turnCheckBoxSettings();

}));



const bgSettings = document.querySelectorAll('.chBckgr');
const tag = document.getElementById('tag');

tag.addEventListener('keydown', (event) => {
    const currentImagePaths = document.querySelectorAll('.chBckgr');
    let requiredInput;
    currentImagePaths.forEach(el => {if(el.checked){
       requiredInput = el.value;
    }});
   if(event.keyCode === 13) {
        if(requiredInput == 'Github') {
        
        }
        else if(requiredInput == 'Unsplash') {
        getUnsplashBg()
    }
    else if(requiredInput == 'Flickr') {
        getFlickrBg()
    
    }}
}) 

async function getUnsplashBg(){
   //XpU3hGUpmo6TDh24C_HzOzDwwJkDhsXYrpj4iL949L4 -> api key
   
  const url = `https://api.unsplash.com/photos/random?query=${tag.value}&client_id=XpU3hGUpmo6TDh24C_HzOzDwwJkDhsXYrpj4iL949L4`;
    const res = await fetch(url);
    const data = await res.json();
    const img = new Image();
    img.src = `${data.urls.regular}`;
    img.onload = () => {      
   body.style.background =  `url(${img.src})`;
   body.style.backgroundColor =  'rgba(0,0,0,0.5)';
   body.style.backgroundSize =  'cover';


    }   
}

async function getFlickrBg(){
   //78b2145e41dac193d202c2c3628bee1c -> api key
   let rand = Math.floor(Math.random() * 99) + 1;

    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=78b2145e41dac193d202c2c3628bee1c&tags=${tag.value}&extras=url_l&format=json&nojsoncallback=1`;
     const res = await fetch(url);
     const data = await res.json();

  const img = new Image();
  img.src = `${data.photos.photo[rand].url_l}`;
  img.onload = () => {      
   body.style.background =  `url(${img.src})`;
   body.style.backgroundColor =  'rgba(0,0,0,0.5)';
   body.style.backgroundSize =  'cover';

    }
    
 }

function BgChoose () {
    if (event.target.checked) {
        if(event.target.value == 'Github'){
          //  body.style.background = 'none';
            body.classList.add('github-bg');
            body.style.backgroundColor =  'rgba(0,0,0,0.5)';

            body.classList.remove('flickr-bg');
            body.classList.remove('unsplash-bg');
            bgChange();
        }
        else if (event.target.value == 'Flickr'){
          //  body.style.background = 'none';
            body.classList.remove('github-bg');
            body.classList.remove('unsplash-bg');
            body.classList.add('flickr-bg');
            getFlickrBg();

        }
        else if (event.target.value == 'Unsplash'){
           // body.style.background = 'none';
            body.classList.remove('github-bg');
            body.classList.remove('flickr-bg');
            body.classList.add('unsplash-bg');
            getUnsplashBg();
        }
    }
}
bgSettings.forEach(el => 
    el.addEventListener('click', (event) => {
        BgChoose();
       

}));

const rulang = document.getElementById('Rus');
const enlang = document.getElementById('English');
function getTranslate (languages) {
  const dictionary = document.querySelectorAll('[data-i18]');
  dictionary.forEach((el) => {
    el.textContent = i18Obj[languages][el.dataset.i18];
  });


  const placeholders = document.querySelectorAll('[data-placeholder]');
  placeholders.forEach((el) => {
  let attr =   el.getAttribute("placeholder");
  el.placeholder = i18Obj[languages][el.dataset.placeholder];
  });


}
rulang.addEventListener('click', () => {

    getTranslate('ru');
    quote.classList.remove('in-eng');
    quote.classList.add('in-rus');
    getQuotes();
    defineLang() ;getWeather();
  


});

enlang.addEventListener('click', () => {

getTranslate('en')
quote.classList.remove('in-rus');
getQuotes();
defineLang() ;getWeather()

});


function saveMe (){
document.querySelectorAll(".to-save").forEach(el => {
    el.onchange = () => localStorage.setItem(el.id, el.checked);
    el.checked = localStorage.getItem(el.id) === "true";
    checkMe(el);
  })
};

saveMe();

function checkMe(el) {
   if (el.checked){
    let blocks = document.querySelector(`.${el.name}`);
    blocks.setAttribute("checked", "checked");
    blocks.classList.remove('hidden-item');   
   }
   else if (!el.checked){
    let blocks = document.querySelector(`.${el.name}`);
    blocks.setAttribute("checked", "checked");
    blocks.classList.add('hidden-item'); 
   }
}

//РАДИО КНОПКИ 


const radios = document.querySelectorAll('.lang');
const radiosContainer = document.querySelector('.langs');
function recordBtnChanges() {
    radiosContainer.addEventListener('change', () => {
        let arr = []; arr.length = 0;
        radios.forEach(el => arr.push(el.checked));
        localStorage.setItem ("object", JSON.stringify(arr));
    })
}

recordBtnChanges();

function changeLangBtn(myLang) {
   let myVal =  JSON.parse (localStorage.getItem ("object"));
   for(let i = 0; i < myVal.length; i++) {
    radios[i].checked = myVal[i];
}
myLang = defineLang();
if(myLang == "ru") {
    getTranslate('ru');
    quote.classList.remove('in-eng');
    quote.classList.add('in-rus');
   
    getQuotes();
    defaultWeather(); 
}
else if(myLang == "en"){
    getTranslate('en')
    quote.classList.remove('in-rus');
   
    getQuotes();
    defaultWeather() ;

}
}
changeLangBtn();

//апи картинки

const apisBtn = document.querySelectorAll('.chBckgr');
const apisContainer = document.querySelector('.apis');
function recordApisChanges() {
    apisContainer.addEventListener('change', () => {
        let arr = []; arr.length = 0;
        apisBtn.forEach(el => arr.push(el.checked));
        localStorage.setItem ("objectApis", JSON.stringify(arr));
    })
}

recordApisChanges();


function changeLangApisBtn() {
    let myVal =  JSON.parse (localStorage.getItem ("objectApis"));
    for(let i = 0; i < myVal.length; i++) {
        apisBtn[i].checked = myVal[i];
 }
 apisBtn.forEach(el => {
    let b = '';
    el.checked == true? b = el.id : false
    
 if(b == "Github") {
    bgChange();

 }     
 else if( b == "Flickr") {
    getFlickrBg();

 }  
 else if( b == "Unsplash") {
    getUnsplashBg();

 } }  )
}

 changeLangApisBtn()
