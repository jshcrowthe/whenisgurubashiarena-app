import { LitElement, html } from 'lit-element';

import firebase from "firebase/app";
import 'firebase/messaging';
import 'firebase/firestore';

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
const db = firebase.firestore();

class PushNotificationHelper extends LitElement {
  static get tagName() { return 'push-notification-helper'; }
  static get properties() { 
    return {
      pushSupported: Boolean,
      pushSubscribed: Boolean
    }
  }
  
  constructor() {
    super();
    this.pushSubscribed = false;
    this.pushSupported = 'serviceWorker' in navigator && 'PushManager' in window;
  }
  
  render() {
    if (this.pushSupported) {
      if (this.pushSubscribed) {
        return html`<p>You've subscribed to notifications</p>`
      }
      return html`<button @click="${this.handleClick}">Notify me when the event is about to start</button>`;
    }
  }

  async handleClick(evt) {
    try {

      await messaging.requestPermission();
      messaging.usePublicVapidKey('BOku3HZQj5uNI0kyE0bB0-V1wbnyC-v5QNhOwSkFptpsbzMFCyWN5rOpQe3QPI--LmK6sUhI3gh-cZIY-FbqkLE');
      
      const token = await messaging.getToken();
      console.log('User Token:', token);

      if (token) {
        await db.collection('tokens').add({
          token,
        });
      } else {
        // TODO: Handle this
      }
      
    } catch (error) {
      console.error(error);
    }
  }
}

customElements.define(PushNotificationHelper.tagName, PushNotificationHelper);
