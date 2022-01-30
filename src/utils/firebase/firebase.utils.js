import { initializeApp } from "firebase/app"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBnNMQ3YLS8X7GuH16uwITV9Zj5T-w1hl0",
    authDomain: "crwn-clothing-db-1b2ff.firebaseapp.com",
    projectId: "crwn-clothing-db-1b2ff",
    storageBucket: "crwn-clothing-db-1b2ff.appspot.com",
    messagingSenderId: "761368966633",
    appId: "1:761368966633:web:db2f54a0c2adc2acb6c778"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocument = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt });
        } catch (e) {
            console.log('error creating the user', e.message);
        }
    }

    return userDocRef;
}