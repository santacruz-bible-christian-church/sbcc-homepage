import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { APP_TIMEZONE } from "@/constants";

/**
 * Hook to fetch and manage events data
 * @param {Object} options - Fetch options
 * @param {number} options.limit - Number of events to fetch
 * @param {string} options.timeFilter - Time filter ('all', 'upcoming', 'past')
 * @returns {Object} - Events data and computed values
 */
export function useEvents({ limit = 50, timeFilter = 'all' } = {}) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await api.getEvents({ limit, timeFilter });
                setEvents(data);
            } catch (err) {
                console.error("Failed to fetch events:", err);
                setError(err);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [limit, timeFilter]);

    // Timezone-aware past event check
    const isPastEvent = (dateString) => {
        try {
            const eventDate = new Date(dateString);
            const now = new Date();
            
            // Compare dates in the configured timezone
            const formatter = new Intl.DateTimeFormat('en-CA', {
                timeZone: APP_TIMEZONE,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            });
            
            const eventStr = formatter.format(eventDate);
            const nowStr = formatter.format(now);
            
            return eventStr < nowStr;
        } catch {
            return false;
        }
    };

    const upcomingEvents = events.filter(e => !isPastEvent(e.date));
    const pastEvents = events.filter(e => isPastEvent(e.date));
    const nextEvent = upcomingEvents[0] || null;

    const groupEventsByMonth = (eventsToGroup) => {
        const monthKeyFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: APP_TIMEZONE,
            year: 'numeric',
            month: '2-digit',
        });
        const monthYearFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: APP_TIMEZONE,
            month: 'long',
            year: 'numeric',
        });
        const monthShortFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: APP_TIMEZONE,
            month: 'short',
        });

        const groups = {};
        eventsToGroup.forEach(event => {
            const date = new Date(event.date);
            const parts = monthKeyFormatter.formatToParts(date);
            const year = parts.find(p => p.type === 'year')?.value;
            const month = parts.find(p => p.type === 'month')?.value;
            const key = `${year}-${month}`;
            if (!groups[key]) {
                groups[key] = {
                    key,
                    label: monthYearFormatter.format(date),
                    shortLabel: monthShortFormatter.format(date),
                    year: Number(year),
                    events: [],
                    isPast: isPastEvent(event.date)
                };
            }
            groups[key].events.push(event);
            if (!isPastEvent(event.date)) {
                groups[key].isPast = false;
            }
        });
        return Object.values(groups).sort((a, b) => b.key.localeCompare(a.key));
    };

    return {
        events,
        loading,
        error,
        upcomingEvents,
        pastEvents,
        nextEvent,
        groupEventsByMonth,
        isPastEvent,
    };
}
