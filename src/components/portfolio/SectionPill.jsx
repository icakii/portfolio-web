import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SectionPill({ sections, active, onChange }) {
  return (
    <nav className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
      <div className="flex max-w-[95vw] items-center gap-1 rounded-full border border-border bg-card/85 px-1.5 py-1.5 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.15)] backdrop-blur-md">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onChange(s.id)}
              aria-label={s.label}
              className="relative rounded-full px-2.5 py-2 md:px-4"
            >
              {isActive && (
                <motion.span
                  layoutId="pill-bg"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-primary"
                />
              )}
              <span
                className={cn(
                  "relative z-10 font-mono text-[9px] uppercase tracking-[0.15em] transition-colors duration-300 md:text-[11px] md:tracking-[0.2em]",
                  isActive
                    ? "text-primary-foreground"
                    : "text-foreground/60 hover:text-foreground"
                )}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
