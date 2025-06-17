// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPFKMviZbyBwgZoXMstwlUVDz7tJEh1ks",
  authDomain: "job-portal-a50f8.firebaseapp.com",
  projectId: "job-portal-a50f8",
  storageBucket: "job-portal-a50f8.firebasestorage.app",
  messagingSenderId: "682985420695",
  appId: "1:682985420695:web:0f31a7804ddae032b576d2"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);



export default auth;
