import { Timestamp } from "firebase-admin/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { availableSlots } = req.body;

      if (!Array.isArray(availableSlots) || availableSlots.length === 0) {
        return res.status(400).json({ message: "No slots provided" });
      }

      const batch = db.batch();

      availableSlots.forEach((slot) => {
        // Convert admin-selected local time to UTC before saving
        const localDate = new Date(slot.date); // Admin's local time
        const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);

        const docRef = db.collection("availability").doc();
        batch.set(docRef, {
          date: utcDate.toISOString(), // Store in UTC
          timeRange: slot.timeRange,
          createdAt: Timestamp.now(),
        });
      });

      await batch.commit();
      return res.status(200).json({ message: "Availability saved successfully" });
    } catch (error) {
      console.error("Error saving availability:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
