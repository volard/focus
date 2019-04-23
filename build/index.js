"use strict";const addWord=document.getElementsByClassName("word-creator")[0],menu=document.getElementsByClassName("menu")[0],main=document.getElementsByClassName("main")[0];var isPlaying=!1,isEnabled_def_words=!0,isEnabled_def_colors=!0;const options={"--main-background":"#ffffff","--main-text--family":'"Arial"',"--main-text--size":"97px","--main-text--style":"normal","--main-text--transform":"lowercase","--main-text--weight":"400",accent:"#2D2E31",colors:"defaults",primary:"light",words:"defaults",frequency:"40",duration:"5"},greetings=["Hello","Hi :D","How are you today?","Nice to see you )"," <3 "],changeMainBack=new CP(document.getElementsByClassName("colorpicker-opener")[0]);changeMainBack.on("drag",function(e){document.documentElement.style.setProperty("--main-background","#"+e)}),changeMainBack.on("stop",function(e){localStorage.setItem("--main-background","#"+e)});const addColor=new CP(document.getElementsByClassName("popup__colorpicker-opener")[0]);function removeElement(e){e.classList.contains("opt-js")&&e.remove()}function init(){"false"!==localStorage.getItem("new")?loadBustard(options):setNoutification(greetings[Math.floor(Math.random()*greetings.length)]);for(let e in localStorage)e.startsWith("--")&&document.documentElement.style.setProperty(e,localStorage.getItem(e));"defaults"!==localStorage.getItem("colors")?(setColorsList(localStorage.getItem("colors").split("&")),isEnabled_def_colors=!1):setColorsList(def_colors),"defaults"!==localStorage.getItem("words")?(setWordsList(localStorage.getItem("words").split("&")),isEnabled_def_words=!1):setWordsList(def_words);try{document.querySelector('div[color-data = "'+localStorage.getItem("accent")+'"]').classList.add("checked"),document.documentElement.style.setProperty("--highlight-color",localStorage.getItem("accent"))}catch{}try{document.querySelector('div[color-data = "'+localStorage.getItem("primary")+'"]').classList.add("checked"),changePrimary(localStorage.getItem("primary"))}catch{}document.getElementsByClassName("duration-input")[0].value=localStorage.getItem("duration"),document.getElementsByClassName("freq-input")[0].value=localStorage.getItem("frequency")}function loadBustard(e){localStorage.setItem("new","false");for(let t in e)localStorage.setItem(t,e[t])}addColor.on("enter",function(e){document.getElementsByClassName("colors-queue")[0].insertAdjacentHTML("afterBegin",'<div class = "opt-color opt-js"></div>'),isEnabled_def_colors=!1}),addColor.on("drag",function(e){document.getElementsByClassName("colors-queue")[0].firstChild.style.backgroundColor="#"+e}),document.getElementsByClassName("colors-queue")[0].addEventListener("click",function(e){isEnabled_def_colors=!1,removeElement(e.target)}),document.getElementsByClassName("words-queue")[0].addEventListener("click",function(e){isEnabled_def_words=!1,removeElement(e.target)}),window.onload=function(){document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeEnd",'<link rel="stylesheet" href="all-fonts.css">')},window.onbeforeunload=function(){alert(isEnabled_def_words,isEnabled_def_colors),isEnabled_def_words?localStorage.setItem("words","defaults"):localStorage.setItem("words",getWords().join("&")),isEnabled_def_colors?localStorage.setItem("colors","defaults"):localStorage.setItem("colors",getColors().join("&")),localStorage.setItem("duration",document.getElementsByClassName("duration-input")[0].value),localStorage.setItem("frequency",document.getElementsByClassName("freq-input")[0].value)},document.addEventListener("DOMContentLoaded",init);const primaryOptions={light:{"--hover-subMenu-textColor":"#313131","--subMenu-textColor":"#CBCBCB","--subMenu-backColor":"#DEDEDE","--main-color":"white","--secondary-color":"#DDDDDD","--customNumberInput-text":"#6d6262"},dark:{"--hover-subMenu-textColor":"#BDBDBD","--subMenu-textColor":"#222222","--subMenu-backColor":"#333333","--main-color":"#1B1C1F","--secondary-color":"#2A2A2A","--customNumberInput-text":"#c7bbbb"}};function changePrimary(e){localStorage.setItem("primary",e);for(let t of Object.keys(primaryOptions[e]))document.documentElement.style.setProperty(t,primaryOptions[e][t])}document.getElementsByClassName("color-selection-primary")[0].addEventListener("click",e=>{e.target.hasAttribute("color-data")&&!e.target.classList.contains("checked")&&(changePrimary(e.target.getAttribute("color-data")),document.getElementsByClassName("checked")[0].classList.remove("checked"),e.target.classList.toggle("checked"))}),document.getElementsByClassName("color-selection-accent")[0].addEventListener("click",e=>{e.target.hasAttribute("color-data")&&!e.target.classList.contains("checked")&&(document.documentElement.style.setProperty("--highlight-color",e.target.getAttribute("color-data")),document.getElementsByClassName("checked")[1].classList.remove("checked"),e.target.classList.toggle("checked"),localStorage.setItem("accent",e.target.getAttribute("color-data")))});var def_colors=["#f17713","#5c1e99","#2e3dbd","#82a9ef","#15971a","#f7132c","#000","#f3e83c","#f677b6","#92f715"],def_words=["blue","yellow","red","black","pink","violet","green","orange","lightblue","brown","white","sublime","transparent"];function clearList(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function setColorsList(e){let t="",s=document.getElementsByClassName("colors-queue")[0];clearList(s);for(let s=0;s<e.length;s++)t+='<div class = "opt-color opt-js" style = "background-color:'+e[s]+'"></div>';s.insertAdjacentHTML("afterBegin",t)}function setWordsList(e){let t="",s=document.getElementsByClassName("words-queue")[0];clearList(s);for(let s=0;s<e.length;s++)t+='<div class = "opt-word opt-js">'+e[s]+"</div>";s.insertAdjacentHTML("afterBegin",t)}document.getElementsByClassName("js-def-colors")[0].addEventListener("click",function(){setColorsList(def_colors),isEnabled_def_colors=!0}),document.getElementsByClassName("js-def-words")[0].addEventListener("click",function(){setWordsList(def_words),isEnabled_def_words=!0}),document.getElementsByClassName("contact__input")[0].addEventListener("focus",()=>{document.getElementsByClassName("words-queue")[0].insertAdjacentHTML("afterBegin",'<div class = "opt-word opt-js"></div>')}),document.getElementsByClassName("contact__input")[0].addEventListener("input",e=>{document.getElementsByClassName("words-queue")[0].firstChild.textContent=e.target.value}),document.getElementsByClassName("contact__input")[0].addEventListener("blur",e=>{if(""===e.target.value)return document.getElementsByClassName("words-queue")[0].firstChild.remove(),void(isEnabled_def_words=!1);e.target.value=""});const substractButtons=document.getElementsByClassName("input__time-arrow-left");for(let e=0;e<substractButtons.length;e++)substractButtons[e].addEventListener("click",e=>{e.target.nextElementSibling.value>0&&(e.target.nextElementSibling.value=parseInt(e.target.nextElementSibling.value)-1)});const addButtons=document.getElementsByClassName("input__time-arrow-right");for(let e=0;e<addButtons.length;e++)addButtons[e].addEventListener("click",e=>{e.target.previousElementSibling.value<900&&(e.target.previousElementSibling.value=parseInt(e.target.previousElementSibling.value)+1)});function openPopup(e){document.getElementsByClassName("popup-fallback")[0].classList.add("popup-fallback--visible"),document.getElementsByClassName(e.target.getAttribute("data"))[0].classList.add("popup--visible")}function closePopup(e){document.getElementsByClassName("popup--visible")[0].classList.toggle("popup--visible"),document.getElementsByClassName("popup-fallback--visible")[0].classList.toggle("popup-fallback--visible")}document.getElementsByClassName("size-range")[0].addEventListener("input",e=>{document.documentElement.style.setProperty("--main-text--size",e.target.value+"px")}),document.getElementsByClassName("size-range")[0].addEventListener("change",e=>{localStorage.setItem("--main-text--size",e.target.value+"px")}),document.getElementsByClassName("bold-range")[0].addEventListener("input",e=>{document.documentElement.style.setProperty("--main-text--weight",e.target.value)}),document.getElementsByClassName("bold-range")[0].addEventListener("change",e=>{localStorage.setItem("--main-text--weight",e.target.value)}),document.getElementsByClassName("italic-checkbox")[0].addEventListener("change",e=>{document.documentElement.style.setProperty("--main-text--style",e.target.checked?"italic":"normal"),localStorage.setItem("--main-text--style",e.target.checked?"italic":"normal")}),document.getElementsByClassName("uppercase-checkbox")[0].addEventListener("change",e=>{document.documentElement.style.setProperty("--main-text--transform",e.target.checked?"uppercase":"lowercase"),localStorage.setItem("--main-text--transform",e.target.checked?"uppercase":"lowercase")}),document.getElementsByClassName("drop-menu--fonts")[0].addEventListener("click",e=>{"LI"==e.target.tagName&&(document.documentElement.style.setProperty("--main-text--family",'"'+e.target.textContent+'"'),localStorage.setItem("--main-text--family",'"'+e.target.textContent+'"'))}),document.getElementsByClassName("words-btn")[0].addEventListener("click",openPopup),document.getElementsByClassName("colors-btn")[0].addEventListener("click",openPopup),document.getElementsByClassName("popup-fallback")[0].addEventListener("click",closePopup),document.getElementsByClassName("close_btn")[1].addEventListener("click",closePopup),document.getElementsByClassName("close_btn")[2].addEventListener("click",closePopup);const open_btn=document.getElementsByClassName("menu--btn")[0],close_btn=document.getElementsByClassName("close_btn")[0];function close(){menu.classList.remove("menu--visible")}close_btn.addEventListener("click",close),open_btn.addEventListener("click",()=>{menu.classList.add("menu--visible")}),main.addEventListener("click",e=>{e.target!==open_btn&&close()});const noutification=document.getElementsByClassName("noutification")[0];function setNoutification(e,t=!1){"пауза"===e?(noutification.textContent=e,noutification.classList.toggle("noutification--visible")):"остановлено"===e?(noutification.textContent=e,noutification.classList.toggle("noutification--visible"),setTimeout(()=>{noutification.classList.toggle("noutification--visible")},2e3)):"старт"===e||"выполнено"===e?(t?noutification.textContent=e:(noutification.textContent=e,noutification.classList.toggle("noutification--visible")),setTimeout(()=>{noutification.classList.toggle("noutification--visible")},1600)):(noutification.textContent=e,noutification.classList.toggle("noutification--visible"),setTimeout(()=>{noutification.classList.toggle("noutification--visible")},2500))}var timeout,speed,timerId,iterations=0;function changeText(e,t){document.getElementsByClassName("main-text")[0].textContent=e[Math.floor(Math.random()*e.length)],document.getElementsByClassName("main-text")[0].style.color=t[Math.floor(Math.random()*t.length)],iterations+=1}function getColors(){try{let t=document.getElementsByClassName("opt-color"),s=[];for(var e=t.length-1;e>=0;e--)s.push(t[e].style.backgroundColor);return s}catch{return def_colors}}function getWords(){try{let t=document.getElementsByClassName("opt-word"),s=[];for(var e=t.length-1;e>=0;e--)s.push(t[e].textContent);return s}catch{return def_words}}document.getElementsByClassName("button-play")[0].addEventListener("click",()=>{close(),setNoutification("старт");document.getElementsByClassName("")[0];isPlaying&&setNoutification("продолжить",!0),isPlaying||(isPlaying=!0,speed=6e4/document.getElementsByClassName("freq-input")[0].value,timeout=6e4*document.getElementsByClassName("duration-input")[0].value),timerId=setInterval(changeText,speed,getWords(),getColors()),document.getElementsByClassName("button-play")[0].classList.remove("button-play--visible"),document.getElementsByClassName("button-pause")[0].classList.add("button-pause--visible"),document.getElementsByClassName("button-restart")[0].classList.add("button-restart--visible"),setTimeout(()=>{clearInterval(timerId),setNoutification("выполнено")},timeout)}),document.getElementsByClassName("button-pause")[0].addEventListener("click",()=>{setNoutification("пауза"),document.getElementsByClassName("button-play")[0].classList.add("button-play--visible"),document.getElementsByClassName("button-pause")[0].classList.remove("button-pause--visible"),timeout-=iterations*speed,clearTimeout(timerId)}),document.getElementsByClassName("button-restart")[0].addEventListener("click",()=>{setNoutification("остановлено"),isPlaying=!1,document.getElementsByClassName("button-play")[0].classList.add("button-play--visible"),document.getElementsByClassName("button-pause")[0].classList.remove("button-pause--visible"),document.getElementsByClassName("button-restart")[0].classList.remove("button-restart--visible"),timeout=speed="",clearTimeout(timerId)});