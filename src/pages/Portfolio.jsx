import React from "react";
import Nav from "@/components/portfolio/Nav";
import HeroSection from "@/components/portfolio/HeroSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import AboutSection from "@/components/portfolio/AboutSection";
import PicturesSection from "@/components/portfolio/PicturesSection";
import ContactSection from "@/components/portfolio/ContactSection";

export default function Portfolio() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <PicturesSection />
        <ContactSection />
      </main>
    </>
  );
}
