import { useEffect } from "react";

/**
 * Hook to scroll to top of page on mount
 */
export function useScrollToTop() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
}
