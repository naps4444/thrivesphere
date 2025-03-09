import { useSubscribe } from "@/hooks/useSubscribe";
import Image from "next/image";

const NewsLetter = () => {
  const { email, setEmail, loading, handleSubscribe } = useSubscribe();

  return (
    <div className="relative xl:container mx-auto bg-[#908E58] lg:text-xl xl:text-2xl 2xl:text-3xl">
      <div className="py-10 lg:py-14 w-10/12 md:w-8/12 mx-auto md:mx-[70px] lg:mx-[100px] xl:mx-[100px] text-center md:text-left flex flex-col gap-3">
        <h1 className="text-[#D1C79E] font-cinzel font-semibold">
          SUBSCRIBE TO OUR NEWSLETTER
        </h1>

        <p className="text-[#D1C79E] md:w-5/6 lg:w-9/12 font-volkhov">
          Join our community of subscribers and receive regular updates delivered
          straight to your inbox. It’s quick, easy, and free.
        </p>

        <form onSubmit={handleSubscribe} className="flex gap-2 items-center md:mt-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email Address"
            className="py-1 px-2 lg:py-2 w-8/12 xl:w-9/12 font-rakkas border rounded"
            required
          />
          <button
            type="submit"
            className="bg-black text-white py-1 lg:py-2 px-4 lg:px-5 font-volkhov transition-all duration-300 hover:bg-gray-800 hover:scale-105 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      <div>
        <Image
          src="/newsletterimg.svg"
          width={100}
          height={100}
          alt="flower"
          className="absolute right-4 bottom-0 md:w-[160px] lg:w-[200px] xl:right-20 2xl:w-[280px] 2xl:right-20"
        />
      </div>
    </div>
  );
};

export default NewsLetter;
