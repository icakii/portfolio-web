import React from "react";
import { motion } from "framer-motion";
import ARCHIVE_1 from "@/assets/images/archive-1-beach.jpg";
import ARCHIVE_2 from "@/assets/images/archive-2-selfie.jpg";
import ARCHIVE_3 from "@/assets/images/archive-3-night.jpg";
import ARCHIVE_4 from "@/assets/images/archive-4-illustration.jpg";

const EASE = [0.22, 1, 0.36, 1];

// Just the pictures; the year sits small in a corner. Uneven heights make
// the row feel less like a grid.
const PHOTOS = [
  { img: ARCHIVE_1, year: "2026", pos: "50% 50%", tall: false },
  { img: ARCHIVE_2, year: "2026", pos: "50% 20%", tall: true },
  { img: ARCHIVE_3, year: "2023", pos: "50% 50%", tall: false },
  { img: ARCHIVE_4, year: "2026", pos: "50% 0%", tall: true },
];

export default function PicturesSection() {
  return (
    <section id="photos" className="mx-auto max-w-6xl px-5 pb-24 md:px-8 md:pb-32">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
        className="font-display text-5xl font-extrabold tracking-tight md:text-7xl"
      >
        Off the <span className="font-serif font-normal italic text-tomato">screen</span>
      </motion.h2>

      <div className="mt-12 grid grid-cols-2 items-start gap-3 md:grid-cols-4 md:gap-5">
        {PHOTOS.map((p, i) => (
          <motion.figure
            key={i}
            initial={{ clipPath: "inset(100% 0 0 0 round 18px)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0 round 18px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: EASE, delay: i * 0.1 }}
            className={`group relative overflow-hidden rounded-[18px] bg-paper-2 ${p.tall ? "aspect-[3/4.4] md:mt-10" : "aspect-[3/4]"}`}
          >
            <motion.img
              src={p.img}
              alt=""
              loading="lazy"
              initial={{ scale: 1.3 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.6, ease: EASE, delay: i * 0.1 }}
              style={{ objectPosition: p.pos }}
              className="h-full w-full object-cover transition-[filter] duration-500 group-hover:brightness-105"
            />
            <span className="pointer-events-none absolute bottom-2.5 right-3 font-mono text-[10px] tracking-wider text-white/55 mix-blend-difference">
              {p.year}
            </span>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
