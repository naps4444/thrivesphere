import { getFirestore } from "firebase-admin/firestore";
import admin from "../../lib/firebaseAdmin";

const db = getFirestore(admin);

export default async function handler(req, res) {
  try {
    const snapshot = await db.collection("availability").get();
    res.status(200).json({ size: snapshot.size });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
