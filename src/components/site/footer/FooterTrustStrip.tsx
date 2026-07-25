"use client";

import {
  BadgeIndianRupee,
  Headset,
  Hotel,
  Plane,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { FOOTER_COLORS, TRUST_ITEMS } from "./footer-data";

const ICONS = {
  shield: ShieldCheck,
  badge: BadgeIndianRupee,
  phone: Headset,
  hotel: Hotel,
  plane: Plane,
} as const;

export function FooterTrustStrip() {
  return (
    <section aria-label="Why travellers trust YatraNexus">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
        {TRUST_ITEMS.map((item, index) => {
          const Icon = ICONS[item.icon];
          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="flex items-center gap-3 rounded-[20px] border bg-white px-4 py-4 shadow-[0_10px_30px_-22px_rgba(52,35,95,0.35)] sm:flex-col sm:items-center sm:px-3 sm:py-5 sm:text-center lg:px-4"
              style={{ borderColor: FOOTER_COLORS.border }}
            >
              <span
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                style={{ background: `${FOOTER_COLORS.orange}14`, color: FOOTER_COLORS.orange }}
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <p
                className="font-display text-sm font-semibold leading-snug"
                style={{ color: FOOTER_COLORS.purple }}
              >
                {item.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
