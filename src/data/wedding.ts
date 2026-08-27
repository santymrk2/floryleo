export const WEDDING = {
  bride: "Flor",
  groom: "Leo",
  date: "2026-10-24T15:15:00-03:00",
  displayDate: "24 Octubre, 2026",
  displayTime: "15:15 hs",
  venue: "Fiori Paseo, Escobar",
  dressCode: "Elegante",

  /** Detalles del dress code que se muestran al expandir la tarjeta */
  dressCodeDetails: {
    women: [
      "Evitá el blanco y el marfil: están reservados para la novia.",
      "Largo cóctel o midi, el que te haga sentir más cómoda.",
    ],
    men: [
      "Traje o saco oscuro; la corbata es opcional.",
    ],
    palette:
      "Verdes, dorados y tonos tierra, en sintonía con nuestra paleta.",
    note: "El evento es al aire libre en Fiori Paseo: calzado cómodo y algo de abrigo para la noche.",
  } as const,

  /**
   * Datos bancarios para la tarjeta de regalo.
   * Fuente real: MERCADO_PAGO en src/data/gifts.ts (leorossi.icbc).
   */
  bankAccount: {
    cbu: "0150866401000119159678",
    alias: "leorossi.icbc",
    holder: "Leo Rossi · CUIT 20423626748",
  } as const,
  welcomeMessage:
    "Estamos muy felices de compartir este día tan especial con ustedes. Queremos que nos acompañes en uno de los momentos más importantes de nuestras vidas.",

  /** Número de WhatsApp para RSVP y sugerencias musicales */
  whatsapp: "5491156333009",

  /** Mensajes predefinidos */
  rsvpMessage: "¡Hola! Quiero confirmar mi asistencia al casamiento de Flor y Leo 🎉",
  musicMessage: "¡Quiero que suene esta canción! 🎶",

  /** Google Calendar event */
  calendarTitle: "Casamiento de Flor y Leo",
  calendarDescription:
    "Te esperamos para celebrar juntos este día tan especial. Nos vemos en Fiori Paseo, Escobar.",
  calendarLocation: "Fiori Paseo, Escobar",

  /** Duración estimada del evento (en horas) */
  eventDurationHours: 4,
} as const;

export type WeddingData = typeof WEDDING;
