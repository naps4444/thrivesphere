import { updateAvailability } from "@/models/Availability";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("📥 Saving availability:", req.body);

    try {
      const { availableSlots } = req.body;

      if (!Array.isArray(availableSlots) || availableSlots.length === 0) {
        return res.status(400).json({ message: "Invalid request: No slots provided" });
      }

      const batch = db.batch();
      availableSlots.forEach((slot) => {
        const docRef = db.collection("availability").doc();
        batch.set(docRef, {
          date: slot.date,
          timeRange: slot.timeRange,
          createdAt: Timestamp.now(),
        });
      });

      await batch.commit();
      console.log("✅ Availability saved successfully");

      return res.status(200).json({ message: "Availability saved successfully" });
    } catch (error) {
      console.error("🔥 Error saving availability:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
}
