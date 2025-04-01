import Image from "next/image";

const Author = () => {
    return (
      <>
      <div className="xl:container mx-auto py-4 relative">
      <Image src="/frame4.svg" alt="bg" height={100} width={100} className="absolute right-0" />
        <div className="flex w-11/12 mx-auto justify-between lg:mt-20">
        <div className="relative xl:my-auto w-5/12 xl:ml-12 xl:w-4/12 hidden lg:block">
            <Image src="/frame1.svg" alt="bg" height={100} width={100} className="relative w-44 xl:w-48 " />

            <Image src="/frame2.svg" alt="bg" height={100} width={100} className="absolute top-14 lg:top-16 w-44 xl:w-48 left-20" />

            <Image src="/frame3img.svg" alt="bg" height={100} width={100} className="absolute top-24 w-80 xl:w-[360px]   left-12" />

        </div>

        <div className="relative px-6 lg:w-5/12 xl:w-5/12 2xl:w-6/12 mb-4 flex lg:mr-[80px] ">
        

        <Image src="/spark.svg" alt="star" height={100} width={100} className="absolute w-8 lg:w-12 top-[28px] lg:top-[0px]  right-0  lg:-right-[90px]" />

        <div className="my-auto">

        <h1 className="mt-8 text-base 2xl:text-xl font-cinzel">ABOUT</h1>

        <h1 className="mt-4 font-cinzel lg:text-[36px] font-bold tracking-wide leading-relaxed">NDUKA   AHILAKA</h1>

        <div className="flex flex-col gap-4 mt-2 font-volkhov lg:text-xl xl:text-2xl 2xl:text-3xl">
        <p>
        Nduka is a dedicated transformational life and wellness coach with a deep passion for personal growth and development. With years of experience, he has guided countless individuals toward discovering their true potential and reigniting their passions.
        </p>

        <p>
        Having overcome his own challenges, Nduka empathizes with those feeling lost or uncertain, offering a supportive, nonjudgmental space for exploration and growth. His coaching philosophy focuses on active listening, tailored guidance, and proven techniques to help clients achieve meaningful breakthroughs.
        </p>

        <p>
        Whether supporting career-driven professionals or individuals seeking personal transformation, Nduka is committed to fostering long-term growth and empowerment.
        </p>
        </div>

        </div>

        </div>
        </div>
      </div>
        
      </>
    );
  };
  
  export default Author;