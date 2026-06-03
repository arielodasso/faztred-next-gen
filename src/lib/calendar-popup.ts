import type { MouseEvent } from "react";
import { pushEvent } from "./analytics";

export const CALENDAR_URL = "https://calendar.app.google/aFcAAPqGVBe72yF27";

/**
 * Abre el modal in-page con el calendario embebido (estilo Sigma Tecnologías).
 * El modal vive en src/components/site/CalendarModal.tsx y escucha el evento global.
 */
export function openCalendarPopup(location = "unknown") {
  pushEvent("meeting_request", { location });
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("faztred:open-calendar"));
}

/**
 * Handler listo para onClick que abre el popup y previene navegación.
 */
export function calendarPopupHandler(location: string) {
  return (e: MouseEvent) => {
    e.preventDefault();
    openCalendarPopup(location);
  };
}
