import { type FC, useRef } from "react";
import { motion } from "framer-motion";

interface WelcomeOverlayProps {
  onEnter: (withMusic: boolean) => void;
}

/**
 * Modal de bienvenida a pantalla completa.
 * Ofrece dos opciones: ingresar con música o sin música.
 */
const WelcomeOverlay: FC<WelcomeOverlayProps> = ({ onEnter }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleEnter = (withMusic: boolean) => {
    if (withMusic && audioRef.current) {
      audioRef.current.play().catch(() => {
        // El navegador puede bloquear el autoplay; lo silenciamos
      });
    }
    onEnter(withMusic);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Audio oculto */}
      <audio
        ref={audioRef}
        src="/audio/placeholder.mp3"
        loop
        preload="auto"
        className="hidden"
      />

      <div className="text-center px-6 max-w-lg">
        {/* Título */}
        <motion.h1
          className="font-script text-5xl sm:text-6xl md:text-7xl text-gold-accent mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Florencia & Leonardo
        </motion.h1>

        {/* Divider */}
        <motion.div
          className="w-16 h-px bg-gradient-to-r from-transparent via-gold-accent to-transparent mx-auto mb-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        {/* Subtítulo */}
        <motion.p
          className="font-sans text-sm uppercase tracking-[0.3em] text-cream-white/80 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Nuestra Boda
        </motion.p>

        {/* Botones */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <button
            onClick={() => handleEnter(true)}
            className="btn-primary text-sm px-8 py-3"
          >
            Ingresar con música
          </button>
          <button
            onClick={() => handleEnter(false)}
            className="text-sm px-8 py-3 rounded-full border border-cream-white/40 text-cream-white/80 hover:bg-cream-white/10 hover:text-cream-white transition-colors"
          >
            Ingresar sin música
          </button>
        </motion.div>
      </div>

      {/* Footer decorativo */}
      <motion.p
        className="absolute bottom-8 font-sans text-[10px] uppercase tracking-[0.4em] text-cream-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        24 · 10 · 26
      </motion.p>
    </motion.div>
  );
};

export default WelcomeOverlay;
