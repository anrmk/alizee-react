import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxr1Q8B48ZhexmOMaiQX3SCj2egvI6ruc",
  authDomain: "dvso-alizee.firebaseapp.com",
  databaseURL: "https://dvso-alizee.firebaseio.com",
  projectId: "dvso-alizee",
  storageBucket: "dvso-alizee.appspot.com",
  messagingSenderId: "57302216415",
  appId: "1:57302216415:web:ead3d3c6a34a355a04836a",
  measurementId: "G-QDMTV639KE"
  
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;