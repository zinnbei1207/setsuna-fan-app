# Google Calendar sync

## Purpose

The fan app (`app.js` / `liveEvents`) is the source of truth for live schedules.
Only events whose `status` is `published` are synced to the dedicated Google Calendar.
Events whose `status` is `unreleased` must never be sent to Google Calendar.
Private/non-fan events (for example the 2026-09-21 Mibu crowdfunding date benefit) must not be stored as fan-app live events and therefore must not be synced.

## Behavior

- GitHub Actions runs the sync when `app.js` or the sync code changes.
- It can also be started manually with `workflow_dispatch`.
- Each synced event is tagged internally with `source=setsuna-fan-app` and the stable fan-app event id.
- Re-running updates the matching Google Calendar event instead of creating duplicates.
- If a future event was previously published but is later hidden/removed from the fan app, the corresponding synced future event is removed from Google Calendar.
- Past synced events are kept as history.
- Synced events are transparent (they do not mark the user's availability as busy) and have no reminders.
- Current first version syncs the live date as an all-day calendar item. OPEN/START, performance, benefit-session, notes, and ticket URL are placed in the event description. Exact timed sync can be added later when structured start/end fields are available.

## Required GitHub repository secrets

1. `GOOGLE_CALENDAR_ID`
   - ID of the dedicated Google Calendar, e.g. `永遠のセツナ LIVE`.
2. `GOOGLE_SERVICE_ACCOUNT_JSON`
   - Full JSON credential for the Google Cloud service account that has write access to the dedicated calendar.

Never commit the service-account JSON into this repository.

## One-time Google setup

1. Create a secondary Google Calendar owned by the user's Google account (recommended name: `永遠のセツナ LIVE`).
2. Create a Google Cloud project and enable Google Calendar API.
3. Create a service account and a JSON key.
4. Share the dedicated Google Calendar with the service-account email and grant permission to make changes to events.
5. Put the calendar ID and service-account JSON into GitHub Actions repository secrets.
6. Run the workflow `Sync published live events to Google Calendar` once manually.
7. In TimeTree, display the dedicated Google Calendar as an external calendar.
8. On iPhone, leave that Google Calendar unchecked/hidden if the user does not want fan live schedules mixed into the normal iPhone calendar view.
