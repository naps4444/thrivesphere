import { getFirestore } from "firebase-admin/firestore";
import admin from "../../../lib/firebaseAdmin"; // Ensure Firebase is initialized properly

const db = getFirestore(admin);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const snapshot = await db.collection("availability").get();
      const availableDates = snapshot.docs.map((doc) => doc.data().date);

      return res.status(200).json({ availableDates });
    } catch (error) {
      console.error("Error fetching availability:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    try {
      const { availableDates } = req.body;

      if (!Array.isArray(availableDates)) {
        return res.status(400).json({ message: "Invalid data format" });
      }

      // Add only new dates without overwriting existing ones
      const batch = db.batch();
      for (const date of availableDates) {
        const docRef = db.collection("availability").doc(date);
        batch.set(docRef, { date }, { merge: true }); // Ensures only new dates are added
      }
      await batch.commit();

      return res.status(201).json({ message: "Availability updated successfully", availableDates });
    } catch (error) {
      console.error("Error saving availability:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { date } = req.body;

      if (!date) {
        return res.status(400).json({ message: "Date is required" });
      }

      const docRef = db.collection("availability").doc(date);
      await docRef.delete();

      return res.status(200).json({ message: "Date removed successfully" });
    } catch (error) {
      console.error("Error removing date:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
