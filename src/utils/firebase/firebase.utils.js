import { initializeApp } from 'firebase/app';
import { getAuth,
        // signInWithRedirect,
        signInWithPopup,
        signInWithEmailAndPassword,
        GoogleAuthProvider,
        createUserWithEmailAndPassword,
        signOut,
        onAuthStateChanged
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCoMphGYKCruUAqbJdYhpCWA9-CExRoPU8",
    authDomain: "crown-clothing-db-e809b.firebaseapp.com",
    projectId: "crown-clothing-db-e809b",
    storageBucket: "crown-clothing-db-e809b.appspot.com",
    messagingSenderId: "35180798341",
    appId: "1:35180798341:web:e8ae52f7411709bee764ec"
};

// Initialize Firebase
/* const firebaseApp = */initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup( auth, googleProvider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth){
        return;
    }
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if( !userSnapshot.exists() ){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }catch(error){
            console.log('error creating he user ',error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password){
        return;
    }
    return createUserWithEmailAndPassword(auth, email , password);
}

export const signInAuthUserWithEmailAndPassword = ( email , password) => {
    if(!email || !password){
        return;
    }
    return signInWithEmailAndPassword(auth, email , password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>  onAuthStateChanged(auth,callback);