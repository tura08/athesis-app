import { useState } from "react";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth, db } from "../firebase/config";
// import { doc, updateDoc } from "firebase/firestore";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    // set up a flag for the clean up function
    let isMounted = true;

    try {
      // Set the persistence to session-only: the user stays logged in until the browser window is closed.
      await setPersistence(auth, browserSessionPersistence);
      // Then sign in
      const res = await signInWithEmailAndPassword(auth, email, password);

      // update online status
      // const userRef = doc(db, "users", res.user.uid);
      // await updateDoc(userRef, { online: true });

      if (isMounted) {
        dispatch({ type: "LOGIN", payload: res.user });
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (isMounted) {
        setError(err.message);
        setIsPending(false);
      }
    }

    // clean up function: unmount component and update the flag
    return () => {
      isMounted = false;
    };
  };

  return { login, error, isPending };
};
