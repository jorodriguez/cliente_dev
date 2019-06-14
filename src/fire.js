import firebase from 'firebase/app'
import 'firebase/messaging'
  
var firebaseConfig = {
    apiKey: "AIzaSyCKv2X2cou74BSE7pxl3T9on7y0HGzn_Js",
    authDomain: "magic-ff92f.firebaseapp.com",
    databaseURL: "https://magic-ff92f.firebaseio.com",
    projectId: "magic-ff92f",
    storageBucket: "magic-ff92f.appspot.com",
    messagingSenderId: "119606004783",
    appId: "1:119606004783:web:46ab6c7d5bbb79ac"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  //firebaseApp.firestore().settings({ timestampsInSnapshots: true });
  export default firebaseApp.messaging();