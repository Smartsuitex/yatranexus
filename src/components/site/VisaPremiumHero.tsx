"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/site-data";
import { VISA_TRUST_RIBBON } from "@/lib/visa-page-data";
import { SafeImage, hasImageSrc } from "@/components/site/SafeImage";

const ICON_TONES = ["purple", "pink", "orange", "blue", "green"] as const;

type Props = {
  imagePrimary: string;
  imageFallback: string;
  onApply: () => void;
};

export function VisaPremiumHero({ imagePrimary, imageFallback, onApply }: Props) {
  const [src, setSrc] = useState(imagePrimary);

  return (
    <section className="visa-premium-hero" aria-labelledby="visa-hero-heading">
      <div className="visa-premium-hero__glow visa-premium-hero__glow--purple" aria-hidden="true" />
      <div className="visa-premium-hero__glow visa-premium-hero__glow--blue" aria-hidden="true" />
      <div className="visa-premium-hero__particles" aria-hidden="true" />

      <div className="visa-premium-hero__shell">
        <div className="visa-premium-hero__grid">
          <div className="visa-premium-hero__copy">
            <h1 id="visa-hero-heading" className="visa-premium-hero__title">
              Visa Services
            </h1>
            <p className="visa-premium-hero__subtitle">
              Global Access, Hassle-Free Process
            </p>
            <p className="visa-premium-hero__lead">
              End-to-end visa assistance for tourist, business, student and work visas across the
              world. Fast documentation, expert consultation, and high approval success rate.
            </p>
            <div className="visa-premium-hero__actions">
              <button type="button" className="visa-premium-hero__btn-primary" onClick={onApply}>
                Apply Now
              </button>
              <a
                href={whatsappLink("Hi, I need help with a visa inquiry.")}
                target="_blank"
                rel="noreferrer"
                className="visa-premium-hero__btn-secondary"
              >
                Contact Expert
              </a>
            </div>
          </div>

          <div className="visa-premium-hero__media">
            <div className="visa-premium-hero__photo-frame">
              <SafeImage
                src={hasImageSrc(src) ? src : imageFallback}
                alt="Premium visa and travel documents"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="visa-premium-hero__photo"
                fallbackClassName="bg-[color:var(--brand-navy-deep)]"
                onError={() => {
                  if (hasImageSrc(imageFallback) && src !== imageFallback) {
                    setSrc(imageFallback);
                  }
                }}
              />
              <div className="visa-premium-hero__photo-glow" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="visa-premium-hero__features" role="region" aria-label="Visa service guarantees">
          {VISA_TRUST_RIBBON.map(({ icon: Icon, title, detail }, index) => (
            <div key={title} className="visa-premium-hero__feature">
              <span
                className={`visa-premium-hero__feature-icon visa-premium-hero__feature-icon--${ICON_TONES[index % ICON_TONES.length]}`}
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div className="visa-premium-hero__feature-copy">
                <p className="visa-premium-hero__feature-title">{title}</p>
                {detail ? <p className="visa-premium-hero__feature-detail">{detail}</p> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
