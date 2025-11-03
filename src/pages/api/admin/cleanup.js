import { getFirestore } from "firebase-admin/firestore";
import admin from "../../../lib/firebaseAdmin";

const db = getFirestore(admin);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const snapshot = await db.collection("availability").get();

    const seen = new Set();
    const batch = db.batch();
    let deletedCount = 0;

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      const key = `${data.startUTC}_${data.endUTC}`;
      if (seen.has(key)) {
        batch.delete(doc.ref);
        deletedCount++;
      } else {
        seen.add(key);
      }
    });

    if (deletedCount > 0) {
      await batch.commit();
    }

    return res.status(200).json({
      message: `Cleanup complete — removed ${deletedCount} duplicates.`,
    });
  } catch (error) {
    console.error("❌ Cleanup failed:", error);
    return res.status(500).json({
      message: "Error cleaning up availability",
      error: error.message,
    });
  }
}
