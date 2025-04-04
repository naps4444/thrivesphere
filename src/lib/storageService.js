import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import fs from "fs/promises";

/**
 * Uploads a file to Firebase Storage and returns the download URL.
 * @param {string} filePath - The local path of the file.
 * @param {string} originalFilename - The original filename.
 */
export async function uploadImage(filePath, originalFilename) {
  try {
    const fileBuffer = await fs.readFile(filePath);
    const fileName = `blogs/${Date.now()}-${originalFilename}`;
    const storageRef = ref(storage, fileName);

    await uploadBytes(storageRef, fileBuffer);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Image upload failed");
  }
}
