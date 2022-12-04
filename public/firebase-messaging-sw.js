importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAHrujR7n8q6UPorLLQxx0v9SYwjns8_xI",
  authDomain: "task-manager-f1d8b.firebaseapp.com",
  databaseURL:
    "https://task-manager-f1d8b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "task-manager-f1d8b",
  storageBucket: "task-manager-f1d8b.appspot.com",
  messagingSenderId: "706813468472",
  appId: "1:706813468472:web:3d1ede580c13134c80abcd",
  measurementId: "G-5X7YEYD32W",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
