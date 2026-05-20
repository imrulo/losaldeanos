"use client";

import { motion } from "framer-motion";

export function VinylPlayer({ spinning = false }: { spinning?: boolean }) {
  return (
    <div className="relative h-32 w-32 mx-auto">
      <motion.div
        animate={spinning ? { rotate: 360 } : { rotate: 0 }}
        transition={
          spinning
            ? { duration: 2, repeat: Infinity, ease: "linear" }
            : { duration: 0.3 }
        }
        className="h-full w-full rounded-full border-4 border-zinc-800 bg-zinc-900 shadow-xl"
        style={{
          backgroundImage: `repeating-radial-gradient(circle at 50% 50%, #111 0, #111 2px, #1a1a1a 2px, #1a1a1a 4px)`,
        }}
      >
        <div className="absolute inset-0 m-auto h-10 w-10 rounded-full bg-primary/80 border-2 border-accent" />
      </motion.div>
      {spinning && (
        <motion.span
          className="absolute -inset-2 rounded-full border border-primary/30"
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
  );
}
