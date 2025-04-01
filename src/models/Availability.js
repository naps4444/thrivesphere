import { db } from '@/lib/firestore';  // Correct import if db is exported from firestore.js

export async function getAvailability() {
  const snapshot = await db.collection("availability").limit(1).get();
  return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

export async function updateAvailability(availableDates) {
  let availability = await getAvailability();

  if (availability) {
    await db.collection("availability").doc(availability.id).update({ availableDates });
  } else {
    await db.collection("availability").add({ availableDates });
  }
}
