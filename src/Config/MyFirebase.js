import firebase from 'firebase'

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
firebase.firestore().settings({
    timestampsInSnapshots: true
})

export const myFirebase = firebase
export const myFirestore = firebase.firestore()
export const myStorage = firebase.storage()
