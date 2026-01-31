// API configuration
const RAW_API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const NORMALIZED_API_URL = RAW_API_URL.trim().replace(/\/+$/, "");

const stripPublicSuffix = (url) => {
    if (url.endsWith("/api/public")) return url.replace(/\/public$/, "");
    if (url.endsWith("/public")) return url.replace(/\/public$/, "");
    return url;
};

const BASE_WITHOUT_PUBLIC = stripPublicSuffix(NORMALIZED_API_URL);
const API_BASE_URL = BASE_WITHOUT_PUBLIC.endsWith("/api")
    ? BASE_WITHOUT_PUBLIC
    : `${BASE_WITHOUT_PUBLIC}/api`;

export const API_CONFIG = {
    BASE_URL: API_BASE_URL,
};

export const APP_TIMEZONE = import.meta.env.VITE_APP_TIMEZONE || "Asia/Manila";

// External links
export const EXTERNAL_LINKS = {
    MANAGEMENT_SYSTEM: "https://dash.pbcm-sbcc.online/login",
};

// Hero configuration
export const HERO_CONFIG = {
    SCROLL_TRIGGER: 0.6, // 60vh for navbar visibility
};
