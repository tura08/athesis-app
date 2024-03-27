import { useState } from "react";

import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";
// import { doc, updateDoc, getDoc } from "firebase/firestore";

import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // set up a flag for the clean up function
    let isMounted = true;

    try {
      // const { uid } = user;

      // if (uid) {
      //   const userRef = doc(db, "users", uid); // Reference to the user's document
      //   const docSnap = await getDoc(userRef); // Attempt to get the document

      //   // Only update the document if it exists
      //   if (docSnap.exists()) {
      //     await updateDoc(userRef, { online: false });
      //   } else {
      //     console.log("User document does not exist, skipping update.");
      //   }
      // }

      await signOut(auth);
      if (isMounted) {
        dispatch({ type: "LOGOUT" });
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (isMounted) {
        console.error("Logout error:", err);
        setError(err.message);
        setIsPending(false);
      }
    }

    // clean up function: unmount component and update the flag
    return () => {
      isMounted = false;
    };
  };
  return { logout, error, isPending };
};
