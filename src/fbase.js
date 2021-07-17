import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAvcp42s0vbjOjqPjx2Jqrx2UsU1ALpYP0",
    authDomain: "jacebook-fb84d.firebaseapp.com",
    projectId: "jacebook-fb84d",
    storageBucket: "jacebook-fb84d.appspot.com",
    messagingSenderId: "334659818303",
    appId: "1:334659818303:web:28ebd7f838716ef6e1f98a"
  };

  firebase.initializeApp(firebaseConfig);
  export const authService = firebase.auth();