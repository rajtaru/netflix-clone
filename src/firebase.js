
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword,
     getAuth,
      signInWithEmailAndPassword,
      signOut} from 'firebase/auth'
import { addDoc,
     collection,
      getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyACDP6dGMnnL_CrGYtqsgvVTkXAzwEh3Dw",
  authDomain: "netflix-clone-6310b.firebaseapp.com",
  projectId: "netflix-clone-6310b",
  storageBucket: "netflix-clone-6310b.firebasestorage.app",
  messagingSenderId: "1052803749412",
  appId: "1:1052803749412:web:870613fa08f6222017eab1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async(name, email, password)=>{
    try{
        const res= await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await addDoc(collection(db,'user'),{
            uid:user.uid,
            name,
            authProvider:'local',
            email
        })
    }catch(e){
        toast.error(e.code.split('/')[1].split('-').join(' '))
    }
}

const login =async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password)
    }catch(e){
       toast.error(e.code.split('/')[1].split('-').join(' '))
    }
}

const logout =async ()=>{
    signOut(auth)
}

export {auth, db, login, signup, logout}