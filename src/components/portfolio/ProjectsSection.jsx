import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import TATAMI_COVER from "@/assets/images/tatami-cover.jpg";
import HUB_COVER from "@/assets/images/tatami-hub-cover.jpg";
import KIME_COVER from "@/assets/images/kime-cover.jpg";
import SPARTAK_COVER from "@/assets/images/spartak-cover.jpg";
import MIREN_COVER from "@/assets/images/miren-cover.jpg";
import PACE_COVER from "@/assets/images/pace-cover.jpg";

const EASE = [0.22, 1, 0.36, 1];

const PROJECTS = [
  {
    name: "Tatami",
    year: "2026",
    oneLiner: "Websites, one app and the admin work for sports clubs.",
    body: "A business I run with a friend. Each club gets its own website and a place in one installable app, where students, parents and coaches see schedules, belts, attendance, fees and messages. We run the rest from our own panel.",
    mine: [
      "Multi-tenant Postgres with row-level security for founders, coaches, parents and students",
      "Edge functions for accounts: kid-friendly usernames, sibling logins, GDPR consent",
      "Three frontends: the marketing site, the club app and the founders' hub with finances and a live team board",
    ],
    stack: "React · TypeScript · Supabase · Postgres · Deno · Tailwind · Framer Motion",
    covers: [
      { src: TATAMI_COVER, label: "tatamistudio.net" },
      { src: HUB_COVER, label: "TatamiHub" },
      { src: KIME_COVER, label: "Example club" },
    ],
    links: [
      { label: "tatamistudio.net", href: "https://tatamistudio.net" },
      { label: "Code", href: "https://github.com/icakii/Tatami" },
    ],
  },
  {
    name: "Spartak 14",
    year: "2026",
    oneLiner: "Tatami's first client, a karate club in Pleven.",
    body: "Their old site was slow and hard to read on a phone. I rebuilt it as one fast page from their archive: schedule, coaches, achievements and news, with a login that leads straight into the club's app.",
    mine: ["Content recovered from the old site and rewritten", "Design in the club's colors, built mobile first", "Linked to the club's own space in the Tatami app"],
    stack: "React · Vite · Tailwind",
    covers: [{ src: SPARTAK_COVER, label: "spartak.tatamistudio.net" }],
    links: [{ label: "spartak.tatamistudio.net", href: "https://spartak.tatamistudio.net" }],
  },
  {
    name: "Pace",
    year: "2026",
    oneLiner: "Calendar, tasks, journal, bills and an e-book reader in one app.",
    body: "I got tired of checking five apps every morning, so I folded them into one. It installs on Android, iPhone and desktop, sends push notifications, and people use it every day.",
    mine: ["Everything, solo: design, frontend, database, notifications, the install flow"],
    stack: "React · Supabase · Postgres · PWA",
    covers: [{ src: PACE_COVER, label: "findyourpace.net" }],
    links: [
      { label: "findyourpace.net", href: "https://findyourpace.net" },
      { label: "Code", href: "https://github.com/icakii/pace" },
    ],
  },
  {
    name: "MIREN",
    year: "2026",
    oneLiner: "A magazine and online community for young artists.",
    body: "In its first two months: 1,500+ followers, a Discord of 200+ members, 40+ copies of the first print issue sold and two art competitions with over 200 € in prizes.",
    mine: ["The website, and running the project end to end"],
    stack: "JavaScript · Node.js · Tailwind · Postgres",
    covers: [{ src: MIREN_COVER, label: "mirenmagazine.com" }],
    links: [
      { label: "mirenmagazine.com", href: "https://mirenmagazine.com" },
      { label: "Code", href: "https://github.com/icakii/magazine-123" },
    ],
  },
];

function Shot({ src, label }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0f0e0c] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-2 truncate font-mono text-[10px] text-white/40">{label}</span>
      </div>
      <img src={src} alt={label} loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
    </div>
  );
}

// The pinned screen on the right: crossfades to the project you're reading,
// and cycles through a project's screens while it stays in view.
function Stage({ active }) {
  const project = PROJECTS[active];
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    setFrame(0);
    if (project.covers.length < 2) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % project.covers.length), 2600);
    return () => clearInterval(id);
  }, [active, project.covers.length]);
  const cover = project.covers[frame % project.covers.length];

  return (
    <div className="sticky top-24 flex h-[calc(100vh-8rem)] flex-col justify-center">
      <div className="relative">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={`${active}-${frame}`}
            initial={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Shot src={cover.src} label={cover.label} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-6 flex items-center justify-between font-mono text-xs text-white/40">
        <span>
          <span className="text-paper">{String(active + 1).padStart(2, "0")}</span> / {String(PROJECTS.length).padStart(2, "0")}
        </span>
        <div className="flex gap-1.5">
          {PROJECTS.map((p, i) => (
            <span key={p.name} className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-tomato" : "w-3 bg-white/20"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Project({ project, index, onActive }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <article ref={ref} className="flex flex-col justify-center py-14 md:min-h-[88vh] md:py-0">
      {/* On phones the screenshot sits with its text. */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mb-8 md:hidden"
      >
        <Shot src={project.covers[0].src} label={project.covers[0].label} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <p className="font-mono text-xs text-white/40">
          {String(index + 1).padStart(2, "0")} · {project.year}
        </p>
        <h3 className="mt-2 font-display text-5xl font-extrabold tracking-tight md:text-7xl">{project.name}</h3>
        <p className="mt-4 font-serif text-2xl italic leading-snug text-paper/80 md:text-3xl">{project.oneLiner}</p>
        <p className="mt-5 max-w-lg leading-relaxed text-white/60">{project.body}</p>
        <ul className="mt-6 max-w-lg space-y-2 text-sm text-white/70">
          {project.mine.map((m) => (
            <li key={m} className="flex gap-3">
              <span className="mt-[0.55rem] h-1 w-3 shrink-0 rounded-full bg-tomato" />
              {m}
            </li>
          ))}
        </ul>
        <p className="mt-6 font-mono text-xs text-white/40">{project.stack}</p>
        <div className="mt-7 flex flex-wrap gap-2">
          {project.links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className={`group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                i === 0 ? "bg-paper text-ink hover:bg-tomato hover:text-paper" : "border border-white/20 text-paper hover:border-paper"
              }`}
            >
              {l.label}
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </motion.div>
    </article>
  );
}

export default function ProjectsSection() {
  const [active, setActive] = useState(0);
  return (
    <section id="work" className="relative mt-24 bg-ink text-paper md:mt-32">
      <div className="mx-auto max-w-6xl px-5 pt-24 md:px-8 md:pt-32">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-display text-5xl font-extrabold tracking-tight md:text-7xl"
        >
          Selected <span className="font-serif font-normal italic text-tomato">work</span>
        </motion.h2>
        <p className="mt-4 max-w-md text-white/50">Live projects with real users.</p>

        <div className="grid gap-x-16 pb-16 md:grid-cols-[1fr_1.15fr] md:pb-24">
          <div>
            {PROJECTS.map((p, i) => (
              <Project key={p.name} project={p} index={i} onActive={setActive} />
            ))}
          </div>
          <div className="hidden md:block">
            <Stage active={active} />
          </div>
        </div>
      </div>
    </section>
  );
}
