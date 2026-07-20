export const WEDDING = {
  bride: "Florencia",
  groom: "Leonardo",
  date: "2026-10-24T15:15:00-03:00",
  displayDate: "24 Octubre, 2026",
  displayTime: "15:15 hs",
  venue: "Fiori Paseo, Escobar",
  dressCode: "Elegante",
  welcomeMessage:
    "Estamos muy felices de compartir este día tan especial con ustedes. Queremos que nos acompañes en uno de los momentos más importantes de nuestras vidas.",

  /** Número de WhatsApp para RSVP y sugerencias musicales */
  whatsapp: "5491156333009",

  /** Mensajes predefinidos */
  rsvpMessage: "¡Hola! Quiero confirmar mi asistencia al casamiento de Florencia y Leonardo 🎉",
  musicMessage: "¡Quiero que suene esta canción! 🎶",

  /** Google Calendar event */
  calendarTitle: "Casamiento de Florencia y Leonardo",
  calendarDescription:
    "Te esperamos para celebrar juntos este día tan especial. Nos vemos en Fiori Paseo, Escobar.",
  calendarLocation: "Fiori Paseo, Escobar",

  /** Duración estimada del evento (en horas) */
  eventDurationHours: 4,
} as const;

export type WeddingData = typeof WEDDING;
