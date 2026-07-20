import { type FC } from "react";
import { motion } from "framer-motion";
import { WEDDING } from "../data/wedding";

/* ── Variantes de animación ────────────────────── */
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Hojas decorativas SVG ─────────────────────── */
const LeafCorner: FC<{ position: "tl" | "tr" | "bl" | "br" }> = ({ position }) => {
  const posClasses: Record<string, string> = {
    tl: "top-0 left-0",
    tr: "top-0 right-0 -scale-x-100",
    bl: "bottom-0 left-0 -scale-y-100",
    br: "bottom-0 right-0 -scale-x-100 -scale-y-100",
  };

  return (
    <div className={`absolute ${posClasses[position]} pointer-events-none z-20`} aria-hidden="true">
      <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
        <path d="M0 0 Q20 40 15 70 Q12 50 25 30 Q35 15 50 5 Q30 8 15 0Z" fill="rgba(255,253,208,0.1)" />
        <path d="M0 0 Q40 20 70 15 Q50 12 30 25 Q15 35 5 50 Q8 30 0 15Z" fill="rgba(255,253,208,0.06)" />
        <path d="M5 0 C10 20 8 45 0 60" stroke="rgba(255,253,208,0.1)" strokeWidth="1" fill="none" />
        <circle cx="55" cy="8" r="1.5" fill="rgba(212,175,55,0.25)" />
        <circle cx="8" cy="55" r="1" fill="rgba(212,175,55,0.2)" />
      </svg>
    </div>
  );
};

/* ── Hero Section ──────────────────────────────── */
const HeroSection: FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── Foto de fondo a pantalla completa ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/floryleo-hero.jpg"
          alt="Florencia y Leonardo"
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay degradado para legibilidad */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                180deg,
                rgba(44, 44, 44, 0.55) 0%,
                rgba(44, 44, 44, 0.35) 40%,
                rgba(44, 44, 44, 0.45) 70%,
                rgba(44, 44, 44, 0.65) 100%
              )
            `,
          }}
        />
        {/* Viñeta sutil en los bordes */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      </div>

      {/* Hojas decorativas */}
      <LeafCorner position="tl" />
      <LeafCorner position="tr" />
      <LeafCorner position="bl" />
      <LeafCorner position="br" />

      {/* ── Contenido centrado ── */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center px-6 py-24"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Fecha */}
        <motion.p
          className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.5em] text-cream-white/70 mb-6"
          variants={fadeUp}
        >
          {WEDDING.displayDate}
        </motion.p>

        {/* Nombres */}
        <motion.h1 variants={fadeUp}>
          <span className="block font-script text-[3.5rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[8rem] leading-[0.9] text-cream-white drop-shadow-lg">
            {WEDDING.bride}
          </span>

          <span className="block my-3 sm:my-5">
            <span className="inline-flex items-center gap-3">
              <span className="block w-10 sm:w-16 h-px bg-gradient-to-r from-transparent to-gold-accent/50" />
              <span className="font-sans text-xl sm:text-2xl md:text-3xl font-extralight text-gold-accent/80">
                &amp;
              </span>
              <span className="block w-10 sm:w-16 h-px bg-gradient-to-l from-transparent to-gold-accent/50" />
            </span>
          </span>

          <span className="block font-script text-[3.5rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[8rem] leading-[0.9] text-cream-white drop-shadow-lg">
            {WEDDING.groom}
          </span>
        </motion.h1>

        {/* Frase de bienvenida */}
        <motion.div
          className="relative mt-12 sm:mt-16 max-w-lg mx-auto"
          variants={fadeUp}
        >
          <span className="absolute -top-4 -left-2 sm:left-0 text-gold-accent/30 select-none" aria-hidden="true">
            <svg width="28" height="22" viewBox="0 0 28 22" fill="currentColor">
              <path d="M12.1 0C5.4 0 0 5.2 0 11.6 0 16.4 3.2 20 7.8 21.2L9.2 18c-2.4-1-4-3.2-4-5.8 0-3.4 3-6.2 6.8-6.2 1.4 0 2.6.4 3.4 1-.2-4.8-3.2-7-6.4-7zm14 0C19.4 0 14 5.2 14 11.6 14 16.4 17.2 20 21.8 21.2L23.2 18c-2.4-1-4-3.2-4-5.8 0-3.4 3-6.2 6.8-6.2 1.4 0 2.6.4 3.4 1 .2-4.8 3.2-7 4.4-7z" />
            </svg>
          </span>

          <p className="font-sans text-sm sm:text-base text-cream-white/80 leading-relaxed italic px-8 drop-shadow-sm">
            {WEDDING.welcomeMessage}
          </p>

          <span className="absolute -bottom-4 -right-2 sm:right-0 text-gold-accent/30 select-none rotate-180" aria-hidden="true">
            <svg width="28" height="22" viewBox="0 0 28 22" fill="currentColor">
              <path d="M12.1 0C5.4 0 0 5.2 0 11.6 0 16.4 3.2 20 7.8 21.2L9.2 18c-2.4-1-4-3.2-4-5.8 0-3.4 3-6.2 6.8-6.2 1.4 0 2.6.4 3.4 1-.2-4.8-3.2-7-6.4-7zm14 0C19.4 0 14 5.2 14 11.6 14 16.4 17.2 20 21.8 21.2L23.2 18c-2.4-1-4-3.2-4-5.8 0-3.4 3-6.2 6.8-6.2 1.4 0 2.6.4 3.4 1 .2-4.8 3.2-7 4.4-7z" />
            </svg>
          </span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-14 sm:mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-[1.5px] border-cream-white/30 rounded-full mx-auto flex justify-center pt-2"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <div className="w-1 h-2.5 bg-gold-accent/60 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
