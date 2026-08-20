import { type FC, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ── Props ─────────────────────────────────────── */
interface ModalProps {
  open: boolean;
  onClose: () => void;
  ariaLabel?: string;
  maxWidthClass?: string;
  children: React.ReactNode;
}

/* ── Íconos ────────────────────────────────────── */
const CloseIcon: FC = () => (
  <svg
    width="16"
    height="16"
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
 * Modal genérico centrado, con el mismo lenguaje visual del lightbox:
 * overlay oscuro al 80%, panel card-glass centrado, cierra con X,
 * click afuera o Esc, y bloquea el scroll del body mientras está abierto.
 */
const Modal: FC<ModalProps> = ({
  open,
  onClose,
  ariaLabel = "Modal",
  maxWidthClass = "max-w-md",
  children,
}) => {
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
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
        >
          <motion.div
            className={`card-glass relative w-full max-h-[85vh] overflow-y-auto ${maxWidthClass}`}
            style={{ background: "rgba(255,253,247,0.95)" }}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              className="absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-green-moss/10 text-charcoal-light transition-colors hover:bg-green-moss/20"
              onClick={onClose}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Cerrar"
            >
              <CloseIcon />
            </motion.button>
            <div className="p-8 sm:p-10">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;