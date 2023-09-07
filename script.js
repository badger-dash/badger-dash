var loadingscreen = document.getElementById("loading-screen");
var startscreen = document.getElementById("start");
var orderscreen = document.getElementById("order");
var deliverscreen = document.getElementById("deliver");

var beforeInstallPrompt;
var price;
var userLocation;
var allowedLocation;
var pages = document.getElementsByClassName("page");

//FOR WEB APP INSTALL
window.addEventListener("load", () => {
  registerSW();
});
async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("serviceworker.js");
    } catch (e) {
      console.log("SW registration failed");
    }
  }
}
beforeInstallPrompt = null;
window.addEventListener("beforeinstallprompt", eventHandler, errorHandler);
function eventHandler(event) {
  beforeInstallPrompt = event;
}
function errorHandler(event) {
  console.log("error: " + event);
}
function install() {
  if (beforeInstallPrompt) beforeInstallPrompt.prompt();
}

//FOR LOADING SCREEN BACKGROUND
function loadCircles() {
  var x = document.createElement("div");
  var size = Math.floor(Math.random() * 150) + 50;
  x.style = `
    position: absolute;
    top: ${Math.random() * window.innerHeight}px;
    left: ${Math.random() * window.innerWidth}px;
    height: ${size}px;
    width: ${size}px;
    border-radius: 50%;
    opacity: ${Math.random() * 0.5}; 
    z-index: -1;
    filter: blur(15px);
    background: #ed3124;
    `;
  loadingscreen.appendChild(x);
}
for (let i = 0; i < 20; i++) {
  loadCircles();
}

function calculateCost(distance) {
  price = (100 * Math.round(100 * (distance * 4 + 0.35))) / 100;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    allowedLocation = true;
  } else {
    alert("Badger Dash requires location access to work");
    allowedLocation = false;
  }
}
function showPosition(position) {
  userLocation = {
    lat: `Latitude: ${position.coords.latitude}`,
    long: `Longitude: ${position.coords.longitude}`,
  };
}

setInterval(function() {
  if (allowedLocation === true) {
    getLocation();
  }
}, 5000);

function displayPage(elmnt) {
  for (let i = 0; i < pages.length; i++) {
    pages[i].style.visibility = "hidden";
  }
  elmnt.style.visibility = "visible";
}

function continueOn() {
  setTimeout(function() {
  if (allowedLocation === true) {
    displayPage(loadingscreen);
    console.log(userLocation.lat + " - " + userLocation.long);
  } else {
    alert("Badger Dash requires location access to work");
    console.log("Location access denied.");
  }
}, 100);
}