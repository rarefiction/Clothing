import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB7TMH0fM-CTYxiKtiDihnxb_PYsRz8htI",
  authDomain: "clothing-db-9da42.firebaseapp.com",
  projectId: "clothing-db-9da42",
  storageBucket: "clothing-db-9da42.appspot.com",
  messagingSenderId: "386086064834",
  appId: "1:386086064834:web:c29e527973bd302475215b",
  measurementId: "G-HSJR1DXEYB",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: "select_acocunt" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
