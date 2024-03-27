import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { onSnapshot, doc } from "firebase/firestore";

export const useDocument = (collectionName, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const docRef = doc(db, collectionName, id);
      const unsub = onSnapshot(
        docRef,
        (snapshot) => {
          if (snapshot.exists()) {
            setDocument({ ...snapshot.data(), id: snapshot.id });
            setError(null);
          } else {
            setError("No such document exists");
          }
        },
        (err) => {
          console.error(err);
          setError("Failed to get document");
        }
      );
      return () => unsub();
    }
  }, [collectionName, id]);

  return { document, error };
};
