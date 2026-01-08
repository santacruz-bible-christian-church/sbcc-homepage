import { useState, useEffect } from "react";
import { api } from "@/services/api";

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
                const data = await api.getEvents({ limit, timeFilter });
                setEvents(data);
            } catch (err) {
                console.error("Failed to fetch events:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [limit, timeFilter]);

    const isPastEvent = (dateString) => {
        try {
            const eventDate = new Date(dateString);
            return eventDate < new Date();
        } catch {
            return false;
        }
    };

    const upcomingEvents = events.filter(e => !isPastEvent(e.date));
    const pastEvents = events.filter(e => isPastEvent(e.date));
    const nextEvent = upcomingEvents[0] || null;

    const groupEventsByMonth = (eventsToGroup) => {
        const groups = {};
        eventsToGroup.forEach(event => {
            const date = new Date(event.date);
            const key = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}`;
            if (!groups[key]) {
                groups[key] = {
                    key,
                    label: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                    shortLabel: date.toLocaleDateString('en-US', { month: 'short' }),
                    year: date.getFullYear(),
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
