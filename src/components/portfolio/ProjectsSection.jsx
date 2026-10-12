import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import TATAMI_COVER from "@/assets/images/tatami-cover.jpg";
import HUB_COVER from "@/assets/images/tatami-hub-cover.jpg";
import KIME_COVER from "@/assets/images/kime-cover.jpg";
import MIREN_COVER from "@/assets/images/miren-cover.jpg";
import PACE_COVER from "@/assets/images/pace-cover.jpg";

const EASE = [0.22, 1, 0.36, 1];

const PROJECTS = [
  {
    name: "Tatami",
    year: "2026",
    oneLiner: "Websites, a student app and the admin work for sports clubs, for one monthly price.",
    body: [
      "A small business I'm running with a friend. A club pays 99 € a month and we build their website and student app, then keep everything up to date for them: new students, schedules, belts, payments, announcements.",
      "It's three apps on one Supabase database. The Tatami site where clubs sign up and pay, TatamiHub, our own panel for running every club, and the club sites themselves. Kime Karate Club is the example: a public site, an installable app for students and a panel where coaches mark attendance and payments.",
    ],
    mine: [
      "Database design and row-level security for three kinds of users",
      "Subscriptions through Paddle, with webhooks that switch a club on or off",
      "All three frontends, the design and the animations",
    ],
    stack: "React, TypeScript, Supabase, Postgres, Tailwind, Framer Motion, Paddle",
    covers: [
      { src: HUB_COVER, label: "TatamiHub" },
      { src: TATAMI_COVER, label: "Tatami site" },
      { src: KIME_COVER, label: "Kime club site" },
    ],
    links: [
      { label: "tatamistudio.net", href: "https://tatamistudio.net" },
      { label: "Example club", href: "https://kimeclub.onrender.com" },
      { label: "Code", href: "https://github.com/icakii/Tatami" },
      { label: "Hub code", href: "https://github.com/icakii/TatamiHub" },
    ],
  },
  {
    name: "Pace",
    year: "2026",
    oneLiner: "A calendar, tasks, journal, bills and an e-book reader in one installable app.",
    body: [
      "I got tired of checking five apps every morning, so I folded them into one: recurring tasks with color-coded categories, a subscription and bill tracker with reminders, a journal with moods and streaks, an EPUB reader and a few small games.",
      "It installs on Android, iPhone and desktop, sends push notifications, and people use it every day. I keep shipping based on what they tell me.",
    ],
    mine: ["Everything, solo: design, frontend, database, notifications, PWA install flow"],
    stack: "React, Supabase, Postgres, PWA",
    covers: [{ src: PACE_COVER, label: "Pace" }],
    links: [
      { label: "findyourpace.net", href: "https://findyourpace.net" },
      { label: "Code", href: "https://github.com/icakii/pace" },
    ],
  },
  {
    name: "MIREN",
    year: "2026",
    oneLiner: "A magazine and online community for young artists.",
    body: [
      "A home for young people doing fashion, music, photography and art. In the first two months it reached 1,500+ followers, a Discord of 200+ members, sold 40+ copies of the first print issue and ran two art competitions with over 200 € in prizes.",
    ],
    mine: ["Led it end to end: the website, money, social media, content and logistics"],
    stack: "JavaScript, Node.js, Tailwind, Postgres",
    covers: [{ src: MIREN_COVER, label: "MIREN" }],
    links: [
      { label: "mirenmagazine.com", href: "https://mirenmagazine.com" },
      { label: "Code", href: "https://github.com/icakii/magazine-123" },
    ],
  },
];

// One screenshot in a plain browser window.
function Shot({ src, label, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-ink/10 bg-white shadow-[0_24px_50px_-28px_rgba(27,25,22,0.55)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-ink/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="ml-2 truncate text-[10px] text-muted">{label}</span>
      </div>
      <img src={src} alt={label} loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
    </div>
  );
}

// Several screenshots stacked like prints; they fan out on hover.
function Fan({ covers }) {
  const [open, setOpen] = useState(false);
  const spread = [
    { x: "-14%", y: 24, r: -6 },
    { x: "0%", y: 0, r: 0 },
    { x: "14%", y: 24, r: 6 },
  ];
  const closed = [
    { x: "-4%", y: 14, r: -3 },
    { x: "0%", y: 0, r: 0 },
    { x: "4%", y: 14, r: 3 },
  ];
  // Middle card on top.
  const order = [0, 2, 1];

  return (
    <div
      className="relative aspect-[16/12] w-full"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {order.map((i) => {
        const pos = (open ? spread : closed)[i];
        return (
          <motion.div
            key={covers[i].label}
            animate={{ x: pos.x, y: pos.y, rotate: pos.r }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
            className="absolute inset-x-[8%] top-0"
            style={{ zIndex: i === 1 ? 3 : 1 }}
          >
            <Shot src={covers[i].src} label={covers[i].label} />
          </motion.div>
        );
      })}
    </div>
  );
}

function Project({ project, index }) {
  const flip = index % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="grid items-center gap-10 border-t border-line py-16 md:grid-cols-2 md:gap-16"
    >
      <div className={flip ? "md:order-2" : ""}>
        {project.covers.length > 1 ? (
          <Fan covers={project.covers} />
        ) : (
          <motion.div whileHover={{ rotate: flip ? 1.5 : -1.5, y: -4 }} transition={{ type: "spring", stiffness: 200, damping: 18 }}>
            <Shot src={project.covers[0].src} label={project.covers[0].label} />
          </motion.div>
        )}
      </div>

      <div>
        <p className="text-sm text-muted">{project.year}</p>
        <h3 className="mt-1 font-display text-5xl font-extrabold tracking-tight md:text-6xl">{project.name}</h3>
        <p className="mt-4 font-serif text-2xl italic leading-snug text-ink-soft">{project.oneLiner}</p>
        <div className="mt-5 space-y-3 leading-relaxed text-ink-soft">
          {project.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <ul className="mt-5 space-y-1.5 text-sm text-ink-soft">
          {project.mine.map((m) => (
            <li key={m} className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tomato" />
              {m}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-muted">{project.stack}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                i === 0 ? "bg-ink text-paper hover:bg-tomato" : "border border-ink/20 hover:border-ink"
              }`}
            >
              {l.label} <ArrowUpRight size={14} />
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
        Things I've <span className="font-serif font-normal italic text-tomato">built</span>
      </h2>
      <p className="mt-3 max-w-lg text-ink-soft">All live, all used by real people. Hover the pictures.</p>
      <div className="mt-8">
        {PROJECTS.map((p, i) => (
          <Project key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
