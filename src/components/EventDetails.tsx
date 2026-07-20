import { type FC } from "react";
import { motion } from "framer-motion";
import { WEDDING } from "../data/wedding";
import { downloadIcs, getGoogleCalendarUrl } from "../utils/calendar";

const icsEvent = {
  title: WEDDING.calendarTitle,
  description: WEDDING.calendarDescription,
  location: WEDDING.calendarLocation,
  startDate: WEDDING.date,
  durationHours: WEDDING.eventDurationHours,
};

interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const DetailRow: FC<DetailRowProps> = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <span className="mt-1 text-gold-accent shrink-0">{icon}</span>
    <div>
      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-0.5">
        {label}
      </p>
      <p className="font-sans text-sm sm:text-base text-charcoal/80">{value}</p>
    </div>
  </div>
);

interface EventDetailsProps {
  id?: string;
}

/**
 * Tarjeta principal con los detalles del evento:
 * fecha, hora, lugar, y botones de acción.
 */
const EventDetails: FC<EventDetailsProps> = ({ id }) => {
  const handleGoogleCalendar = () => {
    window.open(getGoogleCalendarUrl(icsEvent), "_blank");
  };

  const handleDownloadIcs = () => {
    downloadIcs(icsEvent);
  };

  const handleMaps = () => {
    window.open(
      `https://www.google.com/maps/search/${encodeURIComponent(WEDDING.venue)}`,
      "_blank"
    );
  };

  return (
    <section id={id} className="section-padding relative">
      <motion.div
        className="max-w-xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="card-glass p-6 sm:p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="font-script text-3xl sm:text-4xl text-gold-accent mb-2">
              La Fiesta
            </h2>
            <div className="divider-leaf" />
          </div>

          {/* Detalles */}
          <div className="space-y-6 mb-8">
            <DetailRow
              icon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              }
              label="Fecha y Hora"
              value={`${WEDDING.displayDate} · ${WEDDING.displayTime}`}
            />

            <DetailRow
              icon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              }
              label="Lugar"
              value={WEDDING.venue}
            />
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              className="btn-primary text-xs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoogleCalendar}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Agendar
            </motion.button>

            <motion.button
              className="btn-secondary text-xs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMaps}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              ¿Cómo llegar?
            </motion.button>
          </div>

          {/* Nota .ics */}
          <p className="mt-4 text-center">
            <motion.button
              className="font-sans text-[10px] uppercase tracking-[0.15em] text-charcoal/40 hover:text-green-moss transition-colors underline underline-offset-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadIcs}
            >
              Descargar .ics (Apple Calendar / Outlook)
            </motion.button>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default EventDetails;
