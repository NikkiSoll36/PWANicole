/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var cacheName='CSv4';

var cachedFiles = [
    '/', 
    '/index.html',
    '/manifest.json',
    '/js/main.js',
    '/css/main.css',
    '/css/normalize.min.css',
    '/img/airforce.jpeg',
    '/img/ait.jpeg',
    '/img/chevy.jpeg',
    '/img/pennstatelogo.jpg',
    '/img/profilepic.jpeg',
    '/img/watercolor.jpeg',
    '/img/aths.png',
    'img/share.png',
    '/apple-touch-icon.png',
    '/android-chrome-192x192.png'
];

self.addEventListener('install', function(evt){
    console.log('Service worker install event');
    //add files to cache
    evt.waitUntil(
          caches.open(cacheName).then(function(cache){
              console.log('Caching Files');
              return cache.addAll(cachedFiles);
          }).then(function(){
              return self.skipWaiting();
          }).catch(function(error){
              console.log('Cache failed', err);
          })
    );
           
});


self.addEventListener('activate', function(evt){
    console.log('Service worker activated');
    evt.waitUntil(
           caches.keys().then(function(keyList){
               return Promise.all(keyList.map(function(key){
                   if(key !== cacheName){
                       console.log('removing old cache', key);
                       return caches.delete(key)
                   }
               }));
           }) 
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(evt){
    console.log('fetch event occurred'+ evt.request.url);
    evt.respondWith(
       caches.match(evt.request).then(function(response){
           return response || fetch(evt.request);
       })
    );
    
});

function closeNotification(msg, evt){
    console.log(msg, evt.notification.data);
    evt.notification.close();
}

self.addEventListener('notificationclose', function(evt){
    closeNotification('Notification closed', evt);
});

self.addEventListener('notificationclick', function(evt){
    if(evt.action !== 'close'){
        evt.waitUntil(
            sel.clients.matchAll({type: 'window', includeUncontrolled: 'true'}).then(function(allClients){
                console.log(allClients);
                for(var i =0; i< allClients.length; i++){
                    if(allClients[i].visibilityState === 'visible'){
                        console.log('navigate');
                        allClients[i].navigate(evt.notification.data.loc);
                        break;
                    }
                }
            })    
        );
    }
    closeNotification('Notification clicked', evt);
});


    