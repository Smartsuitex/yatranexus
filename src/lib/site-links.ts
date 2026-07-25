/** Build WhatsApp deep link from CMS `whatsappBase` (https://wa.me/...). */
export function buildWhatsappHref(whatsappBase: string, message: string): string {
  const base = whatsappBase.replace(/\?.*$/, "");
  return `${base}?text=${encodeURIComponent(message)}`;
}
