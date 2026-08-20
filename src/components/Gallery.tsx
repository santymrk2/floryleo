import { type FC, useState } from "react";
import { AnimatePresence, MotionConfig, motion, type Variants } from "framer-motion";
import RibbonTitle from "./RibbonTitle";
import Lightbox from "./Lightbox";
import VideoModal from "./VideoModal";
import VimeoPlayer from "./VimeoPlayer";

/* ── Tipos ─────────────────────────────────────── */
export interface GalleryItem {
  type: "image" | "video";
  alt?: string;
  featured?: boolean;
  thumb?: { src: string; srcSet: string };
  full?: { src: string; srcSet: string };
  vimeoId?: string;
}

interface GalleryProps {
  id?: string;
  /** Solo fotos: es lo que navega el lightbox */
  images: GalleryItem[];
  /** Video aparte de la galería */
  video?: GalleryItem;
}

/* ── Animaciones ──────────────────────────────── */
const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemIn: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Íconos ───────────────────────────────────── */
const PlayIcon: FC = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

/* ── Burbujas ──────────────────────────────────── */
const bubbleDims: Record<string, string> = {
  sm: "w-24 h-24 sm:w-28 sm:h-28",
  md: "w-32 h-32 sm:w-36 sm:h-36",
  lg: "w-44 h-44 sm:w-52 sm:h-52",
};

/* Patrón de tamaños para las 8 burbujas de foto */
const BUBBLE_SIZES = ["md", "lg", "sm", "md", "sm", "lg", "sm", "md"] as const;

const thumbSizes = (size: string) =>
  size === "sm"
    ? "(max-width: 640px) 96px, 112px"
    : size === "lg"
      ? "(max-width: 640px) 176px, 208px"
      : "(max-width: 640px) 128px, 144px";

const PhotoBubble: FC<{
  item: GalleryItem;
  size: string;
  onClick: () => void;
}> = ({ item, size, onClick }) => (
  <motion.button
    variants={itemIn}
    whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 0.94 }}
    onClick={onClick}
    className={`group relative overflow-hidden rounded-full cursor-pointer shadow-md ${bubbleDims[size]}`}
    style={{ border: "2px solid rgba(124,141,114,0.28)" }}
    aria-label={`Ver foto en grande`}
  >
    <img
      src={item.thumb?.src}
      srcSet={item.thumb?.srcSet}
      sizes={thumbSizes(size)}
      alt={item.alt ?? "Foto de Flor y Leo"}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
    <span
      className="absolute inset-0 rounded-full ring-1 ring-inset ring-gold-accent/25 transition-all duration-300 group-hover:ring-gold-accent/70"
      aria-hidden="true"
    />
  </motion.button>
);

/* ── Scatter desktop (md+) ─────────────────────── */
/* Posiciones centradas en % del contenedor (h-[640px]).
   La banda superior arranca en top 17% (=108px, la mitad de la burbuja
   más grande) para que ninguna sobresalga por arriba del contenedor.
   Verificadas a mano: ninguna burbuja se superpone con otra. */
const SCATTER: { left: string; top: string }[] = [
  { left: "14%", top: "20%" },
  { left: "45%", top: "17%" },
  { left: "76%", top: "23%" },
  { left: "8%", top: "46%" },
  { left: "35%", top: "54%" },
  { left: "76%", top: "56%" },
  { left: "22%", top: "84%" },
  { left: "56%", top: "88%" },
];

/* ── Video: bloque ancho, distinto de las fotos ── */
const VideoBlock: FC<{
  item: GalleryItem;
  cover?: { src?: string; srcSet?: string };
  onOpenPlayer: () => void;
}> = ({ item, cover, onOpenPlayer }) => (
  <motion.div
    variants={itemIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-40px" }}
    className="relative mt-14 -mx-5 sm:-mx-6 lg:-mx-8"
  >
    {/* Desktop: reproductor de Vimeo a todo el ancho */}
    <div className="hidden sm:block">
      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
        <VimeoPlayer vimeoId={item.vimeoId ?? ""} />
      </div>
    </div>

    {/* Mobile: póster que abre el reproductor a pantalla completa */}
    <div className="sm:hidden">
      <button
        onClick={onOpenPlayer}
        className="group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-2xl shadow-xl"
        aria-label="Ver video de la boda"
      >
        {cover?.src && (
          <img
            src={cover.src}
            srcSet={cover.srcSet}
            sizes="(max-width: 640px) 100vw, 50vw"
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
        <span className="absolute inset-0 bg-black/45 transition-colors duration-300 group-hover:bg-black/35" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-cream-white/30 bg-green-moss text-cream-white shadow-xl">
            <PlayIcon />
          </span>
        </span>
      </button>
    </div>
  </motion.div>
);

/* ── Componente principal ──────────────────────── */
const Gallery: FC<GalleryProps> = ({ id, images, video }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const photos = images.filter((i) => i.type === "image" && i.featured).slice(0, 8);

  return (
    <MotionConfig reducedMotion="user">
      <section id={id} className="section-padding relative">
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-charcoal-light/40 mb-4">
              Somos
            </p>
            <RibbonTitle>Nosotros</RibbonTitle>
          </div>

          {/* Collage circular de fotos */}
          {/* Mobile: flex-wrap centrado (igual que siempre) */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:hidden"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {photos.map((item, i) => (
              <PhotoBubble
                key={item.full?.src}
                item={item}
                size={BUBBLE_SIZES[i] ?? "md"}
                onClick={() => setActiveIndex(images.indexOf(item))}
              />
            ))}
          </motion.div>

          {/* Desktop (md+): scatter orgánico, sin superposición */}
          <motion.div
            className="relative hidden h-[640px] w-full md:block"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {photos.map((item, i) => (
              <div
                key={item.full?.src}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: SCATTER[i]?.left,
                  top: SCATTER[i]?.top,
                }}
              >
                <PhotoBubble
                  item={item}
                  size={BUBBLE_SIZES[i] ?? "md"}
                  onClick={() => setActiveIndex(images.indexOf(item))}
                />
              </div>
            ))}
          </motion.div>

          {/* Ver todas las fotos: inmediato debajo de las burbujas */}
          <p className="mt-8 text-center">
            <motion.button
              className="font-sans text-[10px] uppercase tracking-[0.15em] text-charcoal-light/40 hover:text-green-moss transition-colors underline underline-offset-4 decoration-gold-accent/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveIndex(0)}
            >
              Ver todas las fotos
            </motion.button>
          </p>

          {/* Video: ancho completo, distinto de las fotos */}
          {video && (
            <VideoBlock
              item={video}
              cover={photos[0]?.thumb}
              onOpenPlayer={() => setVideoOpen(true)}
            />
          )}
        </motion.div>
      </section>

      {/* Lightbox: solo fotos */}
      <AnimatePresence>
        {activeIndex !== null && (
          <Lightbox
            items={images}
            index={activeIndex}
            onClose={() => setActiveIndex(null)}
            onNavigate={setActiveIndex}
          />
        )}
      </AnimatePresence>

      {/* Video: reproductor independiente de la galería (mobile) */}
      {video && (
        <VideoModal
          open={videoOpen}
          vimeoId={video.vimeoId ?? ""}
          onClose={() => setVideoOpen(false)}
        />
      )}
    </MotionConfig>
  );
};

export default Gallery;