import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Image } from "@/components/ui/image";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import ReadMore from "./ReadMore";
import MIREN_COVER from "@/assets/images/miren-cover.jpg";

const PROJECTS = [
  {
    id: "01",
    title: "MIREN",
    tag: "Magazine & Online Community",
    year: "2026",
    img: MIREN_COVER,
    summary:
      "A platform for young creative talent to showcase their work and connect — spanning fashion, music, photography, and every art discipline in between.",
    stack: ["JavaScript", "Node.js", "Tailwind CSS", "PostgreSQL"],
    body: "MIREN launched as a magazine and community hub built to give young artists across fashion, music, and photography a shared home. In its first two months it grew to 1,500+ followers across social platforms and a Discord community of 200+ members, sold 40+ copies of its debut print issue, and ran two art competitions with prize pools exceeding €200. I led the project end to end — management, investment, website development, social media strategy, content creation, and logistics — as the sole hands-on contributor on the team.",
    links: {
      source: "https://github.com/icakii/magazine-123",
      live: "https://mirenmagazine.com",
    },
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
              {project.links?.source && (
                <a href={project.links.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-foreground px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-background transition-colors hover:bg-primary">
                  <Github size={14} /> Source
                </a>
              )}
              {project.links?.live && (
                <a href={project.links.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-foreground/20 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-foreground hover:text-background">
                  <ExternalLink size={14} /> Live
                </a>
              )}
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
