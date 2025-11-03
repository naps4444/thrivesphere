import { getFirestore, Timestamp } from "firebase-admin/firestore";
import admin from "../../../lib/firebaseAdmin";

const db = getFirestore(admin);

export default async function handler(req, res) {
  try {
    // 🟩 GET — Fetch all availability slots
    if (req.method === "GET") {
      const snapshot = await db.collection("availability").get();

      const availableSlots = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          startUTC: data.startUTC,
          endUTC: data.endUTC,
          timeRange: data.timeRange,
          createdAt:
            data.createdAt instanceof Timestamp
              ? data.createdAt.toDate().toISOString()
              : null,
        };
      });

      return res.status(200).json({ availableSlots });
    }

    // 🟨 POST — Append new slots (skip duplicates)
    if (req.method === "POST") {
      const { availableSlots } = req.body;

      if (!Array.isArray(availableSlots) || availableSlots.length === 0) {
        return res.status(400).json({ message: "No slots provided" });
      }

      // 🧠 Deduplicate before saving
      const uniqueSlots = [];
      const seen = new Set();

      availableSlots.forEach((slot) => {
        const [startTime, endTime] = slot.timeRange.split(" - ");
        const startUTC = new Date(`${slot.date}T${startTime}:00`).toISOString();
        const endUTC = new Date(`${slot.date}T${endTime}:00`).toISOString();
        const key = `${startUTC}_${endUTC}`;
        if (!seen.has(key)) {
          seen.add(key);
          uniqueSlots.push({ startUTC, endUTC, timeRange: slot.timeRange });
        }
      });

      const batch = db.batch();
      uniqueSlots.forEach((slot) => {
        const docRef = db.collection("availability").doc();
        batch.set(docRef, {
          startUTC: slot.startUTC,
          endUTC: slot.endUTC,
          timeRange: slot.timeRange,
          createdAt: Timestamp.now(),
        });
      });

      await batch.commit();
      return res
        .status(200)
        .json({ message: "Availability appended successfully (duplicates skipped)" });
    }

    // 🟦 PUT — Replace all slots (no duplicates)
    if (req.method === "PUT") {
      const { availableSlots } = req.body;

      if (!Array.isArray(availableSlots) || availableSlots.length === 0) {
        return res.status(400).json({ message: "No slots provided" });
      }

      // 🧠 Deduplicate before replacing
      const uniqueSlots = [];
      const seen = new Set();

      availableSlots.forEach((slot) => {
        const [startTime, endTime] = slot.timeRange.split(" - ");
        const startUTC = new Date(`${slot.date}T${startTime}:00`).toISOString();
        const endUTC = new Date(`${slot.date}T${endTime}:00`).toISOString();
        const key = `${startUTC}_${endUTC}`;
        if (!seen.has(key)) {
          seen.add(key);
          uniqueSlots.push({ startUTC, endUTC, timeRange: slot.timeRange });
        }
      });

      // 🧹 Delete all existing slots first
      const existing = await db.collection("availability").get();
      const deleteBatch = db.batch();
      existing.docs.forEach((doc) => deleteBatch.delete(doc.ref));
      await deleteBatch.commit();

      // 🧱 Add only unique new slots
      const addBatch = db.batch();
      uniqueSlots.forEach((slot) => {
        const docRef = db.collection("availability").doc();
        addBatch.set(docRef, {
          startUTC: slot.startUTC,
          endUTC: slot.endUTC,
          timeRange: slot.timeRange,
          createdAt: Timestamp.now(),
        });
      });

      await addBatch.commit();

      return res
        .status(200)
        .json({ message: "Availability replaced successfully (duplicates removed)" });
    }

    // 🟥 DELETE — Remove a specific slot
    if (req.method === "DELETE") {
      const { startUTC } = req.body;

      if (!startUTC) {
        return res.status(400).json({ message: "Missing startUTC" });
      }

      const snapshot = await db
        .collection("availability")
        .where("startUTC", "==", startUTC)
        .get();

      if (snapshot.empty) {
        return res.status(404).json({ message: "Slot not found" });
      }

      const batch = db.batch();
      snapshot.docs.forEach((doc) => batch.delete(doc.ref));
      await batch.commit();

      return res.status(200).json({ message: "Slot deleted successfully" });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("❗ Error handling availability:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
