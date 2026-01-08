import { useState, useEffect } from "react";
import { api } from "@/services/api";

/**
 * Hook to fetch and manage announcements data
 * @param {Object} options - Fetch options
 * @param {number} options.limit - Number of announcements to fetch
 * @returns {Object} - { announcements, loading, error, featuredAnnouncement, restAnnouncements }
 */
export function useAnnouncements({ limit = 20 } = {}) {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const data = await api.getAnnouncements({ limit });
                setAnnouncements(data);
            } catch (err) {
                console.error("Failed to fetch announcements:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, [limit]);

    const featuredAnnouncement = announcements[0] || null;
    const restAnnouncements = announcements.slice(1);

    return {
        announcements,
        loading,
        error,
        featuredAnnouncement,
        restAnnouncements,
    };
}
