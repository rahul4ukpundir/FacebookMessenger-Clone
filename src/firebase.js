import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore/lite';



const firebaseConfig ={
    apiKey: "AIzaSyB8JUEGCJdxvJQ-TWi-CW-896gNZeb3FHI",
    authDomain: "facebook-messenger-clone-5cc72.firebaseapp.com",
    projectId: "facebook-messenger-clone-5cc72",
    storageBucket: "facebook-messenger-clone-5cc72.appspot.com",
    messagingSenderId: "416341045129",
    appId: "1:416341045129:web:d2ea28a71e350aee9abb58",
    measurementId: "G-VL7HRJ1CZS"
}


const app = initializeApp(firebaseConfig);
const db = new getFirestore(app);
debugger;
export default db ;