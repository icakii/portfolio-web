import React from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const SKILLS = [
  { title: "Languages", items: ["TypeScript", "JavaScript", "C++", "C#", "SQL"] },
  { title: "Frontend", items: ["React", "Tailwind CSS", "Framer Motion", "PWAs", "Vite"] },
  { title: "Backend & data", items: ["Supabase", "PostgreSQL", "Row-level security", "Node.js", "Edge functions"] },
  { title: "Tools", items: ["Git", "Playwright", "Render", "AI tools"] },
];

const TIMELINE = [
  { year: "2026", text: "Started Tatami with a friend; first client, Spartak 14 Pleven" },
  { year: "2026", text: "Shipped Pace, now used daily" },
  { year: "2026", text: "Founded MIREN, a magazine and community" },
  { year: "2024", text: "Advanced C++ certification" },
  { year: "Before", text: "Modeling: shoots and studio work" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: i * 0.06 } }),
};

export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <div className="grid gap-16 md:grid-cols-[1fr_1.1fr]">
        <div>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="font-display text-5xl font-extrabold tracking-tight md:text-7xl"
          >
            About <span className="font-serif font-normal italic text-tomato">me</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft"
          >
            I'm 20 and study computer science. I like owning a product end to end: the data model, who can see what,
            the API and the interface. Most of what I know I learned by shipping things people actually use and fixing
            them when they broke.
          </motion.p>

          <ol className="mt-12">
            {TIMELINE.map((t, i) => (
              <motion.li
                key={t.text}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="group flex gap-6 border-t border-line py-4 last:border-b"
              >
                <span className="w-14 shrink-0 font-mono text-sm text-tomato">{t.year}</span>
                <span className="text-ink-soft transition-transform duration-300 group-hover:translate-x-1">{t.text}</span>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {SKILLS.map((group, gi) => (
            <motion.div
              key={group.title}
              variants={fadeUp}
              custom={gi}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-line bg-paper-2/50 p-6 transition-colors hover:border-ink/25"
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{group.title}</p>
              <ul className="mt-4 space-y-2">
                {group.items.map((s) => (
                  <li key={s} className="font-display text-lg font-bold tracking-tight">
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
