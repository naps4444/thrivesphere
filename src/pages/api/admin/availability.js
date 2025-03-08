import { getFirestore, Timestamp } from "firebase-admin/firestore";
import admin from "../../../lib/firebaseAdmin";

const db = getFirestore(admin);

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const snapshot = await db.collection("availability").get();
      const availableSlots = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id, // Include the document ID for deletion reference
          ...data,
          date: data.date instanceof Timestamp ? data.date.toDate().toISOString().split("T")[0] : data.date,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : "N/A",
        };
      });

      console.log("Sending Formatted Data:", availableSlots);
      return res.status(200).json({ availableSlots });
    }

    if (req.method === "POST") {
      const { availableSlots } = req.body;

      if (!Array.isArray(availableSlots) || availableSlots.length === 0) {
        return res.status(400).json({ message: "No slots provided" });
      }

      const batch = db.batch();
      availableSlots.forEach((slot) => {
        const docRef = db.collection("availability").doc();
        batch.set(docRef, {
          date: slot.date,
          timeRange: slot.timeRange,
          createdAt: Timestamp.fromDate(new Date()),
        });
      });

      await batch.commit();
      return res.status(200).json({ message: "Availability saved successfully" });
    }

    if (req.method === "DELETE") {
      const { date, timeRange } = req.body;
    
      console.log("Delete request received for:", { date, timeRange });
    
      if (!date || !timeRange) {
        return res.status(400).json({ message: "Missing required fields" });
      }
    
      // Convert date string to a proper Firestore Timestamp
      const formattedDate = new Date(date);
      
      // Query Firestore for the document
      const snapshot = await db
        .collection("availability")
        .where("date", "==", formattedDate) // Ensure Firestore recognizes the format
        .where("timeRange", "==", timeRange)
        .get();
    
      if (snapshot.empty) {
        console.log("Slot not found in Firestore!");
        return res.status(404).json({ message: "Slot not found" });
      }
    
      // Delete each matching document
      const batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
    
      await batch.commit();
    
      console.log("Slot deleted successfully!");
      return res.status(200).json({ message: "Slot removed successfully" });
    }
    

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
