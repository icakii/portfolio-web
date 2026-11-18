import React from "react";
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import Nav from "@/components/portfolio/Nav";
import HeroSection from "@/components/portfolio/HeroSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import AboutSection from "@/components/portfolio/AboutSection";
import PicturesSection from "@/components/portfolio/PicturesSection";
import ContactSection from "@/components/portfolio/ContactSection";

// Thin progress line along the top while you scroll.
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-tomato" />;
}

export default function Portfolio() {
  return (
    // Motion is skipped for people who ask their system for less of it.
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Nav />
      <main>
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <PicturesSection />
        <ContactSection />
      </main>
    </MotionConfig>
  );
}
