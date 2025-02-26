import About from "@/components/About";
import Hero from "@/components/Hero";
import Numbers from "@/components/Numbers";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
     
      <div id="home"> {/* Wrap Hero in a div with id="home" */}
        <Hero />
      </div>
      <Section1 />
      <Section2 />
      <div id="services">
        <Services />
      </div>
      <div id="about">
        <About />
      </div>
      <Numbers />
      <div id="contact">
       
      </div>
    </>
  );
}

