import { type FC } from "react";
import HeroSection from "./HeroSection";
import Countdown from "./Countdown";
import EventDetails from "./EventDetails";
import InfoCards from "./InfoCards";
import RSVPSection from "./RSVPSection";

/**
 * Orquestador principal de la landing page.
 * Renderiza todas las secciones directamente.
 */
const PageContainer: FC = () => {
  return (
    <main className="relative z-10">
      <HeroSection />
      <Countdown id="countdown" />
      <EventDetails id="event-details" />
      <InfoCards id="info" />
      <RSVPSection id="rsvp" />
    </main>
  );
};

export default PageContainer;
