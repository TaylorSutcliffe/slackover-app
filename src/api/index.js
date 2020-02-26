import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyC0nyosmEn0y6HSf6WLUJVQiY60WxIrrNA",
  authDomain: "slackover-chat.firebaseapp.com",
  databaseURL: "https://slackover-chat.firebaseio.com",
  projectId: "slackover-chat",
  storageBucket: "slackover-chat.appspot.com",
  messagingSenderId: "840118303550",
  appId: "1:840118303550:web:72941c88249d978f0c4a6f",
  measurementId: "G-58F7JHB1XF"
};
// Initialize Firebase
firebase.initializeApp(config);

export default firebase;