import { type FC } from "react";
import { motion } from "framer-motion";
import { useCountdown } from "../hooks/useCountdown";
import { WEDDING } from "../data/wedding";

/* ── Animaciones ──────────────────────────────── */
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const boxIn = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Bloque de tiempo ──────────────────────────── */
interface TimeBlockProps {
  value: number;
  label: string;
}

const TimeBlock: FC<TimeBlockProps> = ({ value, label }) => (
  <motion.div
    className="flex flex-col items-center rounded-2xl px-5 py-6 sm:px-7 sm:py-8 min-w-[72px] sm:min-w-[100px]"
    style={{
      background: "rgba(255,253,208,0.5)",
      backdropFilter: "blur(8px)",
      border: "1px solid rgba(212,175,55,0.12)",
      boxShadow: "0 4px 20px rgba(44,44,44,0.04)",
    }}
    variants={boxIn}
    whileHover={{ y: -4, boxShadow: "0 8px 28px rgba(44,44,44,0.08)" }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <span className="font-script text-[2.75rem] sm:text-[3.5rem] md:text-[4rem] text-green-moss leading-none tabular-nums">
      {String(value).padStart(2, "0")}
    </span>
    <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] text-charcoal-light/60 mt-2">
      {label}
    </span>
  </motion.div>
);

/* ── Componente principal ──────────────────────── */
interface CountdownProps {
  id?: string;
}

const Countdown: FC<CountdownProps> = ({ id }) => {
  const { days, hours, minutes, seconds, isExpired } =
    useCountdown(WEDDING.date);

  return (
    <section id={id} className="section-padding relative">
      {/* Separador decorativo superior */}
      <div className="flex items-center justify-center gap-4 mb-16">
        <span className="w-12 h-px bg-gradient-to-r from-transparent to-gold-accent/30" />
        <svg width="12" height="12" viewBox="0 0 12 12" className="text-gold-accent/40" aria-hidden="true">
          <path d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5Z" fill="currentColor" />
        </svg>
        <span className="w-12 h-px bg-gradient-to-l from-transparent to-gold-accent/30" />
      </div>

      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.5em] text-charcoal-light/50 mb-3">
          Cuenta regresiva
        </p>
        <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-gold-accent mb-2">
          Faltan
        </h2>
        <div className="gold-divider mb-10" />

        {isExpired ? (
          <p className="font-sans text-lg text-green-moss font-medium">
            🎉 ¡Llegó el gran día!
          </p>
        ) : (
          <motion.div
            className="flex gap-3 sm:gap-4 justify-center flex-wrap"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <TimeBlock value={days} label="Días" />
            <TimeBlock value={hours} label="Horas" />
            <TimeBlock value={minutes} label="Minutos" />
            <TimeBlock value={seconds} label="Segundos" />
          </motion.div>
        )}

        <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-charcoal-light/40 mt-8">
          {WEDDING.displayDate} · {WEDDING.displayTime}
        </p>
      </motion.div>
    </section>
  );
};

export default Countdown;
