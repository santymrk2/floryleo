import { type FC, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VimeoPlayer from "./VimeoPlayer";

/* ── Props ─────────────────────────────────────── */
interface VideoModalProps {
  open: boolean;
  vimeoId: string;
  onClose: () => void;
}

/* ── Íconos ────────────────────────────────────── */
const CloseIcon: FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

/**
 * Reproductor de video a pantalla completa, independiente de la galería:
 * overlay oscuro, iframe de Vimeo centrado, cierra con X, click afuera o Esc,
 * y bloquea el scroll del body mientras está abierto.
 */
const VideoModal: FC<VideoModalProps> = ({ open, vimeoId, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Video de la boda"
        >
          <motion.button
            className="absolute top-4 right-4 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-cream-white/10 text-cream-white transition-colors hover:bg-cream-white/25"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Cerrar video"
          >
            <CloseIcon />
          </motion.button>

          <motion.div
            className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-xl bg-black shadow-2xl"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <VimeoPlayer vimeoId={vimeoId} autoplay />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;