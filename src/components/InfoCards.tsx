import { type FC, useState } from "react";
import { motion } from "framer-motion";
import { WEDDING } from "../data/wedding";
import MusicRequest from "./MusicRequest";

/* ── Animaciones ──────────────────────────────── */
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Íconos ───────────────────────────────────── */
const SuitIcon: FC = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L8 6H4l2 4H2l2 4h14l2-4h-4l2-4h-4l-4-4z" />
    <path d="M12 6v12" />
    <path d="M8 22h8" />
  </svg>
);

const MusicIcon: FC = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

/* ── Tarjeta ──────────────────────────────────── */
interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const InfoCard: FC<InfoCardProps> = ({ icon, title, children }) => (
  <motion.div
    className="card-glass p-7 sm:p-9 text-center flex flex-col items-center"
    variants={cardIn}
    whileHover={{ y: -6, boxShadow: "0 12px 32px rgba(44,44,44,0.1)" }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <div className="text-gold-accent/70 mb-5">{icon}</div>
    <h3 className="font-script text-2xl sm:text-3xl text-gold-accent mb-4">{title}</h3>
    {children}
  </motion.div>
);

/* ── Componente principal ──────────────────────── */
interface InfoCardsProps {
  id?: string;
}

const InfoCards: FC<InfoCardsProps> = ({ id }) => {
  const [musicModalOpen, setMusicModalOpen] = useState(false);

  return (
    <>
      <section id={id} className="section-padding relative">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-charcoal-light/40 mb-2">
              Para que todo salga perfecto
            </p>
            <h2 className="font-script text-4xl sm:text-5xl text-gold-accent mb-4">
              Información
            </h2>
            <div className="gold-divider" />
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {/* Tarjeta 1: Dress Code */}
            <InfoCard icon={<SuitIcon />} title="Dress Code">
              <p className="font-sans text-sm text-charcoal/60 mb-3 leading-relaxed">
                Para esta ocasión tan especial,
                <br />
                te pedimos asistir con:
              </p>
              <span className="inline-block font-script text-4xl text-gold-accent">
                {WEDDING.dressCode}
              </span>
            </InfoCard>

            {/* Tarjeta 2: Música */}
            <InfoCard icon={<MusicIcon />} title="Música">
              <p className="font-sans text-sm text-charcoal/60 mb-5 leading-relaxed">
                ¿Qué tema no puede
                <br />
                faltar en la pista?
              </p>
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setMusicModalOpen(true)}
              >
                Pedir canción
              </motion.button>
            </InfoCard>
          </motion.div>
        </motion.div>
      </section>

      <MusicRequest
        isOpen={musicModalOpen}
        onClose={() => setMusicModalOpen(false)}
      />
    </>
  );
};

export default InfoCards;
