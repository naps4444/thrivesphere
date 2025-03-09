import Image from "next/image";

const Section1 = () => {
    return (
        <>
        <div className="flex flex-col items-center gap-4 lg:gap-5 py-4 md:py-6 bg-white xl:container mx-auto px-4 lg:pb-16 xl:pb-20">
            <Image src="/section1vector.svg" alt="icon" height={100} width={100} className="w-14 md:w-20 lg:w-28 lg:mt-3" />

            <h1 className="font-semibold text-center font-cinzel">YOU WERE MEANT FOR MORE, OWN IT!</h1>

            <p className=" mx-auto md:w-7/12 2xl:w-8/12 text-center font-rakkas font-semibold tracking-wide md:tracking-normal lg:text-xl xl:text-2xl">You don’t have to stay stuck. the future you dream of is not far away, it’s just beyond your doubts. Let us help you bridge the gap and make it your reality.</p>

        </div>
        
        </>
    );
  };
  
  export default Section1;
  