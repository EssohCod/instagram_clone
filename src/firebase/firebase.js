import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBabi-JO2OM8Lu2MzyInEv-bnGy4x7LLG4",
	authDomain: "instaclone-78b12.firebaseapp.com",
	projectId: "instaclone-78b12",
	storageBucket: "instaclone-78b12.appspot.com",
	messagingSenderId: "334436938879",
	appId: "1:334436938879:web:436f4627986111f0633b4a",
	measurementId: "G-M5GL3R8CEB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
