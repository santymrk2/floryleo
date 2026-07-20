"use client";

import { type FC, useState } from "react";
import { AnimatePresence } from "framer-motion";
import WelcomeOverlay from "./WelcomeOverlay";
import HeroSection from "./HeroSection";
import Countdown from "./Countdown";
import EventDetails from "./EventDetails";
import InfoCards from "./InfoCards";
import RSVPSection from "./RSVPSection";

/**
 * Orquestador principal de la landing page.
 * Gestiona el overlay de bienvenida y renderiza
 * el contenido completo cuando se cierra.
 */
const PageContainer: FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  // Guardamos la referencia al elemento <audio> global
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const handleEnter = (withMusic: boolean) => {
    if (withMusic && audioElement) {
      audioElement.play().catch(() => {
        // Autoplay bloqueado por el navegador — el usuario ya hizo clic,
        // pero algunos navegadores igual requieren un gesto previo.
        // En ese caso, el audio no se reproduce y es silencioso.
      });
      setAudioPlaying(true);
    }
    setDismissed(true);
  };

  return (
    <>
      {/* Audio global (se monta siempre, pero solo suena si se eligió música) */}
      <audio
        ref={(el) => {
          if (el && !audioElement) setAudioElement(el);
        }}
        src="/audio/placeholder.mp3"
        loop
        preload="auto"
      />

      {/* Overlay de bienvenida */}
      <AnimatePresence>
        {!dismissed && <WelcomeOverlay onEnter={handleEnter} />}
      </AnimatePresence>

      {/* Contenido principal (se muestra solo después de dismiss) */}
      {dismissed && (
        <main className="relative z-10">
          <HeroSection />
          <Countdown id="countdown" />
          <EventDetails id="event-details" />
          <InfoCards id="info" />
          <RSVPSection id="rsvp" />
        </main>
      )}
    </>
  );
};

export default PageContainer;
