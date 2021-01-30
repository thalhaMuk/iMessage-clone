import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAuC9oH4XJ0nz4bjfSJUnnaqSrIY4Or6q8",
    authDomain: "imessage-clone-2361a.firebaseapp.com",
    projectId: "imessage-clone-2361a",
    storageBucket: "imessage-clone-2361a.appspot.com",
    messagingSenderId: "1096950919076",
    appId: "1:1096950919076:web:101108d334b6dab423db31",
    measurementId: "G-63W02KRC7T"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;