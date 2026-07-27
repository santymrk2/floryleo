import { type FC } from "react";
import { motion } from "framer-motion";
import RibbonTitle from "./RibbonTitle";

/* ── Animaciones ──────────────────────────────── */
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemIn = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Íconos ───────────────────────────────────── */
const ImageIcon: FC = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);

const PlayIcon: FC = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

/**
 * Casillero de foto placeholder circular.
 * Reemplazar `src` en el futuro por la imagen real; por ahora
 * muestra un marcador visual prolijo con el estilo del sitio.
 */
const PhotoPlaceholder: FC<{ size?: "sm" | "md" | "lg" }> = ({ size = "md" }) => {
  const dims: Record<string, string> = {
    sm: "w-24 h-24 sm:w-28 sm:h-28",
    md: "w-32 h-32 sm:w-36 sm:h-36",
    lg: "w-44 h-44 sm:w-52 sm:h-52",
  };

  return (
    <motion.div
      variants={itemIn}
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative flex flex-col items-center justify-center gap-1.5 rounded-full ${dims[size]}`}
      style={{
        background: "rgba(255,253,247,0.6)",
        border: "1.5px dashed rgba(124,141,114,0.4)",
        boxShadow: "0 4px 16px rgba(44,44,44,0.05)",
      }}
    >
      <span className="text-green-moss/50">
        <ImageIcon />
      </span>
      <span className="font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.12em] text-charcoal-light/40 text-center px-3">
        Foto próximamente
      </span>
    </motion.div>
  );
};

/* ── Componente principal ──────────────────────── */
interface GalleryProps {
  id?: string;
}

const Gallery: FC<GalleryProps> = ({ id }) => {
  return (
    <section id={id} className="section-padding relative">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-charcoal-light/40 mb-4">
            Nuestra historia
          </p>
          <RibbonTitle>Momentos</RibbonTitle>
        </div>

        {/* Collage circular de fotos */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <PhotoPlaceholder size="md" />
          <PhotoPlaceholder size="lg" />
          <PhotoPlaceholder size="sm" />
          <PhotoPlaceholder size="md" />
          <PhotoPlaceholder size="sm" />
        </motion.div>

        {/* Video placeholder */}
        <motion.div
          variants={itemIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          whileHover={{ scale: 1.01 }}
          className="relative flex flex-col items-center justify-center gap-3 rounded-2xl aspect-video"
          style={{
            background: "rgba(124,141,114,0.06)",
            border: "1.5px dashed rgba(124,141,114,0.25)",
          }}
        >
          <span className="w-14 h-14 rounded-full flex items-center justify-center bg-green-moss text-cream-white shadow-md">
            <PlayIcon />
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal-light/45">
            Video próximamente
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Gallery;
