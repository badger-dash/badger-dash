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
var beforeInstallPrompt = null;
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
