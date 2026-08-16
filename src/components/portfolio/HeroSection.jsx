import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Image } from "@/components/ui/image";
import { ArrowDown, Circle, Eye } from "lucide-react";
import HERO_IMG from "@/assets/images/hero-portrait.jpg";

const VIEWS_NAMESPACE = "hristo-varbanov-portfolio";
const VIEWS_KEY = "hero-views";

const codeLines = [
  { t: "const hristo = {", c: "text-foreground/40" },
  { t: "  identity: 'full-stack developer',", c: "text-foreground/80" },
  { t: "  disciplines: [", c: "text-foreground/80" },
  { t: "    'web development', 'marketing',", c: "text-primary" },
  { t: "    'fashion', 'esports', 'content'", c: "text-primary" },
  { t: "  ],", c: "text-foreground/80" },
  { t: "  ethos: 'precision + creativity',", c: "text-foreground/80" },
  { t: "  status: 'commissions open'", c: "text-foreground/80" },
  { t: "}", c: "text-foreground/40" },
];

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const ghostY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

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
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden">
      {/* Ghost typography */}
      <motion.div
        style={{ y: ghostY }}
        className="ghost-text absolute left-[-2vw] top-[18vh] text-[34vw] md:text-[26vw]"
      >
        VARBANOV
      </motion.div>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1500px] grid-cols-1 gap-0 px-6 pb-20 pt-28 md:grid-cols-12 md:px-16 md:pt-24 lg:pt-28">
        {/* Left — portrait */}
        <motion.div
          style={{ y: yLeft }}
          className="relative col-span-1 flex items-end md:col-span-5 md:items-center"
        >
          <div className="relative w-full">
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={HERO_IMG}
                alt="Editorial portrait"
                className="h-full w-full object-cover"
                fittingType="fill"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/45">
              <span>FRAME_001</span>
              <span>ISO 200 / f2.0</span>
            </div>
          </div>
        </motion.div>

        {/* Right — identity + code */}
        <motion.div
          style={{ y: yRight }}
          className="col-span-1 flex flex-col justify-center md:col-span-7 md:pl-12"
        >
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2 text-primary">
                <Circle size={8} fill="currentColor" className="shrink-0" /> Available for Collaboration // Commissions Open
              </div>
              {views !== null && (
                <div className="flex items-center gap-1.5 text-foreground/45">
                  <motion.span
                    animate={{ scaleY: [1, 1, 0.1, 1] }}
                    transition={{ duration: 0.3, times: [0, 0.85, 0.92, 1], repeat: Infinity, repeatDelay: 3.5 }}
                    className="inline-block"
                  >
                    <Eye size={13} />
                  </motion.span>
                  {views.toLocaleString()} views
                </div>
              )}
            </div>
            <h1 className="mt-6 font-display text-[14vw] font-black leading-[0.82] tracking-[-0.04em] md:text-[7.5vw] lg:text-[6.5vw]">
              DEVELOPER.<br />
              <span className="text-primary">FOUNDER.</span><br />
              CREATIVE.
            </h1>
            <p className="mt-8 max-w-md text-[1.125rem] leading-[1.6] text-foreground/70">
              I'm Hristo Varbanov, a 20-year-old Computer Science student and full-stack web developer based in Sofia, Bulgaria. I bring precision and creativity across code, marketing, fashion, and competitive esports.
            </p>
          </motion.div>

          {/* Live code block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 border border-border bg-card p-5 font-mono text-[0.8rem] leading-[1.7] md:max-w-md"
          >
            <div className="mb-3 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
              <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-foreground/40">identity.js</span>
            </div>
            {codeLines.map((line, i) => (
              <div key={i} className={line.c}>
                <span className="mr-4 select-none text-foreground/25">{String(i + 1).padStart(2, "0")}</span>
                {line.t}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: cueOpacity }}
        className="pointer-events-none fixed bottom-24 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown size={16} className="text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
