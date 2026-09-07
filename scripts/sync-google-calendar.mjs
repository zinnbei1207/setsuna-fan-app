import fs from 'node:fs/promises';
import vm from 'node:vm';
import { google } from 'googleapis';

const calendarId = process.env.GOOGLE_CALENDAR_ID;
const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

if (!calendarId) throw new Error('GOOGLE_CALENDAR_ID is not set');
if (!serviceAccountJson) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not set');

const source = await fs.readFile('app.js', 'utf8');
const match = source.match(/const\s+liveEvents\s*=\s*(\[[\s\S]*?\])\.sort\s*\(/);
if (!match) throw new Error('Could not find liveEvents in app.js');

const liveEvents = vm.runInNewContext(`(${match[1]})`, Object.create(null), { timeout: 1000 });
const published = liveEvents.filter((event) => event?.status === 'published');

const credentials = JSON.parse(serviceAccountJson);
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/calendar.events']
});
const calendar = google.calendar({ version: 'v3', auth });

function nextDate(date) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

function descriptionFor(event) {
  return [
    event.openStart,
    event.performance,
    event.note,
    event.ticket ? `チケット: ${event.ticket}` : '',
    '',
    '永遠のセツナ 非公式ファンアプリから自動同期'
  ].filter(Boolean).join('\n');
}

function resourceFor(event) {
  return {
    summary: event.title,
    location: event.place || undefined,
    description: descriptionFor(event),
    start: { date: event.date },
    end: { date: nextDate(event.date) },
    transparency: 'transparent',
    reminders: { useDefault: false },
    extendedProperties: {
      private: {
        source: 'setsuna-fan-app',
        appEventId: event.id
      }
    }
  };
}

async function listManagedEvents() {
  const result = [];
  let pageToken;
  do {
    const res = await calendar.events.list({
      calendarId,
      privateExtendedProperty: ['source=setsuna-fan-app'],
      singleEvents: true,
      maxResults: 2500,
      pageToken
    });
    result.push(...(res.data.items || []));
    pageToken = res.data.nextPageToken || undefined;
  } while (pageToken);
  return result;
}

const existing = await listManagedEvents();
const existingByAppId = new Map();
for (const item of existing) {
  const appEventId = item.extendedProperties?.private?.appEventId;
  if (appEventId) existingByAppId.set(appEventId, item);
}

for (const event of published) {
  const resource = resourceFor(event);
  const current = existingByAppId.get(event.id);
  if (current?.id) {
    await calendar.events.update({ calendarId, eventId: current.id, requestBody: resource });
    console.log(`updated: ${event.id}`);
  } else {
    await calendar.events.insert({ calendarId, requestBody: resource });
    console.log(`created: ${event.id}`);
  }
}

// If a future event was once published and is later removed/hidden in the app,
// remove it from the synced calendar as well. Past calendar history is preserved.
const publishedIds = new Set(published.map((event) => event.id));
const today = new Date().toISOString().slice(0, 10);
for (const item of existing) {
  const appEventId = item.extendedProperties?.private?.appEventId;
  const startDate = item.start?.date || item.start?.dateTime?.slice(0, 10);
  if (appEventId && startDate && startDate >= today && !publishedIds.has(appEventId) && item.id) {
    await calendar.events.delete({ calendarId, eventId: item.id });
    console.log(`deleted hidden/removed future event: ${appEventId}`);
  }
}

console.log(`sync complete: ${published.length} published event(s)`);
