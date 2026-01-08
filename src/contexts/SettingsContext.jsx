import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/services/api';

// Default fallback values (current hardcoded content)
const DEFAULT_SETTINGS = {
    app_name: "SBCC",
    church_name: "Santa Cruz Bible Christian Church",
    tagline: "Growing in Faith, Serving the Community",
    logo: "/assets/sbcc-logo.png",
    banner: null,
    favicon: null,
    login_background: null,
    mission: "To know Christ and make Him known through worship, discipleship, and service.",
    vision: "To see our city transformed by the love and power of the Gospel, one life at a time.",
    history: "Founded in 1992, Santa Cruz Bible Christian Church has been a beacon of hope in our city for nearly three decades. We started as a small bible study group and have grown into a vibrant family of believers dedicated to living out the Gospel.",
    statement_of_faith: `We believe in the Holy Scriptures as the inspired and authoritative Word of God.
We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit.
We believe in the deity of our Lord Jesus Christ, His virgin birth, His sinless life, His miracles, His vicarious and atoning death, His bodily resurrection, and His ascension.
We believe in the spiritual unity of believers in our Lord Jesus Christ.`,
    service_schedule: "Sunday Worship: 9:00 AM - 11:00 AM",
    address: "440 Frederick St, Santa Cruz, CA 95062",
    phone: "(+63) 917-222-2222",
    email: "1992.sbcc@gmail.com",
    facebook_url: null,
    youtube_url: null,
    instagram_url: null,
};

const SettingsContext = createContext({
    settings: DEFAULT_SETTINGS,
    loading: true,
    error: null,
});

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await api.getSettings();
                // Merge with defaults to ensure all fields exist
                setSettings(prev => ({
                    ...prev,
                    ...data,
                    // Keep defaults for null/empty values
                    logo: data.logo || prev.logo,
                    church_name: data.church_name || prev.church_name,
                    tagline: data.tagline || prev.tagline,
                    mission: data.mission || prev.mission,
                    vision: data.vision || prev.vision,
                    history: data.history || prev.history,
                    statement_of_faith: data.statement_of_faith || prev.statement_of_faith,
                    service_schedule: data.service_schedule || prev.service_schedule,
                    address: data.address || prev.address,
                    phone: data.phone || prev.phone,
                    email: data.email || prev.email,
                }));
            } catch (err) {
                console.error('Failed to fetch settings:', err);
                setError(err);
                // Keep using defaults on error
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, loading, error }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}

export { DEFAULT_SETTINGS };
