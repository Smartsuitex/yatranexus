import { useSiteConfig } from "@/contexts/site-config";

export function WhatsAppFab() {
  const site = useSiteConfig();
  const href = `${site.whatsappBase}?text=${encodeURIComponent(
    site.whatsappPreset || "Hi YatraNexus, I'd like to know more.",
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="mobile-fab-safe fixed right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-glow transition hover:scale-105 sm:right-5"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white" aria-hidden="true">
        <path d="M19.11 17.79c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.62.14-.18.27-.71.89-.87 1.07-.16.18-.32.2-.59.07-.27-.14-1.16-.43-2.2-1.36-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.49-.85-2.05-.22-.54-.45-.46-.62-.47l-.53-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.99 2.66 1.13 2.84.14.18 1.95 2.98 4.73 4.18.66.29 1.18.46 1.58.59.66.21 1.27.18 1.74.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.52-.32zM16.02 5.33C10.13 5.33 5.33 10.13 5.33 16c0 1.89.5 3.73 1.45 5.35L5.33 26.67l5.5-1.44a10.62 10.62 0 005.19 1.32h.01c5.88 0 10.68-4.79 10.68-10.67 0-2.85-1.11-5.53-3.12-7.54a10.6 10.6 0 00-7.57-3.01z" />
      </svg>
    </a>
  );
}
