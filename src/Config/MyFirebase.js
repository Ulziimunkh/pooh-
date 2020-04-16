import firebase from 'firebase'
// import * as admin from "firebase-admin";

const config = {
    apiKey: "AIzaSyB0cWWECSVpxwusX-Gltp_181PWv6oHKf8",
    authDomain: "pooh-882bf.firebaseapp.com",
    databaseURL: "https://pooh-882bf.firebaseio.com",
    projectId: "pooh-882bf",
    storageBucket: "pooh-882bf.appspot.com",
    messagingSenderId: "27165195535",
    appId: "1:27165195535:web:bea0ae69e206360dbfd27a",
    measurementId: "G-9GS4T8DN9M"
}
firebase.initializeApp(config)
firebase.firestore();

// var serviceAccount = require("./pooh-882bf-firebase-adminsdk-jofgx-a0a58d8ef3.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://pooh-882bf.firebaseio.com"
// });

// export const myAdmin = admin
export const myFirebase = firebase
export const myFirestore = firebase.firestore()
export const myStorage = firebase.storage()
