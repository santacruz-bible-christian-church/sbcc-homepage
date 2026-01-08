/**
 * Date formatting utilities for consistent display across the app
 */

/**
 * Format date for date box display (month + day)
 */
export function formatDateBox(dateString) {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return { month: '---', day: '--' };
        }
        return {
            month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
            day: date.getDate().toString()
        };
    } catch {
        return { month: '---', day: '--' };
    }
}

/**
 * Format date for date box with additional details (for events)
 */
export function formatDateBoxExtended(dateString) {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return { month: '---', day: '--', weekday: '---', monthYear: '', full: '' };
        }
        return {
            month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
            day: date.getDate().toString(),
            weekday: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
            monthYear: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            full: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
        };
    } catch {
        return { month: '---', day: '--', weekday: '---', monthYear: '', full: '' };
    }
}

/**
 * Format full date for display
 */
export function formatFullDate(dateString) {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    } catch {
        return dateString;
    }
}

/**
 * Format time for display
 */
export function formatTime(dateString) {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return null;
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    } catch {
        return null;
    }
}

/**
 * Format relative time (e.g., "Today", "Yesterday", "3 days ago")
 */
export function formatRelativeTime(dateString) {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return null;
        
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
        return null;
    } catch {
        return null;
    }
}
