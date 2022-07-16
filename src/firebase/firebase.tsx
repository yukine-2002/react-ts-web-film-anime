import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCn2BehSi_Vo3IFyjP39EVgxfDoBp5S4ss",
    authDomain: "anime-crl.firebaseapp.com",
    databaseURL: "https://anime-crl-default-rtdb.firebaseio.com",
    projectId: "anime-crl",
    storageBucket: "anime-crl.appspot.com",
    messagingSenderId: "600944183140",
    appId: "1:600944183140:web:0b2d18be5d39c74ea3dc71",
    measurementId: "G-FHXBTCKMXZ"
  };
  
  const app = initializeApp(firebaseConfig);
  export const firestore = getFirestore(app);
  
  export const createUserProfileDocument = async (auth : any,additionalData? : any) => {
    const useRef = doc(firestore,`users`,auth.uid)
    const docSnap = await getDoc(useRef);
    if(!docSnap.exists()){
        await setDoc(useRef,{
            name : auth.displayName,
            email : auth.email,
            img : auth.photoURL,
            createAt : new Date()
          }, { merge: true }) 
    }
      return docSnap 
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'})
  export const auth = getAuth();
  
  export const signInWithGoogle = () =>  signInWithPopup(auth, provider)

  const providerFacebook = new FacebookAuthProvider();
  providerFacebook.setCustomParameters({
    'display': 'popup'
  });
  export const signInWithFacebook = () =>  signInWithPopup(auth, providerFacebook).then((result) => {
    // The signed-in user info.
    const user = result.user;
    console.log(user)
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential!.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
