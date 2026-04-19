"use client";

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

export type AnalyticsEventName =
    | "cta_start_project_clicked"
    | "cta_view_work_clicked"
    | "header_start_project_clicked"
    | "nav_link_clicked"
    | "projects_filter_changed"
    | "project_card_cta_clicked"
    | "contact_form_submit_started"
    | "contact_form_submit_success"
    | "contact_form_submit_failed"
    | "contact_quick_link_clicked"
    | "footer_link_clicked";

export function trackEvent(
    name: AnalyticsEventName,
    payload: Record<string, unknown> = {}
) {
    if (typeof window === "undefined") return;

    const detail = {
        name,
        payload,
        timestamp: Date.now(),
    };

    window.dispatchEvent(new CustomEvent("portfolio:analytics", { detail }));

    if (typeof window.gtag === "function") {
        window.gtag("event", name, payload);
    }

    if (process.env.NODE_ENV !== "production") {
        console.info("[analytics]", name, payload);
    }
}
