
// Hids all the divs with the class "content" from showing
function hideScreens() {
  $(".content").hide();
}

$(document).ready(function() {
  hideScreens();
  // register the service worker for offline use
   if('serviceWorker' in navigator) {
     navigator.serviceWorker
              .register('/it202-big/sw.js', {scope: '/it202-big/'})
              .then(function() { console.log("Service Worker Registered"); });
   }
});
