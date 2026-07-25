"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        options: { sitekey: string; theme?: "light" | "dark" },
      ) => number;
      getResponse: (widgetId?: number) => string;
      reset: (widgetId?: number) => void;
    };
    onRecaptchaLoad?: () => void;
  }
}

export type RecaptchaFieldRef = {
  getToken: () => string | null;
  reset: () => void;
};

export const isRecaptchaEnabled = Boolean(SITE_KEY);

export const RecaptchaField = forwardRef<RecaptchaFieldRef>(function RecaptchaField(_, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  useImperativeHandle(ref, () => ({
    getToken: () => {
      if (!window.grecaptcha || widgetIdRef.current === null) return null;
      const token = window.grecaptcha.getResponse(widgetIdRef.current);
      return token || null;
    },
    reset: () => {
      if (window.grecaptcha && widgetIdRef.current !== null) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    },
  }));

  useEffect(() => {
    if (!SITE_KEY || !containerRef.current) return;

    const renderWidget = () => {
      if (!containerRef.current || !window.grecaptcha || widgetIdRef.current !== null) return;
      widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
        sitekey: SITE_KEY,
        theme: "light",
      });
    };

    if (window.grecaptcha) {
      renderWidget();
      return;
    }

    window.onRecaptchaLoad = renderWidget;
    const existing = document.querySelector('script[src*="recaptcha/api.js"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    return () => {
      window.onRecaptchaLoad = undefined;
    };
  }, []);

  if (!SITE_KEY) return null;

  return (
    <div className="w-full max-w-full overflow-x-auto overflow-y-hidden rounded-md [-webkit-overflow-scrolling:touch]">
      <div ref={containerRef} className="inline-block origin-top-left [&_iframe]:max-w-none" />
    </div>
  );
});
