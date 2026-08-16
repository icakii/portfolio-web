import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ROSTER = [
  { name: "C++", level: "Specialization", number: "11" },
  { name: "JavaScript", level: "Engineering", number: "10" },
  { name: "HTML / CSS", level: "Frontend", number: "09" },
  { name: "Node.js", level: "Backend", number: "08" },
  { name: "Tailwind CSS", level: "Design Sys", number: "07" },
  { name: "PostgreSQL", level: "Database", number: "06" },
  { name: "C#", level: "Engineering", number: "05" },
  { name: "AI Prompting & Tools", level: "Workflow", number: "04" },
  { name: "Marketing", level: "Growth", number: "03" },
  { name: "Video Editing", level: "Creative", number: "02" },
  { name: "Modeling & Fashion", level: "Editorial", number: "01" },
];

const DOMAINS = [
  { label: "Engineering", value: "Full-stack web development — frontend, backend, and databases — built from scratch and shipped end to end." },
  { label: "Marketing", value: "Growing brands and communities through content strategy, social media, and audience-driven campaigns." },
  { label: "Fashion", value: "Modeling and styling experience with a sharp eye for visual storytelling and editorial presentation." },
  { label: "Esports", value: "Competitive gaming background, including a Top 8 world qualifier finish in Marvel Rivals." },
  { label: "Content", value: "Producing and editing video and social content that builds an audience from the ground up." },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ghostY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="relative w-full overflow-hidden px-6 pb-32 pt-28 md:px-16 md:pt-32">
      <motion.div
        style={{ y: ghostY }}
        className="ghost-text absolute left-[-2vw] top-[8vh] text-[26vw]"
      >
        SKILLS
      </motion.div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">03 — Dynamic Roster</span>
          <h2 className="mt-3 font-display text-5xl font-extrabold tracking-[-0.03em] md:text-7xl">The Lineup</h2>
          <p className="mt-5 max-w-lg text-[1.125rem] leading-[1.6] text-foreground/70">
            A starting roster of disciplines — each one a tactical advantage, ranked and ready for the field.
          </p>
        </motion.div>

        {/* Roster list */}
        <div className="border-t border-border">
          {ROSTER.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="group grid grid-cols-12 items-center gap-4 border-b border-border py-5 transition-colors hover:bg-foreground hover:text-background"
            >
              <span className="col-span-2 font-mono text-sm text-foreground/40 group-hover:text-background/50 md:col-span-1">
                {skill.number}
              </span>
              <span className="col-span-10 font-display text-3xl font-bold italic tracking-[-0.02em] md:col-span-6 md:text-5xl">
                {skill.name}
              </span>
              <span className="col-span-12 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/50 group-hover:text-background/60 md:col-span-4 md:col-start-8">
                {skill.level}
              </span>
              <span className="hidden text-right font-mono text-xs text-foreground/30 group-hover:text-background/40 md:col-span-1 md:block">
                ◆
              </span>
            </motion.div>
          ))}
        </div>

        {/* Domains */}
        <div className="mt-20 grid grid-cols-1 gap-px border border-border md:grid-cols-5">
          {DOMAINS.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-background p-6"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">{d.label}</span>
              <p className="mt-3 text-[0.95rem] leading-[1.5] text-foreground/70">{d.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
