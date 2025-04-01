import * as admin from 'firebase-admin';

// Ensure Firebase Admin SDK is initialized only once
if (!admin.apps.length) {
  try {
    // Retrieve the service account JSON from environment variable (ensure it's valid)
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      : null;

    // Check if serviceAccount is available
    if (!serviceAccount) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT is missing or invalid');
    }

    // Initialize Firebase Admin SDK with service account credentials
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key.replace(/\\n/g, '\n'),
      }),
    });

    console.log("Firebase Admin initialized successfully");

  } catch (error) {
    // Log detailed error message for debugging
    console.error('Firebase Admin SDK initialization error:', error);
    throw error;  // Re-throw to handle the failure
  }
} else {
  console.log("Firebase Admin is already initialized");
}

const db = admin.firestore();
export { db };
