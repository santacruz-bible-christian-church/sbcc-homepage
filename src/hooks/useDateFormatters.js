/**
 * Date formatting utilities for consistent display across the app
 */
import { APP_TIMEZONE } from "@/constants";

const DEFAULT_TIMEZONE = APP_TIMEZONE;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

const getDateParts = (date, timeZone) => {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    const parts = formatter.formatToParts(date);
    const year = parts.find(p => p.type === 'year')?.value;
    const month = parts.find(p => p.type === 'month')?.value;
    const day = parts.find(p => p.type === 'day')?.value;
    return {
        year: Number(year),
        month: Number(month),
        day: Number(day),
    };
};

const getUtcDay = (date, timeZone) => {
    const parts = getDateParts(date, timeZone);
    if (!parts.year || !parts.month || !parts.day) return null;
    return Date.UTC(parts.year, parts.month - 1, parts.day);
};

/**
 * Format date for date box display (month + day)
 */
export function formatDateBox(dateString, timeZone = DEFAULT_TIMEZONE) {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return { month: '---', day: '--' };
        }
        return {
            month: date.toLocaleDateString('en-US', { month: 'short', timeZone }).toUpperCase(),
            day: date.toLocaleDateString('en-US', { day: 'numeric', timeZone })
        };
    } catch {
        return { month: '---', day: '--' };
    }
}

/**
 * Format date for date box with additional details (for events)
 */
export function formatDateBoxExtended(dateString, timeZone = DEFAULT_TIMEZONE) {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return { month: '---', day: '--', weekday: '---', monthYear: '', full: '' };
        }
        return {
            month: date.toLocaleDateString('en-US', { month: 'short', timeZone }).toUpperCase(),
            day: date.toLocaleDateString('en-US', { day: 'numeric', timeZone }),
            weekday: date.toLocaleDateString('en-US', { weekday: 'short', timeZone }).toUpperCase(),
            monthYear: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone }),
            full: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone })
        };
    } catch {
        return { month: '---', day: '--', weekday: '---', monthYear: '', full: '' };
    }
}

/**
 * Format full date for display
 */
export function formatFullDate(dateString, timeZone = DEFAULT_TIMEZONE) {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone,
        });
    } catch {
        return dateString;
    }
}

/**
 * Format time for display
 */
export function formatTime(dateString, timeZone = DEFAULT_TIMEZONE) {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return null;
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true,
            timeZone,
        });
    } catch {
        return null;
    }
}

/**
 * Format relative time (e.g., "Today", "Yesterday", "3 days ago")
 */
export function formatRelativeTime(dateString, timeZone = DEFAULT_TIMEZONE) {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return null;
        
        const now = new Date();
        const nowUtcDay = getUtcDay(now, timeZone);
        const dateUtcDay = getUtcDay(date, timeZone);
        if (!nowUtcDay || !dateUtcDay) return null;
        const diffDays = Math.floor((nowUtcDay - dateUtcDay) / MS_PER_DAY);
        if (diffDays < 0) {
            const futureDays = Math.abs(diffDays);
            if (futureDays === 1) return 'Tomorrow';
            if (futureDays < 7) return `In ${futureDays} days`;
            if (futureDays < 30) {
                const weeks = Math.floor(futureDays / 7);
                return `In ${weeks} week${weeks > 1 ? 's' : ''}`;
            }
            return null;
        }
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
        return null;
    } catch {
        return null;
    }
}
