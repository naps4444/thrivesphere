"use client";

import { useSubscribe } from "@/hooks/useSubscribe";
import Image from "next/image";

const Footer = () => {
  const { email, setEmail, loading, handleSubscribe } = useSubscribe();

  return (

    <div className="relative md:mt-16 xl:container mx-auto">
      <div className="mx-auto w-11/12  ">
      <Image src="/footop.svg" height={100} width={100} alt="bg-colour" className="absolute  w-11/12   mx-auto  -top-6 lg:-top-8 z-10 hidden md:block" />

      </div>
      


  
    <div className="bg-[#CCC193] text-black flex flex-col md:flex-row px-8 md:px-16 lg:px-24 py-10 md:justify-between xl:container mx-auto lg:text-xl 2xl:text-2xl relative lg:pt-14 xl:pt-28  ">
     
      <div className="flex flex-col justify-between gap-5">
        <div>
          <h1 className="font-semibold font-georgia">Book a Consultation</h1>
        </div>

        <div className="font-rakkas mt-2">
  {/* <p className="tracking-wide md:tracking-normal">Call +1 (782) 440-5220</p> */}
  <p className="mt-1 tracking-widest md:tracking-normal">
    Email:{" "}
    <a
      href="mailto:thrivesphereorg@outlook.com"
      className=" hover:bg-[#878165] hover:text-white transition-colors duration-200"
    >
      thrivesphereorg@outlook.com
    </a>
  </p>
</div>


        <div className="flex flex-col gap-2 font-semibold">
          <p>Let’s Connect - 15 Minutes, Complimentary</p>
          <p>Deep Dive - 1 Hour/$100</p>
          <p>Momentum Package - 3 Sessions/$260</p>
        </div>

        <div className="bg-black w-full rounded-full justify-between py-3 lg:py-4 px-5 hidden  md:flex">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-110">
            <Image src="/x.svg" alt="x.com" width={100} height={100} className="w-6 md:w-7" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-110">
            <Image src="/face.svg" alt="facebook.com" width={100} height={100} className="w-6 md:w-7" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-110">
            <Image src="/insta.svg" alt="instagram.com" width={100} height={100} className="w-6 md:w-7" />
          </a>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-110">
            <Image src="/whats.svg" alt="whatsapp.com" width={100} height={100} className="w-6 md:w-7" />
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-5 justify-between mt-5 md:mt-0">
        <div>
          <h1 className="font-semibold font-georgia">Business Hours</h1>

          <p className="mt-6 font-rakkas tracking-wide md:tracking-normal">Monday to Saturday</p>
          <p className="mt-1 font-rakkas tracking-wide md:tracking-normal">8:00 am to 8:00 pm</p>
        </div>

        <div className="font-rakkas tracking-wide md:tracking-normal">
          <p>Sundays</p>
          <p className="mt-1">12:00 noon to 8:00 pm</p>
        </div>

        <div className="tracking-wide md:tracking-normal ">
          <h1 className="font-medium font-georgia">Let’s Connect</h1>

          <form onSubmit={handleSubscribe} className="flex gap-2 md:gap-4 md:mt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email here*"
              className="py-2 bg-[#CCC193] text-black placeholder-black px-2 border-[1px] border-black font-rage placeholder:font-rage outline-none w-full"
              required
            />
            <button
              type="submit"
              className="text-white bg-[#14170F] px-5 py-[4.5px] font-lusitana transition-all duration-300 ease-in-out hover:bg-[#1F2518] hover:scale-105 hover:shadow-md"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Join"}
            </button>
          </form>
        </div>

        <div className="bg-black flex w-full rounded-full justify-between py-2 px-4 md:hidden">
  <a href="http://x.com/thrivesphereorg" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-110">
    <Image src="/x.svg" alt="x.com" width={100} height={100} className="w-6 md:w-10" />
  </a>
  <a href="https://www.facebook.com/profile.php?id=61574111638440" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-110">
    <Image src="/face.svg" alt="facebook.com" width={100} height={100} className="w-6 md:w-10" />
  </a>
  <a href="http://instagram.com/thrivespherelifecoaching/" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-110">
    <Image src="/insta.svg" alt="instagram.com" width={100} height={100} className="w-6 md:w-10" />
  </a>
  <a href="https://wa.me/17824405220?text=Hello%2C%20I'd%20like%20to%20book%20your%20life%20coaching%20services" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-110">
  <Image src="/whats.svg" alt="whatsapp.com" width={100} height={100} className="w-6 md:w-10" />
</a>


</div>

      </div>
    </div>
    </div>
  );
};

export default Footer;
