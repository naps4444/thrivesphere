import * as admin from 'firebase-admin';  // Corrected import to use * as admin
import { getFirestore } from 'firebase-admin/firestore'; // Correctly importing Firestore

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
  });
}

const db = getFirestore(); // Initialize Firestore using the default Firebase Admin SDK

// Default export of db
export default db;
