import { type FC } from "react";
import EventDetails from "./EventDetails";
import InfoCards from "./InfoCards";
import RSVPSection from "./RSVPSection";

/**
 * Secciones inferiores de la landing (después de la galería).
 */
const PageContainerBottom: FC = () => {
  return (
    <>
      <EventDetails id="event-details" />
      <InfoCards id="info" />
      <RSVPSection id="rsvp" />
    </>
  );
};

export default PageContainerBottom;