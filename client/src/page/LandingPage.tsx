import type { FC } from "react";
import Hero from "../components/Hero";
import Navbar from "../layout/Navbar";
import SubHero from "../components/SubHero";
import Skills from "../components/Skills";
import Projects from "../components/Project";
import Footer from "../layout/Footer";

const LandingPage: FC = () => {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <section className="min-h-screen relative z-0">
        <Hero />
        <SubHero />
        <Projects />
        <Skills />
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
