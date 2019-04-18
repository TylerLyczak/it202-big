/*
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */


version = '1.1';

let cacheName = 'Multi-Purpose' + version;

self.addEventListener('install', e => {
  let timeStamp = Date.now();
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/it202-big/',
        '/it202-big/index.html',
        '/it202-big/styles',
        '/it202-big/styles/style.css',
        '/it202-big/styles/semantic.min.css',
        '/it202-big/scripts',
        '/it202-big/scripts/crime.js',
        '/it202-big/scripts/map.js',
        '/it202-big/scripts/script.js',
        '/it202-big/scripts/semantic.min.js',
        '/it202-big/images',
        '/it202-big/images/GitHub-Mark-Light-120px-plus.png',
        '/it202-big/images/icons',
        '/it202-big/images/icons/icon-72x72.png',
        '/it202-big/images/icons/icon-96x96.png',
        '/it202-big/images/icons/icon-128x128.png',
        '/it202-big/images/icons/icon-144x144.png',
        '/it202-big/images/icons/icon-152x152.png',
        '/it202-big/images/icons/icon-192x192.png',
        '/it202-big/images/icons/icon-384x384.png',
        '/it202-big/images/icons/icon-512x512.png'
      ])
      .then(() => self.skipWaiting());
    })
  )
});

// https://stackoverflow.com/questions/41009167/what-is-the-use-of-self-clients-claim

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
