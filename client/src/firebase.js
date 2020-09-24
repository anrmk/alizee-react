import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGaMWZBgIzDRXN2S9AeHoCEXuoPU96VBw",
  authDomain: "alizee-fb.firebaseapp.com",
  databaseURL: "https://alizee-fb.firebaseio.com",
  projectId: "alizee-fb",
  storageBucket: "alizee-fb.appspot.com",
  messagingSenderId: "152723546653",
  appId: "1:152723546653:web:c5edb159fde20162f29cf4",
  measurementId: "G-NKY89HGGJ9"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;