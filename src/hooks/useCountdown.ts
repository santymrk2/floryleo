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
 */
export function useCountdown(targetDate: string): CountdownValues {
  const target = new Date(targetDate).getTime();

  const [remaining, setRemaining] = useState<number>(() => {
    return Math.max(target - Date.now(), 0);
  });

  useEffect(() => {
    // Evitar el intervalo si ya expiró
    if (remaining <= 0) return;

    const id = setInterval(() => {
      const diff = Math.max(target - Date.now(), 0);
      setRemaining(diff);

      // Cortar el intervalo cuando llegue a 0
      if (diff <= 0) {
        clearInterval(id);
      }
    }, 1_000);

    return () => clearInterval(id);
  }, [target, remaining]);

  // Convertir milisegundos a días, horas, minutos, segundos
  const totalSeconds = Math.floor(remaining / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isExpired: remaining <= 0,
  };
}
