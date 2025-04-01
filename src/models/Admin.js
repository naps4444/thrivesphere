import { db } from "@/lib/firebaseAdmin";
import { collection, getDocs, query, where } from "firebase-admin/firestore";

export async function getAdminByEmail(email) {
  try {
    console.log("🔍 Fetching admin by email:", email);

    if (!db) {
      console.error("❌ Firestore database is not initialized.");
      throw new Error("Database connection is not initialized");
    }

    const adminsRef = db.collection("admins"); // Use Firebase Admin SDK syntax
    const q = adminsRef.where("email", "==", email);
    const snapshot = await q.get();

    if (snapshot.empty) {
      console.log("⚠️ No admin found for:", email);
      return null;
    }

    const adminDoc = snapshot.docs[0];
    const adminData = { id: adminDoc.id, ...adminDoc.data() };

    console.log("✅ Admin document found:", adminData);
    return adminData;
  } catch (error) {
    console.error("❌ Error fetching admin:", error);
    throw error;
  }
}
