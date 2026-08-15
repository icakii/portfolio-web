import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Github, Linkedin, Instagram } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrpzakdz";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
    }
  };

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <section className="relative w-full overflow-hidden px-6 pb-20 pt-28 md:px-16 md:pt-32">
      <div className="ghost-text absolute right-[-2vw] top-[6vh] text-[24vw]">CONTACT</div>

      <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
        {/* Left — intro + links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">06 — The Terminal</span>
          <h2 className="mt-3 font-display text-5xl font-extrabold tracking-[-0.03em] md:text-7xl">Let's Build.</h2>
          <p className="mt-6 max-w-md text-[1.125rem] leading-[1.6] text-foreground/70">
            Open to collaborations across engineering, design, fashion, and competitive projects. Send a brief and you'll hear back within 48 hours.
          </p>

          <div className="mt-10 space-y-4">
            <a href="mailto:hello@polymath.studio" className="group flex items-center gap-4 border-b border-border pb-4 transition-colors hover:border-primary">
              <Mail size={18} className="text-primary" />
              <span className="font-mono text-sm">hello@polymath.studio</span>
            </a>
            <div className="flex items-center gap-4 border-b border-border pb-4">
              <MapPin size={18} className="text-primary" />
              <span className="font-mono text-sm">Remote / Worldwide</span>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            {[
              { Icon: Github, label: "GitHub" },
              { Icon: Linkedin, label: "LinkedIn" },
              { Icon: Instagram, label: "Instagram" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-11 w-11 place-items-center border border-border transition-colors hover:bg-foreground hover:text-background"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — CLI form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="border border-border bg-card p-6 md:p-8"
        >
          <div className="mb-6 flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
            <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">message.sh</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 font-mono">
            <Field label="$ name">
              <input
                name="name"
                value={form.name}
                onChange={update("name")}
                required
                placeholder="enter your name"
                className="w-full border-b border-border bg-transparent py-2 text-[1rem] text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-primary"
              />
            </Field>
            <Field label="$ email">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={update("email")}
                required
                placeholder="you@domain.com"
                className="w-full border-b border-border bg-transparent py-2 text-[1rem] text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-primary"
              />
            </Field>
            <Field label="$ message">
              <textarea
                name="message"
                value={form.message}
                onChange={update("message")}
                required
                rows={4}
                placeholder="describe the project..."
                className="w-full resize-none border-b border-border bg-transparent py-2 text-[1rem] leading-[1.6] text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-primary"
              />
            </Field>

            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="signal-glow flex w-full items-center justify-center gap-3 bg-primary px-6 py-4 font-mono text-xs uppercase tracking-[0.25em] text-primary-foreground transition-opacity disabled:opacity-70"
            >
              {status === "sent" ? "✓ Message Sent" : status === "sending" ? "Sending…" : status === "error" ? "Failed — Try Again" : "Execute Send"}
              <Send size={14} />
            </button>
          </form>
        </motion.div>
      </div>

      <footer className="relative z-10 mt-24 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40 md:flex-row">
        <span>© 2026 The Polymath — All Rights Reserved</span>
        <span>Designed & Engineered with Precision</span>
      </footer>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] uppercase tracking-[0.2em] text-foreground/50">{label}</span>
      {children}
    </label>
  );
}
