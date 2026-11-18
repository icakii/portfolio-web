import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Linkedin } from "lucide-react";
import HERO_IMG from "@/assets/images/hero-portrait.jpg";

const VIEWS_NAMESPACE = "hristo-varbanov-portfolio";
const VIEWS_KEY = "hero-views";
const EASE = [0.22, 1, 0.36, 1];

const SKILLS = ["TypeScript", "React", "PostgreSQL", "Supabase", "Node.js", "C++", "C#", "Row-level security", "Tailwind", "Framer Motion", "PWAs", "Edge functions"];

// Each letter rises out of its own mask, one after another.
function Letters({ text, delay = 0, className = "" }) {
  return (
    <span className={`inline-block whitespace-nowrap ${className}`} aria-label={text}>
      {[...text].map((ch, i) => (
        // The mask is padded on every side (and pulled back with negative
        // margins) so tight tracking and italics don't shave the glyph edges.
        <span key={i} className="-mx-[0.1em] -mt-[0.15em] inline-block overflow-hidden px-[0.1em] pb-[0.1em] pt-[0.15em] align-bottom" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.035 }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function Marquee() {
  const row = [...SKILLS, ...SKILLS];
  return (
    <div className="marquee group relative mt-16 overflow-hidden border-y border-line py-4 md:mt-20">
      <div className="marquee-track flex w-max gap-10 group-hover:[animation-play-state:paused]">
        {row.map((s, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-xl font-bold tracking-tight text-ink/80 md:text-2xl">
            {s}
            <span className="h-1.5 w-1.5 rounded-full bg-tomato" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [views, setViews] = useState(null);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

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
    <section id="top" ref={ref} className="relative pt-28 md:pt-32">
      <div className="mx-auto grid max-w-6xl items-end gap-12 px-5 md:grid-cols-[1.35fr_1fr] md:gap-14 md:px-8">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.18em] text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-moss/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-moss" />
            </span>
            Open for work · Sofia
          </motion.p>

          <h1 className="mt-6 font-display text-[17vw] font-extrabold leading-[0.88] tracking-[-0.04em] sm:text-8xl md:text-[7.5rem]">
            <Letters text="Hristo" delay={0.15} />
            <br />
            <Letters text="Varbanov" delay={0.35} className="font-serif text-[0.92em] font-normal italic tracking-[-0.02em] text-tomato" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.8 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl"
          >
            Computer science student and full-stack developer. I build web apps end to end, from the database and its
            security rules to the screens people tap on. Right now that's{" "}
            <a href="#work" className="link-swipe text-ink">Tatami</a>, a platform that runs websites and apps for
            sports clubs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.95 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-tomato">
              See my work
              <span className="transition-transform group-hover:translate-y-0.5" aria-hidden="true">↓</span>
            </a>
            <a href="mailto:hristo@varbanov.eu" className="rounded-full border border-ink/20 px-6 py-3 text-sm font-medium transition-colors hover:border-ink">
              hristo@varbanov.eu
            </a>
            <a
              href="https://www.linkedin.com/in/hristo-varbanov-a41b9a434/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-medium transition-colors hover:border-[#0a66c2] hover:text-[#0a66c2]"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </motion.div>
        </div>

        {/* Portrait: wipes in from below, then drifts slower than the page. */}
        <motion.figure
          initial={{ clipPath: "inset(100% 0 0 0 round 24px)" }}
          animate={{ clipPath: "inset(0% 0 0 0 round 24px)" }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          style={{ y: photoY }}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-paper-2"
        >
          <motion.div
            initial={{ scale: 1.25 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
            className="h-full w-full"
          >
            <motion.img src={HERO_IMG} alt="Hristo Varbanov" style={{ scale: photoScale }} className="h-full w-full object-cover" />
          </motion.div>
          {views !== null && (
            <figcaption className="absolute bottom-3 right-3 rounded-full bg-ink/45 px-2.5 py-1 font-mono text-[10px] text-paper/80 backdrop-blur">
              {views.toLocaleString()} visits
            </figcaption>
          )}
        </motion.figure>
      </div>

      <Marquee />
    </section>
  );
}
