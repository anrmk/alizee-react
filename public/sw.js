"use strict";

self.addEventListener("install", function (event) {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(clients.claim());
});

self.addEventListener("push", function (event) {
  const data = JSON.parse(event.data.text());

  const title = data.title;
  const options = {
    body: data.body,
    icon: data.icon || "/android-chrome-384x384.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  if (event.notification.data && event.notification.data.url) {
    return clients.openWindow(event.notification.data.url);
  } else {
    return clients.openWindow("https://themembers.com");
  }
});

self.addEventListener("pushsubscriptionchange", function (event) {
  event.waitUntil(
    Promise.all([
      Promise.resolve(event.oldSubscription ? deleteSubscription(event.oldSubscription) : true),
      Promise.resolve(event.newSubscription ? event.newSubscription : subscribePush(registration)).then(function (sub) {
        return saveSubscription(sub);
      }),
    ])
  );
});
