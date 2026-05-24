/**
 * useServiceSchedule
 *
 * Parses the `settings.service_schedule` string into structured data.
 * Used by Hero.jsx (ticket stub) and Schedule.jsx (pinned note card)
 * to avoid duplicated parsing logic.
 *
 * @param {string} scheduleString - Raw schedule string from settings
 * @returns {{ day: string, fullDay: string, time: string, lines: string[] }}
 */
export function useServiceSchedule(scheduleString) {
    const raw = scheduleString || "Sunday Worship: 9:00 AM - 11:00 AM";

    // --- Structured parse for Hero ticket stub ---
    const dayMatch = raw.match(/(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/i);
    const fullDay = dayMatch ? dayMatch[0] : "Sunday";
    const day = fullDay.substring(0, 3).toUpperCase(); // e.g. "SUN"

    let time = "9:00 AM - 11:00 AM";
    const colonIndex = raw.indexOf(":");
    if (colonIndex !== -1) {
        const timeMatch = raw.match(/\d+[\s\S]*/);
        if (timeMatch) {
            time = timeMatch[0].trim();
        } else {
            time = raw.substring(colonIndex + 1).trim();
        }
    }

    // --- Split-line parse for Schedule note card ---
    // Supports schedules separated by newlines or commas
    const lines = raw
        .split(/[\n,]/)
        .map((s) => s.trim())
        .filter(Boolean);

    return { day, fullDay, time, lines };
}
