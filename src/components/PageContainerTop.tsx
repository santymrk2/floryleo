import { type FC } from "react";
import HeroSection from "./HeroSection";
import Countdown from "./Countdown";

/**
 * Secciones superiores de la landing (antes de la galería).
 * La galería se inserta desde index.astro porque necesita
 * optimización de imágenes en build-time (astro:assets).
 */
const PageContainerTop: FC = () => {
  return (
    <>
      <HeroSection />
      <Countdown id="countdown" />
    </>
  );
};

export default PageContainerTop;