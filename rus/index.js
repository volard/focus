"use strict";




// =======================
// Google analytics
// =======================

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-135193513-1');
// =======================





// =======================
// definition area
// =======================
const addWord = document.getElementsByClassName('word-creator')[0];
const menu = document.getElementsByClassName('menu')[0];
const main = document.getElementsByClassName('main')[0];
const currentFont = document.getElementsByClassName('current-font')[0];



var isPlaying = false;
var isEnabled_def_words = true;
var isEnabled_def_colors = true;

const options = {
  '--main-background':      '#ffffff',
  '--main-text--family':    '"Arial"', 
  '--main-text--size':      '97px',
  '--main-text--style':     'normal',
  '--main-text--transform': 'lowercase',
  '--main-text--weight':    '400',

  'accent': '#2D2E31',
  'colors': 'defaults',
  'primary':'light',
  'words':  'defaults',
  'frequency': '40',
  'duration': '5',
}

const greetings = [
  'Привет',
  'Здрасть :D',
  'Как ты сегодня?',
  'Рад видеть )',
  ' <3 '
];
// =======================





// =======================
// custom colorpicker
// =======================
const changeMainBack = new CP(document.getElementsByClassName('colorpicker-opener')[0]);

changeMainBack.on("drag", function(color) {
    document.documentElement.style.setProperty('--main-background', '#' + color);
});

changeMainBack.on("stop", function(color) {
  localStorage.setItem('--main-background', '#' + color)
});

const addColor = new CP(document.getElementsByClassName('popup__colorpicker-opener')[0]);

addColor.on("enter", function(color) {
  document.getElementsByClassName('colors-queue')[0].insertAdjacentHTML('afterBegin', '<div class = "opt-color opt-js"></div>');
  isEnabled_def_colors = false;
});

addColor.on("drag", function(color) {
  document.getElementsByClassName('colors-queue')[0].firstChild.style.backgroundColor = "#" + color;
});
// =======================





// =======================
// Delete custom item
// =======================
document.getElementsByClassName('colors-queue')[0].addEventListener('click', function (ev) {
  isEnabled_def_colors = false;
  removeElement(ev.target);
});
document.getElementsByClassName('words-queue')[0].addEventListener('click', function (ev) {
  isEnabled_def_words = false;
  removeElement(ev.target);
});

function removeElement(element) {
  if (element.classList.contains('opt-js')){
    element.remove();
  }
}
// =======================


if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('../service_worker.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });

        document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeEnd', 
        '<link rel="stylesheet" href="../all-fonts.css">')
    });
}

else{
  window.addEventListener('load', () =>{
    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeEnd', 
    '<link rel="stylesheet" href="../all-fonts.css">')
  });
}



// =======================
// saving and initialization
// =======================


window.onbeforeunload = function() {

  alert(isEnabled_def_words, isEnabled_def_colors)
  
 if (! isEnabled_def_words){
   localStorage.setItem('words', getWords().join('&'))
 }
 else{
   localStorage.setItem('words', 'defaults')
 }
    
 if (! isEnabled_def_colors){
   localStorage.setItem('colors', getColors().join('&'))
 }
 else{
   localStorage.setItem('colors', 'defaults')
 }

 localStorage.setItem('duration', document.getElementsByClassName('duration-input')[0].value);
 localStorage.setItem('frequency', document.getElementsByClassName('freq-input')[0].value);
}

// =======================


document.addEventListener("DOMContentLoaded", init);



