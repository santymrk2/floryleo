import { type FC, useState, useRef, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WEDDING } from "../data/wedding";

interface MusicRequestProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal para sugerir canciones. Al enviar, abre WhatsApp
 * con un mensaje pre-armado.
 */
const MusicRequest: FC<MusicRequestProps> = ({ isOpen, onClose }) => {
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!song.trim()) return;

    const message = `${WEDDING.musicMessage} "${song.trim()}"${artist.trim() ? ` de ${artist.trim()}` : ""}`;

    window.open(
      `https://wa.me/${WEDDING.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    setSong("");
    setArtist("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-md card-glass p-8"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-charcoal/50 hover:text-charcoal transition-colors text-xl leading-none"
              aria-label="Cerrar"
            >
              ✕
            </button>

            <h3 className="font-script text-3xl text-gold-accent mb-2">
              Pedí tu canción
            </h3>
            <p className="font-sans text-sm text-charcoal/70 mb-6">
              Decinos qué tema no puede faltar en la pista 🎶
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="song"
                  className="block font-sans text-xs uppercase tracking-widest text-charcoal/60 mb-1.5"
                >
                  Canción
                </label>
                <input
                  ref={inputRef}
                  id="song"
                  type="text"
                  value={song}
                  onChange={(e) => setSong(e.target.value)}
                  placeholder="Nombre del tema..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-accent/20 bg-cream-white/60 font-sans text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-gold-accent/40 focus:border-gold-accent transition-all"
                  autoFocus
                />
              </div>

              <div>
                <label
                  htmlFor="artist"
                  className="block font-sans text-xs uppercase tracking-widest text-charcoal/60 mb-1.5"
                >
                  Artista
                </label>
                <input
                  id="artist"
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  placeholder="Opcional..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-accent/20 bg-cream-white/60 font-sans text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-gold-accent/40 focus:border-gold-accent transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={!song.trim()}
                className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Enviar sugerencia
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MusicRequest;
