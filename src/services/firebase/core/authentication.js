import {
  getAuth,
  OAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "./app";
import { c } from "@/services/c";

const auth = getAuth(app);
//signIn functions
export const signInFirebaseWithAppleToken = function (cAppleAuth) {
  const provider = new OAuthProvider("apple.com");
  const credential = provider.credential({
    idToken: cAppleAuth.credential?.idToken,
    rawNonce: cAppleAuth.credential?.nonce,
  });
  return signInWithCredential(auth, credential);
};
export const signInFirebaseWithGoogleToken = function (cGoogleAuth) {
  const credential = GoogleAuthProvider.credential(
    cGoogleAuth.credential?.idToken
  );
  return signInWithCredential(auth, credential);
};
export const signInFirebaseWithFacebookToken = function (cFacebookAuth) {
  const credential = FacebookAuthProvider.credential(
    cFacebookAuth.credential?.accessToken
  );
  return signInWithCredential(auth, credential);
};
export const signInFirebaseWithEmailAndPassword = function (email, password) {
  return signInWithEmailAndPassword(auth, email, password);
};

//signOut function
export const signOutFirebase = function () {
  return signOut(auth);
};

//state listen function
export const runFirebaseAuthStateChanged = function (
  f = (user) => c("AuthStateChanged", user)
) {
  return onAuthStateChanged(auth, f);
};