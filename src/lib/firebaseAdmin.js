import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// Ensure Firebase Admin is only initialized once
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

    console.log("✅ Firebase Admin initialized successfully");
  } catch (error) {
    console.error("❌ Firebase Admin SDK initialization error:", error);
    throw error; // Stop execution if Firebase fails to initialize
  }
} else {
  console.log("ℹ️ Firebase Admin is already initialized");
}

// Get Firestore instance
const db = getFirestore();

if (!db) {
  console.error("❌ Firestore database connection failed to initialize.");
  throw new Error("Database connection is not initialized");
}

console.log("✅ Firestore database initialized successfully");

export { db };
