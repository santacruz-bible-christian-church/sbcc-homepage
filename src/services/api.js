// API Service for SBCC Homepage
// Connects to SBCCMS Backend Public API

// VITE_API_URL already includes /api (e.g., https://example.com/api)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Fetch announcements from the SBCCMS backend
 * @param {Object} options - Query options
 * @param {number} [options.limit] - Maximum number of announcements to fetch (max 50)
 * @returns {Promise<Array>} List of announcements
 * 
 * Response structure from backend:
 * {
 *   count: number,
 *   results: Array<{
 *     id: number,
 *     title: string,
 *     body: string,
 *     audience: "all" | "ministry",
 *     ministry_name: string | null,
 *     publish_at: string (ISO date),
 *     expire_at: string | null,
 *     created_at: string
 *   }>
 * }
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
        // Backend returns { count, results } format
        return data.results || [];
    } catch (error) {
        console.error('Failed to fetch announcements:', error);
        return [];
    }
}

/**
 * Submit a prayer request to the SBCCMS backend
 * @param {Object} data - Prayer request data
 * @param {string} [data.name] - Requester's name (optional)
 * @param {string} [data.email] - Requester's email (optional)
 * @param {string} data.category - Prayer category
 * @param {string} data.request - Prayer request content
 * @param {boolean} data.isAnonymous - Whether to submit anonymously
 * @returns {Promise<Object>} Response with success status
 */
async function submitPrayerRequest(data) {
    try {
        const response = await fetch(`${API_URL}/public/prayer-request/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.isAnonymous ? null : data.name,
                email: data.isAnonymous ? null : data.email,
                category: data.category,
                request: data.request,
                is_anonymous: data.isAnonymous,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return { success: true, message: 'Prayer request received successfully.' };
    } catch (error) {
        console.error('Failed to submit prayer request:', error);
        throw error;
    }
}

export const api = {
    getAnnouncements,
    submitPrayerRequest,
};
