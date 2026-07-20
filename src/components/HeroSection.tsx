import { type FC } from "react";
import { motion } from "framer-motion";
import { WEDDING } from "../data/wedding";
import QuoteIcon from "./QuoteIcon";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

/**
 * Sección Hero principal con los nombres de los novios,
 * la fecha y la frase de bienvenida.
 */
const HeroSection: FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden">
      {/* Decoraciones de esquina */}
      <div className="absolute top-0 left-0 opacity-60">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" aria-hidden="true">
          <circle cx="20" cy="20" r="2" fill="currentColor" className="text-gold-accent/30" />
          <circle cx="40" cy="18" r="1.5" fill="currentColor" className="text-green-moss/20" />
          <path d="M0 180 Q40 140 60 100" stroke="currentColor" strokeWidth="1" className="text-green-moss/15" fill="none" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 opacity-60 rotate-180">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" aria-hidden="true">
          <circle cx="20" cy="20" r="2" fill="currentColor" className="text-gold-accent/30" />
          <circle cx="40" cy="18" r="1.5" fill="currentColor" className="text-green-moss/20" />
          <path d="M0 180 Q40 140 60 100" stroke="currentColor" strokeWidth="1" className="text-green-moss/15" fill="none" />
        </svg>
      </div>

      <motion.div
        className="max-w-3xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Fecha */}
        <motion.p
          className="font-sans text-xs sm:text-sm uppercase tracking-[0.4em] text-green-moss/70 mb-6"
          variants={itemVariants}
        >
          {WEDDING.displayDate}
        </motion.p>

        {/* Nombres */}
        <motion.h1
          className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-gold-accent leading-tight mb-8"
          variants={itemVariants}
        >
          {WEDDING.bride}
          <span className="block text-3xl sm:text-4xl md:text-5xl font-sans font-light text-green-moss/50 tracking-[0.3em] uppercase my-2">
            &amp;
          </span>
          {WEDDING.groom}
        </motion.h1>

        {/* Comillas + Frase */}
        <motion.div
          className="relative px-6 sm:px-12"
          variants={itemVariants}
        >
          <QuoteIcon
            variant="open"
            className="absolute -top-2 left-0 text-gold-accent/40 w-6 h-auto sm:w-8"
          />
          <p className="font-sans text-sm sm:text-base md:text-lg text-charcoal/70 leading-relaxed italic max-w-xl mx-auto px-4">
            {WEDDING.welcomeMessage}
          </p>
          <QuoteIcon
            variant="close"
            className="absolute -bottom-2 right-0 text-gold-accent/40 w-6 h-auto sm:w-8"
          />
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="w-5 h-8 border-2 border-green-moss/30 rounded-full mx-auto flex justify-center pt-1.5"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          >
            <div className="w-1 h-2 bg-green-moss/50 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
