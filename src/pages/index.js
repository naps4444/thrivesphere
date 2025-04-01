import About from "@/components/About";
import Author from "@/components/Author";
import Hero from "@/components/Hero";
import NewsLetter from "@/components/NewsLetter";
import Numbers from "@/components/Numbers";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Services from "@/components/Services";
import Testimonal from "@/components/Testimonal";

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
      <div>
        <Testimonal/>
      </div>
      <Numbers />
      <NewsLetter/>
      <Author/>
      <div id="contact">
       
      </div>
    </>
  );
}