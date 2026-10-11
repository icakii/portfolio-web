import React from "react";
import { motion } from "framer-motion";
import ARCHIVE_1 from "@/assets/images/archive-1-beach.jpg";
import ARCHIVE_2 from "@/assets/images/archive-2-selfie.jpg";
import ARCHIVE_3 from "@/assets/images/archive-3-night.jpg";
import ARCHIVE_4 from "@/assets/images/archive-4-illustration.jpg";

// A loose wall of prints, each tilted a little differently.
const PHOTOS = [
  { img: ARCHIVE_1, caption: "Coastline, 2026", tilt: -2.5, pos: "50% 50%" },
  { img: ARCHIVE_2, caption: "Gym mirror, 2026", tilt: 1.5, pos: "50% 20%" },
  { img: ARCHIVE_3, caption: "Studio shoot, 2023", tilt: -1, pos: "50% 50%" },
  { img: ARCHIVE_4, caption: "Fan art I drew, 2026", tilt: 2.5, pos: "50% 0%" },
];

export default function PicturesSection() {
  return (
    <section id="photos" className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
        Off the <span className="font-serif font-normal italic text-tomato">screen</span>
      </h2>
      <p className="mt-3 max-w-lg text-ink-soft">Shoots, portraits and the odd drawing.</p>

      <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-7">
        {PHOTOS.map((p, i) => (
          <motion.figure
            key={p.caption}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: p.tilt }}
            whileHover={{ rotate: 0, y: -8, scale: 1.03 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 140, damping: 18, delay: i * 0.06 }}
            className="bg-white p-2.5 pb-9 shadow-[0_20px_40px_-24px_rgba(27,25,22,0.5)] md:p-3 md:pb-10"
          >
            <img
              src={p.img}
              alt={p.caption}
              loading="lazy"
              style={{ objectPosition: p.pos }}
              className="aspect-[3/4] w-full object-cover"
            />
            <figcaption className="mt-2 font-serif text-base italic text-ink-soft md:text-lg">{p.caption}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
