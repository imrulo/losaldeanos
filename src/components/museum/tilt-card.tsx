"use client";

import { motion } from "framer-motion";
import { useTilt } from "@/hooks/use-tilt";
import { cn } from "@/lib/utils";

export function TiltCard({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const { ref, style, onMove, onLeave } = useTilt(10);

  return (
    <motion.div
      ref={ref}
      style={style}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={cn("perspective-[1000px]", className)}
    >
      <div className="transition-transform duration-200 hover:glow-red">
        {children}
      </div>
    </motion.div>
  );
}
