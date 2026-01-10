import { useState, useEffect } from 'react';
import { api } from '@/services/api';

// Default fallback team member
const DEFAULT_TEAM = [
    {
        id: 1,
        name: "Dennis Badillo",
        role: "senior_pastor",
        role_display: "Senior Pastor",
        title: null,
        bio: "Serving our congregation with dedication and love since 2010.",
        photo: null,
    }
];

/**
 * Hook for fetching team members
 * @returns {{ team: Array, loading: boolean, error: Error|null }}
 */
export function useTeam() {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                setLoading(true);
                const data = await api.getTeam();
                // Use default if API returns empty
                setTeam(data.length > 0 ? data : DEFAULT_TEAM);
            } catch (err) {
                console.error('Failed to fetch team:', err);
                setError(err);
                // Use default on error
                setTeam(DEFAULT_TEAM);
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, []);

    return { team, loading, error };
}
