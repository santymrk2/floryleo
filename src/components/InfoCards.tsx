import { type FC, useState } from "react";
import { motion } from "framer-motion";
import { WEDDING } from "../data/wedding";
import MusicRequest from "./MusicRequest";

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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const InfoCard: FC<InfoCardProps> = ({ icon, title, children }) => (
  <motion.div
    className="card-glass p-6 sm:p-8 text-center card-hover"
    variants={cardVariants}
    whileHover={{ y: -6, transition: { duration: 0.2 } }}
  >
    <div className="text-gold-accent mb-4 flex justify-center">{icon}</div>
    <h3 className="font-script text-2xl text-gold-accent mb-3">{title}</h3>
    {children}
  </motion.div>
);

interface InfoCardsProps {
  id?: string;
}

/**
 * Grid con dos tarjetas de información:
 * 1. Dress Code
 * 2. Música (sugerir canciones vía WhatsApp)
 */
const InfoCards: FC<InfoCardsProps> = ({ id }) => {
  const [musicModalOpen, setMusicModalOpen] = useState(false);

  return (
    <>
      <section id={id} className="section-padding relative">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <h2 className="font-script text-3xl sm:text-4xl text-gold-accent mb-3">
              Información
            </h2>
            <div className="divider-leaf" />
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Tarjeta 1: Dress Code */}
            <InfoCard
              icon={
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 5L3 9l3 3 3-3-3-4z" />
                  <path d="M18 5l3 4-3 3-3-3 3-4z" />
                  <path d="M6 9h12v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9z" />
                  <path d="M12 3v6" />
                </svg>
              }
              title="Dress Code"
            >
              <p className="font-sans text-sm text-charcoal/70 mb-2">
                Para esta ocasión tan especial, te pedimos:
              </p>
              <span className="inline-block font-script text-3xl text-gold-accent">
                {WEDDING.dressCode}
              </span>
            </InfoCard>

            {/* Tarjeta 2: Música */}
            <InfoCard
              icon={
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              }
              title="Música"
            >
              <p className="font-sans text-sm text-charcoal/70 mb-4">
                ¿Qué tema no puede faltar en la pista?
              </p>
              <motion.button
                className="btn-primary text-xs"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMusicModalOpen(true)}
              >
                Pedir canción
              </motion.button>
            </InfoCard>
          </motion.div>
        </motion.div>
      </section>

      {/* Modal de sugerencia musical */}
      <MusicRequest
        isOpen={musicModalOpen}
        onClose={() => setMusicModalOpen(false)}
      />
    </>
  );
};

export default InfoCards;
