import { type FC, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import type { GalleryItem } from "./Gallery";

/* ── Props ─────────────────────────────────────── */
interface LightboxProps {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}

/* ── Animación del media (direccional) ─────────── */
/* Sin scale: solo opacidad + x direccional para un slide limpio */
const mediaVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 70 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -70 }),
};

/* ── Íconos ────────────────────────────────────── */
const CloseIcon: FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const ChevronIcon: FC<{ dir: "left" | "right" }> = ({ dir }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={dir === "right" ? { transform: "rotate(180deg)" } : undefined}
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

/* ── Lightbox ──────────────────────────────────── */
const Lightbox: FC<LightboxProps> = ({ items, index, onClose, onNavigate }) => {
  const [direction, setDirection] = useState(0);
  const didDrag = useRef(false);
  const item = items[index];
  const total = items.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      onNavigate((index + dir + total) % total);
    },
    [index, total, onNavigate]
  );

  /* Teclado (Esc / flechas) + lock de scroll del body */
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  /* Swipe horizontal (mobile) */
  const onDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    if (offset.x < -70 || velocity.x < -400) go(1);
    else if (offset.x > 70 || velocity.x > 400) go(-1);
    /* El click que dispara el navegador tras soltar llega después:
       dejamos un margen para que el overlay no lo tome como cierre */
    window.setTimeout(() => {
      didDrag.current = false;
    }, 60);
  };

  /* Un swipe no debe cerrar el lightbox (el click que le sigue, tampoco) */
  const handleOverlayClick = () => {
    if (didDrag.current) {
      didDrag.current = false;
      return;
    }
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] bg-black/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Galería de fotos"
    >
      {/* Contador */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <span className="font-sans text-xs tracking-[0.3em] text-cream-white/70">
          {index + 1} / {total}
        </span>
      </div>

      {/* Cerrar */}
      <motion.button
        className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-cream-white/10 text-cream-white hover:bg-cream-white/25 transition-colors flex items-center justify-center cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Cerrar galería"
      >
        <CloseIcon />
      </motion.button>

      {/* Flechas */}
      {total > 1 && (
        <>
          <motion.button
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-cream-white text-green-moss-dark shadow-lg flex items-center justify-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Imagen anterior"
          >
            <ChevronIcon dir="left" />
          </motion.button>

          <motion.button
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-cream-white text-green-moss-dark shadow-lg flex items-center justify-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Imagen siguiente"
          >
            <ChevronIcon dir="right" />
          </motion.button>
        </>
      )}

      {/* Media centrado con swipe */}
      {/* Los hijos del AnimatePresence son absolute inset-0: el que sale y el
          que entra se superponen en el mismo centro → slide limpio sin reflow */}
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={mediaVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragStart={() => {
                didDrag.current = true;
              }}
              onDragEnd={onDragEnd}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-0 flex cursor-grab items-center justify-center p-4 active:cursor-grabbing sm:p-10"
            >
              <img
                src={item.full?.src}
                srcSet={item.full?.srcSet}
                sizes="(max-width: 640px) 100vw, 85vw"
                alt={item.alt ?? ""}
                className="max-h-[78vh] max-w-[92vw] sm:max-w-[85vw] w-auto h-auto object-contain rounded-lg shadow-2xl select-none"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Lightbox;