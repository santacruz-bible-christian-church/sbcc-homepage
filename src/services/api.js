// API Service for SBCC Homepage
// Connects to SBCCMS Backend Public API

import { API_CONFIG } from "@/constants";

// VITE_API_URL can be a domain or include /api; API_CONFIG normalizes it.
const API_URL = API_CONFIG.BASE_URL;

class ApiError extends Error {
    constructor(message, status, data) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

async function parseResponse(response) {
    let data = null;
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
        try {
            data = await response.json();
        } catch {
            data = null;
        }
    } else {
        try {
            const text = await response.text();
            if (text) {
                try {
                    data = JSON.parse(text);
                } catch {
                    data = { message: text };
                }
            } else {
                data = null;
            }
        } catch {
            data = null;
        }
    }

    if (!response.ok) {
        const message =
            data?.message ||
            data?.detail ||
            `Request failed with status ${response.status}`;
        throw new ApiError(message, response.status, data);
    }

    return data;
}

async function requestJson(url, options) {
    const response = await fetch(url, options);
    return parseResponse(response);
}

/**
 * Fetch announcements from the SBCCMS backend
 * @param {Object} options - Query options
 * @param {number} [options.limit] - Maximum number of announcements to fetch (max 50)
 * @param {number} [options.ministry] - Ministry filter (optional)
 * @returns {Promise<Array>} List of announcements
 */
async function getAnnouncements({ limit, ministry } = {}) {
    try {
        const params = new URLSearchParams();
        if (limit) params.append('limit', limit.toString());
        if (ministry) params.append('ministry', ministry.toString());

        const queryString = params.toString();
        const url = `${API_URL}/public/announcements/${queryString ? `?${queryString}` : ''}`;

        const data = await requestJson(url);
        return data.results || [];
    } catch (error) {
        console.error('Failed to fetch announcements:', error);
        throw error;
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
 * @param {string} [data.requesterPhone] - Requester's phone (optional)
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
    if (data.requesterPhone) {
        payload.requester_phone = data.requesterPhone;
    }

    try {
        const result = await requestJson(`${API_URL}/public/prayer-requests/submit/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
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
 * @param {string} [options.timeFilter] - Filter: 'upcoming', 'past', or 'all' (default: 'all')
 * @param {number} [options.ministry] - Ministry filter (optional)
 * @returns {Promise<Array>} List of events
 */
async function getEvents({ limit, eventType, timeFilter = 'all', ministry } = {}) {
    try {
        const params = new URLSearchParams();
        params.append('time_filter', timeFilter);
        if (limit) params.append('limit', limit.toString());
        if (eventType) params.append('event_type', eventType);
        if (ministry) params.append('ministry', ministry.toString());

        const queryString = params.toString();
        const url = `${API_URL}/public/events/?${queryString}`;

        const data = await requestJson(url);
        const results = data.results || [];
        
        // Backend sorts by -date (descending). For upcoming events, reverse to show soonest first
        if (timeFilter === 'upcoming') {
            return results.reverse();
        }
        
        return results;
    } catch (error) {
        console.error('Failed to fetch events:', error);
        throw error;
    }
}
/**
 * Fetch public settings from the SBCCMS backend
 * @returns {Promise<Object>} System settings
 */
async function getSettings() {
    try {
        const url = `${API_URL}/public/settings/`;
        return await requestJson(url);
    } catch (error) {
        console.error('Failed to fetch settings:', error);
        throw error;
    }
}

/**
 * Fetch team members from the SBCCMS backend
 * @returns {Promise<Array>} List of team members
 */
async function getTeam() {
    try {
        const url = `${API_URL}/public/team/`;
        const data = await requestJson(url);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Failed to fetch team:', error);
        throw error;
    }
}

export const api = {
    getAnnouncements,
    submitPrayerRequest,
    getEvents,
    getSettings,
    getTeam,
};
