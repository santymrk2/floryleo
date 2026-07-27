import { type FC } from "react";
import { motion } from "framer-motion";
import { WEDDING } from "../data/wedding";
import RibbonTitle from "./RibbonTitle";

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
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L8 6H4l2 4H2l2 4h14l2-4h-4l2-4h-4l-4-4z" />
    <path d="M12 6v12" />
    <path d="M8 22h8" />
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
    <div className="text-green-moss/70 mb-5">{icon}</div>
    <h3 className="font-script text-2xl sm:text-3xl text-green-moss mb-4">
      {title}
    </h3>
    {children}
  </motion.div>
);

/* ── Componente principal ──────────────────────── */
interface InfoCardsProps {
  id?: string;
}

const InfoCards: FC<InfoCardsProps> = ({ id }) => {
  return (
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
          <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-charcoal-light/40 mb-4">
            Para que todo salga perfecto
          </p>
          <RibbonTitle>Información</RibbonTitle>
        </div>

        <motion.div
          className="max-w-xs mx-auto"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {/* Tarjeta: Dress Code */}
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
        </motion.div>
      </motion.div>
    </section>
  );
};

export default InfoCards;
