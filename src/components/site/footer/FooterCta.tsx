"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useSiteConfig } from "@/contexts/site-config";
import { buildWhatsappHref } from "@/lib/site-links";
import { FOOTER_COLORS } from "./footer-data";

type FooterCtaProps = {
  whatsappBase: string;
  onPlanTrip: () => void;
};

export function FooterCta({ whatsappBase, onPlanTrip }: FooterCtaProps) {
  const site = useSiteConfig();
  const whatsappHref = buildWhatsappHref(
    whatsappBase,
    site.whatsappPreset?.trim() || "Hi YatraNexus, I'd like to plan my next journey.",
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      aria-labelledby="footer-cta-heading"
    >
      <div
        className="overflow-hidden rounded-[20px] border bg-white px-6 py-8 shadow-[0_18px_50px_-28px_rgba(52,35,95,0.35)] sm:px-8 sm:py-9 lg:px-10 lg:py-10"
        style={{ borderColor: FOOTER_COLORS.border }}
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-xl text-center lg:text-left">
            <h2
              id="footer-cta-heading"
              className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl"
              style={{ color: FOOTER_COLORS.purple }}
            >
              Ready to Plan Your Next Journey?
            </h2>
            <p
              className="mt-3 text-[15px] leading-relaxed sm:text-base"
              style={{ color: `${FOOTER_COLORS.purple}CC` }}
            >
              Share your destination, travel dates and budget.
              <br className="hidden sm:block" /> Our travel experts will prepare a personalized
              itinerary for you.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:mx-auto sm:max-w-sm lg:mx-0 lg:w-auto lg:min-w-[280px]">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onPlanTrip}
              className="inline-flex h-12 items-center justify-center rounded-2xl px-6 font-display text-[15px] font-bold text-white shadow-[0_12px_28px_-12px_rgba(244,124,32,0.75)] transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                background: `linear-gradient(135deg, ${FOOTER_COLORS.orange} 0%, #e86a12 100%)`,
                outlineColor: FOOTER_COLORS.orange,
              }}
            >
              Plan My Trip
            </motion.button>

            <motion.a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-2xl border bg-white px-6 font-display text-[15px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                borderColor: FOOTER_COLORS.border,
                color: FOOTER_COLORS.purple,
                outlineColor: "#25D366",
              }}
            >
              <MessageCircle className="h-5 w-5 shrink-0 text-[#25D366]" aria-hidden="true" />
              Chat on WhatsApp
            </motion.a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
