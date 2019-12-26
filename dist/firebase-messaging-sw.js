importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAr6815fc2pES5Kkmaw06UmeUwdGSHJ0Zw",
  authDomain: "whenisgurubashiarena-app.firebaseapp.com",
  databaseURL: "https://whenisgurubashiarena-app.firebaseio.com",
  projectId: "whenisgurubashiarena-app",
  storageBucket: "whenisgurubashiarena-app.appspot.com",
  messagingSenderId: "353480065881",
  appId: "1:353480065881:web:91bd2ef38da777e4820248",
  measurementId: "G-1TMEZ08SBK"
});

const messaging = firebase.messaging();