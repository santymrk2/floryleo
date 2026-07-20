import { type FC } from "react";
import { motion } from "framer-motion";
import { WEDDING } from "../data/wedding";

interface RSVPSectionProps {
  id?: string;
}

/**
 * Sección final de confirmación de asistencia.
 * Botón grande con pulso infinito que abre WhatsApp.
 */
const RSVPSection: FC<RSVPSectionProps> = ({ id }) => {
  const handleRSVP = () => {
    window.open(
      `https://wa.me/${WEDDING.whatsapp}?text=${encodeURIComponent(WEDDING.rsvpMessage)}`,
      "_blank"
    );
  };

  return (
    <section id={id} className="section-padding relative">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-moss/[0.02]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gold-accent/[0.03]" />
      </div>

      <motion.div
        className="max-w-xl mx-auto text-center relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="font-script text-4xl sm:text-5xl text-gold-accent mb-4">
          ¿Nos acompañás?
        </h2>

        <p className="font-sans text-sm sm:text-base text-charcoal/70 mb-10 max-w-md mx-auto leading-relaxed">
          Confirmá tu presencia y ayudanos a organizar todo para que sea
          una noche inolvidable.
        </p>

        {/* Botón con pulso */}
        <motion.button
          className="btn-primary text-sm sm:text-base px-10 py-4 rounded-full shadow-xl shadow-green-moss/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
          onClick={handleRSVP}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Confirmar asistencia
        </motion.button>

        {/* Footer */}
        <motion.p
          className="font-sans text-[10px] uppercase tracking-[0.3em] text-charcoal/30 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Florencia &amp; Leonardo · {WEDDING.displayDate}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default RSVPSection;
