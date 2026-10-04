importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// Misma configuración que index.html — si cambias una, cambia la otra.
firebase.initializeApp({
  apiKey: "AIzaSyAySr57QVrZjnQgNOQu9af9NXB-feKUung",
  authDomain: "yapp-9f1b3.firebaseapp.com",
  projectId: "yapp-9f1b3",
  storageBucket: "yapp-9f1b3.firebasestorage.app",
  messagingSenderId: "1083478912472",
  appId: "1:1083478912472:web:bd9f79a0ae3b9b445016ad"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const n = payload.notification || {};
  self.registration.showNotification(n.title || 'Yapp', {
    body: n.body || '',
    icon: 'yappimg.png',
    badge: 'yappimg.png',
    tag: (payload.data && payload.data.chatId) || 'yapp',
    data: payload.data || {}
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      if (clients.openWindow) return clients.openWindow('./');
    })
  );
});
