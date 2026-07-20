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

function formatIcsDate(isoString: string): string {
  return isoString
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "")
    .replace(/[+-]\d{2}:\d{2}/, "Z");
}

function buildIcsContent(event: IcsEvent): string {
  const start = formatIcsDate(event.startDate);
  const endDate = new Date(
    new Date(event.startDate).getTime() + event.durationHours * 60 * 60 * 1000
  );
  const end = formatIcsDate(endDate.toISOString());

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//FloryLeo//Wedding//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
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
  URL.revokeObjectURL(url);
}

/**
 * URL para agregar el evento a Google Calendar
 */
export function getGoogleCalendarUrl(event: IcsEvent): string {
  const start = formatIcsDate(event.startDate);
  const endDate = new Date(
    new Date(event.startDate).getTime() + event.durationHours * 60 * 60 * 1000
  );
  const end = formatIcsDate(endDate.toISOString());

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
    details: event.description,
    location: event.location,
    /**
     * También se puede añadir &ctz=America/Argentina/Buenos_Aires
     * pero lo dejamos en UTC para máxima compatibilidad:
     */
  });

  return `https://www.google.com/calendar/render?${params.toString()}`;
}
