import { getFirestore, Timestamp } from "firebase-admin/firestore";
import admin from "@/lib/firebaseAdmin";

const db = getFirestore(admin);

export default async function handler(req, res) {
  try {
    const snapshot = await db.collection("availability").get();
    const availableSlots = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        startUTC: data.startUTC,  // stored in UTC
        endUTC: data.endUTC,      // stored in UTC
        timeRange: data.timeRange
      };
    });
    res.status(200).json({ availableSlots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
