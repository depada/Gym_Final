import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { imgDB } from "./config";

export const storeImage = async (imageFile, imageName) => {
  try {
    // Create a reference to the storage location
    const storageRef = ref(imgDB, `images/${imageName}`);

    // Upload the image to Firebase Cloud Storage
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    // Get a promise to track the upload progress (optional)
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    });

    // Wait for the upload to complete
    await uploadTask;

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(storageRef);

    // Return the download URL
    return downloadURL;
  } catch (error) {
    console.error("Error storing image:", error);
    throw error;
  }
};
