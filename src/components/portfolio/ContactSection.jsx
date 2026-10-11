import React, { useState } from "react";
import { Github, Instagram } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwleredk";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-ink/15 bg-white/70 px-4 py-3 text-base outline-none transition-colors placeholder:text-muted/60 focus:border-ink";

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
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
    }
  };

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 pb-10 pt-20 md:px-8">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="font-display text-5xl font-extrabold tracking-tight md:text-7xl">
            Say <span className="font-serif font-normal italic text-tomato">hi</span>.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
            I take on websites and apps, and I'm open to modeling, content and design work too. Tell me what you have in
            mind and I'll get back to you within a day or two.
          </p>
          <a
            href="mailto:hristo@varbanov.eu"
            className="mt-8 inline-block font-display text-2xl font-bold underline decoration-tomato decoration-2 underline-offset-8 transition-colors hover:text-tomato md:text-3xl"
          >
            hristo@varbanov.eu
          </a>
          <p className="mt-6 text-sm text-muted">Sofia, Bulgaria, or remote · Discord: icaki2k</p>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Github, label: "GitHub", href: "https://github.com/icakii" },
              { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/icaki2k/" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-paper"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-line bg-paper-2/50 p-6 md:p-8">
          <label className="block text-sm font-medium">
            Name
            <input name="name" value={form.name} onChange={update("name")} required className={inputClass} />
          </label>
          <label className="block text-sm font-medium">
            Email
            <input type="email" name="email" value={form.email} onChange={update("email")} required className={inputClass} />
          </label>
          <label className="block text-sm font-medium">
            What are you working on?
            <textarea
              name="message"
              value={form.message}
              onChange={update("message")}
              required
              rows={5}
              className={`${inputClass} resize-none`}
            />
          </label>
          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="w-full rounded-full bg-tomato px-6 py-3.5 font-medium text-white transition-colors hover:bg-tomato-dark disabled:opacity-70"
          >
            {status === "sent"
              ? "Sent, thanks!"
              : status === "sending"
                ? "Sending..."
                : status === "error"
                  ? "Didn't go through, try again"
                  : "Send message"}
          </button>
        </form>
      </div>

      <footer className="mt-20 flex flex-col items-center justify-between gap-2 border-t border-line pt-6 text-sm text-muted md:flex-row">
        <span>© 2026 Hristo Varbanov</span>
        <span>Made by me in Sofia</span>
      </footer>
    </section>
  );
}
