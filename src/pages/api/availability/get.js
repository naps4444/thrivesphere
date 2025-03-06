import { getAvailability } from "@/models/Availability";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

  try {
    const availability = await getAvailability();
    res.status(200).json({ availableDates: availability?.availableDates || [] });
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({ message: "Error fetching availability" });
  }
}
