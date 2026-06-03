/**
 * Analytics — eventos en window.dataLayer para Google Ads / GA4 / GTM.
 * No inyecta GA/GTM por sí solo. Cuando se carguen los scripts (G-XXXX, GTM-XXXX)
 * desde __root.tsx los eventos ya van a estar disponibles.
 */

type EventName =
  | "whatsapp_click"
  | "form_submit"
  | "phone_click"
  | "email_click"
  | "meeting_request"
  | "brochure_download"
  | "service_cta_click"
  | "project_view"
  | "popup_view"
  | "popup_click";

interface BasePayload {
  /** Sección o componente desde donde se dispara (e.g. "hero", "footer", "float"). */
  location?: string;
  /** Etiqueta libre (e.g. nombre del servicio o proyecto). */
  label?: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function pushEvent(event: EventName, payload: BasePayload = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}
