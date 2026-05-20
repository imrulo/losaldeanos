"use client";

import { useCallback, useRef } from "react";

export function useMicroSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const play = useCallback((freq = 180, duration = 0.06, volume = 0.04) => {
    try {
      if (!ctxRef.current) ctxRef.current = new AudioContext();
      const ctx = ctxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.value = volume;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      /* audio optional */
    }
  }, []);

  return { tick: () => play(220, 0.05), thud: () => play(90, 0.08, 0.06) };
}
