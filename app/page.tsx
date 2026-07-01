import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import ROICalculator from "@/components/ROICalculator";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Work from "@/components/Work";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <ROICalculator />
        <Services />
        <HowItWorks />
        <Work />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}