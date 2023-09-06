var loadingscreen = document.getElementById("loading-screen");
var beforeInstallPrompt;

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
