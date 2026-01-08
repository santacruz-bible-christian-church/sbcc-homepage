// API Service for SBCC Homepage
// Connects to SBCCMS Backend Public API

// VITE_API_URL already includes /api (e.g., https://example.com/api)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Fetch announcements from the SBCCMS backend
 * @param {Object} options - Query options
 * @param {number} [options.limit] - Maximum number of announcements to fetch (max 50)
 * @returns {Promise<Array>} List of announcements
 */
async function getAnnouncements({ limit } = {}) {
    try {
        const params = new URLSearchParams();
        if (limit) params.append('limit', limit.toString());

        const queryString = params.toString();
        const url = `${API_URL}/public/announcements/${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Failed to fetch announcements:', error);
        return [];
    }
}

/**
 * Submit a prayer request to the SBCCMS backend
 * @param {Object} data - Prayer request data
 * @param {string} data.title - Prayer request title (required)
 * @param {string} data.description - Prayer request content (required)
 * @param {string} [data.category] - Prayer category (optional, default: "other")
 * @param {boolean} data.isAnonymous - Whether to submit anonymously
 * @param {string} [data.requesterName] - Requester's name (required if not anonymous)
 * @param {string} [data.requesterEmail] - Requester's email (optional)
 * @returns {Promise<Object>} Response with success status
 */
async function submitPrayerRequest(data) {
    // Build payload according to backend requirements
    const payload = {
        title: data.title,
        description: data.description,
        is_anonymous: data.isAnonymous,
    };

    // Add category if provided (backend defaults to "other")
    if (data.category) {
        payload.category = data.category.toLowerCase();
    }

    // If not anonymous, requester_name is required
    if (!data.isAnonymous && data.requesterName) {
        payload.requester_name = data.requesterName;
    }

    // Add optional email
    if (data.requesterEmail) {
        payload.requester_email = data.requesterEmail;
    }

    try {
        const response = await fetch(`${API_URL}/public/prayer-requests/submit/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (error) {
        console.error('Failed to submit prayer request:', error);
        throw error;
    }
}

/**
 * Fetch public events from the SBCCMS backend
 * @param {Object} options - Query options
 * @param {number} [options.limit] - Maximum number of events to fetch
 * @param {string} [options.eventType] - Filter by event type (e.g., 'service')
 * @param {string} [options.timeFilter] - Filter: 'upcoming', 'past', or 'all' (default: 'upcoming')
 * @returns {Promise<Array>} List of events
 */
async function getEvents({ limit, eventType, timeFilter = 'upcoming' } = {}) {
    try {
        const params = new URLSearchParams();
        params.append('time_filter', timeFilter);
        if (limit) params.append('limit', limit.toString());
        if (eventType) params.append('event_type', eventType);

        const queryString = params.toString();
        const url = `${API_URL}/public/events/?${queryString}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const results = data.results || [];
        
        // Backend sorts by -date (descending). For upcoming events, reverse to show soonest first
        if (timeFilter === 'upcoming') {
            return results.reverse();
        }
        
        return results;
    } catch (error) {
        console.error('Failed to fetch events:', error);
        return [];
    }
}
/**
 * Fetch public settings from the SBCCMS backend
 * @returns {Promise<Object>} System settings
 */
async function getSettings() {
    try {
        const url = `${API_URL}/public/settings/`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch settings:', error);
        throw error;
    }
}

export const api = {
    getAnnouncements,
    submitPrayerRequest,
    getEvents,
    getSettings,
};
