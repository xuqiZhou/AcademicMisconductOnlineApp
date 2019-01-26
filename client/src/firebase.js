import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyA1vPG931ei_JCrh1b0qKyStKiwEYN6qmM",
  authDomain: "richeditor-c8a7c.firebaseapp.com",
  databaseURL: "https://richeditor-c8a7c.firebaseio.com",
  projectId: "richeditor-c8a7c",
  storageBucket: "",
  messagingSenderId: "273655992058"
};
firebase.initializeApp(config);

export const database = firebase.database().ref("/posts");
