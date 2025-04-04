import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { BlinkBlur } from "react-loading-indicators";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";  // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";  // Import Toastify CSS

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <SessionProvider session={pageProps.session}>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
          <BlinkBlur color="#154E59" size="medium" text="ThriveSphere" textColor="#154E59" />
        </div>
      )}
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <ToastContainer /> {/* Add ToastContainer to show notifications */}
    </SessionProvider>
  );
}
