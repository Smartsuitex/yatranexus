"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { FOOTER_COLORS, PAYMENT_METHODS } from "./footer-data";

export function FooterPayments() {
  return (
    <section
      className="flex flex-col gap-5 rounded-[20px] border bg-white/80 px-5 py-5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:px-6"
      style={{ borderColor: FOOTER_COLORS.border }}
      aria-label="Payments and traveller rating"
    >
      <div className="flex flex-wrap items-center gap-2" aria-label="Accepted payment methods">
        {PAYMENT_METHODS.map((name) => (
          <motion.span
            key={name}
            whileHover={{ y: -2 }}
            className="inline-flex h-9 min-w-[4.25rem] items-center justify-center rounded-xl border bg-white px-2.5 text-[10px] font-bold tracking-wide shadow-sm"
            style={{ borderColor: FOOTER_COLORS.border, color: FOOTER_COLORS.purple }}
          >
            {name}
          </motion.span>
        ))}
      </div>

      <div className="flex items-center gap-2.5 sm:justify-end">
        <div className="flex items-center gap-0.5" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-[#F5B301] text-[#F5B301]"
              strokeWidth={0}
            />
          ))}
        </div>
        <p className="text-sm font-medium" style={{ color: FOOTER_COLORS.purple }}>
          Rated Excellent by Travellers
        </p>
      </div>
    </section>
  );
}
