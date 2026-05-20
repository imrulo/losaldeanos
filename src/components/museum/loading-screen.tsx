"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mic2 } from "lucide-react";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(100, p + 12));
    }, 120);
    const t = setTimeout(() => setVisible(false), 1600);
    return () => {
      clearTimeout(t);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <div className="h-28 w-28 rounded-full border-2 border-primary/20 border-t-primary vinyl-disc-hero !opacity-100" />
            <Mic2 className="absolute inset-0 m-auto h-11 w-11 text-primary" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-sm font-black uppercase tracking-[0.5em] text-primary"
          >
            La Aldea
          </motion.p>
          <div className="mt-6 h-1 w-48 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
