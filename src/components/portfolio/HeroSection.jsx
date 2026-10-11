import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HERO_IMG from "@/assets/images/hero-portrait.jpg";

const VIEWS_NAMESPACE = "hristo-varbanov-portfolio";
const VIEWS_KEY = "hero-views";
const EASE = [0.22, 1, 0.36, 1];

export default function HeroSection() {
  const [views, setViews] = useState(null);

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem("portfolio_view_counted");
    const endpoint = alreadyCounted
      ? `https://abacus.jasoncameron.dev/get/${VIEWS_NAMESPACE}/${VIEWS_KEY}`
      : `https://abacus.jasoncameron.dev/hit/${VIEWS_NAMESPACE}/${VIEWS_KEY}`;
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setViews(data.value);
        sessionStorage.setItem("portfolio_view_counted", "1");
      })
      .catch(() => {});
  }, []);

  return (
    <section id="top" className="relative mx-auto grid min-h-[92vh] max-w-6xl items-center gap-12 px-5 pb-16 pt-28 md:grid-cols-[1.25fr_1fr] md:gap-16 md:px-8">
      <div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-sm text-muted"
        >
          Sofia, Bulgaria · open for work
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
          className="mt-5 font-display text-6xl font-extrabold leading-[0.95] tracking-tight md:text-8xl"
        >
          Hi, I'm <span className="font-serif text-[1.08em] font-normal italic text-tomato">Hristo</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl"
        >
          I'm 20 and study computer science. Most days I'm building websites and apps that real people use: a{" "}
          <span className="marker text-ink">platform for sports clubs</span>, a personal organizer, and a magazine for
          young artists. Outside of code I model, make content and play competitive games.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href="#work"
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
          >
            See my work
          </a>
          <a
            href="mailto:hristo@varbanov.eu"
            className="rounded-full border border-ink/20 px-6 py-3 text-sm font-medium transition-colors hover:border-ink"
          >
            hristo@varbanov.eu
          </a>
        </motion.div>
      </div>

      {/* Portrait as a print taped to the page. */}
      <motion.figure
        initial={{ opacity: 0, rotate: 6, y: 30 }}
        animate={{ opacity: 1, rotate: 2, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.1 }}
        whileHover={{ rotate: 0 }}
        className="relative mx-auto w-full max-w-sm"
      >
        <span className="absolute -top-3 left-1/2 z-10 h-7 w-28 -translate-x-1/2 -rotate-3 bg-marker/70" aria-hidden="true" />
        <div className="bg-white p-3 pb-12 shadow-[0_30px_60px_-30px_rgba(27,25,22,0.5)]">
          <img src={HERO_IMG} alt="Hristo Varbanov" className="aspect-[4/5] w-full object-cover" />
          <figcaption className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between">
            <span className="font-serif text-xl italic text-ink-soft">me, 2026</span>
            {views !== null && <span className="text-xs text-muted">{views.toLocaleString()} visits</span>}
          </figcaption>
        </div>
      </motion.figure>
    </section>
  );
}
