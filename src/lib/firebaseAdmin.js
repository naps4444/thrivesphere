import admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      : null;

    if (!serviceAccount) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT is missing or invalid");
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key.replace(/\\n/g, "\n"),
      }),
    });
  } catch (error) {
    console.error("Firebase Admin SDK initialization error:", error);
  }
}

// ✅ Correct Firestore import for Firebase Admin SDK
export const db = admin.firestore();
