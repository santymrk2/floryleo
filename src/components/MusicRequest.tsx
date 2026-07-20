import { type FC, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WEDDING } from "../data/wedding";

interface MusicRequestProps {
  isOpen: boolean;
  onClose: () => void;
}

const MusicRequest: FC<MusicRequestProps> = ({ isOpen, onClose }) => {
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");

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
          className="fixed inset-0 z-50 flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-sm card-glass p-7 sm:p-8"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-charcoal-light/40 hover:text-charcoal transition-colors text-lg leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-charcoal/5"
              aria-label="Cerrar"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <h3 className="font-script text-3xl text-gold-accent mb-2">
                Pedí tu canción
              </h3>
              <p className="font-sans text-xs text-charcoal/50">
                Decinos qué tema no puede faltar
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="song"
                  className="block font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal-light/40 mb-1.5"
                >
                  Canción
                </label>
                <input
                  id="song"
                  type="text"
                  value={song}
                  onChange={(e) => setSong(e.target.value)}
                  placeholder="Nombre del tema..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-accent/15 bg-cream-white/40 font-sans text-sm text-charcoal placeholder:text-charcoal/25 focus:outline-none focus:ring-2 focus:ring-gold-accent/30 focus:border-gold-accent/40 transition-all"
                  autoFocus
                />
              </div>

              <div>
                <label
                  htmlFor="artist"
                  className="block font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal-light/40 mb-1.5"
                >
                  Artista
                </label>
                <input
                  id="artist"
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  placeholder="Opcional..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-accent/15 bg-cream-white/40 font-sans text-sm text-charcoal placeholder:text-charcoal/25 focus:outline-none focus:ring-2 focus:ring-gold-accent/30 focus:border-gold-accent/40 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={!song.trim()}
                className="btn-primary w-full mt-2 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
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
