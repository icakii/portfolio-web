import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Image } from "@/components/ui/image";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import ReadMore from "./ReadMore";

const PROJECTS = [
  {
    id: "01",
    title: "Kinetic Engine",
    tag: "Real-time Systems",
    year: "2026",
    img: "https://media.base44.com/images/public/6a7faae27d5091f056ce7aff/0a25f45ab_generated_285ce464.png",
    summary:
      "A real-time motion-capture pipeline that turns athletic movement into playable game data — bridging the gym and the screen.",
    stack: ["TypeScript", "WebGL", "WebRTC", "MediaPipe"],
    body: "Built to translate raw athletic performance into interactive digital experiences, Kinetic Engine ingests camera input at 120fps, applies pose estimation, and streams normalized motion vectors into a custom WebGL renderer. The system powers a training mode where athletes replay their form against a pro baseline, with sub-frame latency tuned for competitive feedback loops.",
  },
  {
    id: "02",
    title: "Atelier OS",
    tag: "Design Tooling",
    year: "2025",
    img: "https://media.base44.com/images/public/6a7faae27d5091f056ce7aff/790e59d17_generated_ae1ea7d0.png",
    summary:
      "A brutalist design system and component library engineered for editorial-grade fashion and brand portfolios.",
    stack: ["React", "Tailwind", "Framer Motion", "Storybook"],
    body: "Atelier OS is a headless component framework built for studios that refuse the generic. Every primitive is tuned for high-contrast editorial layouts — asymmetric grids, kinetic type, and scroll-driven choreography — while keeping accessibility and performance first-class. Shipped with a living documentation site and a token pipeline that syncs design files to code.",
  },
  {
    id: "03",
    title: "Arena Ledger",
    tag: "Data / Sport",
    year: "2025",
    img: "https://media.base44.com/images/public/6a7faae27d5091f056ce7aff/93f8c4eb0_generated_b568e849.png",
    summary:
      "A competitive analytics platform that ranks and visualizes esports and athletic performance on one timeline.",
    stack: ["Node.js", "PostgreSQL", "D3.js", "Redis"],
    body: "Arena Ledger unifies esports telemetry and traditional sports stats into a single chronological feed. It ingests match data, normalizes across titles, and renders performance curves that let coaches compare a gamer's APM trend against a sprinter's split times. The ranking engine runs on a Redis-backed pipeline that updates leaderboards in under 200ms.",
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ghostX = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="relative w-full overflow-hidden px-6 pb-32 pt-28 md:px-16 md:pt-32">
      <motion.div
        style={{ x: ghostX }}
        className="ghost-text absolute right-[-4vw] top-[6vh] text-[26vw]"
      >
        PROJECTS
      </motion.div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">02 — The Logic Matrix</span>
            <h2 className="mt-3 font-display text-5xl font-extrabold tracking-[-0.03em] md:text-7xl">Selected Work</h2>
          </div>
          <span className="hidden font-mono text-xs text-foreground/40 md:block">{PROJECTS.length} PROJECTS</span>
        </motion.div>

        <div className="flex flex-col gap-px">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [hover, setHover] = useState(false);
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative grid grid-cols-1 items-center gap-8 border-t border-border py-10 md:grid-cols-12 md:gap-12"
    >
      {/* Image */}
      <motion.div style={{ y }} className="relative col-span-1 md:col-span-5">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={project.img}
            alt={project.title}
            className={`h-full w-full object-cover transition-all duration-700 ${
              hover ? "scale-105" : "scale-100"
            }`}
            fittingType="fill"
          />
          <div className="absolute left-3 top-3 bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em]">
            {project.id}
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="col-span-1 md:col-span-7">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/50">
          <span className="text-primary">{project.tag}</span>
          <span>/</span>
          <span>{project.year}</span>
        </div>
        <h3 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.02em] md:text-6xl">{project.title}</h3>

        <div className="mt-6 max-w-xl">
          <ReadMore summary={project.summary}>
            <p>{project.body}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground/70">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <a href="#" className="inline-flex items-center gap-2 bg-foreground px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-background transition-colors hover:bg-primary">
                <Github size={14} /> Source
              </a>
              <a href="#" className="inline-flex items-center gap-2 border border-foreground/20 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-foreground hover:text-background">
                <ExternalLink size={14} /> Live
              </a>
            </div>
          </ReadMore>
        </div>
      </div>

      <ArrowRight
        size={28}
        className={`absolute right-0 top-10 hidden transition-all duration-500 md:block ${
          hover ? "text-primary opacity-100" : "text-foreground/20 opacity-0 group-hover:opacity-100"
        }`}
      />
    </motion.article>
  );
}
