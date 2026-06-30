import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Work from "@/components/Work";
import About from "@/components/About";
import ROICalculator from "@/components/ROICalculator";
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
        <HowItWorks />
        <Work />
        <About />
        <ROICalculator />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
