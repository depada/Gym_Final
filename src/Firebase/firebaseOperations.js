import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./config";

// Function to create a new user document
export const createUser = async (userData) => {
  try {
    const docRef = await addDoc(collection(db, "members"), userData);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Function to get all user documents
export const getAllUsers = async () => {
  try {
    const collectionRef = collection(db, "members");
    const querySnapshot = await getDocs(collectionRef);

    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.log("Error getting user details:", error);
  }
};

// Function to update an existing user document based on admissionNumber
export const updateUser = async (admissionNumber, updatedUserData) => {
  try {
    const usersCollectionRef = collection(db, "members");

    // Query to find the document with the matching admissionNumber
    const q = query(
      usersCollectionRef,
      where("admissionNumber", "==", admissionNumber)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 0) {
      console.error("No document found with the provided admissionNumber.");
      return false; // Return false to indicate that no document was found
    }

    // Assuming there's only one matching document
    const userDocRef = querySnapshot.docs[0].ref;

    // Update the document with the new data
    await updateDoc(userDocRef, updatedUserData);

    console.log("Document updated successfully.");
    return true; // Return true to indicate a successful update
  } catch (error) {
    console.error("Error updating document:", error);
    return false; // Return false to indicate an error occurred
  }
};
