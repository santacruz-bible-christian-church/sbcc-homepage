import { useState, useEffect } from 'react';
import { api } from '@/services/api';

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
                setTeam(data);
            } catch (err) {
                console.error('Failed to fetch team:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, []);

    return { team, loading, error };
}
