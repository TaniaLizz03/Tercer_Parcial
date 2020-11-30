import firebase from 'firebase'
import'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyD44tEhjsjDU0IbPz6rlX-To4G9x9OMHc0",
  authDomain: "react-firebase-d66bc.firebaseapp.com",
  databaseURL: "https://react-firebase-d66bc.firebaseio.com",
  projectId: "react-firebase-d66bc",
  storageBucket: "react-firebase-d66bc.appspot.com",
  messagingSenderId: "1050184707652",
  appId: "1:1050184707652:web:e279db735e2df2d0f0d611"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore();
