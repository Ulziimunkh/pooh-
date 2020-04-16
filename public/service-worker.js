const staticCacheName = "site-static-v2";
const dynamicCacheName = "site-dynamic-v2";
var self = this;
var assets = [
  '/',
  'build/static'
];

self.addEventListener('push', function(event) {
  console.log('Received a push message', event);

  var title = 'Yay a message.';
  var body = 'We have received a push message.';
  var icon = './logo192.png';
  var tag = 'Mango-chat-notification-tag';

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      vibrate: [200, 100, 200, 100, 200, 100, 400],
      tag: tag
    })
  );
});
self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  // Android doesn’t close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  // event.waitUntil(clients.matchAll({
  //   type: 'window'
  // }).then(function(clientList) {
  //   for (var i = 0; i < clientList.length; i++) {
  //     var client = clientList[i];
  //     if (client.url === '/' && 'focus' in client) {
  //       return client.focus();
  //     }
  //   }
  //   if (clients.openWindow) {
  //     return clients.openWindow('/');
  //   }
  // }));
});

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size)
        cache.delete(keys[0]).then(limitCacheSize(name, size));
    });
  });
};

// Install a service worker
// install Service Worker
self.addEventListener("install", evt => {
  evt.waitUntil(
    // console.log('service worker has been installed')
    caches.open(staticCacheName).then(cache => {
      console.log("caching all assets");
      cache.addAll(assets);
    })
  );
});

// Cache and return requests
// fetch event
self.addEventListener("fetch", evt => {
  // console.log('fetch event', evt);
  if (evt.request.url.indexOf("firestore.googleapis.com") === -1) {
    evt.respondWith(
      caches
        .match(evt.request)
        .then(cacheRes => {
          return (
            cacheRes ||
            fetch(evt.request).then(fetchRes => {
              return caches.open(dynamicCacheName).then(cache => {
                cache.put(evt.request.url, fetchRes.clone());
                limitCacheSize(dynamicCacheName, 15);
                return fetchRes;
              });
            })
          );
        })
        .catch(() => {
          if (evt.request.url.indexOf(".html") > -1) {
            return caches.match("../src/pages/Error.html");
          }
        })
    );
  }
});

// Update a service worker
// activate vente
self.addEventListener("activate", evt => {
  // console.log('service worker has been activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(
        keys
          .filter(key => key !== staticCacheName && key !== dynamicCacheName)
          .map(key => caches.delete(key))
      );
    })
  );
});
