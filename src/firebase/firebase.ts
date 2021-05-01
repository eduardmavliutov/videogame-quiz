import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

export default firebase
  .initializeApp({
    apiKey: 'AIzaSyCihct81CBjZCKFFxczCg-21rczpbHhd1c',
    authDomain: 'videogame-quizzz.firebaseapp.com',
    databaseURL: process.env.VUE_APP_FIREBASE_URL,
    projectId: 'videogame-quizzz',
    storageBucket: 'videogame-quizzz.appspot.com',
    messagingSenderId: '9357665547',
    appId: '1:9357665547:web:45870505b613c87248ee0e'
  })
