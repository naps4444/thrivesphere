// /src/store/bookingStore.js
import { create } from "zustand";

const useBookingStore = create((set) => ({
  fullName: "",
  email: "",
  selectedServiceSlug: "",
  selectedDate: "",
  selectedTime: "",
  amount: 0,

  setBookingDetails: (details) => set(details),

  clearBooking: () =>
    set({
      fullName: "",
      email: "",
      selectedServiceSlug: "",
      selectedDate: "",
      selectedTime: "",
      amount: 0,
    }),
}));

export default useBookingStore;
