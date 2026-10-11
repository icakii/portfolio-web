import React from "react";
import { motion } from "framer-motion";

const CODE = ["React", "TypeScript", "JavaScript", "Node.js", "Supabase", "PostgreSQL", "Tailwind CSS", "C++", "C#", "HTML & CSS", "AI tools"];
const OTHER = ["Marketing", "Content creation", "Video editing", "Modeling & fashion", "Esports"];

const TIMELINE = [
  { year: "2026", text: "Started Tatami with a friend: club websites and apps as a service" },
  { year: "2026", text: "Shipped Pace, now used daily" },
  { year: "2026", text: "Founded MIREN, magazine and community" },
  { year: "2025", text: "Top 8 in a Marvel Rivals world qualifier" },
  { year: "2024", text: "Advanced C++ certification" },
];

function Tags({ items, accent }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t, i) => (
        <motion.span
          key={t}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.03 }}
          className={`rounded-full px-3.5 py-1.5 text-sm ${accent ? "bg-ink text-paper" : "border border-ink/15 text-ink-soft"}`}
        >
          {t}
        </motion.span>
      ))}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="border-y border-line bg-paper-2/60">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 md:grid-cols-2 md:px-8">
        <div>
          <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            A bit <span className="font-serif font-normal italic text-tomato">about</span> me
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
            I like building the whole thing: the database, the screens, the copy and the part where someone actually
            pays for it. Most of what I know I learned by shipping something and fixing it when people complained.
          </p>
          <h3 className="mt-10 text-sm font-semibold uppercase tracking-wider text-muted">What I code with</h3>
          <div className="mt-3">
            <Tags items={CODE} accent />
          </div>
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-muted">Everything else</h3>
          <div className="mt-3">
            <Tags items={OTHER} />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">Along the way</h3>
          <ol className="mt-4">
            {TIMELINE.map((t, i) => (
              <motion.li
                key={t.text}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="flex gap-5 border-b border-line py-4"
              >
                <span className="w-12 shrink-0 font-display font-bold text-tomato">{t.year}</span>
                <span className="text-ink-soft">{t.text}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
