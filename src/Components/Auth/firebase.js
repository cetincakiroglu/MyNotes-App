import firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyAfdWsCAIswFGPpYuhXBNSUtVpv3uXIfjc",
    authDomain: "mynotes-312617.firebaseapp.com",
    databaseURL: "https://mynotes-312617-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mynotes-312617",
    storageBucket: "mynotes-312617.appspot.com",
    messagingSenderId: "504976774479",
    appId: "1:504976774479:web:4e72b62476134d6a62213a"
})

export const auth = app.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default app;