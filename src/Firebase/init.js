// src/Firebase/init.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDvPKuA1s4lJl4xbYJNey5DHPXlS5uT23Y',
  authDomain: 'fit5032-lib.firebaseapp.com',
  projectId: 'fit5032-lib',
  storageBucket: 'fit5032-lib.firebasestorage.app',
  messagingSenderId: '469455151397',
  appId: '1:469455151397:web:89cd0abdb8e6237f28facc',
}

// 1.Firebase App
const app = initializeApp(firebaseConfig)

// 2.
const auth = getAuth(app)

// 3.
const db = getFirestore(app)

// 4.
export { auth, app }
export default db
