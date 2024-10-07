import { auth, provider } from "@/firebase.config";
import { getIdToken, signInWithPopup } from "firebase/auth";
import Cookies from 'js-cookie';

const handleSignIn = async () => {
  try {
    console.log(auth);
    const result: any = await signInWithPopup(auth, provider);
    const userIdToken = await getIdToken(result.user);
    localStorage.setItem("token", userIdToken);
    // setUser(result.user);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const handleSignOut = async () => {
  try {
    await auth.signOut();
    // setUser(null);
    localStorage.removeItem("token");
    Cookies.remove("token");
  } catch (error) {
    console.log(error);
  }
};

export { handleSignIn, handleSignOut };