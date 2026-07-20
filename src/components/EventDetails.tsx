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

/* ── Íconos SVG ──────────────────────────────── */
const CalendarIcon: FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const MapPinIcon: FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const SmallCalendarIcon: FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const SmallMapIcon: FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

/* ── Componente ───────────────────────────────── */
interface EventDetailsProps {
  id?: string;
}

const EventDetails: FC<EventDetailsProps> = ({ id }) => {
  return (
    <section id={id} className="section-padding relative">
      <motion.div
        className="max-w-lg mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="card-glass p-8 sm:p-10 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-charcoal-light/40 mb-2">
              Detalles del evento
            </p>
            <h2 className="font-script text-4xl sm:text-5xl text-gold-accent mb-4">
              La Fiesta
            </h2>
            <div className="gold-divider" />
          </div>

          {/* Info rows */}
          <div className="space-y-7 mb-10">
            {/* Fecha */}
            <div className="flex items-start gap-4">
              <span className="mt-0.5 text-gold-accent/70 shrink-0">
                <CalendarIcon />
              </span>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal-light/40 mb-1">
                  Fecha y Hora
                </p>
                <p className="font-sans text-sm sm:text-base text-charcoal font-medium">
                  {WEDDING.displayDate} · {WEDDING.displayTime}
                </p>
              </div>
            </div>

            {/* Lugar */}
            <div className="flex items-start gap-4">
              <span className="mt-0.5 text-gold-accent/70 shrink-0">
                <MapPinIcon />
              </span>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal-light/40 mb-1">
                  Lugar
                </p>
                <p className="font-sans text-sm sm:text-base text-charcoal font-medium">
                  {WEDDING.venue}
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="gold-divider mb-8" />

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => window.open(getGoogleCalendarUrl(icsEvent), "_blank")}
            >
              <SmallCalendarIcon />
              Agendar
            </motion.button>

            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/${encodeURIComponent(WEDDING.venue)}`,
                  "_blank"
                )
              }
            >
              <SmallMapIcon />
              Cómo llegar
            </motion.button>
          </div>

          {/* Link .ics */}
          <p className="mt-5 text-center">
            <motion.button
              className="font-sans text-[10px] uppercase tracking-[0.15em] text-charcoal-light/40 hover:text-green-moss transition-colors underline underline-offset-4 decoration-gold-accent/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={downloadIcs.bind(null, icsEvent)}
            >
              Descargar .ics para Apple Calendar / Outlook
            </motion.button>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default EventDetails;
