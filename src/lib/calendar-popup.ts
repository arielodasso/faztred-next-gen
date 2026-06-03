import { pushEvent } from "./analytics";

export const CALENDAR_URL = "https://calendar.app.google/aFcAAPqGVBe72yF27";

/**
 * Abre el calendario en un popup centrado (estilo Sigma Tecnologías).
 * Fallback: si el navegador bloquea el popup, abre en pestaña nueva.
 */
export function openCalendarPopup(location = "unknown") {
  pushEvent("meeting_request", { location });

  if (typeof window === "undefined") return;

  const width = 820;
  const height = 720;
  const left = Math.max(0, (window.screen.availWidth - width) / 2);
  const top = Math.max(0, (window.screen.availHeight - height) / 2);

  const features = [
    `width=${width}`,
    `height=${height}`,
    `left=${left}`,
    `top=${top}`,
    "scrollbars=yes",
    "resizable=yes",
    "toolbar=no",
    "menubar=no",
    "location=no",
    "status=no",
  ].join(",");

  const popup = window.open(CALENDAR_URL, "faztred-calendar", features);
  if (!popup) {
    // Fallback: si el bloqueador de popups lo cierra
    window.open(CALENDAR_URL, "_blank", "noopener,noreferrer");
  } else {
    popup.focus();
  }
}

/**
 * Handler listo para onClick que abre el popup y previene navegación.
 */
export function calendarPopupHandler(location: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    openCalendarPopup(location);
  };
}