function init() {
  if (localStorage.getItem('new') !== 'false'){ 
    loadBustard(options);
  }
  else{
    setTimeout(() => { setNoutification(greetings[Math.floor(Math.random() * greetings.length)]); }, 2000);
  }



  for (let key in localStorage){
    if (key.startsWith('--')){
      document.documentElement.style.setProperty(key, localStorage.getItem(key));
    }
  }

  if (localStorage.getItem('--main-text--family')) {
    currentFont.textContent = localStorage.getItem('--main-text--family');
  }

  if (localStorage.getItem('colors') !== 'defaults') {
    setColorsList(localStorage.getItem('colors').split('&'));
    isEnabled_def_colors = false;
  }
  else{
    setColorsList(def_colors);
  }

  if (localStorage.getItem('words') !== 'defaults'){
    setWordsList(localStorage.getItem('words').split('&'));
    isEnabled_def_words = false;
  }
  else{
    setWordsList(def_words);
  }
  try{
    document.querySelector('div[color-data = "'+ localStorage.getItem('accent') +'"]').classList.add('checked');
    document.documentElement.style.setProperty('--highlight-color', localStorage.getItem('accent'));
  }
  catch{}
  try{
    document.querySelector('div[color-data = "'+ localStorage.getItem('primary') +'"]').classList.add('checked');
    changePrimary(localStorage.getItem('primary'));
  }
  catch{}

  document.getElementsByClassName('duration-input')[0].value = localStorage.getItem('duration');
  document.getElementsByClassName('freq-input')[0].value = localStorage.getItem('frequency');
}


function loadBustard(options) {
  localStorage.setItem('new', 'false');
  for (let key in options){
    localStorage.setItem(key, options[key]);
  }
}









//=======================
// theming
//=======================
const primaryOptions = {
  'light': {
    '--hover-subMenu-textColor': '#313131', 
    '--subMenu-textColor': '#CBCBCB',
    '--subMenu-backColor': '#DEDEDE',
    '--main-color': 'white',
    '--secondary-color': '#DDDDDD',
    '--customNumberInput-text': '#6d6262'
  },
  'dark': {
    '--hover-subMenu-textColor': '#BDBDBD',
    '--subMenu-textColor': '#222222',
    '--subMenu-backColor': '#333333',
    '--main-color': '#1B1C1F',
    '--secondary-color': '#2A2A2A',
    '--customNumberInput-text': '#c7bbbb'
  }
};



function changePrimary(type){
  localStorage.setItem('primary', type);

  for (let property of Object.keys(primaryOptions[type])) {  
    document.documentElement.style.setProperty(property, primaryOptions[type][property])  
  }
}


document.getElementsByClassName('color-selection-primary')[0].addEventListener('click', (ev) => {
  if (ev.target.hasAttribute('color-data') && !ev.target.classList.contains('checked')){
    changePrimary(ev.target.getAttribute('color-data'));

    document.getElementsByClassName('checked')[0].classList.remove('checked');
    ev.target.classList.toggle('checked');
  }
});
  
document.getElementsByClassName('color-selection-accent')[0].addEventListener('click', (ev) => {
  if (ev.target.hasAttribute('color-data') && !ev.target.classList.contains('checked')){
    document.documentElement.style.setProperty('--highlight-color', ev.target.getAttribute('color-data'));

    document.getElementsByClassName('checked')[1].classList.remove('checked');
    ev.target.classList.toggle('checked');

    localStorage.setItem('accent', ev.target.getAttribute('color-data'));
  }
});

// =======================












// =======================
// Set default lists
// =======================
var def_colors = [
  "#f17713",
  "#5c1e99",
  "#2e3dbd",
  "#82a9ef",
  "#15971a",
  "#f7132c",
  "#000",
  "#f3e83c",
  "#f677b6",
  "#92f715"
];
var def_words = [
  "синий",
  "желтый",
  "красный",
  "черный",
  "розовый",
  "фиолетовый",
  "зеленый",
  "оранжевый",
  "светлый",
  "коричневый",
  "белый",
  'очаровательный',
  'прозрачный'
];

document.getElementsByClassName('js-def-colors')[0].addEventListener('click', function () {
  setColorsList(def_colors);
  isEnabled_def_colors = true;
});

document.getElementsByClassName('js-def-words')[0].addEventListener('click', function () {
  setWordsList(def_words);
  isEnabled_def_words = true;
});

