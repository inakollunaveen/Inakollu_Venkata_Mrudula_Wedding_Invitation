/**
 * Calendar Generator for Telugu Wedding Events
 * Produces RFC 5545 compliant iCalendar (.ics) files with Asia/Kolkata VTIMEZONE
 * and Google Calendar direct event creation links.
 */

import { WeddingEvent } from '../data/weddingData';

// Format Date into iCalendar Local Time format: YYYYMMDDTHHMMSS
function formatIcsDateTime(isoString: string): string {
  // ISO format: 2026-10-28T08:00:00+05:30
  const match = isoString.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
  if (!match) return '20261028T080000';
  const [, y, m, d, hh, mm, ss] = match;
  return `${y}${m}${d}T${hh}${mm}${ss}`;
}

// RFC 5545 Line folding (max 75 octets per line)
function foldLine(line: string): string {
  const maxBytes = 70;
  if (line.length <= maxBytes) return line;

  const chunks: string[] = [];
  let remaining = line;
  let isFirst = true;

  while (remaining.length > 0) {
    const limit = isFirst ? maxBytes : maxBytes - 1;
    const chunk = remaining.slice(0, limit);
    remaining = remaining.slice(limit);
    chunks.push(isFirst ? chunk : ` ${chunk}`);
    isFirst = false;
  }

  return chunks.join('\r\n');
}

// Standard VTIMEZONE component for Asia/Kolkata (IST = UTC+05:30, no daylight savings)
const ASIA_KOLKATA_VTIMEZONE = [
  'BEGIN:VTIMEZONE',
  'TZID:Asia/Kolkata',
  'X-LIC-LOCATION:Asia/Kolkata',
  'BEGIN:STANDARD',
  'TZOFFSETFROM:+0530',
  'TZOFFSETTO:+0530',
  'TZNAME:IST',
  'DTSTART:19700101T000000',
  'END:STANDARD',
  'END:VTIMEZONE',
].join('\r\n');

/**
 * Builds Google Calendar render URL
 */
export function buildGoogleCalendarUrl(event: WeddingEvent): string {
  const startDt = formatIcsDateTime(event.startDateIso);
  const endDt = formatIcsDateTime(event.endDateIso);

  const title = `వెంకట మృదుల & మల్లికార్జున వివాహం - ${event.title}`;
  
  let details = `${event.teluguTitle}\nసమయం: ${event.time}\nతేదీ: ${event.teluguDate}\nస్థలం: ${event.location}`;
  if (event.id === 'gandhapu-nalugu') {
    details += '\n(ముద్రిత సమయం: ఉదయం 8:00; సుమారు 1 గంట సమయం కేటాయించబడింది)';
  } else if (event.id === 'vindu') {
    details += '\n(ముద్రిత సమయం: మధ్యాహ్నం 12:00; సుమారు 2 గంటల సమయం కేటాయించబడింది)';
  } else if (event.note) {
    details += `\n(${event.note})`;
  }

  if (event.mapsUrl) {
    details += `\nGoogle Maps లొకేషన్: ${event.mapsUrl}`;
  }

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${startDt}/${endDt}`,
    details: details,
    location: event.location,
    ctz: 'Asia/Kolkata',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generates an .ics file string for one or multiple events
 */
export function generateIcsContent(events: WeddingEvent[], calendarName: string = 'కళ్యాణ మహోత్సవం'): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Venkata Mrudula and Mallikarjuna Wedding//TE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${calendarName}`,
    'X-WR-TIMEZONE:Asia/Kolkata',
    ASIA_KOLKATA_VTIMEZONE,
  ];

  events.forEach((event, idx) => {
    const dtStart = formatIcsDateTime(event.startDateIso);
    const dtEnd = formatIcsDateTime(event.endDateIso);
    const uid = `wedding-event-${event.id}-20261028-${idx}@mrudula-mallikarjuna.wedding`;
    
    let description = `${event.teluguTitle}\\nసమయం: ${event.time}\\nతేదీ: ${event.teluguDate}\\nస్థలం: ${event.location}`;
    if (event.id === 'gandhapu-nalugu') {
      description += '\\n(ముద్రిత సమయం: ఉదయం 8:00; సుమారు 1 గంట సమయం)';
    } else if (event.id === 'vindu') {
      description += '\\n(ముద్రిత సమయం: మధ్యాహ్నం 12:00; సుమారు 2 గంటల సమయం)';
    } else if (event.note) {
      description += `\\n(${event.note})`;
    }
    if (event.mapsUrl) {
      description += `\\nGoogle Maps: ${event.mapsUrl}`;
    }

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${uid}`);
    lines.push(`DTSTAMP:20261018T000000Z`);
    lines.push(`DTSTART;TZID=Asia/Kolkata:${dtStart}`);
    lines.push(`DTEND;TZID=Asia/Kolkata:${dtEnd}`);
    lines.push(`SUMMARY:వెంకట మృదుల & మల్లికార్జున - ${event.title}`);
    lines.push(`DESCRIPTION:${description}`);
    lines.push(`LOCATION:${event.location}`);
    lines.push('STATUS:CONFIRMED');
    lines.push('TRANSP:OPAQUE');
    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');

  return lines.map(foldLine).join('\r\n');
}

/**
 * Initiates browser download of an .ics file with UTF-8 BOM
 */
export function downloadIcsFile(events: WeddingEvent[], filename: string) {
  const icsData = generateIcsContent(events, 'వెంకట మృదుల & మల్లికార్జున వివాహం');
  // Include UTF-8 BOM to ensure Telugu characters render properly in Outlook & Apple Calendar
  const blob = new Blob(['\uFEFF' + icsData], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
