import React, { useEffect, useRef, useState } from "react";
import HeroSection from "@/components/portfolio/HeroSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import PicturesSection from "@/components/portfolio/PicturesSection";
import AchievementsSection from "@/components/portfolio/AchievementsSection";
import ContactSection from "@/components/portfolio/ContactSection";
import SectionPill from "@/components/portfolio/SectionPill";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "projects", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "pictures", label: "Archive" },
  { id: "achievements", label: "Log" },
  { id: "contact", label: "Contact" },
];

export default function Portfolio() {
  const [active, setActive] = useState("hero");
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    SECTIONS.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative">
      {SECTIONS.map(({ id }) => (
        <div key={id} id={id} ref={(el) => (sectionRefs.current[id] = el)}>
          {id === "hero" && <HeroSection />}
          {id === "projects" && <ProjectsSection />}
          {id === "skills" && <SkillsSection />}
          {id === "pictures" && <PicturesSection />}
          {id === "achievements" && <AchievementsSection />}
          {id === "contact" && <ContactSection />}
        </div>
      ))}
      <SectionPill sections={SECTIONS} active={active} onChange={scrollToSection} />
    </div>
  );
}
