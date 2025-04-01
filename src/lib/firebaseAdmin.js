// src/lib/firebaseAdmin.js
import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

if (!admin.apps.length) {
  try {
    // Parse the service account JSON from the environment variable
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      : null;

    if (!serviceAccount) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT is missing or invalid");
    }

    // Initialize the Firebase Admin SDK with service account credentials
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key.replace(/\\n/g, "\n"),
      }),
    });

    console.log("Firebase Admin initialized successfully");
  } catch (error) {
    console.error("Firebase Admin SDK initialization error:", error);
    throw error;
  }
} else {
  console.log("Firebase Admin is already initialized");
}

// Explicitly pass the default app to getFirestore
const db = getFirestore(admin.app());
export { db };
