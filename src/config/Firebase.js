import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBzhbvD-g4j7m7rlvkfNzGJY3dl4q1N2P0",
  authDomain: "shrikanth-electricals.firebaseapp.com",
  projectId: "shrikanth-electricals",
  storageBucket: "shrikanth-electricals.appspot.com",
  messagingSenderId: "767909352955",
  appId: "1:767909352955:web:ea547c5d97d9fe8ef6a75e",
  databaseURL:"https://shrikanth-electricals-default-rtdb.firebaseio.com/"
};

export const app = initializeApp(firebaseConfig);