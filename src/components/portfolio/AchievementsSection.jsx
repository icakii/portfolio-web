import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Trophy, Code, Sparkles } from "lucide-react";

const LOG = [
  { year: "2026", title: "Founded MIREN — Magazine & Online Community", cat: "Engineering", icon: Sparkles },
  { year: "2025", title: "Top 8 World Qualifier Placement — Marvel Rivals", cat: "Esports", icon: Trophy },
  { year: "2024", title: "Completed Advanced C++ Certification — Fundamentals to OOP", cat: "Engineering", icon: Code },
];

const catColor = {
  Engineering: "text-primary",
  Esports: "text-foreground/80",
};

export default function AchievementsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="relative w-full overflow-hidden px-6 pb-32 pt-28 md:px-16 md:pt-32">
      <div className="ghost-text absolute left-[-2vw] top-[6vh] text-[22vw]">LOG</div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">05 — The Terminal</span>
          <h2 className="mt-3 font-display text-5xl font-extrabold tracking-[-0.03em] md:text-7xl">Achievement Log</h2>
          <p className="mt-5 max-w-lg text-[1.125rem] leading-[1.6] text-foreground/70">
            A chronological record across code, sport, gaming, and fashion — milestones logged with the discipline of an athlete and the rigor of an engineer.
          </p>
        </motion.div>

        <div className="relative border-l border-border pl-8 md:pl-12">
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-0 top-0 h-full w-[2px] origin-top bg-primary"
          />
          {LOG.map((entry, i) => {
            const Icon = entry.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative mb-10 last:mb-0"
              >
                <span className="absolute -left-[2.55rem] top-1 grid h-6 w-6 place-items-center border border-border bg-background md:-left-[3.55rem]">
                  <Icon size={12} className={catColor[entry.cat]} />
                </span>
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
                  <span className="font-mono text-sm text-primary md:w-16">{entry.year}</span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold tracking-[-0.01em] transition-colors group-hover:text-primary md:text-2xl">
                      {entry.title}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/45">
                      {entry.cat}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
