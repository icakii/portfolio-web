import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "photos", label: "Photos" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Underline the section that's in the middle of the screen.
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...LINKS.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  // Over the dark Work section the bar goes dark too.
  const dark = active === "work";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? (dark ? "bg-ink/85 text-paper backdrop-blur" : "bg-paper/85 backdrop-blur") : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          Hristo<span className="text-tomato">.</span>
        </a>
        <nav className="flex items-center gap-1 text-sm md:gap-2">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`relative px-2.5 py-1.5 transition-opacity md:px-3 ${active === l.id ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
            >
              {l.label}
              {active === l.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-2.5 -bottom-0.5 h-[2px] rounded-full bg-tomato md:inset-x-3"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
