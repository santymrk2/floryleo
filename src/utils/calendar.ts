/**
 * Genera un archivo .ics (iCalendar) y lo descarga.
 * Compatible con Apple Calendar, Google Calendar (import), Outlook, etc.
 */

interface IcsEvent {
  title: string;
  description: string;
  location: string;
  startDate: string; // ISO string
  durationHours: number;
}

/**
 * Convierte un ISO string a formato iCal UTC (YYYYMMDDTHHMMSSZ).
 * Recibe un ISO ya en UTC (de toISOString()) para máxima compatibilidad.
 */
function toUtcIcs(isoString: string): string {
  return isoString
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "")
    .replace(/([+-]\d{4}|Z)$/, "Z");
}

function buildIcsContent(event: IcsEvent): string {
  const startIso = new Date(event.startDate).toISOString();
  const endDate = new Date(
    new Date(event.startDate).getTime() + event.durationHours * 60 * 60 * 1000
  );
  const start = toUtcIcs(startIso);
  const end = toUtcIcs(endDate.toISOString());
  const dtstamp = toUtcIcs(new Date().toISOString());
  const uid = "casamiento-floryleo-20261024@floryleo.com";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//FloryLeo//Wedding//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Casamiento de Flor y Leo",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${event.location}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:Recordatorio: ${event.title}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(event: IcsEvent): void {
  const content = buildIcsContent(event);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "casamiento-floryleo.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // Safari cancela la descarga si se revoca la URL inmediatamente
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
}

/**
 * URL para agregar el evento a Google Calendar
 */
export function getGoogleCalendarUrl(event: IcsEvent): string {
  const start = toUtcIcs(new Date(event.startDate).toISOString());
  const endDate = new Date(
    new Date(event.startDate).getTime() + event.durationHours * 60 * 60 * 1000
  );
  const end = toUtcIcs(endDate.toISOString());

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
    details: event.description,
    location: event.location,
    /**
     * Fechas en UTC (Z) para máxima compatibilidad. Si se quisiera fijar la
     * zona horaria del evento: &ctz=America/Argentina/Buenos_Aires
     */
  });

  return `https://www.google.com/calendar/render?${params.toString()}`;
}
