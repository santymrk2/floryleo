import { type FC } from "react";
import { motion } from "framer-motion";
import { WEDDING } from "../data/wedding";

interface RSVPSectionProps {
  id?: string;
}

const RSVPSection: FC<RSVPSectionProps> = ({ id }) => {
  return (
    <section id={id} className="section-padding relative">
      {/* Círculos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 500,
            height: 500,
            background: "radial-gradient(circle, rgba(74,93,35,0.03) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 320,
            height: 320,
            background: "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Separador decorativo superior */}
      <div className="flex items-center justify-center gap-4 mb-16">
        <span className="w-12 h-px bg-gradient-to-r from-transparent to-gold-accent/30" />
        <svg width="12" height="12" viewBox="0 0 12 12" className="text-gold-accent/40" aria-hidden="true">
          <path d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5Z" fill="currentColor" />
        </svg>
        <span className="w-12 h-px bg-gradient-to-l from-transparent to-gold-accent/30" />
      </div>

      <motion.div
        className="max-w-xl mx-auto text-center relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-charcoal-light/40 mb-3">
          Nos encantaría que estés
        </p>
        <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-gold-accent mb-5">
          ¿Nos acompañás?
        </h2>
        <p className="font-sans text-sm sm:text-base text-charcoal/60 mb-12 max-w-md mx-auto leading-relaxed">
          Confirmá tu presencia y ayudanos a organizar todo para que sea una noche inolvidable.
        </p>

        {/* Botón con pulso */}
        <motion.button
          className="btn-primary text-sm sm:text-base px-10 py-4"
          style={{
            boxShadow: "0 8px 30px rgba(74,93,35,0.3)",
          }}
          whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(74,93,35,0.4)" }}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "easeInOut",
          }}
          onClick={() =>
            window.open(
              `https://wa.me/${WEDDING.whatsapp}?text=${encodeURIComponent(WEDDING.rsvpMessage)}`,
              "_blank"
            )
          }
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Confirmar asistencia
        </motion.button>

        {/* Footer */}
        <motion.p
          className="font-sans text-[10px] uppercase tracking-[0.4em] text-charcoal-light/25 mt-20"
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
