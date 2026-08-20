import { type FC } from "react";

/* ── Props ─────────────────────────────────────── */
interface VimeoPlayerProps {
  vimeoId: string;
  autoplay?: boolean;
}

/**
 * Iframe de Vimeo compartido entre el reproductor inline (desktop)
 * y el modal fullscreen (mobile).
 */
const VimeoPlayer: FC<VimeoPlayerProps> = ({ vimeoId, autoplay = false }) => (
  <iframe
    src={`https://player.vimeo.com/video/${vimeoId}?autoplay=${autoplay ? 1 : 0}&byline=0&title=0&portrait=0`}
    className="h-full w-full"
    allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
    allowFullScreen
    title="Video de la boda"
  />
);

export default VimeoPlayer;