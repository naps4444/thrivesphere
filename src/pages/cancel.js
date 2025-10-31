// /src/pages/cancel.js
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-lg p-8 max-w-lg text-center"
      >
        <h1 className="text-3xl font-bold text-red-600 mb-4">❌ Payment Unsuccessful</h1>
        <p className="text-gray-700 mb-4">
          It looks like your payment was cancelled or not completed successfully.
        </p>
        <p className="text-gray-600 mb-6">
          Don’t worry — you can try again or contact us if you need help with your booking.
        </p>

        <div className="flex flex-col gap-3 items-center">
          <Link href="/book" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">
            Try Again
          </Link>
          <Link href="/" className="text-gray-600 underline hover:text-gray-800">
            Return Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
