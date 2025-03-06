import { db } from "@/lib/firestore";

export async function getAdminByEmail(email) {
  const snapshot = await db.collection("admins").where("email", "==", email).get();
  return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

export async function createAdmin(email, password) {
  const adminRef = await db.collection("admins").add({
    email,
    password, // ✅ Store hashed password
    createdAt: new Date(),
  });

  return { id: adminRef.id, email }; // ✅ Return the created admin
}
