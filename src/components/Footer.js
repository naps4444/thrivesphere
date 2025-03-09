import Image from "next/image";

const Footer = () => {
    return (
      <>
      <div className="bg-[#CCC193] text-black flex flex-col md:flex-row px-8 md:px-16 lg:px-24 py-10 md:justify-between xl:container mx-auto lg:text-xl xl:text-2xl 2xl:text-3xl">
        <div className="flex flex-col gap-5">
            <div>
                <h1 className="font-semibold font-georgia">Book a Consultation</h1>
                {/* <p className="mt-2 font-rakkas tracking-wide md:tracking-normal">123 Anywhere St, Any City, ST 12345</p> */}
            </div>

            <div className="font-rakkas">
                <p className="tracking-wide md:tracking-normal">Call +1 (782) 440-5220</p>
                <p className="mt-1 tracking-widest md:tracking-normal">Email: info@thrivespherecoaching.com</p>
            </div>
        </div>

        <div className="flex flex-col gap-5 mt-5 md:mt-0">
            <div>
            <h1 className="font-semibold font-georgia">Business Hours</h1>

            <p className="mt-2 font-rakkas tracking-wide md:tracking-normal">Monday to Saturday</p>
            <p className="mt-1 font-rakkas tracking-wide md:tracking-normal">8:00 am to 8:00 pm</p>
            </div>

            <div className="font-rakkas tracking-wide md:tracking-normal">
                <p>Sundays</p>
                <p className="mt-1">12:00 noon to 8:00 pm</p>
            </div>

            <div className="tracking-wide md:tracking-normal">
                <h1 className="font-medium font-georgia">Let’s Connect</h1>

                <div className="flex gap-4 md:mt-2">
                <input
  type="email"
  placeholder="Enter your email here*"
  className="py-2 bg-[#CCC193] text-black placeholder-black px-2 border-[1px] border-black font-rage placeholder:font-rage outline-none"
/>


<button className="text-white bg-[#14170F] px-5 py-[4.5px] font-lusitana transition-all duration-300 ease-in-out hover:bg-[#1F2518] hover:scale-105 hover:shadow-md">
  Join
</button>

                </div>
            </div>
        
        </div>        
      </div>      
      </>
    );
  };
  
  export default Footer;
  