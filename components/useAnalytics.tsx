import ReactGA from "react-ga";
import user from "../types/user";

interface Event {
    action: string;
    category: string;
    label?: string;
    userId?: number;
}

export const useAnalytics = () => {
    return {
        init: (trackingId: string) => {
            // @ts-ignore
            ReactGA.initialize(trackingId);

        },
        trackPageViewed: (path?: string) => {
            if (path) {
                return ReactGA.pageview(path);
            }
            return ReactGA.pageview(
                window.location.pathname + window.location.search
            );
        },
        trackEvent: (params: Event) => {
            ReactGA.event(params);
        }
    };
};
