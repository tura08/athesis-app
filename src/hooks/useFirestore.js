import { useEffect, useReducer } from "react";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        ...state,
        isPending: true,
        document: null,
        success: false,
        error: null,
      };
    case "ADDED_DOCUMENT":
    case "UPDATED_DOCUMENT":
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        ...state,
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        ...state,
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);

  // set up a flag for the clean up function
  let isMounted = true;
  const ref = collection(db, collectionName);

  const addDocument = async (documentData) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const addedDocument = await addDoc(ref, {
        ...documentData,
        createdAt: serverTimestamp(),
      });

      if (isMounted) {
        dispatch({ type: "ADDED_DOCUMENT", payload: addedDocument });
      }
    } catch (err) {
      if (isMounted) {
        dispatch({ type: "ERROR", payload: err.message });
      }
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      await deleteDoc(doc(ref, id));
      if (isMounted) {
        dispatch({ type: "DELETED_DOCUMENT" });
      }
    } catch (err) {
      if (isMounted) {
        dispatch({ type: "ERROR", payload: err.message });
      }
    }
  };

  const updateDocument = async (id, updates) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const docRef = doc(ref, id);
      await updateDoc(docRef, updates);

      dispatch({
        type: "UPDATED_DOCUMENT",
        payload: { id, updates },
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  // useEffect hook for handling the cleanup
  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  return { addDocument, deleteDocument, updateDocument, response };
};
