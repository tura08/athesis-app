import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null); // make sure to reset the error before every signup
    setIsPending(true);

    try {
      // User creation
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // console.log(res.user);
      if (!res.user) throw new Error("Could not complete signup");

      // Thumbnail upload
      // const uploadPath = `thumbnails/${userCredential.user.uid}/${thumbnail.name}`;
      // const imgRef = ref(storage, uploadPath);
      // await uploadBytes(imgRef, thumbnail);
      // const imgURL = await getDownloadURL(imgRef);

      // User profile update
      await updateProfile(res.user, {
        displayName,
        // photoURL: imgURL,
      });

      // Create a user document
      // await setDoc(doc(db, "users", res.user.uid), {
      //   online: true,
      //   displayName,
      //   photoURL: imgURL,
      // });

      // Dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  // Cleanup function to handle component unmount and prevent state updates
  useEffect(() => {
    return () => setIsCancelled(false);
  }, []);

  return { error, isPending, signup };
};
