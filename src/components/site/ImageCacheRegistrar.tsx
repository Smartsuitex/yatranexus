import { useEffect } from "react";

/** Registers image Cache Storage worker (faster repeat visits). Not cookies. */
export function ImageCacheRegistrar() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (window.location.pathname.startsWith("/admin")) return;

    const register = () => {
      navigator.serviceWorker.register("/sw-images.js", { scope: "/" }).catch(() => {
        /* ignore — private mode / Hostinger may block SW */
      });
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);

  return null;
}
