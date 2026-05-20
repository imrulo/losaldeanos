"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mic2 } from "lucide-react";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <div className="h-24 w-24 rounded-full border-2 border-primary/30 border-t-primary" />
            <Mic2 className="absolute inset-0 m-auto h-10 w-10 text-primary" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-sm font-bold uppercase tracking-[0.4em] text-muted-foreground"
          >
            La Aldea
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
