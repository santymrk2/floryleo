import { type FC } from "react";
import { motion } from "framer-motion";
import { useCountdown } from "../hooks/useCountdown";
import { WEDDING } from "../data/wedding";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

interface TimeBlockProps {
  value: number;
  label: string;
}

const TimeBlock: FC<TimeBlockProps> = ({ value, label }) => (
  <motion.div
    className="flex flex-col items-center card-glass px-4 py-5 sm:px-6 sm:py-7 min-w-[80px] sm:min-w-[100px]"
    variants={itemVariants}
    whileHover={{ y: -4 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <span className="font-script text-4xl sm:text-5xl md:text-6xl text-green-moss leading-none">
      {String(value).padStart(2, "0")}
    </span>
    <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] text-charcoal/50 mt-2">
      {label}
    </span>
  </motion.div>
);

interface CountdownProps {
  /** ID de la sección para scroll */
  id?: string;
}

/**
 * Temporizador de cuenta regresiva con 4 bloques
 * (días, horas, minutos, segundos) animados en cascada.
 */
const Countdown: FC<CountdownProps> = ({ id }) => {
  const { days, hours, minutes, seconds, isExpired } =
    useCountdown(WEDDING.date);

  return (
    <section id={id} className="section-padding relative">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-script text-3xl sm:text-4xl text-gold-accent mb-3">
          Faltan
        </h2>
        <div className="divider-leaf mb-8" />

        {isExpired ? (
          <p className="font-sans text-lg text-green-moss">
            🎉 ¡Llegó el gran día!
          </p>
        ) : (
          <motion.div
            className="flex gap-3 sm:gap-5 justify-center flex-wrap"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <TimeBlock value={days} label="Días" />
            <TimeBlock value={hours} label="Horas" />
            <TimeBlock value={minutes} label="Minutos" />
            <TimeBlock value={seconds} label="Segundos" />
          </motion.div>
        )}

        <p className="font-sans text-xs uppercase tracking-[0.3em] text-charcoal/40 mt-6">
          {WEDDING.displayDate} · {WEDDING.displayTime}
        </p>
      </motion.div>
    </section>
  );
};

export default Countdown;
