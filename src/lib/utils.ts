import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Turn common HTML entities (e.g. &amp;) into plain text for display. */
export function decodeHtmlEntities(value: string): string {
  if (!value || !value.includes("&")) return value;
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&nbsp;/gi, " ");
}

/** Capitalize the first letter of each word (keeps tokens like 3N/4D, 24x7 intact). */
export function toTitleCase(value: string): string {
  return decodeHtmlEntities(value)
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (!word) return word;
      if (/^\d|^\d*x\d|\/|^\d*\+\d*$|×/i.test(word) || word.includes("+")) {
        return word;
      }
      if (word.includes("-")) {
        return word
          .split("-")
          .map((part) =>
            part ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() : part,
          )
          .join("-");
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}
