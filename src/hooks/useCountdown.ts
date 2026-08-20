import { useState, useEffect } from "react";

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

/**
 * Hook que calcula la diferencia entre el momento actual
 * y una fecha objetivo, actualizando cada segundo.
 *
 * El estado inicial es `null` para que el SSR y la hidratación
 * rendericen "00" y no difieran (evita hydration mismatch por
 * Date.now()); los valores reales se calculan tras el mount.
 */
export function useCountdown(targetDate: string): CountdownValues {
  const target = new Date(targetDate).getTime();

  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(Math.max(target - Date.now(), 0));
    tick();
    const id = setInterval(tick, 1_000);
    return () => clearInterval(id);
  }, [target]);

  // Durante SSR/hidratación remaining es null → mostramos 00
  const safe = remaining ?? 0;
  const totalSeconds = Math.floor(safe / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isExpired: remaining !== null && safe <= 0,
  };
}