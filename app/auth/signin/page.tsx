"use client";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { provider, signInWithPopup, auth } from "@/firebase.config";
import { getIdToken, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { handleSignIn, handleSignOut } from "@/utils/auth.utils";

function SignIn() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  

  useEffect(() => {
    if(auth.currentUser) {
      setUser(auth.currentUser);
      return;
    }
    const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        const token = await getIdToken(user);
        Cookies.set("token", token, { expires: 1, path: '/' });
        setUser(user);
        // navigate to dashboard using next router
        router.push("/your/dashboard");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <div className="flex justify-center align-center">
      {user ? (
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-black text-white border-2 rounded-md"
        >
          Sign out
        </button>
      ) : (
        <button onClick={handleSignIn} className="px-4 py-2 bg-black text-white border-2 rounded-md">
          Sign in
        </button>
      )}
      <p>{auth.currentUser?.email}</p>
    </div>
  );
}

export default SignIn;
