import { collection, addDoc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./config";

export const createUser = async (userData) => {
  try {
    console.log("creationStarted");
    const docRef = await addDoc(collection(db, "members"), userData);
    console.log("Member added with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getAllUsers = async () => {
  try {
    console.log("getHit");
    const collectionRef = collection(db, "members");
    const querySnapshot = await getDocs(collectionRef);
    console.log("querySnapShot==>", querySnapshot);

    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.log("Error getting user details:", error);
  }
};