function clearList(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function setColorsList(list) {
  let html = '';
  let container = document.getElementsByClassName('colors-queue')[0]
  clearList(container);
  for (let x = 0; x < list.length; x++){
    html += '<div class = "opt-color opt-js" style = "background-color:'+ list[x] +'"></div>'
  }
  container.insertAdjacentHTML('afterBegin', html);
}
  
function setWordsList(list) {
  let html = '';
  let container = document.getElementsByClassName('words-queue')[0]
  clearList(container);
  for (let x = 0; x < list.length; x++){
    html += '<div class = "opt-word opt-js">'+ list[x] +'</div>';
  }
  container.insertAdjacentHTML('afterBegin', html);
}
// =======================




// =======================
// Add new words
// =======================
document.getElementsByClassName('contact__input')[0].addEventListener('focus', () => {
  document.getElementsByClassName('words-queue')[0].insertAdjacentHTML('afterBegin', '<div class = "opt-word opt-js"></div>');
});
  
document.getElementsByClassName('contact__input')[0].addEventListener('input', (ev) => {
  document.getElementsByClassName('words-queue')[0].firstChild.textContent = ev.target.value;
});

document.getElementsByClassName('contact__input')[0].addEventListener('blur', (ev) => {
  if (ev.target.value === ''){
    document.getElementsByClassName('words-queue')[0].firstChild.remove();
    isEnabled_def_words = false;
    return;
  }
  ev.target.value = '';
});
// =======================











// =======================
// Settings handlers
// =======================
const substractButtons = document.getElementsByClassName('input__time-arrow-left');
for (let x = 0; x < substractButtons.length; x++) {
  substractButtons[x].addEventListener('click', (ev) => {
     if (ev.target.nextElementSibling.value > 0){
      ev.target.nextElementSibling.value = parseInt(ev.target.nextElementSibling.value) - 1;
    }
  });
}

const addButtons = document.getElementsByClassName('input__time-arrow-right');
for (let x = 0; x < addButtons.length; x++) {
  addButtons[x].addEventListener('click', (ev) => {
     if (ev.target.previousElementSibling.value < 900){
      ev.target.previousElementSibling.value = parseInt(ev.target.previousElementSibling.value) + 1;
    }
  });
}


document.getElementsByClassName('size-range')[0].addEventListener('input', (ev) => {
  document.documentElement.style.setProperty('--main-text--size', ev.target.value + 'px');
});

document.getElementsByClassName('size-range')[0].addEventListener('change', (ev) => {
  localStorage.setItem('--main-text--size', ev.target.value + 'px');
});

document.getElementsByClassName('bold-range')[0].addEventListener('input', (ev) => {
  document.documentElement.style.setProperty('--main-text--weight', ev.target.value);
});

document.getElementsByClassName('bold-range')[0].addEventListener('change', (ev) => {
  localStorage.setItem('--main-text--weight', ev.target.value);
});

document.getElementsByClassName('italic-checkbox')[0].addEventListener('change', (ev) => {
   document.documentElement.style.setProperty('--main-text--style', ev.target.checked ? 'italic' : 'normal');
   localStorage.setItem('--main-text--style', ev.target.checked ? 'italic' : 'normal');
});

document.getElementsByClassName('uppercase-checkbox')[0].addEventListener('change', (ev) => {
   document.documentElement.style.setProperty('--main-text--transform', ev.target.checked ? 'uppercase' : 'lowercase');
   localStorage.setItem('--main-text--transform', ev.target.checked ? 'uppercase' : 'lowercase');
});

document.getElementsByClassName('drop-menu--fonts')[0].addEventListener('click', (ev) => {
  if (ev.target.tagName == 'LI'){
    document.documentElement.style.setProperty('--main-text--family', '"' + ev.target.textContent + '"');
    currentFont.textContent = '"' + ev.target.textContent + '"';
    localStorage.setItem('--main-text--family', '"' + ev.target.textContent + '"');
  }
});
// =======================








// ======================= 
// Toggle popups
// =======================
document.getElementsByClassName('words-btn')[0].addEventListener('click', openPopup);
document.getElementsByClassName('colors-btn')[0].addEventListener('click', openPopup);

function openPopup(ev) {
  document.getElementsByClassName('popup-fallback')[0].classList.add('popup-fallback--visible');
  document.getElementsByClassName(ev.target.getAttribute('data'))[0].classList.add('popup--visible');
}
  
document.getElementsByClassName('popup-fallback')[0].addEventListener('click', closePopup);
document.getElementsByClassName('close_btn')[1].addEventListener('click', closePopup);
document.getElementsByClassName('close_btn')[2].addEventListener('click', closePopup);

function closePopup(ev) {
  document.getElementsByClassName('popup--visible')[0].classList.toggle('popup--visible');
  document.getElementsByClassName('popup-fallback--visible')[0].classList.toggle('popup-fallback--visible');
}
// =======================







// ======================= 
// Toggle menu
// =======================
const open_btn = document.getElementsByClassName('menu--btn')[0];
const close_btn = document.getElementsByClassName('close_btn')[0];
close_btn.addEventListener('click', close);

open_btn.addEventListener('click', () => { 
  menu.classList.add('menu--visible');
});

main.addEventListener('click', (ev) => {
  if (ev.target !== open_btn){ close(); }
});

function close(){
  menu.classList.remove('menu--visible');
}
// =======================






//=======================
//  Noutifications
//=======================

const noutification = document.getElementsByClassName('noutification')[0];

function setNoutification(type, pauseVidible = false){
  if (type === 'pause'){
    noutification.textContent = type;
    noutification.classList.toggle('noutification--visible');
  }

  else if (type === 'stopped'){
    noutification.textContent = type;
    noutification.classList.toggle('noutification--visible');
    setTimeout(() => { noutification.classList.toggle('noutification--visible') }, 2000);
  }

  else if(type === 'started' || type === 'completed'){
    if(pauseVidible){
      noutification.textContent = type;
    }
    else{
      noutification.textContent = type;
      noutification.classList.toggle('noutification--visible');
    }
    setTimeout(() => { noutification.classList.toggle('noutification--visible') }, 1600);
  }

  else {
    noutification.textContent = type;
    noutification.classList.toggle('noutification--visible');
    setTimeout(() => { noutification.classList.toggle('noutification--visible') }, 2500);
  }
}
//=======================






//=======================
//  Game engine
//=======================

var iterations = 0; 
var timeout;
var speed;
var timerId;

document.getElementsByClassName('button-play')[0].addEventListener('click', () => {
  close();
  setNoutification('started');
  let colors = document.getElementsByClassName('')[0];
    

  if (isPlaying){
    setNoutification('resume', true);
  }

  if (! isPlaying){ 
  // if player already have played
    isPlaying = true; 
    speed = 60000/ document.getElementsByClassName('freq-input')[0].value;
    timeout = document.getElementsByClassName('duration-input')[0].value * 60000;
  }

  timerId = setInterval(changeText, speed, getWords(), getColors());

  document.getElementsByClassName('button-play')[0].classList.remove('button-play--visible');
  document.getElementsByClassName('button-pause')[0].classList.add('button-pause--visible');
  document.getElementsByClassName('button-restart')[0].classList.add('button-restart--visible');

  setTimeout(() => {
    clearInterval(timerId); 
    setNoutification('completed');
  }, timeout);
});

document.getElementsByClassName('button-pause')[0].addEventListener('click', () => {
  setNoutification('paused');
  document.getElementsByClassName('button-play')[0].classList.add('button-play--visible');
  document.getElementsByClassName('button-pause')[0].classList.remove('button-pause--visible');
  timeout -= iterations * speed;
  clearTimeout(timerId);
});

document.getElementsByClassName('button-restart')[0].addEventListener('click', () => {
  setNoutification('stopped');
  isPlaying = false;
  document.getElementsByClassName('button-play')[0].classList.add('button-play--visible');
  document.getElementsByClassName('button-pause')[0].classList.remove('button-pause--visible');
  document.getElementsByClassName('button-restart')[0].classList.remove('button-restart--visible');
  timeout = speed = '';
  clearTimeout(timerId);
});


function changeText(words, colors){
  document.getElementsByClassName('main-text')[0].textContent = words[Math.floor(Math.random() * words.length)];
  document.getElementsByClassName('main-text')[0].style.color = colors[Math.floor(Math.random() * colors.length)];
  iterations += 1;
}


function getColors() {
  try{
    let customColors = document.getElementsByClassName('opt-color');
    let result = [];

    for (var i = customColors.length - 1; i >= 0; i--) {
      result.push(customColors[i].style.backgroundColor);
    }

    return result;
  }
  catch{
    return def_colors;
  }
}


function getWords() {
  try{
    let customWords = document.getElementsByClassName('opt-word');
    let result = [];

    for (var i = customWords.length - 1; i >= 0; i--) {
      result.push(customWords[i].textContent);
    }

    return result;
  }
  catch{
    return def_words;
  }
}

//=======================
