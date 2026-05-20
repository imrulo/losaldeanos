"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-16 left-0 right-0 z-40 h-0.5 origin-left bg-primary"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
