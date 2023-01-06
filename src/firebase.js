import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
const firebaseApp = initializeApp({
    apiKey: "AIzaSyB8JUEGCJdxvJQ-TWi-CW-896gNZeb3FHI",
    authDomain: "facebook-messenger-clone-5cc72.firebaseapp.com",
    projectId: "facebook-messenger-clone-5cc72",
    storageBucket: "facebook-messenger-clone-5cc72.appspot.com",
    messagingSenderId: "416341045129",
    appId: "1:416341045129:web:d2ea28a71e350aee9abb58",
    measurementId: "G-VL7HRJ1CZS"
}

);
const db = getFirestore(firebaseApp)
export default db ;