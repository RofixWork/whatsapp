import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBNp-7ZkkJT62zDYatuLA4vzsveZUiPsEU",
  authDomain: "whatsapp-6d808.firebaseapp.com",
  projectId: "whatsapp-6d808",
  storageBucket: "whatsapp-6d808.appspot.com",
  messagingSenderId: "523831971018",
  appId: "1:523831971018:web:0e75a9a418944b2eacf833",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
