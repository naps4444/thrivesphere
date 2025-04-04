import multiparty from "multiparty";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp, getApps, getApp } from "firebase/app";
import fs from "fs/promises";

// Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase (Ensure it’s not reinitialized)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Disable default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Parse form data (including image)
    const { fields, files } = await new Promise((resolve, reject) => {
      const form = new multiparty.Form();
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    // Extract form data
    const { title, description, tags } = fields;
    const imageFile = files.image?.[0];

    if (!title || !description || !tags || !imageFile) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Read the image file
    const imageBuffer = await fs.readFile(imageFile.path);
    const imageName = `blogs/${Date.now()}-${imageFile.originalFilename}`;
    const imageRef = ref(storage, imageName);

    // Upload image to Firebase Storage
    await uploadBytes(imageRef, imageBuffer);
    const imageURL = await getDownloadURL(imageRef);

    // Save blog post to Firestore
    const blogData = {
      title: title[0],
      description: description[0],
      tags: tags[0].split(","),
      image: imageURL,
      createdAt: new Date(),
    };

    const docRef = await addDoc(collection(db, "blogs"), blogData);

    return res.status(201).json({ id: docRef.id, ...blogData });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
