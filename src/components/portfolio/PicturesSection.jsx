import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Image } from "@/components/ui/image";
import ARCHIVE_1 from "@/assets/images/archive-1-beach.jpg";
import ARCHIVE_2 from "@/assets/images/archive-2-selfie.jpg";
import ARCHIVE_3 from "@/assets/images/archive-3-night.jpg";
import ARCHIVE_4 from "@/assets/images/archive-4-illustration.jpg";

const LOOKS = [
  {
    img: ARCHIVE_1,
    title: "Coastline",
    meta: "PORTRAIT / 2026",
    depth: "z-30",
    span: "md:col-span-5 md:row-span-2",
    aspect: "aspect-[3/4]",
    objectPosition: "50% 50%",
  },
  {
    img: ARCHIVE_2,
    title: "Studio",
    meta: "CANDID / MIRROR",
    depth: "z-20",
    span: "md:col-span-4",
    aspect: "aspect-[3/4]",
    objectPosition: "50% 20%",
  },
  {
    img: ARCHIVE_3,
    title: "After Hours",
    meta: "PORTRAIT / NIGHT",
    depth: "z-10",
    span: "md:col-span-3",
    aspect: "aspect-[3/4]",
    objectPosition: "50% 50%",
  },
  {
    img: ARCHIVE_4,
    title: "Illustrated",
    meta: "DIGITAL / FAN ART",
    depth: "z-40",
    span: "md:col-span-7",
    aspect: "aspect-[16/10]",
    objectPosition: "50% 0%",
  },
];

export default function PicturesSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ghostX = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <section ref={ref} className="relative w-full overflow-hidden px-6 pb-32 pt-28 md:px-16 md:pt-32">
      <motion.div
        style={{ x: ghostX }}
        className="ghost-text absolute right-[-3vw] top-[6vh] text-[24vw]"
      >
        ARCHIVE
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
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">04 — Aesthetic Archive</span>
            <h2 className="mt-3 font-display text-5xl font-extrabold tracking-[-0.03em] md:text-7xl">The Lookbook</h2>
          </div>
          <span className="hidden font-mono text-xs text-foreground/40 md:block">HOVER TO REVEAL</span>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[300px]">
          {LOOKS.map((look, i) => (
            <LookCard key={i} look={look} index={i} />
          ))}
        </div>

        <p className="mt-12 max-w-xl text-[1.125rem] leading-[1.6] text-foreground/65">
          A curated archive spanning editorial fashion, athletic motion, and stoic portraiture — each frame a study in contrast, tension, and the single point of signal red.
        </p>
      </div>
    </section>
  );
}

function LookCard({ look, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative h-[460px] md:h-auto ${look.span} ${look.depth}`}
    >
      <motion.div style={{ y }} className="relative h-full">
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={look.img}
            alt={look.title}
            style={{ objectPosition: look.objectPosition }}
            className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
            fittingType="fill"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-background/70">{look.meta}</div>
            <div className="mt-1 font-display text-2xl font-bold text-background">{look.title}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
