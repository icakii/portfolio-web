import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function ReadMore({ summary, children, label = "Read More" }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <p className="text-[1.125rem] leading-[1.6] text-foreground/80">{summary}</p>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.97 }}
        className="group mt-4 inline-flex items-center gap-2 border border-foreground/20 px-5 py-2.5 text-xs font-mono uppercase tracking-[0.2em] text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
      >
        <span>{open ? "Read Less" : label}</span>
        <span className="grid h-4 w-4 place-items-center">
          {open ? <Minus size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2.5} />}
        </span>
      </motion.button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-5 border-l-2 border-primary pl-5 text-[1.0625rem] leading-[1.7] text-foreground/75">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
