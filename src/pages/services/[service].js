import { useRouter } from "next/router";

const ServicePage = () => {
  const router = useRouter();
  const { service } = router.query;

  // Example service details (you can fetch this from an API or database)
  const serviceDetails = {
    "lets-connect": {
      title: "LET’S CONNECT - 30 MINUTES, COMPLIMENTARY",
      description: "A quick, judgement-free conversation to understand your needs and explore how coaching can unlock your potential. No commitment, just clarity.",
      price: "Free"
    },
    "deep-dive": {
      title: "DEEP DIVE - 1 HOUR | $100",
      description: "A focused, in-depth session designed to help you gain clarity, identify roadblocks, and take meaningful steps toward your goals.",
      price: "$100"
    },
    "momentum-package": {
      title: "MOMENTUM PACKAGE - 3 SESSIONS | $260",
      description: "Transformation doesn’t happen overnight. This package provides consistent support, actionable insights, and a clear path toward your goals.",
      price: "$260"
    }
  };

  const serviceData = serviceDetails[service] || {};

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-[#154E59] font-cinzel">
        {serviceData.title || "Service Not Found"}
      </h1>
      <p className="mt-4 text-center text-lg font-rakkas">
        {serviceData.description || "The service you are looking for does not exist."}
      </p>
      {serviceData.price && (
        <p className="mt-4 text-center text-lg font-semibold">Price: {serviceData.price}</p>
      )}
      <div className="flex justify-center mt-6">
        <button className="px-6 py-3 bg-[#A8781C] text-white font-cinzel rounded-lg">
          Proceed to Booking
        </button>
      </div>
    </div>
  );
};

export default ServicePage;