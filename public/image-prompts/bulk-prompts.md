# YatraNexus Bulk Image Prompts

Generated: 2026-07-03

## Summary

| Category | Items | Prompts each | Total prompts |
|----------|-------|--------------|---------------|
| Services | 8 | 10 | 80 |
| Packages | 117 | 10 | 1170 |
| **Total** | | | **1250** |

---

## How to bulk-generate & download images

### Method 1 — ChatGPT (manual, no API)

ChatGPT does **not** support true bulk download. Use this loop:

1. Open ChatGPT → enable **Image generation** (ChatGPT Plus).
2. Paste the **MASTER BATCH PROMPT** below.
3. Say: **"Generate image 1 only. Wait for my next before continuing."**
4. Download each image → rename to the `saveAs` filename shown.
5. Reply **"next"** for the next prompt. Repeat.

**Faster variant:** Ask ChatGPT to output 5 prompts at a time, generate all 5 in one chat turn (if allowed), download each.

### Method 2 — ChatGPT batch instruction (copy-paste)

```
You are my YatraNexus image generator. I will paste prompts from bulk-prompts.json.
For EACH prompt:
1. Generate the image exactly as described
2. Tell me the save filename from saveAs
3. Wait for me to say "next" before the next image
Rules: photorealistic, no text, no watermark, YatraNexus colors (navy, orange, purple).
Start with prompt id: cabs-hero-desktop
```

### Method 3 — OpenAI API (true bulk, for developers)

```bash
# Requires OPENAI_API_KEY and: pip install openai requests
python scripts/bulk-generate-images.py
```

(See scripts/bulk-generate-images.py — generates all images overnight.)

### Method 4 — Leonardo.ai / Adobe Firefly

1. Export `bulk-prompts.csv` from this folder.
2. Import CSV into Leonardo **Bulk Upload** or Firefly **Batch generate**.
3. Download ZIP when complete.

### File naming after download

| Type | Folder |
|------|--------|
| Service heroes | `public/images/hero/` |
| Corporate | `public/images/corporate/` |
| Packages | `public/images/packages/` |

Use **v1** as the main package card image in Admin CMS.

---

## MASTER BATCH PROMPT (start ChatGPT session)

```
I have 1250 YatraNexus travel images to create.
Generate ONE image per message when I give you a prompt ID from bulk-prompts.json.
Always: photorealistic, 3:2 or 16:9 as specified, no text, no watermark.
Brand: navy #001b2a, orange #ff7a00, purple #4b2cff accents.
```

---

## Services (80 prompts)


### Outstation Cabs

#### 1. hero-desktop → `public/images/hero/cabs-hero-desktop.png`

Create a Outstation Cabs image for YatraNexus travel website. Theme: comfortable outstation cabs anywhere in India, white SUV on scenic highway. Shot type: hero-desktop — Left third clear for text overlay. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9 1920×1080.

#### 2. hero-mobile → `public/images/hero/cabs-hero-mobile.png`

Create a Outstation Cabs image for YatraNexus travel website. Theme: comfortable outstation cabs anywhere in India, white SUV on scenic highway. Shot type: hero-mobile — Vertical crop, subject center-bottom. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 9:16 1080×1920.

#### 3. service-card → `public/images/hero/cabs-service-card.png`

Create a Outstation Cabs image for YatraNexus travel website. Theme: comfortable outstation cabs anywhere in India, white SUV on scenic highway. Shot type: service-card — Package/service card thumbnail. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 1200×800.

#### 4. cta-banner → `public/images/hero/cabs-cta-banner.png`

Create a Outstation Cabs image for YatraNexus travel website. Theme: comfortable outstation cabs anywhere in India, white SUV on scenic highway. Shot type: cta-banner — Wide CTA section background. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 21:9 ultrawide.

#### 5. trust-section → `public/images/hero/cabs-trust-section.png`

Create a Outstation Cabs image for YatraNexus travel website. Theme: comfortable outstation cabs anywhere in India, white SUV on scenic highway. Shot type: trust-section — Subtle background for stats/trust bar. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 6. how-it-works → `public/images/hero/cabs-how-it-works.png`

Create a Outstation Cabs image for YatraNexus travel website. Theme: comfortable outstation cabs anywhere in India, white SUV on scenic highway. Shot type: how-it-works — Clean illustrative step background. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 7. social-square → `public/images/hero/cabs-social-square.png`

Create a Outstation Cabs image for YatraNexus travel website. Theme: comfortable outstation cabs anywhere in India, white SUV on scenic highway. Shot type: social-square — Instagram/LinkedIn post. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 1:1 1080×1080.

#### 8. social-story → `public/images/hero/cabs-social-story.png`

Create a Outstation Cabs image for YatraNexus travel website. Theme: comfortable outstation cabs anywhere in India, white SUV on scenic highway. Shot type: social-story — Instagram story. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 9:16.

#### 9. ppt-slide → `public/images/hero/cabs-ppt-slide.png`

Create a Outstation Cabs image for YatraNexus travel website. Theme: comfortable outstation cabs anywhere in India, white SUV on scenic highway. Shot type: ppt-slide — Vendor presentation slide. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 10. email-header → `public/images/hero/cabs-email-header.png`

Create a Outstation Cabs image for YatraNexus travel website. Theme: comfortable outstation cabs anywhere in India, white SUV on scenic highway. Shot type: email-header — Email newsletter banner. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:1 wide.


### Flight Booking

#### 1. hero-desktop → `public/images/hero/flights-hero-desktop.png`

Create a Flight Booking image for YatraNexus travel website. Theme: airplane at airport, flight booking, domestic and international travel. Shot type: hero-desktop — Left third clear for text overlay. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9 1920×1080.

#### 2. hero-mobile → `public/images/hero/flights-hero-mobile.png`

Create a Flight Booking image for YatraNexus travel website. Theme: airplane at airport, flight booking, domestic and international travel. Shot type: hero-mobile — Vertical crop, subject center-bottom. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 9:16 1080×1920.

#### 3. service-card → `public/images/hero/flights-service-card.png`

Create a Flight Booking image for YatraNexus travel website. Theme: airplane at airport, flight booking, domestic and international travel. Shot type: service-card — Package/service card thumbnail. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 1200×800.

#### 4. cta-banner → `public/images/hero/flights-cta-banner.png`

Create a Flight Booking image for YatraNexus travel website. Theme: airplane at airport, flight booking, domestic and international travel. Shot type: cta-banner — Wide CTA section background. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 21:9 ultrawide.

#### 5. trust-section → `public/images/hero/flights-trust-section.png`

Create a Flight Booking image for YatraNexus travel website. Theme: airplane at airport, flight booking, domestic and international travel. Shot type: trust-section — Subtle background for stats/trust bar. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 6. how-it-works → `public/images/hero/flights-how-it-works.png`

Create a Flight Booking image for YatraNexus travel website. Theme: airplane at airport, flight booking, domestic and international travel. Shot type: how-it-works — Clean illustrative step background. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 7. social-square → `public/images/hero/flights-social-square.png`

Create a Flight Booking image for YatraNexus travel website. Theme: airplane at airport, flight booking, domestic and international travel. Shot type: social-square — Instagram/LinkedIn post. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 1:1 1080×1080.

#### 8. social-story → `public/images/hero/flights-social-story.png`

Create a Flight Booking image for YatraNexus travel website. Theme: airplane at airport, flight booking, domestic and international travel. Shot type: social-story — Instagram story. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 9:16.

#### 9. ppt-slide → `public/images/hero/flights-ppt-slide.png`

Create a Flight Booking image for YatraNexus travel website. Theme: airplane at airport, flight booking, domestic and international travel. Shot type: ppt-slide — Vendor presentation slide. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 10. email-header → `public/images/hero/flights-email-header.png`

Create a Flight Booking image for YatraNexus travel website. Theme: airplane at airport, flight booking, domestic and international travel. Shot type: email-header — Email newsletter banner. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:1 wide.


### Hotel Booking

#### 1. hero-desktop → `public/images/hero/hotels-hero-desktop.png`

Create a Hotel Booking image for YatraNexus travel website. Theme: luxury hotel room and lobby, handpicked stays worldwide. Shot type: hero-desktop — Left third clear for text overlay. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9 1920×1080.

#### 2. hero-mobile → `public/images/hero/hotels-hero-mobile.png`

Create a Hotel Booking image for YatraNexus travel website. Theme: luxury hotel room and lobby, handpicked stays worldwide. Shot type: hero-mobile — Vertical crop, subject center-bottom. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 9:16 1080×1920.

#### 3. service-card → `public/images/hero/hotels-service-card.png`

Create a Hotel Booking image for YatraNexus travel website. Theme: luxury hotel room and lobby, handpicked stays worldwide. Shot type: service-card — Package/service card thumbnail. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 1200×800.

#### 4. cta-banner → `public/images/hero/hotels-cta-banner.png`

Create a Hotel Booking image for YatraNexus travel website. Theme: luxury hotel room and lobby, handpicked stays worldwide. Shot type: cta-banner — Wide CTA section background. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 21:9 ultrawide.

#### 5. trust-section → `public/images/hero/hotels-trust-section.png`

Create a Hotel Booking image for YatraNexus travel website. Theme: luxury hotel room and lobby, handpicked stays worldwide. Shot type: trust-section — Subtle background for stats/trust bar. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 6. how-it-works → `public/images/hero/hotels-how-it-works.png`

Create a Hotel Booking image for YatraNexus travel website. Theme: luxury hotel room and lobby, handpicked stays worldwide. Shot type: how-it-works — Clean illustrative step background. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 7. social-square → `public/images/hero/hotels-social-square.png`

Create a Hotel Booking image for YatraNexus travel website. Theme: luxury hotel room and lobby, handpicked stays worldwide. Shot type: social-square — Instagram/LinkedIn post. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 1:1 1080×1080.

#### 8. social-story → `public/images/hero/hotels-social-story.png`

Create a Hotel Booking image for YatraNexus travel website. Theme: luxury hotel room and lobby, handpicked stays worldwide. Shot type: social-story — Instagram story. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 9:16.

#### 9. ppt-slide → `public/images/hero/hotels-ppt-slide.png`

Create a Hotel Booking image for YatraNexus travel website. Theme: luxury hotel room and lobby, handpicked stays worldwide. Shot type: ppt-slide — Vendor presentation slide. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 10. email-header → `public/images/hero/hotels-email-header.png`

Create a Hotel Booking image for YatraNexus travel website. Theme: luxury hotel room and lobby, handpicked stays worldwide. Shot type: email-header — Email newsletter banner. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:1 wide.


### Visa Services

#### 1. hero-desktop → `public/images/hero/visa-hero-desktop.png`

Create a Visa Services image for YatraNexus travel website. Theme: passport visa stamps, travel documents, your visa sorted, global access. Shot type: hero-desktop — Left third clear for text overlay. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9 1920×1080.

#### 2. hero-mobile → `public/images/hero/visa-hero-mobile.png`

Create a Visa Services image for YatraNexus travel website. Theme: passport visa stamps, travel documents, your visa sorted, global access. Shot type: hero-mobile — Vertical crop, subject center-bottom. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 9:16 1080×1920.

#### 3. service-card → `public/images/hero/visa-service-card.png`

Create a Visa Services image for YatraNexus travel website. Theme: passport visa stamps, travel documents, your visa sorted, global access. Shot type: service-card — Package/service card thumbnail. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 1200×800.

#### 4. cta-banner → `public/images/hero/visa-cta-banner.png`

Create a Visa Services image for YatraNexus travel website. Theme: passport visa stamps, travel documents, your visa sorted, global access. Shot type: cta-banner — Wide CTA section background. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 21:9 ultrawide.

#### 5. trust-section → `public/images/hero/visa-trust-section.png`

Create a Visa Services image for YatraNexus travel website. Theme: passport visa stamps, travel documents, your visa sorted, global access. Shot type: trust-section — Subtle background for stats/trust bar. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 6. how-it-works → `public/images/hero/visa-how-it-works.png`

Create a Visa Services image for YatraNexus travel website. Theme: passport visa stamps, travel documents, your visa sorted, global access. Shot type: how-it-works — Clean illustrative step background. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 7. social-square → `public/images/hero/visa-social-square.png`

Create a Visa Services image for YatraNexus travel website. Theme: passport visa stamps, travel documents, your visa sorted, global access. Shot type: social-square — Instagram/LinkedIn post. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 1:1 1080×1080.

#### 8. social-story → `public/images/hero/visa-social-story.png`

Create a Visa Services image for YatraNexus travel website. Theme: passport visa stamps, travel documents, your visa sorted, global access. Shot type: social-story — Instagram story. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 9:16.

#### 9. ppt-slide → `public/images/hero/visa-ppt-slide.png`

Create a Visa Services image for YatraNexus travel website. Theme: passport visa stamps, travel documents, your visa sorted, global access. Shot type: ppt-slide — Vendor presentation slide. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 10. email-header → `public/images/hero/visa-email-header.png`

Create a Visa Services image for YatraNexus travel website. Theme: passport visa stamps, travel documents, your visa sorted, global access. Shot type: email-header — Email newsletter banner. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:1 wide.


### Travel Insurance

#### 1. hero-desktop → `public/images/hero/insurance-hero-desktop.png`

Create a Travel Insurance image for YatraNexus travel website. Theme: travel with peace of mind, family at airport, protection and safety. Shot type: hero-desktop — Left third clear for text overlay. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9 1920×1080.

#### 2. hero-mobile → `public/images/hero/insurance-hero-mobile.png`

Create a Travel Insurance image for YatraNexus travel website. Theme: travel with peace of mind, family at airport, protection and safety. Shot type: hero-mobile — Vertical crop, subject center-bottom. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 9:16 1080×1920.

#### 3. service-card → `public/images/hero/insurance-service-card.png`

Create a Travel Insurance image for YatraNexus travel website. Theme: travel with peace of mind, family at airport, protection and safety. Shot type: service-card — Package/service card thumbnail. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 1200×800.

#### 4. cta-banner → `public/images/hero/insurance-cta-banner.png`

Create a Travel Insurance image for YatraNexus travel website. Theme: travel with peace of mind, family at airport, protection and safety. Shot type: cta-banner — Wide CTA section background. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 21:9 ultrawide.

#### 5. trust-section → `public/images/hero/insurance-trust-section.png`

Create a Travel Insurance image for YatraNexus travel website. Theme: travel with peace of mind, family at airport, protection and safety. Shot type: trust-section — Subtle background for stats/trust bar. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 6. how-it-works → `public/images/hero/insurance-how-it-works.png`

Create a Travel Insurance image for YatraNexus travel website. Theme: travel with peace of mind, family at airport, protection and safety. Shot type: how-it-works — Clean illustrative step background. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 7. social-square → `public/images/hero/insurance-social-square.png`

Create a Travel Insurance image for YatraNexus travel website. Theme: travel with peace of mind, family at airport, protection and safety. Shot type: social-square — Instagram/LinkedIn post. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 1:1 1080×1080.

#### 8. social-story → `public/images/hero/insurance-social-story.png`

Create a Travel Insurance image for YatraNexus travel website. Theme: travel with peace of mind, family at airport, protection and safety. Shot type: social-story — Instagram story. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 9:16.

#### 9. ppt-slide → `public/images/hero/insurance-ppt-slide.png`

Create a Travel Insurance image for YatraNexus travel website. Theme: travel with peace of mind, family at airport, protection and safety. Shot type: ppt-slide — Vendor presentation slide. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 10. email-header → `public/images/hero/insurance-email-header.png`

Create a Travel Insurance image for YatraNexus travel website. Theme: travel with peace of mind, family at airport, protection and safety. Shot type: email-header — Email newsletter banner. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:1 wide.


### Forex Card

#### 1. hero-desktop → `public/images/hero/forex-hero-desktop.png`

Create a Forex Card image for YatraNexus travel website. Theme: multi-currency forex card, international payments, globe and currency. Shot type: hero-desktop — Left third clear for text overlay. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9 1920×1080.

#### 2. hero-mobile → `public/images/hero/forex-hero-mobile.png`

Create a Forex Card image for YatraNexus travel website. Theme: multi-currency forex card, international payments, globe and currency. Shot type: hero-mobile — Vertical crop, subject center-bottom. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 9:16 1080×1920.

#### 3. service-card → `public/images/hero/forex-service-card.png`

Create a Forex Card image for YatraNexus travel website. Theme: multi-currency forex card, international payments, globe and currency. Shot type: service-card — Package/service card thumbnail. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 1200×800.

#### 4. cta-banner → `public/images/hero/forex-cta-banner.png`

Create a Forex Card image for YatraNexus travel website. Theme: multi-currency forex card, international payments, globe and currency. Shot type: cta-banner — Wide CTA section background. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 21:9 ultrawide.

#### 5. trust-section → `public/images/hero/forex-trust-section.png`

Create a Forex Card image for YatraNexus travel website. Theme: multi-currency forex card, international payments, globe and currency. Shot type: trust-section — Subtle background for stats/trust bar. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 6. how-it-works → `public/images/hero/forex-how-it-works.png`

Create a Forex Card image for YatraNexus travel website. Theme: multi-currency forex card, international payments, globe and currency. Shot type: how-it-works — Clean illustrative step background. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 7. social-square → `public/images/hero/forex-social-square.png`

Create a Forex Card image for YatraNexus travel website. Theme: multi-currency forex card, international payments, globe and currency. Shot type: social-square — Instagram/LinkedIn post. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 1:1 1080×1080.

#### 8. social-story → `public/images/hero/forex-social-story.png`

Create a Forex Card image for YatraNexus travel website. Theme: multi-currency forex card, international payments, globe and currency. Shot type: social-story — Instagram story. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 9:16.

#### 9. ppt-slide → `public/images/hero/forex-ppt-slide.png`

Create a Forex Card image for YatraNexus travel website. Theme: multi-currency forex card, international payments, globe and currency. Shot type: ppt-slide — Vendor presentation slide. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 10. email-header → `public/images/hero/forex-email-header.png`

Create a Forex Card image for YatraNexus travel website. Theme: multi-currency forex card, international payments, globe and currency. Shot type: email-header — Email newsletter banner. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:1 wide.


### Corporate Travel

#### 1. hero-desktop → `public/images/corporate/corporate-hero-desktop.png`

Create a Corporate Travel image for YatraNexus travel website. Theme: business corporate travel MICE, executives airport, professional. Shot type: hero-desktop — Left third clear for text overlay. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9 1920×1080.

#### 2. hero-mobile → `public/images/corporate/corporate-hero-mobile.png`

Create a Corporate Travel image for YatraNexus travel website. Theme: business corporate travel MICE, executives airport, professional. Shot type: hero-mobile — Vertical crop, subject center-bottom. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 9:16 1080×1920.

#### 3. service-card → `public/images/corporate/corporate-service-card.png`

Create a Corporate Travel image for YatraNexus travel website. Theme: business corporate travel MICE, executives airport, professional. Shot type: service-card — Package/service card thumbnail. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 1200×800.

#### 4. cta-banner → `public/images/corporate/corporate-cta-banner.png`

Create a Corporate Travel image for YatraNexus travel website. Theme: business corporate travel MICE, executives airport, professional. Shot type: cta-banner — Wide CTA section background. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 21:9 ultrawide.

#### 5. trust-section → `public/images/corporate/corporate-trust-section.png`

Create a Corporate Travel image for YatraNexus travel website. Theme: business corporate travel MICE, executives airport, professional. Shot type: trust-section — Subtle background for stats/trust bar. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 6. how-it-works → `public/images/corporate/corporate-how-it-works.png`

Create a Corporate Travel image for YatraNexus travel website. Theme: business corporate travel MICE, executives airport, professional. Shot type: how-it-works — Clean illustrative step background. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 7. social-square → `public/images/corporate/corporate-social-square.png`

Create a Corporate Travel image for YatraNexus travel website. Theme: business corporate travel MICE, executives airport, professional. Shot type: social-square — Instagram/LinkedIn post. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 1:1 1080×1080.

#### 8. social-story → `public/images/corporate/corporate-social-story.png`

Create a Corporate Travel image for YatraNexus travel website. Theme: business corporate travel MICE, executives airport, professional. Shot type: social-story — Instagram story. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 9:16.

#### 9. ppt-slide → `public/images/corporate/corporate-ppt-slide.png`

Create a Corporate Travel image for YatraNexus travel website. Theme: business corporate travel MICE, executives airport, professional. Shot type: ppt-slide — Vendor presentation slide. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 10. email-header → `public/images/corporate/corporate-email-header.png`

Create a Corporate Travel image for YatraNexus travel website. Theme: business corporate travel MICE, executives airport, professional. Shot type: email-header — Email newsletter banner. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:1 wide.


### Holiday Packages

#### 1. hero-desktop → `public/images/hero/holiday-packages-hero-desktop.png`

Create a Holiday Packages image for YatraNexus travel website. Theme: collage India destinations Goa Kerala Kashmir Rajasthan holidays. Shot type: hero-desktop — Left third clear for text overlay. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9 1920×1080.

#### 2. hero-mobile → `public/images/hero/holiday-packages-hero-mobile.png`

Create a Holiday Packages image for YatraNexus travel website. Theme: collage India destinations Goa Kerala Kashmir Rajasthan holidays. Shot type: hero-mobile — Vertical crop, subject center-bottom. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 9:16 1080×1920.

#### 3. service-card → `public/images/hero/holiday-packages-service-card.png`

Create a Holiday Packages image for YatraNexus travel website. Theme: collage India destinations Goa Kerala Kashmir Rajasthan holidays. Shot type: service-card — Package/service card thumbnail. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 1200×800.

#### 4. cta-banner → `public/images/hero/holiday-packages-cta-banner.png`

Create a Holiday Packages image for YatraNexus travel website. Theme: collage India destinations Goa Kerala Kashmir Rajasthan holidays. Shot type: cta-banner — Wide CTA section background. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 21:9 ultrawide.

#### 5. trust-section → `public/images/hero/holiday-packages-trust-section.png`

Create a Holiday Packages image for YatraNexus travel website. Theme: collage India destinations Goa Kerala Kashmir Rajasthan holidays. Shot type: trust-section — Subtle background for stats/trust bar. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 6. how-it-works → `public/images/hero/holiday-packages-how-it-works.png`

Create a Holiday Packages image for YatraNexus travel website. Theme: collage India destinations Goa Kerala Kashmir Rajasthan holidays. Shot type: how-it-works — Clean illustrative step background. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 7. social-square → `public/images/hero/holiday-packages-social-square.png`

Create a Holiday Packages image for YatraNexus travel website. Theme: collage India destinations Goa Kerala Kashmir Rajasthan holidays. Shot type: social-square — Instagram/LinkedIn post. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 1:1 1080×1080.

#### 8. social-story → `public/images/hero/holiday-packages-social-story.png`

Create a Holiday Packages image for YatraNexus travel website. Theme: collage India destinations Goa Kerala Kashmir Rajasthan holidays. Shot type: social-story — Instagram story. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 9:16.

#### 9. ppt-slide → `public/images/hero/holiday-packages-ppt-slide.png`

Create a Holiday Packages image for YatraNexus travel website. Theme: collage India destinations Goa Kerala Kashmir Rajasthan holidays. Shot type: ppt-slide — Vendor presentation slide. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 16:9.

#### 10. email-header → `public/images/hero/holiday-packages-email-header.png`

Create a Holiday Packages image for YatraNexus travel website. Theme: collage India destinations Goa Kerala Kashmir Rajasthan holidays. Shot type: email-header — Email newsletter banner. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:1 wide.


---

## Packages (1170 prompts)

> Use **v1** for the main package card. v2–v10 are alternates for gallery/PPT.


### Andaman Islands (6 packages)

#### Andaman Island Escape
Slug: `andaman-andaman-island-escape-4d3n` | 4D/3N | ₹ 18,999

**v1** → `public/images/packages/andaman-andaman-island-escape-4d3n-v1.png`

Create a photorealistic travel image for "Andaman Island Escape" — 4-day Andaman Islands holiday package, India. Scene: scenic highlights of turquoise lagoon, Radhanagar beach, coral islands. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/andaman-andaman-island-escape-4d3n-v2.png`

Create a photorealistic travel image for "Andaman Island Escape" — 4-day Andaman Islands holiday package, India. Scene: scenic highlights of turquoise lagoon, Radhanagar beach, coral islands. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/andaman-andaman-island-escape-4d3n-v3.png`

Create a photorealistic travel image for "Andaman Island Escape" — 4-day Andaman Islands holiday package, India. Scene: scenic highlights of turquoise lagoon, Radhanagar beach, coral islands. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/andaman-andaman-island-escape-4d3n-v4.png`

Create a photorealistic travel image for "Andaman Island Escape" — 4-day Andaman Islands holiday package, India. Scene: scenic highlights of turquoise lagoon, Radhanagar beach, coral islands. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/andaman-andaman-island-escape-4d3n-v5.png`

Create a photorealistic travel image for "Andaman Island Escape" — 4-day Andaman Islands holiday package, India. Scene: scenic highlights of turquoise lagoon, Radhanagar beach, coral islands. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/andaman-andaman-island-escape-4d3n-v6.png`

Create a photorealistic travel image for "Andaman Island Escape" — 4-day Andaman Islands holiday package, India. Scene: scenic highlights of turquoise lagoon, Radhanagar beach, coral islands. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/andaman-andaman-island-escape-4d3n-v7.png`

Create a photorealistic travel image for "Andaman Island Escape" — 4-day Andaman Islands holiday package, India. Scene: scenic highlights of turquoise lagoon, Radhanagar beach, coral islands. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/andaman-andaman-island-escape-4d3n-v8.png`

Create a photorealistic travel image for "Andaman Island Escape" — 4-day Andaman Islands holiday package, India. Scene: scenic highlights of turquoise lagoon, Radhanagar beach, coral islands. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/andaman-andaman-island-escape-4d3n-v9.png`

Create a photorealistic travel image for "Andaman Island Escape" — 4-day Andaman Islands holiday package, India. Scene: scenic highlights of turquoise lagoon, Radhanagar beach, coral islands. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/andaman-andaman-island-escape-4d3n-v10.png`

Create a photorealistic travel image for "Andaman Island Escape" — 4-day Andaman Islands holiday package, India. Scene: scenic highlights of turquoise lagoon, Radhanagar beach, coral islands. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Andaman Honeymoon Special
Slug: `andaman-andaman-honeymoon-special-5d4n` | 5D/4N | ₹ 29,999

**v1** → `public/images/packages/andaman-andaman-honeymoon-special-5d4n-v1.png`

Create a photorealistic travel image for "Andaman Honeymoon Special" — 5-day Andaman Islands holiday package, India. Scene: romantic turquoise lagoon, Radhanagar beach, coral islands, intimate luxury mood. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/andaman-andaman-honeymoon-special-5d4n-v2.png`

Create a photorealistic travel image for "Andaman Honeymoon Special" — 5-day Andaman Islands holiday package, India. Scene: romantic turquoise lagoon, Radhanagar beach, coral islands, intimate luxury mood. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/andaman-andaman-honeymoon-special-5d4n-v3.png`

Create a photorealistic travel image for "Andaman Honeymoon Special" — 5-day Andaman Islands holiday package, India. Scene: romantic turquoise lagoon, Radhanagar beach, coral islands, intimate luxury mood. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/andaman-andaman-honeymoon-special-5d4n-v4.png`

Create a photorealistic travel image for "Andaman Honeymoon Special" — 5-day Andaman Islands holiday package, India. Scene: romantic turquoise lagoon, Radhanagar beach, coral islands, intimate luxury mood. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/andaman-andaman-honeymoon-special-5d4n-v5.png`

Create a photorealistic travel image for "Andaman Honeymoon Special" — 5-day Andaman Islands holiday package, India. Scene: romantic turquoise lagoon, Radhanagar beach, coral islands, intimate luxury mood. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/andaman-andaman-honeymoon-special-5d4n-v6.png`

Create a photorealistic travel image for "Andaman Honeymoon Special" — 5-day Andaman Islands holiday package, India. Scene: romantic turquoise lagoon, Radhanagar beach, coral islands, intimate luxury mood. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/andaman-andaman-honeymoon-special-5d4n-v7.png`

Create a photorealistic travel image for "Andaman Honeymoon Special" — 5-day Andaman Islands holiday package, India. Scene: romantic turquoise lagoon, Radhanagar beach, coral islands, intimate luxury mood. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/andaman-andaman-honeymoon-special-5d4n-v8.png`

Create a photorealistic travel image for "Andaman Honeymoon Special" — 5-day Andaman Islands holiday package, India. Scene: romantic turquoise lagoon, Radhanagar beach, coral islands, intimate luxury mood. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/andaman-andaman-honeymoon-special-5d4n-v9.png`

Create a photorealistic travel image for "Andaman Honeymoon Special" — 5-day Andaman Islands holiday package, India. Scene: romantic turquoise lagoon, Radhanagar beach, coral islands, intimate luxury mood. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/andaman-andaman-honeymoon-special-5d4n-v10.png`

Create a photorealistic travel image for "Andaman Honeymoon Special" — 5-day Andaman Islands holiday package, India. Scene: romantic turquoise lagoon, Radhanagar beach, coral islands, intimate luxury mood. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### ‍‍‍ Andaman Family Vacation
Slug: `andaman-andaman-family-vacation-6d5n` | 6D/5N | ₹ 26,999

**v1** → `public/images/packages/andaman-andaman-family-vacation-6d5n-v1.png`

Create a photorealistic travel image for "‍‍‍ Andaman Family Vacation" — 6-day Andaman Islands holiday package, India. Scene: family-friendly turquoise lagoon, Radhanagar beach, coral islands, cheerful safe travel. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/andaman-andaman-family-vacation-6d5n-v2.png`

Create a photorealistic travel image for "‍‍‍ Andaman Family Vacation" — 6-day Andaman Islands holiday package, India. Scene: family-friendly turquoise lagoon, Radhanagar beach, coral islands, cheerful safe travel. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/andaman-andaman-family-vacation-6d5n-v3.png`

Create a photorealistic travel image for "‍‍‍ Andaman Family Vacation" — 6-day Andaman Islands holiday package, India. Scene: family-friendly turquoise lagoon, Radhanagar beach, coral islands, cheerful safe travel. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/andaman-andaman-family-vacation-6d5n-v4.png`

Create a photorealistic travel image for "‍‍‍ Andaman Family Vacation" — 6-day Andaman Islands holiday package, India. Scene: family-friendly turquoise lagoon, Radhanagar beach, coral islands, cheerful safe travel. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/andaman-andaman-family-vacation-6d5n-v5.png`

Create a photorealistic travel image for "‍‍‍ Andaman Family Vacation" — 6-day Andaman Islands holiday package, India. Scene: family-friendly turquoise lagoon, Radhanagar beach, coral islands, cheerful safe travel. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/andaman-andaman-family-vacation-6d5n-v6.png`

Create a photorealistic travel image for "‍‍‍ Andaman Family Vacation" — 6-day Andaman Islands holiday package, India. Scene: family-friendly turquoise lagoon, Radhanagar beach, coral islands, cheerful safe travel. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/andaman-andaman-family-vacation-6d5n-v7.png`

Create a photorealistic travel image for "‍‍‍ Andaman Family Vacation" — 6-day Andaman Islands holiday package, India. Scene: family-friendly turquoise lagoon, Radhanagar beach, coral islands, cheerful safe travel. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/andaman-andaman-family-vacation-6d5n-v8.png`

Create a photorealistic travel image for "‍‍‍ Andaman Family Vacation" — 6-day Andaman Islands holiday package, India. Scene: family-friendly turquoise lagoon, Radhanagar beach, coral islands, cheerful safe travel. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/andaman-andaman-family-vacation-6d5n-v9.png`

Create a photorealistic travel image for "‍‍‍ Andaman Family Vacation" — 6-day Andaman Islands holiday package, India. Scene: family-friendly turquoise lagoon, Radhanagar beach, coral islands, cheerful safe travel. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/andaman-andaman-family-vacation-6d5n-v10.png`

Create a photorealistic travel image for "‍‍‍ Andaman Family Vacation" — 6-day Andaman Islands holiday package, India. Scene: family-friendly turquoise lagoon, Radhanagar beach, coral islands, cheerful safe travel. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Andaman Adventure & Scuba Tour
Slug: `andaman-andaman-adventure-scuba-tour-6d5n` | 6D/5N | ₹ 29,999

**v1** → `public/images/packages/andaman-andaman-adventure-scuba-tour-6d5n-v1.png`

Create a photorealistic travel image for "Andaman Adventure & Scuba Tour" — 6-day Andaman Islands holiday package, India. Scene: adventure turquoise lagoon, Radhanagar beach, coral islands, thrilling outdoor. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/andaman-andaman-adventure-scuba-tour-6d5n-v2.png`

Create a photorealistic travel image for "Andaman Adventure & Scuba Tour" — 6-day Andaman Islands holiday package, India. Scene: adventure turquoise lagoon, Radhanagar beach, coral islands, thrilling outdoor. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/andaman-andaman-adventure-scuba-tour-6d5n-v3.png`

Create a photorealistic travel image for "Andaman Adventure & Scuba Tour" — 6-day Andaman Islands holiday package, India. Scene: adventure turquoise lagoon, Radhanagar beach, coral islands, thrilling outdoor. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/andaman-andaman-adventure-scuba-tour-6d5n-v4.png`

Create a photorealistic travel image for "Andaman Adventure & Scuba Tour" — 6-day Andaman Islands holiday package, India. Scene: adventure turquoise lagoon, Radhanagar beach, coral islands, thrilling outdoor. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/andaman-andaman-adventure-scuba-tour-6d5n-v5.png`

Create a photorealistic travel image for "Andaman Adventure & Scuba Tour" — 6-day Andaman Islands holiday package, India. Scene: adventure turquoise lagoon, Radhanagar beach, coral islands, thrilling outdoor. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/andaman-andaman-adventure-scuba-tour-6d5n-v6.png`

Create a photorealistic travel image for "Andaman Adventure & Scuba Tour" — 6-day Andaman Islands holiday package, India. Scene: adventure turquoise lagoon, Radhanagar beach, coral islands, thrilling outdoor. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/andaman-andaman-adventure-scuba-tour-6d5n-v7.png`

Create a photorealistic travel image for "Andaman Adventure & Scuba Tour" — 6-day Andaman Islands holiday package, India. Scene: adventure turquoise lagoon, Radhanagar beach, coral islands, thrilling outdoor. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/andaman-andaman-adventure-scuba-tour-6d5n-v8.png`

Create a photorealistic travel image for "Andaman Adventure & Scuba Tour" — 6-day Andaman Islands holiday package, India. Scene: adventure turquoise lagoon, Radhanagar beach, coral islands, thrilling outdoor. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/andaman-andaman-adventure-scuba-tour-6d5n-v9.png`

Create a photorealistic travel image for "Andaman Adventure & Scuba Tour" — 6-day Andaman Islands holiday package, India. Scene: adventure turquoise lagoon, Radhanagar beach, coral islands, thrilling outdoor. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/andaman-andaman-adventure-scuba-tour-6d5n-v10.png`

Create a photorealistic travel image for "Andaman Adventure & Scuba Tour" — 6-day Andaman Islands holiday package, India. Scene: adventure turquoise lagoon, Radhanagar beach, coral islands, thrilling outdoor. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Havelock & Neil Island Explorer
Slug: `andaman-havelock-neil-island-explorer-5d4n` | 5D/4N | ₹ 24,999

**v1** → `public/images/packages/andaman-havelock-neil-island-explorer-5d4n-v1.png`

Create a photorealistic travel image for "Havelock & Neil Island Explorer" — 5-day Andaman Islands holiday package, India. Scene: scenic highlights of turquoise lagoon, Radhanagar beach, coral islands. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/andaman-havelock-neil-island-explorer-5d4n-v2.png`

Create a photorealistic travel image for "Havelock & Neil Island Explorer" — 5-day Andaman Islands holiday package, India. Scene: scenic highlights of turquoise lagoon, Radhanagar beach, coral islands. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/andaman-havelock-neil-island-explorer-5d4n-v3.png`

Create a photorealistic travel image for "Havelock & Neil Island Explorer" — 5-day Andaman Islands holiday package, India. Scene: scenic highlights of turquoise lagoon, Radhanagar beach, coral islands. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/andaman-havelock-neil-island-explorer-5d4n-v4.png`

Create a photorealistic travel image for "Havelock & Neil Island Explorer" — 5-day Andaman Islands holiday package, India. Scene: scenic highlights of turquoise lagoon, Radhanagar beach, coral islands. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/andaman-havelock-neil-island-explorer-5d4n-v5.png`

Create a photorealistic travel image for "Havelock & Neil Island Explorer" — 5-day Andaman Islands holiday package, India. Scene: scenic highlights of turquoise lagoon, Radhanagar beach, coral islands. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/andaman-havelock-neil-island-explorer-5d4n-v6.png`

Create a photorealistic travel image for "Havelock & Neil Island Explorer" — 5-day Andaman Islands holiday package, India. Scene: scenic highlights of turquoise lagoon, Radhanagar beach, coral islands. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/andaman-havelock-neil-island-explorer-5d4n-v7.png`

Create a photorealistic travel image for "Havelock & Neil Island Explorer" — 5-day Andaman Islands holiday package, India. Scene: scenic highlights of turquoise lagoon, Radhanagar beach, coral islands. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/andaman-havelock-neil-island-explorer-5d4n-v8.png`

Create a photorealistic travel image for "Havelock & Neil Island Explorer" — 5-day Andaman Islands holiday package, India. Scene: scenic highlights of turquoise lagoon, Radhanagar beach, coral islands. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/andaman-havelock-neil-island-explorer-5d4n-v9.png`

Create a photorealistic travel image for "Havelock & Neil Island Explorer" — 5-day Andaman Islands holiday package, India. Scene: scenic highlights of turquoise lagoon, Radhanagar beach, coral islands. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/andaman-havelock-neil-island-explorer-5d4n-v10.png`

Create a photorealistic travel image for "Havelock & Neil Island Explorer" — 5-day Andaman Islands holiday package, India. Scene: scenic highlights of turquoise lagoon, Radhanagar beach, coral islands. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Complete Andaman Grand Tour
Slug: `andaman-complete-andaman-grand-tour-7d6n` | 7D/6N | ₹ 34,999

**v1** → `public/images/packages/andaman-complete-andaman-grand-tour-7d6n-v1.png`

Create a photorealistic travel image for "Complete Andaman Grand Tour" — 7-day Andaman Islands holiday package, India. Scene: heritage circuit turquoise lagoon, Radhanagar beach, coral islands. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/andaman-complete-andaman-grand-tour-7d6n-v2.png`

Create a photorealistic travel image for "Complete Andaman Grand Tour" — 7-day Andaman Islands holiday package, India. Scene: heritage circuit turquoise lagoon, Radhanagar beach, coral islands. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/andaman-complete-andaman-grand-tour-7d6n-v3.png`

Create a photorealistic travel image for "Complete Andaman Grand Tour" — 7-day Andaman Islands holiday package, India. Scene: heritage circuit turquoise lagoon, Radhanagar beach, coral islands. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/andaman-complete-andaman-grand-tour-7d6n-v4.png`

Create a photorealistic travel image for "Complete Andaman Grand Tour" — 7-day Andaman Islands holiday package, India. Scene: heritage circuit turquoise lagoon, Radhanagar beach, coral islands. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/andaman-complete-andaman-grand-tour-7d6n-v5.png`

Create a photorealistic travel image for "Complete Andaman Grand Tour" — 7-day Andaman Islands holiday package, India. Scene: heritage circuit turquoise lagoon, Radhanagar beach, coral islands. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/andaman-complete-andaman-grand-tour-7d6n-v6.png`

Create a photorealistic travel image for "Complete Andaman Grand Tour" — 7-day Andaman Islands holiday package, India. Scene: heritage circuit turquoise lagoon, Radhanagar beach, coral islands. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/andaman-complete-andaman-grand-tour-7d6n-v7.png`

Create a photorealistic travel image for "Complete Andaman Grand Tour" — 7-day Andaman Islands holiday package, India. Scene: heritage circuit turquoise lagoon, Radhanagar beach, coral islands. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/andaman-complete-andaman-grand-tour-7d6n-v8.png`

Create a photorealistic travel image for "Complete Andaman Grand Tour" — 7-day Andaman Islands holiday package, India. Scene: heritage circuit turquoise lagoon, Radhanagar beach, coral islands. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/andaman-complete-andaman-grand-tour-7d6n-v9.png`

Create a photorealistic travel image for "Complete Andaman Grand Tour" — 7-day Andaman Islands holiday package, India. Scene: heritage circuit turquoise lagoon, Radhanagar beach, coral islands. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/andaman-complete-andaman-grand-tour-7d6n-v10.png`

Create a photorealistic travel image for "Complete Andaman Grand Tour" — 7-day Andaman Islands holiday package, India. Scene: heritage circuit turquoise lagoon, Radhanagar beach, coral islands. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.


### Goa (6 packages)

#### South Goa Serenity Escape
Slug: `goa-south-goa-serenity-escape-4d3n` | 4D/3N | ₹ 12,999

**v1** → `public/images/packages/goa-south-goa-serenity-escape-4d3n-v1.png`

Create a photorealistic travel image for "South Goa Serenity Escape" — 4-day Goa holiday package, India. Scene: scenic highlights of tropical beaches, palm trees, Portuguese heritage. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/goa-south-goa-serenity-escape-4d3n-v2.png`

Create a photorealistic travel image for "South Goa Serenity Escape" — 4-day Goa holiday package, India. Scene: scenic highlights of tropical beaches, palm trees, Portuguese heritage. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/goa-south-goa-serenity-escape-4d3n-v3.png`

Create a photorealistic travel image for "South Goa Serenity Escape" — 4-day Goa holiday package, India. Scene: scenic highlights of tropical beaches, palm trees, Portuguese heritage. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/goa-south-goa-serenity-escape-4d3n-v4.png`

Create a photorealistic travel image for "South Goa Serenity Escape" — 4-day Goa holiday package, India. Scene: scenic highlights of tropical beaches, palm trees, Portuguese heritage. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/goa-south-goa-serenity-escape-4d3n-v5.png`

Create a photorealistic travel image for "South Goa Serenity Escape" — 4-day Goa holiday package, India. Scene: scenic highlights of tropical beaches, palm trees, Portuguese heritage. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/goa-south-goa-serenity-escape-4d3n-v6.png`

Create a photorealistic travel image for "South Goa Serenity Escape" — 4-day Goa holiday package, India. Scene: scenic highlights of tropical beaches, palm trees, Portuguese heritage. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/goa-south-goa-serenity-escape-4d3n-v7.png`

Create a photorealistic travel image for "South Goa Serenity Escape" — 4-day Goa holiday package, India. Scene: scenic highlights of tropical beaches, palm trees, Portuguese heritage. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/goa-south-goa-serenity-escape-4d3n-v8.png`

Create a photorealistic travel image for "South Goa Serenity Escape" — 4-day Goa holiday package, India. Scene: scenic highlights of tropical beaches, palm trees, Portuguese heritage. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/goa-south-goa-serenity-escape-4d3n-v9.png`

Create a photorealistic travel image for "South Goa Serenity Escape" — 4-day Goa holiday package, India. Scene: scenic highlights of tropical beaches, palm trees, Portuguese heritage. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/goa-south-goa-serenity-escape-4d3n-v10.png`

Create a photorealistic travel image for "South Goa Serenity Escape" — 4-day Goa holiday package, India. Scene: scenic highlights of tropical beaches, palm trees, Portuguese heritage. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### North Goa Fun & Adventure Tour
Slug: `goa-north-goa-fun-adventure-tour-4d3n` | 4D/3N | ₹ 13,999

**v1** → `public/images/packages/goa-north-goa-fun-adventure-tour-4d3n-v1.png`

Create a photorealistic travel image for "North Goa Fun & Adventure Tour" — 4-day Goa holiday package, India. Scene: adventure tropical beaches, palm trees, Portuguese heritage, thrilling outdoor. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/goa-north-goa-fun-adventure-tour-4d3n-v2.png`

Create a photorealistic travel image for "North Goa Fun & Adventure Tour" — 4-day Goa holiday package, India. Scene: adventure tropical beaches, palm trees, Portuguese heritage, thrilling outdoor. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/goa-north-goa-fun-adventure-tour-4d3n-v3.png`

Create a photorealistic travel image for "North Goa Fun & Adventure Tour" — 4-day Goa holiday package, India. Scene: adventure tropical beaches, palm trees, Portuguese heritage, thrilling outdoor. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/goa-north-goa-fun-adventure-tour-4d3n-v4.png`

Create a photorealistic travel image for "North Goa Fun & Adventure Tour" — 4-day Goa holiday package, India. Scene: adventure tropical beaches, palm trees, Portuguese heritage, thrilling outdoor. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/goa-north-goa-fun-adventure-tour-4d3n-v5.png`

Create a photorealistic travel image for "North Goa Fun & Adventure Tour" — 4-day Goa holiday package, India. Scene: adventure tropical beaches, palm trees, Portuguese heritage, thrilling outdoor. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/goa-north-goa-fun-adventure-tour-4d3n-v6.png`

Create a photorealistic travel image for "North Goa Fun & Adventure Tour" — 4-day Goa holiday package, India. Scene: adventure tropical beaches, palm trees, Portuguese heritage, thrilling outdoor. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/goa-north-goa-fun-adventure-tour-4d3n-v7.png`

Create a photorealistic travel image for "North Goa Fun & Adventure Tour" — 4-day Goa holiday package, India. Scene: adventure tropical beaches, palm trees, Portuguese heritage, thrilling outdoor. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/goa-north-goa-fun-adventure-tour-4d3n-v8.png`

Create a photorealistic travel image for "North Goa Fun & Adventure Tour" — 4-day Goa holiday package, India. Scene: adventure tropical beaches, palm trees, Portuguese heritage, thrilling outdoor. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/goa-north-goa-fun-adventure-tour-4d3n-v9.png`

Create a photorealistic travel image for "North Goa Fun & Adventure Tour" — 4-day Goa holiday package, India. Scene: adventure tropical beaches, palm trees, Portuguese heritage, thrilling outdoor. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/goa-north-goa-fun-adventure-tour-4d3n-v10.png`

Create a photorealistic travel image for "North Goa Fun & Adventure Tour" — 4-day Goa holiday package, India. Scene: adventure tropical beaches, palm trees, Portuguese heritage, thrilling outdoor. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Complete Goa Explorer Package
Slug: `goa-complete-goa-explorer-package-6d5n` | 6D/5N | ₹ 21,999

**v1** → `public/images/packages/goa-complete-goa-explorer-package-6d5n-v1.png`

Create a photorealistic travel image for "Complete Goa Explorer Package" — 6-day Goa holiday package, India. Scene: scenic highlights of tropical beaches, palm trees, Portuguese heritage. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/goa-complete-goa-explorer-package-6d5n-v2.png`

Create a photorealistic travel image for "Complete Goa Explorer Package" — 6-day Goa holiday package, India. Scene: scenic highlights of tropical beaches, palm trees, Portuguese heritage. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/goa-complete-goa-explorer-package-6d5n-v3.png`

Create a photorealistic travel image for "Complete Goa Explorer Package" — 6-day Goa holiday package, India. Scene: scenic highlights of tropical beaches, palm trees, Portuguese heritage. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/goa-complete-goa-explorer-package-6d5n-v4.png`

Create a photorealistic travel image for "Complete Goa Explorer Package" — 6-day Goa holiday package, India. Scene: scenic highlights of tropical beaches, palm trees, Portuguese heritage. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/goa-complete-goa-explorer-package-6d5n-v5.png`

Create a photorealistic travel image for "Complete Goa Explorer Package" — 6-day Goa holiday package, India. Scene: scenic highlights of tropical beaches, palm trees, Portuguese heritage. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/goa-complete-goa-explorer-package-6d5n-v6.png`

Create a photorealistic travel image for "Complete Goa Explorer Package" — 6-day Goa holiday package, India. Scene: scenic highlights of tropical beaches, palm trees, Portuguese heritage. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/goa-complete-goa-explorer-package-6d5n-v7.png`

Create a photorealistic travel image for "Complete Goa Explorer Package" — 6-day Goa holiday package, India. Scene: scenic highlights of tropical beaches, palm trees, Portuguese heritage. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/goa-complete-goa-explorer-package-6d5n-v8.png`

Create a photorealistic travel image for "Complete Goa Explorer Package" — 6-day Goa holiday package, India. Scene: scenic highlights of tropical beaches, palm trees, Portuguese heritage. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/goa-complete-goa-explorer-package-6d5n-v9.png`

Create a photorealistic travel image for "Complete Goa Explorer Package" — 6-day Goa holiday package, India. Scene: scenic highlights of tropical beaches, palm trees, Portuguese heritage. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/goa-complete-goa-explorer-package-6d5n-v10.png`

Create a photorealistic travel image for "Complete Goa Explorer Package" — 6-day Goa holiday package, India. Scene: scenic highlights of tropical beaches, palm trees, Portuguese heritage. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Romantic Goa Honeymoon Package
Slug: `goa-romantic-goa-honeymoon-package-5d4n` | 5D/4N | ₹ 22,999

**v1** → `public/images/packages/goa-romantic-goa-honeymoon-package-5d4n-v1.png`

Create a photorealistic travel image for "Romantic Goa Honeymoon Package" — 5-day Goa holiday package, India. Scene: romantic tropical beaches, palm trees, Portuguese heritage, intimate luxury mood. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/goa-romantic-goa-honeymoon-package-5d4n-v2.png`

Create a photorealistic travel image for "Romantic Goa Honeymoon Package" — 5-day Goa holiday package, India. Scene: romantic tropical beaches, palm trees, Portuguese heritage, intimate luxury mood. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/goa-romantic-goa-honeymoon-package-5d4n-v3.png`

Create a photorealistic travel image for "Romantic Goa Honeymoon Package" — 5-day Goa holiday package, India. Scene: romantic tropical beaches, palm trees, Portuguese heritage, intimate luxury mood. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/goa-romantic-goa-honeymoon-package-5d4n-v4.png`

Create a photorealistic travel image for "Romantic Goa Honeymoon Package" — 5-day Goa holiday package, India. Scene: romantic tropical beaches, palm trees, Portuguese heritage, intimate luxury mood. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/goa-romantic-goa-honeymoon-package-5d4n-v5.png`

Create a photorealistic travel image for "Romantic Goa Honeymoon Package" — 5-day Goa holiday package, India. Scene: romantic tropical beaches, palm trees, Portuguese heritage, intimate luxury mood. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/goa-romantic-goa-honeymoon-package-5d4n-v6.png`

Create a photorealistic travel image for "Romantic Goa Honeymoon Package" — 5-day Goa holiday package, India. Scene: romantic tropical beaches, palm trees, Portuguese heritage, intimate luxury mood. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/goa-romantic-goa-honeymoon-package-5d4n-v7.png`

Create a photorealistic travel image for "Romantic Goa Honeymoon Package" — 5-day Goa holiday package, India. Scene: romantic tropical beaches, palm trees, Portuguese heritage, intimate luxury mood. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/goa-romantic-goa-honeymoon-package-5d4n-v8.png`

Create a photorealistic travel image for "Romantic Goa Honeymoon Package" — 5-day Goa holiday package, India. Scene: romantic tropical beaches, palm trees, Portuguese heritage, intimate luxury mood. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/goa-romantic-goa-honeymoon-package-5d4n-v9.png`

Create a photorealistic travel image for "Romantic Goa Honeymoon Package" — 5-day Goa holiday package, India. Scene: romantic tropical beaches, palm trees, Portuguese heritage, intimate luxury mood. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/goa-romantic-goa-honeymoon-package-5d4n-v10.png`

Create a photorealistic travel image for "Romantic Goa Honeymoon Package" — 5-day Goa holiday package, India. Scene: romantic tropical beaches, palm trees, Portuguese heritage, intimate luxury mood. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### ‍‍‍ Goa Family Holiday Package
Slug: `goa-goa-family-holiday-package-5d4n` | 5D/4N | ₹ 18,999

**v1** → `public/images/packages/goa-goa-family-holiday-package-5d4n-v1.png`

Create a photorealistic travel image for "‍‍‍ Goa Family Holiday Package" — 5-day Goa holiday package, India. Scene: family-friendly tropical beaches, palm trees, Portuguese heritage, cheerful safe travel. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/goa-goa-family-holiday-package-5d4n-v2.png`

Create a photorealistic travel image for "‍‍‍ Goa Family Holiday Package" — 5-day Goa holiday package, India. Scene: family-friendly tropical beaches, palm trees, Portuguese heritage, cheerful safe travel. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/goa-goa-family-holiday-package-5d4n-v3.png`

Create a photorealistic travel image for "‍‍‍ Goa Family Holiday Package" — 5-day Goa holiday package, India. Scene: family-friendly tropical beaches, palm trees, Portuguese heritage, cheerful safe travel. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/goa-goa-family-holiday-package-5d4n-v4.png`

Create a photorealistic travel image for "‍‍‍ Goa Family Holiday Package" — 5-day Goa holiday package, India. Scene: family-friendly tropical beaches, palm trees, Portuguese heritage, cheerful safe travel. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/goa-goa-family-holiday-package-5d4n-v5.png`

Create a photorealistic travel image for "‍‍‍ Goa Family Holiday Package" — 5-day Goa holiday package, India. Scene: family-friendly tropical beaches, palm trees, Portuguese heritage, cheerful safe travel. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/goa-goa-family-holiday-package-5d4n-v6.png`

Create a photorealistic travel image for "‍‍‍ Goa Family Holiday Package" — 5-day Goa holiday package, India. Scene: family-friendly tropical beaches, palm trees, Portuguese heritage, cheerful safe travel. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/goa-goa-family-holiday-package-5d4n-v7.png`

Create a photorealistic travel image for "‍‍‍ Goa Family Holiday Package" — 5-day Goa holiday package, India. Scene: family-friendly tropical beaches, palm trees, Portuguese heritage, cheerful safe travel. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/goa-goa-family-holiday-package-5d4n-v8.png`

Create a photorealistic travel image for "‍‍‍ Goa Family Holiday Package" — 5-day Goa holiday package, India. Scene: family-friendly tropical beaches, palm trees, Portuguese heritage, cheerful safe travel. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/goa-goa-family-holiday-package-5d4n-v9.png`

Create a photorealistic travel image for "‍‍‍ Goa Family Holiday Package" — 5-day Goa holiday package, India. Scene: family-friendly tropical beaches, palm trees, Portuguese heritage, cheerful safe travel. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/goa-goa-family-holiday-package-5d4n-v10.png`

Create a photorealistic travel image for "‍‍‍ Goa Family Holiday Package" — 5-day Goa holiday package, India. Scene: family-friendly tropical beaches, palm trees, Portuguese heritage, cheerful safe travel. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Luxury Goa Beach & Resort Escape ⭐ Premium Package
Slug: `goa-luxury-goa-beach-resort-escape-premium-package-6d5n` | 6D/5N | ₹ 34,999

**v1** → `public/images/packages/goa-luxury-goa-beach-resort-escape-premium-package-6d5n-v1.png`

Create a photorealistic travel image for "Luxury Goa Beach & Resort Escape ⭐ Premium Package" — 6-day Goa holiday package, India. Scene: coastal beaches tropical beaches, palm trees, Portuguese heritage. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/goa-luxury-goa-beach-resort-escape-premium-package-6d5n-v2.png`

Create a photorealistic travel image for "Luxury Goa Beach & Resort Escape ⭐ Premium Package" — 6-day Goa holiday package, India. Scene: coastal beaches tropical beaches, palm trees, Portuguese heritage. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/goa-luxury-goa-beach-resort-escape-premium-package-6d5n-v3.png`

Create a photorealistic travel image for "Luxury Goa Beach & Resort Escape ⭐ Premium Package" — 6-day Goa holiday package, India. Scene: coastal beaches tropical beaches, palm trees, Portuguese heritage. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/goa-luxury-goa-beach-resort-escape-premium-package-6d5n-v4.png`

Create a photorealistic travel image for "Luxury Goa Beach & Resort Escape ⭐ Premium Package" — 6-day Goa holiday package, India. Scene: coastal beaches tropical beaches, palm trees, Portuguese heritage. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/goa-luxury-goa-beach-resort-escape-premium-package-6d5n-v5.png`

Create a photorealistic travel image for "Luxury Goa Beach & Resort Escape ⭐ Premium Package" — 6-day Goa holiday package, India. Scene: coastal beaches tropical beaches, palm trees, Portuguese heritage. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/goa-luxury-goa-beach-resort-escape-premium-package-6d5n-v6.png`

Create a photorealistic travel image for "Luxury Goa Beach & Resort Escape ⭐ Premium Package" — 6-day Goa holiday package, India. Scene: coastal beaches tropical beaches, palm trees, Portuguese heritage. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/goa-luxury-goa-beach-resort-escape-premium-package-6d5n-v7.png`

Create a photorealistic travel image for "Luxury Goa Beach & Resort Escape ⭐ Premium Package" — 6-day Goa holiday package, India. Scene: coastal beaches tropical beaches, palm trees, Portuguese heritage. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/goa-luxury-goa-beach-resort-escape-premium-package-6d5n-v8.png`

Create a photorealistic travel image for "Luxury Goa Beach & Resort Escape ⭐ Premium Package" — 6-day Goa holiday package, India. Scene: coastal beaches tropical beaches, palm trees, Portuguese heritage. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/goa-luxury-goa-beach-resort-escape-premium-package-6d5n-v9.png`

Create a photorealistic travel image for "Luxury Goa Beach & Resort Escape ⭐ Premium Package" — 6-day Goa holiday package, India. Scene: coastal beaches tropical beaches, palm trees, Portuguese heritage. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/goa-luxury-goa-beach-resort-escape-premium-package-6d5n-v10.png`

Create a photorealistic travel image for "Luxury Goa Beach & Resort Escape ⭐ Premium Package" — 6-day Goa holiday package, India. Scene: coastal beaches tropical beaches, palm trees, Portuguese heritage. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.


### Gujarat (6 packages)

#### Divine Dwarka Somnath Pilgrimage Tour
Slug: `gujarat-divine-dwarka-somnath-pilgrimage-tour-4d3n` | 4D/3N | ₹ 13,999

**v1** → `public/images/packages/gujarat-divine-dwarka-somnath-pilgrimage-tour-4d3n-v1.png`

Create a photorealistic travel image for "Divine Dwarka Somnath Pilgrimage Tour" — 4-day Gujarat holiday package, India. Scene: spiritual pilgrimage Rann of Kutch white desert, Somnath, Statue of Unity, respectful reverent mood. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/gujarat-divine-dwarka-somnath-pilgrimage-tour-4d3n-v2.png`

Create a photorealistic travel image for "Divine Dwarka Somnath Pilgrimage Tour" — 4-day Gujarat holiday package, India. Scene: spiritual pilgrimage Rann of Kutch white desert, Somnath, Statue of Unity, respectful reverent mood. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/gujarat-divine-dwarka-somnath-pilgrimage-tour-4d3n-v3.png`

Create a photorealistic travel image for "Divine Dwarka Somnath Pilgrimage Tour" — 4-day Gujarat holiday package, India. Scene: spiritual pilgrimage Rann of Kutch white desert, Somnath, Statue of Unity, respectful reverent mood. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/gujarat-divine-dwarka-somnath-pilgrimage-tour-4d3n-v4.png`

Create a photorealistic travel image for "Divine Dwarka Somnath Pilgrimage Tour" — 4-day Gujarat holiday package, India. Scene: spiritual pilgrimage Rann of Kutch white desert, Somnath, Statue of Unity, respectful reverent mood. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/gujarat-divine-dwarka-somnath-pilgrimage-tour-4d3n-v5.png`

Create a photorealistic travel image for "Divine Dwarka Somnath Pilgrimage Tour" — 4-day Gujarat holiday package, India. Scene: spiritual pilgrimage Rann of Kutch white desert, Somnath, Statue of Unity, respectful reverent mood. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/gujarat-divine-dwarka-somnath-pilgrimage-tour-4d3n-v6.png`

Create a photorealistic travel image for "Divine Dwarka Somnath Pilgrimage Tour" — 4-day Gujarat holiday package, India. Scene: spiritual pilgrimage Rann of Kutch white desert, Somnath, Statue of Unity, respectful reverent mood. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/gujarat-divine-dwarka-somnath-pilgrimage-tour-4d3n-v7.png`

Create a photorealistic travel image for "Divine Dwarka Somnath Pilgrimage Tour" — 4-day Gujarat holiday package, India. Scene: spiritual pilgrimage Rann of Kutch white desert, Somnath, Statue of Unity, respectful reverent mood. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/gujarat-divine-dwarka-somnath-pilgrimage-tour-4d3n-v8.png`

Create a photorealistic travel image for "Divine Dwarka Somnath Pilgrimage Tour" — 4-day Gujarat holiday package, India. Scene: spiritual pilgrimage Rann of Kutch white desert, Somnath, Statue of Unity, respectful reverent mood. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/gujarat-divine-dwarka-somnath-pilgrimage-tour-4d3n-v9.png`

Create a photorealistic travel image for "Divine Dwarka Somnath Pilgrimage Tour" — 4-day Gujarat holiday package, India. Scene: spiritual pilgrimage Rann of Kutch white desert, Somnath, Statue of Unity, respectful reverent mood. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/gujarat-divine-dwarka-somnath-pilgrimage-tour-4d3n-v10.png`

Create a photorealistic travel image for "Divine Dwarka Somnath Pilgrimage Tour" — 4-day Gujarat holiday package, India. Scene: spiritual pilgrimage Rann of Kutch white desert, Somnath, Statue of Unity, respectful reverent mood. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Dwarka Somnath & Gir Wildlife Tour
Slug: `gujarat-dwarka-somnath-gir-wildlife-tour-5d4n` | 5D/4N | ₹ 17,999

**v1** → `public/images/packages/gujarat-dwarka-somnath-gir-wildlife-tour-5d4n-v1.png`

Create a photorealistic travel image for "Dwarka Somnath & Gir Wildlife Tour" — 5-day Gujarat holiday package, India. Scene: wildlife safari Rann of Kutch white desert, Somnath, Statue of Unity. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/gujarat-dwarka-somnath-gir-wildlife-tour-5d4n-v2.png`

Create a photorealistic travel image for "Dwarka Somnath & Gir Wildlife Tour" — 5-day Gujarat holiday package, India. Scene: wildlife safari Rann of Kutch white desert, Somnath, Statue of Unity. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/gujarat-dwarka-somnath-gir-wildlife-tour-5d4n-v3.png`

Create a photorealistic travel image for "Dwarka Somnath & Gir Wildlife Tour" — 5-day Gujarat holiday package, India. Scene: wildlife safari Rann of Kutch white desert, Somnath, Statue of Unity. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/gujarat-dwarka-somnath-gir-wildlife-tour-5d4n-v4.png`

Create a photorealistic travel image for "Dwarka Somnath & Gir Wildlife Tour" — 5-day Gujarat holiday package, India. Scene: wildlife safari Rann of Kutch white desert, Somnath, Statue of Unity. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/gujarat-dwarka-somnath-gir-wildlife-tour-5d4n-v5.png`

Create a photorealistic travel image for "Dwarka Somnath & Gir Wildlife Tour" — 5-day Gujarat holiday package, India. Scene: wildlife safari Rann of Kutch white desert, Somnath, Statue of Unity. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/gujarat-dwarka-somnath-gir-wildlife-tour-5d4n-v6.png`

Create a photorealistic travel image for "Dwarka Somnath & Gir Wildlife Tour" — 5-day Gujarat holiday package, India. Scene: wildlife safari Rann of Kutch white desert, Somnath, Statue of Unity. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/gujarat-dwarka-somnath-gir-wildlife-tour-5d4n-v7.png`

Create a photorealistic travel image for "Dwarka Somnath & Gir Wildlife Tour" — 5-day Gujarat holiday package, India. Scene: wildlife safari Rann of Kutch white desert, Somnath, Statue of Unity. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/gujarat-dwarka-somnath-gir-wildlife-tour-5d4n-v8.png`

Create a photorealistic travel image for "Dwarka Somnath & Gir Wildlife Tour" — 5-day Gujarat holiday package, India. Scene: wildlife safari Rann of Kutch white desert, Somnath, Statue of Unity. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/gujarat-dwarka-somnath-gir-wildlife-tour-5d4n-v9.png`

Create a photorealistic travel image for "Dwarka Somnath & Gir Wildlife Tour" — 5-day Gujarat holiday package, India. Scene: wildlife safari Rann of Kutch white desert, Somnath, Statue of Unity. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/gujarat-dwarka-somnath-gir-wildlife-tour-5d4n-v10.png`

Create a photorealistic travel image for "Dwarka Somnath & Gir Wildlife Tour" — 5-day Gujarat holiday package, India. Scene: wildlife safari Rann of Kutch white desert, Somnath, Statue of Unity. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Gujarat Coastal Heritage & Diu Beach Escape
Slug: `gujarat-gujarat-coastal-heritage-diu-beach-escape-6d5n` | 6D/5N | ₹ 19,999

**v1** → `public/images/packages/gujarat-gujarat-coastal-heritage-diu-beach-escape-6d5n-v1.png`

Create a photorealistic travel image for "Gujarat Coastal Heritage & Diu Beach Escape" — 6-day Gujarat holiday package, India. Scene: coastal beaches Rann of Kutch white desert, Somnath, Statue of Unity. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/gujarat-gujarat-coastal-heritage-diu-beach-escape-6d5n-v2.png`

Create a photorealistic travel image for "Gujarat Coastal Heritage & Diu Beach Escape" — 6-day Gujarat holiday package, India. Scene: coastal beaches Rann of Kutch white desert, Somnath, Statue of Unity. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/gujarat-gujarat-coastal-heritage-diu-beach-escape-6d5n-v3.png`

Create a photorealistic travel image for "Gujarat Coastal Heritage & Diu Beach Escape" — 6-day Gujarat holiday package, India. Scene: coastal beaches Rann of Kutch white desert, Somnath, Statue of Unity. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/gujarat-gujarat-coastal-heritage-diu-beach-escape-6d5n-v4.png`

Create a photorealistic travel image for "Gujarat Coastal Heritage & Diu Beach Escape" — 6-day Gujarat holiday package, India. Scene: coastal beaches Rann of Kutch white desert, Somnath, Statue of Unity. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/gujarat-gujarat-coastal-heritage-diu-beach-escape-6d5n-v5.png`

Create a photorealistic travel image for "Gujarat Coastal Heritage & Diu Beach Escape" — 6-day Gujarat holiday package, India. Scene: coastal beaches Rann of Kutch white desert, Somnath, Statue of Unity. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/gujarat-gujarat-coastal-heritage-diu-beach-escape-6d5n-v6.png`

Create a photorealistic travel image for "Gujarat Coastal Heritage & Diu Beach Escape" — 6-day Gujarat holiday package, India. Scene: coastal beaches Rann of Kutch white desert, Somnath, Statue of Unity. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/gujarat-gujarat-coastal-heritage-diu-beach-escape-6d5n-v7.png`

Create a photorealistic travel image for "Gujarat Coastal Heritage & Diu Beach Escape" — 6-day Gujarat holiday package, India. Scene: coastal beaches Rann of Kutch white desert, Somnath, Statue of Unity. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/gujarat-gujarat-coastal-heritage-diu-beach-escape-6d5n-v8.png`

Create a photorealistic travel image for "Gujarat Coastal Heritage & Diu Beach Escape" — 6-day Gujarat holiday package, India. Scene: coastal beaches Rann of Kutch white desert, Somnath, Statue of Unity. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/gujarat-gujarat-coastal-heritage-diu-beach-escape-6d5n-v9.png`

Create a photorealistic travel image for "Gujarat Coastal Heritage & Diu Beach Escape" — 6-day Gujarat holiday package, India. Scene: coastal beaches Rann of Kutch white desert, Somnath, Statue of Unity. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/gujarat-gujarat-coastal-heritage-diu-beach-escape-6d5n-v10.png`

Create a photorealistic travel image for "Gujarat Coastal Heritage & Diu Beach Escape" — 6-day Gujarat holiday package, India. Scene: coastal beaches Rann of Kutch white desert, Somnath, Statue of Unity. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### White Rann of Kutch Cultural Escape
Slug: `gujarat-white-rann-of-kutch-cultural-escape-4d3n` | 4D/3N | ₹ 16,999

**v1** → `public/images/packages/gujarat-white-rann-of-kutch-cultural-escape-4d3n-v1.png`

Create a photorealistic travel image for "White Rann of Kutch Cultural Escape" — 4-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/gujarat-white-rann-of-kutch-cultural-escape-4d3n-v2.png`

Create a photorealistic travel image for "White Rann of Kutch Cultural Escape" — 4-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/gujarat-white-rann-of-kutch-cultural-escape-4d3n-v3.png`

Create a photorealistic travel image for "White Rann of Kutch Cultural Escape" — 4-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/gujarat-white-rann-of-kutch-cultural-escape-4d3n-v4.png`

Create a photorealistic travel image for "White Rann of Kutch Cultural Escape" — 4-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/gujarat-white-rann-of-kutch-cultural-escape-4d3n-v5.png`

Create a photorealistic travel image for "White Rann of Kutch Cultural Escape" — 4-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/gujarat-white-rann-of-kutch-cultural-escape-4d3n-v6.png`

Create a photorealistic travel image for "White Rann of Kutch Cultural Escape" — 4-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/gujarat-white-rann-of-kutch-cultural-escape-4d3n-v7.png`

Create a photorealistic travel image for "White Rann of Kutch Cultural Escape" — 4-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/gujarat-white-rann-of-kutch-cultural-escape-4d3n-v8.png`

Create a photorealistic travel image for "White Rann of Kutch Cultural Escape" — 4-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/gujarat-white-rann-of-kutch-cultural-escape-4d3n-v9.png`

Create a photorealistic travel image for "White Rann of Kutch Cultural Escape" — 4-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/gujarat-white-rann-of-kutch-cultural-escape-4d3n-v10.png`

Create a photorealistic travel image for "White Rann of Kutch Cultural Escape" — 4-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Statue of Unity & Kevadia Experience
Slug: `gujarat-statue-of-unity-kevadia-experience-2d1n` | 2D/1N | ₹ 9,999

**v1** → `public/images/packages/gujarat-statue-of-unity-kevadia-experience-2d1n-v1.png`

Create a photorealistic travel image for "Statue of Unity & Kevadia Experience" — 2-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/gujarat-statue-of-unity-kevadia-experience-2d1n-v2.png`

Create a photorealistic travel image for "Statue of Unity & Kevadia Experience" — 2-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/gujarat-statue-of-unity-kevadia-experience-2d1n-v3.png`

Create a photorealistic travel image for "Statue of Unity & Kevadia Experience" — 2-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/gujarat-statue-of-unity-kevadia-experience-2d1n-v4.png`

Create a photorealistic travel image for "Statue of Unity & Kevadia Experience" — 2-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/gujarat-statue-of-unity-kevadia-experience-2d1n-v5.png`

Create a photorealistic travel image for "Statue of Unity & Kevadia Experience" — 2-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/gujarat-statue-of-unity-kevadia-experience-2d1n-v6.png`

Create a photorealistic travel image for "Statue of Unity & Kevadia Experience" — 2-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/gujarat-statue-of-unity-kevadia-experience-2d1n-v7.png`

Create a photorealistic travel image for "Statue of Unity & Kevadia Experience" — 2-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/gujarat-statue-of-unity-kevadia-experience-2d1n-v8.png`

Create a photorealistic travel image for "Statue of Unity & Kevadia Experience" — 2-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/gujarat-statue-of-unity-kevadia-experience-2d1n-v9.png`

Create a photorealistic travel image for "Statue of Unity & Kevadia Experience" — 2-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/gujarat-statue-of-unity-kevadia-experience-2d1n-v10.png`

Create a photorealistic travel image for "Statue of Unity & Kevadia Experience" — 2-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Complete Gujarat Grand Discovery Tour
Slug: `gujarat-complete-gujarat-grand-discovery-tour-9d8n` | 9D/8N | ₹ 31,999

**v1** → `public/images/packages/gujarat-complete-gujarat-grand-discovery-tour-9d8n-v1.png`

Create a photorealistic travel image for "Complete Gujarat Grand Discovery Tour" — 9-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/gujarat-complete-gujarat-grand-discovery-tour-9d8n-v2.png`

Create a photorealistic travel image for "Complete Gujarat Grand Discovery Tour" — 9-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/gujarat-complete-gujarat-grand-discovery-tour-9d8n-v3.png`

Create a photorealistic travel image for "Complete Gujarat Grand Discovery Tour" — 9-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/gujarat-complete-gujarat-grand-discovery-tour-9d8n-v4.png`

Create a photorealistic travel image for "Complete Gujarat Grand Discovery Tour" — 9-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/gujarat-complete-gujarat-grand-discovery-tour-9d8n-v5.png`

Create a photorealistic travel image for "Complete Gujarat Grand Discovery Tour" — 9-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/gujarat-complete-gujarat-grand-discovery-tour-9d8n-v6.png`

Create a photorealistic travel image for "Complete Gujarat Grand Discovery Tour" — 9-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/gujarat-complete-gujarat-grand-discovery-tour-9d8n-v7.png`

Create a photorealistic travel image for "Complete Gujarat Grand Discovery Tour" — 9-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/gujarat-complete-gujarat-grand-discovery-tour-9d8n-v8.png`

Create a photorealistic travel image for "Complete Gujarat Grand Discovery Tour" — 9-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/gujarat-complete-gujarat-grand-discovery-tour-9d8n-v9.png`

Create a photorealistic travel image for "Complete Gujarat Grand Discovery Tour" — 9-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/gujarat-complete-gujarat-grand-discovery-tour-9d8n-v10.png`

Create a photorealistic travel image for "Complete Gujarat Grand Discovery Tour" — 9-day Gujarat holiday package, India. Scene: scenic highlights of Rann of Kutch white desert, Somnath, Statue of Unity. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.


### Himachal Pradesh (6 packages)

#### Shimla Manali Tour Package
Slug: `himachal-shimla-manali-tour-package-6d5n` | 6D/5N | ₹ 16,999

**v1** → `public/images/packages/himachal-shimla-manali-tour-package-6d5n-v1.png`

Create a photorealistic travel image for "Shimla Manali Tour Package" — 6-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/himachal-shimla-manali-tour-package-6d5n-v2.png`

Create a photorealistic travel image for "Shimla Manali Tour Package" — 6-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/himachal-shimla-manali-tour-package-6d5n-v3.png`

Create a photorealistic travel image for "Shimla Manali Tour Package" — 6-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/himachal-shimla-manali-tour-package-6d5n-v4.png`

Create a photorealistic travel image for "Shimla Manali Tour Package" — 6-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/himachal-shimla-manali-tour-package-6d5n-v5.png`

Create a photorealistic travel image for "Shimla Manali Tour Package" — 6-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/himachal-shimla-manali-tour-package-6d5n-v6.png`

Create a photorealistic travel image for "Shimla Manali Tour Package" — 6-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/himachal-shimla-manali-tour-package-6d5n-v7.png`

Create a photorealistic travel image for "Shimla Manali Tour Package" — 6-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/himachal-shimla-manali-tour-package-6d5n-v8.png`

Create a photorealistic travel image for "Shimla Manali Tour Package" — 6-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/himachal-shimla-manali-tour-package-6d5n-v9.png`

Create a photorealistic travel image for "Shimla Manali Tour Package" — 6-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/himachal-shimla-manali-tour-package-6d5n-v10.png`

Create a photorealistic travel image for "Shimla Manali Tour Package" — 6-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### ‍‍‍ Himachal Family Tour Package
Slug: `himachal-himachal-family-tour-package-8d7n` | 8D/7N | ₹ 24,999

**v1** → `public/images/packages/himachal-himachal-family-tour-package-8d7n-v1.png`

Create a photorealistic travel image for "‍‍‍ Himachal Family Tour Package" — 8-day Himachal Pradesh holiday package, India. Scene: family-friendly Manali mountains, pine forests, snow peaks, cheerful safe travel. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/himachal-himachal-family-tour-package-8d7n-v2.png`

Create a photorealistic travel image for "‍‍‍ Himachal Family Tour Package" — 8-day Himachal Pradesh holiday package, India. Scene: family-friendly Manali mountains, pine forests, snow peaks, cheerful safe travel. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/himachal-himachal-family-tour-package-8d7n-v3.png`

Create a photorealistic travel image for "‍‍‍ Himachal Family Tour Package" — 8-day Himachal Pradesh holiday package, India. Scene: family-friendly Manali mountains, pine forests, snow peaks, cheerful safe travel. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/himachal-himachal-family-tour-package-8d7n-v4.png`

Create a photorealistic travel image for "‍‍‍ Himachal Family Tour Package" — 8-day Himachal Pradesh holiday package, India. Scene: family-friendly Manali mountains, pine forests, snow peaks, cheerful safe travel. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/himachal-himachal-family-tour-package-8d7n-v5.png`

Create a photorealistic travel image for "‍‍‍ Himachal Family Tour Package" — 8-day Himachal Pradesh holiday package, India. Scene: family-friendly Manali mountains, pine forests, snow peaks, cheerful safe travel. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/himachal-himachal-family-tour-package-8d7n-v6.png`

Create a photorealistic travel image for "‍‍‍ Himachal Family Tour Package" — 8-day Himachal Pradesh holiday package, India. Scene: family-friendly Manali mountains, pine forests, snow peaks, cheerful safe travel. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/himachal-himachal-family-tour-package-8d7n-v7.png`

Create a photorealistic travel image for "‍‍‍ Himachal Family Tour Package" — 8-day Himachal Pradesh holiday package, India. Scene: family-friendly Manali mountains, pine forests, snow peaks, cheerful safe travel. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/himachal-himachal-family-tour-package-8d7n-v8.png`

Create a photorealistic travel image for "‍‍‍ Himachal Family Tour Package" — 8-day Himachal Pradesh holiday package, India. Scene: family-friendly Manali mountains, pine forests, snow peaks, cheerful safe travel. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/himachal-himachal-family-tour-package-8d7n-v9.png`

Create a photorealistic travel image for "‍‍‍ Himachal Family Tour Package" — 8-day Himachal Pradesh holiday package, India. Scene: family-friendly Manali mountains, pine forests, snow peaks, cheerful safe travel. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/himachal-himachal-family-tour-package-8d7n-v10.png`

Create a photorealistic travel image for "‍‍‍ Himachal Family Tour Package" — 8-day Himachal Pradesh holiday package, India. Scene: family-friendly Manali mountains, pine forests, snow peaks, cheerful safe travel. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Himachal Honeymoon Package
Slug: `himachal-himachal-honeymoon-package-6d5n` | 6D/5N | ₹ 22,999

**v1** → `public/images/packages/himachal-himachal-honeymoon-package-6d5n-v1.png`

Create a photorealistic travel image for "Himachal Honeymoon Package" — 6-day Himachal Pradesh holiday package, India. Scene: romantic Manali mountains, pine forests, snow peaks, intimate luxury mood. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/himachal-himachal-honeymoon-package-6d5n-v2.png`

Create a photorealistic travel image for "Himachal Honeymoon Package" — 6-day Himachal Pradesh holiday package, India. Scene: romantic Manali mountains, pine forests, snow peaks, intimate luxury mood. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/himachal-himachal-honeymoon-package-6d5n-v3.png`

Create a photorealistic travel image for "Himachal Honeymoon Package" — 6-day Himachal Pradesh holiday package, India. Scene: romantic Manali mountains, pine forests, snow peaks, intimate luxury mood. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/himachal-himachal-honeymoon-package-6d5n-v4.png`

Create a photorealistic travel image for "Himachal Honeymoon Package" — 6-day Himachal Pradesh holiday package, India. Scene: romantic Manali mountains, pine forests, snow peaks, intimate luxury mood. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/himachal-himachal-honeymoon-package-6d5n-v5.png`

Create a photorealistic travel image for "Himachal Honeymoon Package" — 6-day Himachal Pradesh holiday package, India. Scene: romantic Manali mountains, pine forests, snow peaks, intimate luxury mood. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/himachal-himachal-honeymoon-package-6d5n-v6.png`

Create a photorealistic travel image for "Himachal Honeymoon Package" — 6-day Himachal Pradesh holiday package, India. Scene: romantic Manali mountains, pine forests, snow peaks, intimate luxury mood. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/himachal-himachal-honeymoon-package-6d5n-v7.png`

Create a photorealistic travel image for "Himachal Honeymoon Package" — 6-day Himachal Pradesh holiday package, India. Scene: romantic Manali mountains, pine forests, snow peaks, intimate luxury mood. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/himachal-himachal-honeymoon-package-6d5n-v8.png`

Create a photorealistic travel image for "Himachal Honeymoon Package" — 6-day Himachal Pradesh holiday package, India. Scene: romantic Manali mountains, pine forests, snow peaks, intimate luxury mood. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/himachal-himachal-honeymoon-package-6d5n-v9.png`

Create a photorealistic travel image for "Himachal Honeymoon Package" — 6-day Himachal Pradesh holiday package, India. Scene: romantic Manali mountains, pine forests, snow peaks, intimate luxury mood. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/himachal-himachal-honeymoon-package-6d5n-v10.png`

Create a photorealistic travel image for "Himachal Honeymoon Package" — 6-day Himachal Pradesh holiday package, India. Scene: romantic Manali mountains, pine forests, snow peaks, intimate luxury mood. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Dharamshala – Dalhousie Tour Package
Slug: `himachal-dharamshala-dalhousie-tour-package-6d5n` | 6D/5N | ₹ 18,999

**v1** → `public/images/packages/himachal-dharamshala-dalhousie-tour-package-6d5n-v1.png`

Create a photorealistic travel image for "Dharamshala – Dalhousie Tour Package" — 6-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/himachal-dharamshala-dalhousie-tour-package-6d5n-v2.png`

Create a photorealistic travel image for "Dharamshala – Dalhousie Tour Package" — 6-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/himachal-dharamshala-dalhousie-tour-package-6d5n-v3.png`

Create a photorealistic travel image for "Dharamshala – Dalhousie Tour Package" — 6-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/himachal-dharamshala-dalhousie-tour-package-6d5n-v4.png`

Create a photorealistic travel image for "Dharamshala – Dalhousie Tour Package" — 6-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/himachal-dharamshala-dalhousie-tour-package-6d5n-v5.png`

Create a photorealistic travel image for "Dharamshala – Dalhousie Tour Package" — 6-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/himachal-dharamshala-dalhousie-tour-package-6d5n-v6.png`

Create a photorealistic travel image for "Dharamshala – Dalhousie Tour Package" — 6-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/himachal-dharamshala-dalhousie-tour-package-6d5n-v7.png`

Create a photorealistic travel image for "Dharamshala – Dalhousie Tour Package" — 6-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/himachal-dharamshala-dalhousie-tour-package-6d5n-v8.png`

Create a photorealistic travel image for "Dharamshala – Dalhousie Tour Package" — 6-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/himachal-dharamshala-dalhousie-tour-package-6d5n-v9.png`

Create a photorealistic travel image for "Dharamshala – Dalhousie Tour Package" — 6-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/himachal-dharamshala-dalhousie-tour-package-6d5n-v10.png`

Create a photorealistic travel image for "Dharamshala – Dalhousie Tour Package" — 6-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Complete Himachal Tour Package
Slug: `himachal-complete-himachal-tour-package-10d9n` | 10D/9N | ₹ 34,999

**v1** → `public/images/packages/himachal-complete-himachal-tour-package-10d9n-v1.png`

Create a photorealistic travel image for "Complete Himachal Tour Package" — 10-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/himachal-complete-himachal-tour-package-10d9n-v2.png`

Create a photorealistic travel image for "Complete Himachal Tour Package" — 10-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/himachal-complete-himachal-tour-package-10d9n-v3.png`

Create a photorealistic travel image for "Complete Himachal Tour Package" — 10-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/himachal-complete-himachal-tour-package-10d9n-v4.png`

Create a photorealistic travel image for "Complete Himachal Tour Package" — 10-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/himachal-complete-himachal-tour-package-10d9n-v5.png`

Create a photorealistic travel image for "Complete Himachal Tour Package" — 10-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/himachal-complete-himachal-tour-package-10d9n-v6.png`

Create a photorealistic travel image for "Complete Himachal Tour Package" — 10-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/himachal-complete-himachal-tour-package-10d9n-v7.png`

Create a photorealistic travel image for "Complete Himachal Tour Package" — 10-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/himachal-complete-himachal-tour-package-10d9n-v8.png`

Create a photorealistic travel image for "Complete Himachal Tour Package" — 10-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/himachal-complete-himachal-tour-package-10d9n-v9.png`

Create a photorealistic travel image for "Complete Himachal Tour Package" — 10-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/himachal-complete-himachal-tour-package-10d9n-v10.png`

Create a photorealistic travel image for "Complete Himachal Tour Package" — 10-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Spiti Valley Circuit Tour
Slug: `himachal-spiti-valley-circuit-tour-9d8n` | 9D/8N | ₹ 29,999

**v1** → `public/images/packages/himachal-spiti-valley-circuit-tour-9d8n-v1.png`

Create a photorealistic travel image for "Spiti Valley Circuit Tour" — 9-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/himachal-spiti-valley-circuit-tour-9d8n-v2.png`

Create a photorealistic travel image for "Spiti Valley Circuit Tour" — 9-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/himachal-spiti-valley-circuit-tour-9d8n-v3.png`

Create a photorealistic travel image for "Spiti Valley Circuit Tour" — 9-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/himachal-spiti-valley-circuit-tour-9d8n-v4.png`

Create a photorealistic travel image for "Spiti Valley Circuit Tour" — 9-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/himachal-spiti-valley-circuit-tour-9d8n-v5.png`

Create a photorealistic travel image for "Spiti Valley Circuit Tour" — 9-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/himachal-spiti-valley-circuit-tour-9d8n-v6.png`

Create a photorealistic travel image for "Spiti Valley Circuit Tour" — 9-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/himachal-spiti-valley-circuit-tour-9d8n-v7.png`

Create a photorealistic travel image for "Spiti Valley Circuit Tour" — 9-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/himachal-spiti-valley-circuit-tour-9d8n-v8.png`

Create a photorealistic travel image for "Spiti Valley Circuit Tour" — 9-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/himachal-spiti-valley-circuit-tour-9d8n-v9.png`

Create a photorealistic travel image for "Spiti Valley Circuit Tour" — 9-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/himachal-spiti-valley-circuit-tour-9d8n-v10.png`

Create a photorealistic travel image for "Spiti Valley Circuit Tour" — 9-day Himachal Pradesh holiday package, India. Scene: scenic highlights of Manali mountains, pine forests, snow peaks. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.


### Karnataka (6 packages)

#### Bangalore – Mysore – Coorg Heritage Tour
Slug: `karnataka-bangalore-mysore-coorg-heritage-tour-5d4n` | 5D/4N | ₹ 15,999

**v1** → `public/images/packages/karnataka-bangalore-mysore-coorg-heritage-tour-5d4n-v1.png`

Create a photorealistic travel image for "Bangalore – Mysore – Coorg Heritage Tour" — 5-day Karnataka holiday package, India. Scene: heritage circuit Hampi ruins, Coorg coffee hills, Mysore palace. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/karnataka-bangalore-mysore-coorg-heritage-tour-5d4n-v2.png`

Create a photorealistic travel image for "Bangalore – Mysore – Coorg Heritage Tour" — 5-day Karnataka holiday package, India. Scene: heritage circuit Hampi ruins, Coorg coffee hills, Mysore palace. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/karnataka-bangalore-mysore-coorg-heritage-tour-5d4n-v3.png`

Create a photorealistic travel image for "Bangalore – Mysore – Coorg Heritage Tour" — 5-day Karnataka holiday package, India. Scene: heritage circuit Hampi ruins, Coorg coffee hills, Mysore palace. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/karnataka-bangalore-mysore-coorg-heritage-tour-5d4n-v4.png`

Create a photorealistic travel image for "Bangalore – Mysore – Coorg Heritage Tour" — 5-day Karnataka holiday package, India. Scene: heritage circuit Hampi ruins, Coorg coffee hills, Mysore palace. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/karnataka-bangalore-mysore-coorg-heritage-tour-5d4n-v5.png`

Create a photorealistic travel image for "Bangalore – Mysore – Coorg Heritage Tour" — 5-day Karnataka holiday package, India. Scene: heritage circuit Hampi ruins, Coorg coffee hills, Mysore palace. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/karnataka-bangalore-mysore-coorg-heritage-tour-5d4n-v6.png`

Create a photorealistic travel image for "Bangalore – Mysore – Coorg Heritage Tour" — 5-day Karnataka holiday package, India. Scene: heritage circuit Hampi ruins, Coorg coffee hills, Mysore palace. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/karnataka-bangalore-mysore-coorg-heritage-tour-5d4n-v7.png`

Create a photorealistic travel image for "Bangalore – Mysore – Coorg Heritage Tour" — 5-day Karnataka holiday package, India. Scene: heritage circuit Hampi ruins, Coorg coffee hills, Mysore palace. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/karnataka-bangalore-mysore-coorg-heritage-tour-5d4n-v8.png`

Create a photorealistic travel image for "Bangalore – Mysore – Coorg Heritage Tour" — 5-day Karnataka holiday package, India. Scene: heritage circuit Hampi ruins, Coorg coffee hills, Mysore palace. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/karnataka-bangalore-mysore-coorg-heritage-tour-5d4n-v9.png`

Create a photorealistic travel image for "Bangalore – Mysore – Coorg Heritage Tour" — 5-day Karnataka holiday package, India. Scene: heritage circuit Hampi ruins, Coorg coffee hills, Mysore palace. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/karnataka-bangalore-mysore-coorg-heritage-tour-5d4n-v10.png`

Create a photorealistic travel image for "Bangalore – Mysore – Coorg Heritage Tour" — 5-day Karnataka holiday package, India. Scene: heritage circuit Hampi ruins, Coorg coffee hills, Mysore palace. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Coorg – Chikmagalur Coffee Trail
Slug: `karnataka-coorg-chikmagalur-coffee-trail-5d4n` | 5D/4N | ₹ 17,999

**v1** → `public/images/packages/karnataka-coorg-chikmagalur-coffee-trail-5d4n-v1.png`

Create a photorealistic travel image for "Coorg – Chikmagalur Coffee Trail" — 5-day Karnataka holiday package, India. Scene: scenic highlights of Hampi ruins, Coorg coffee hills, Mysore palace. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/karnataka-coorg-chikmagalur-coffee-trail-5d4n-v2.png`

Create a photorealistic travel image for "Coorg – Chikmagalur Coffee Trail" — 5-day Karnataka holiday package, India. Scene: scenic highlights of Hampi ruins, Coorg coffee hills, Mysore palace. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/karnataka-coorg-chikmagalur-coffee-trail-5d4n-v3.png`

Create a photorealistic travel image for "Coorg – Chikmagalur Coffee Trail" — 5-day Karnataka holiday package, India. Scene: scenic highlights of Hampi ruins, Coorg coffee hills, Mysore palace. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/karnataka-coorg-chikmagalur-coffee-trail-5d4n-v4.png`

Create a photorealistic travel image for "Coorg – Chikmagalur Coffee Trail" — 5-day Karnataka holiday package, India. Scene: scenic highlights of Hampi ruins, Coorg coffee hills, Mysore palace. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/karnataka-coorg-chikmagalur-coffee-trail-5d4n-v5.png`

Create a photorealistic travel image for "Coorg – Chikmagalur Coffee Trail" — 5-day Karnataka holiday package, India. Scene: scenic highlights of Hampi ruins, Coorg coffee hills, Mysore palace. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/karnataka-coorg-chikmagalur-coffee-trail-5d4n-v6.png`

Create a photorealistic travel image for "Coorg – Chikmagalur Coffee Trail" — 5-day Karnataka holiday package, India. Scene: scenic highlights of Hampi ruins, Coorg coffee hills, Mysore palace. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/karnataka-coorg-chikmagalur-coffee-trail-5d4n-v7.png`

Create a photorealistic travel image for "Coorg – Chikmagalur Coffee Trail" — 5-day Karnataka holiday package, India. Scene: scenic highlights of Hampi ruins, Coorg coffee hills, Mysore palace. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/karnataka-coorg-chikmagalur-coffee-trail-5d4n-v8.png`

Create a photorealistic travel image for "Coorg – Chikmagalur Coffee Trail" — 5-day Karnataka holiday package, India. Scene: scenic highlights of Hampi ruins, Coorg coffee hills, Mysore palace. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/karnataka-coorg-chikmagalur-coffee-trail-5d4n-v9.png`

Create a photorealistic travel image for "Coorg – Chikmagalur Coffee Trail" — 5-day Karnataka holiday package, India. Scene: scenic highlights of Hampi ruins, Coorg coffee hills, Mysore palace. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/karnataka-coorg-chikmagalur-coffee-trail-5d4n-v10.png`

Create a photorealistic travel image for "Coorg – Chikmagalur Coffee Trail" — 5-day Karnataka holiday package, India. Scene: scenic highlights of Hampi ruins, Coorg coffee hills, Mysore palace. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Bangalore – Hampi Heritage Expedition
Slug: `karnataka-bangalore-hampi-heritage-expedition-5d4n` | 5D/4N | ₹ 18,999

**v1** → `public/images/packages/karnataka-bangalore-hampi-heritage-expedition-5d4n-v1.png`

Create a photorealistic travel image for "Bangalore – Hampi Heritage Expedition" — 5-day Karnataka holiday package, India. Scene: heritage circuit Hampi ruins, Coorg coffee hills, Mysore palace. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/karnataka-bangalore-hampi-heritage-expedition-5d4n-v2.png`

Create a photorealistic travel image for "Bangalore – Hampi Heritage Expedition" — 5-day Karnataka holiday package, India. Scene: heritage circuit Hampi ruins, Coorg coffee hills, Mysore palace. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/karnataka-bangalore-hampi-heritage-expedition-5d4n-v3.png`

Create a photorealistic travel image for "Bangalore – Hampi Heritage Expedition" — 5-day Karnataka holiday package, India. Scene: heritage circuit Hampi ruins, Coorg coffee hills, Mysore palace. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/karnataka-bangalore-hampi-heritage-expedition-5d4n-v4.png`

Create a photorealistic travel image for "Bangalore – Hampi Heritage Expedition" — 5-day Karnataka holiday package, India. Scene: heritage circuit Hampi ruins, Coorg coffee hills, Mysore palace. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/karnataka-bangalore-hampi-heritage-expedition-5d4n-v5.png`

Create a photorealistic travel image for "Bangalore – Hampi Heritage Expedition" — 5-day Karnataka holiday package, India. Scene: heritage circuit Hampi ruins, Coorg coffee hills, Mysore palace. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/karnataka-bangalore-hampi-heritage-expedition-5d4n-v6.png`

Create a photorealistic travel image for "Bangalore – Hampi Heritage Expedition" — 5-day Karnataka holiday package, India. Scene: heritage circuit Hampi ruins, Coorg coffee hills, Mysore palace. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/karnataka-bangalore-hampi-heritage-expedition-5d4n-v7.png`

Create a photorealistic travel image for "Bangalore – Hampi Heritage Expedition" — 5-day Karnataka holiday package, India. Scene: heritage circuit Hampi ruins, Coorg coffee hills, Mysore palace. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/karnataka-bangalore-hampi-heritage-expedition-5d4n-v8.png`

Create a photorealistic travel image for "Bangalore – Hampi Heritage Expedition" — 5-day Karnataka holiday package, India. Scene: heritage circuit Hampi ruins, Coorg coffee hills, Mysore palace. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/karnataka-bangalore-hampi-heritage-expedition-5d4n-v9.png`

Create a photorealistic travel image for "Bangalore – Hampi Heritage Expedition" — 5-day Karnataka holiday package, India. Scene: heritage circuit Hampi ruins, Coorg coffee hills, Mysore palace. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/karnataka-bangalore-hampi-heritage-expedition-5d4n-v10.png`

Create a photorealistic travel image for "Bangalore – Hampi Heritage Expedition" — 5-day Karnataka holiday package, India. Scene: heritage circuit Hampi ruins, Coorg coffee hills, Mysore palace. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Mysore – Coorg – Kabini Wildlife Tour ⭐ Trending
Slug: `karnataka-mysore-coorg-kabini-wildlife-tour-trending-6d5n` | 6D/5N | ₹ 21,999

**v1** → `public/images/packages/karnataka-mysore-coorg-kabini-wildlife-tour-trending-6d5n-v1.png`

Create a photorealistic travel image for "Mysore – Coorg – Kabini Wildlife Tour ⭐ Trending" — 6-day Karnataka holiday package, India. Scene: wildlife safari Hampi ruins, Coorg coffee hills, Mysore palace. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/karnataka-mysore-coorg-kabini-wildlife-tour-trending-6d5n-v2.png`

Create a photorealistic travel image for "Mysore – Coorg – Kabini Wildlife Tour ⭐ Trending" — 6-day Karnataka holiday package, India. Scene: wildlife safari Hampi ruins, Coorg coffee hills, Mysore palace. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/karnataka-mysore-coorg-kabini-wildlife-tour-trending-6d5n-v3.png`

Create a photorealistic travel image for "Mysore – Coorg – Kabini Wildlife Tour ⭐ Trending" — 6-day Karnataka holiday package, India. Scene: wildlife safari Hampi ruins, Coorg coffee hills, Mysore palace. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/karnataka-mysore-coorg-kabini-wildlife-tour-trending-6d5n-v4.png`

Create a photorealistic travel image for "Mysore – Coorg – Kabini Wildlife Tour ⭐ Trending" — 6-day Karnataka holiday package, India. Scene: wildlife safari Hampi ruins, Coorg coffee hills, Mysore palace. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/karnataka-mysore-coorg-kabini-wildlife-tour-trending-6d5n-v5.png`

Create a photorealistic travel image for "Mysore – Coorg – Kabini Wildlife Tour ⭐ Trending" — 6-day Karnataka holiday package, India. Scene: wildlife safari Hampi ruins, Coorg coffee hills, Mysore palace. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/karnataka-mysore-coorg-kabini-wildlife-tour-trending-6d5n-v6.png`

Create a photorealistic travel image for "Mysore – Coorg – Kabini Wildlife Tour ⭐ Trending" — 6-day Karnataka holiday package, India. Scene: wildlife safari Hampi ruins, Coorg coffee hills, Mysore palace. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/karnataka-mysore-coorg-kabini-wildlife-tour-trending-6d5n-v7.png`

Create a photorealistic travel image for "Mysore – Coorg – Kabini Wildlife Tour ⭐ Trending" — 6-day Karnataka holiday package, India. Scene: wildlife safari Hampi ruins, Coorg coffee hills, Mysore palace. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/karnataka-mysore-coorg-kabini-wildlife-tour-trending-6d5n-v8.png`

Create a photorealistic travel image for "Mysore – Coorg – Kabini Wildlife Tour ⭐ Trending" — 6-day Karnataka holiday package, India. Scene: wildlife safari Hampi ruins, Coorg coffee hills, Mysore palace. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/karnataka-mysore-coorg-kabini-wildlife-tour-trending-6d5n-v9.png`

Create a photorealistic travel image for "Mysore – Coorg – Kabini Wildlife Tour ⭐ Trending" — 6-day Karnataka holiday package, India. Scene: wildlife safari Hampi ruins, Coorg coffee hills, Mysore palace. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/karnataka-mysore-coorg-kabini-wildlife-tour-trending-6d5n-v10.png`

Create a photorealistic travel image for "Mysore – Coorg – Kabini Wildlife Tour ⭐ Trending" — 6-day Karnataka holiday package, India. Scene: wildlife safari Hampi ruins, Coorg coffee hills, Mysore palace. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Coastal Karnataka Escape
Slug: `karnataka-coastal-karnataka-escape-6d5n` | 6D/5N | ₹ 22,999

**v1** → `public/images/packages/karnataka-coastal-karnataka-escape-6d5n-v1.png`

Create a photorealistic travel image for "Coastal Karnataka Escape" — 6-day Karnataka holiday package, India. Scene: coastal beaches Hampi ruins, Coorg coffee hills, Mysore palace. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/karnataka-coastal-karnataka-escape-6d5n-v2.png`

Create a photorealistic travel image for "Coastal Karnataka Escape" — 6-day Karnataka holiday package, India. Scene: coastal beaches Hampi ruins, Coorg coffee hills, Mysore palace. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/karnataka-coastal-karnataka-escape-6d5n-v3.png`

Create a photorealistic travel image for "Coastal Karnataka Escape" — 6-day Karnataka holiday package, India. Scene: coastal beaches Hampi ruins, Coorg coffee hills, Mysore palace. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/karnataka-coastal-karnataka-escape-6d5n-v4.png`

Create a photorealistic travel image for "Coastal Karnataka Escape" — 6-day Karnataka holiday package, India. Scene: coastal beaches Hampi ruins, Coorg coffee hills, Mysore palace. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/karnataka-coastal-karnataka-escape-6d5n-v5.png`

Create a photorealistic travel image for "Coastal Karnataka Escape" — 6-day Karnataka holiday package, India. Scene: coastal beaches Hampi ruins, Coorg coffee hills, Mysore palace. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/karnataka-coastal-karnataka-escape-6d5n-v6.png`

Create a photorealistic travel image for "Coastal Karnataka Escape" — 6-day Karnataka holiday package, India. Scene: coastal beaches Hampi ruins, Coorg coffee hills, Mysore palace. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/karnataka-coastal-karnataka-escape-6d5n-v7.png`

Create a photorealistic travel image for "Coastal Karnataka Escape" — 6-day Karnataka holiday package, India. Scene: coastal beaches Hampi ruins, Coorg coffee hills, Mysore palace. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/karnataka-coastal-karnataka-escape-6d5n-v8.png`

Create a photorealistic travel image for "Coastal Karnataka Escape" — 6-day Karnataka holiday package, India. Scene: coastal beaches Hampi ruins, Coorg coffee hills, Mysore palace. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/karnataka-coastal-karnataka-escape-6d5n-v9.png`

Create a photorealistic travel image for "Coastal Karnataka Escape" — 6-day Karnataka holiday package, India. Scene: coastal beaches Hampi ruins, Coorg coffee hills, Mysore palace. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/karnataka-coastal-karnataka-escape-6d5n-v10.png`

Create a photorealistic travel image for "Coastal Karnataka Escape" — 6-day Karnataka holiday package, India. Scene: coastal beaches Hampi ruins, Coorg coffee hills, Mysore palace. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Grand Karnataka Tour
Slug: `karnataka-grand-karnataka-tour-8d7n` | 8D/7N | ₹ 27,999

**v1** → `public/images/packages/karnataka-grand-karnataka-tour-8d7n-v1.png`

Create a photorealistic travel image for "Grand Karnataka Tour" — 8-day Karnataka holiday package, India. Scene: scenic highlights of Hampi ruins, Coorg coffee hills, Mysore palace. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/karnataka-grand-karnataka-tour-8d7n-v2.png`

Create a photorealistic travel image for "Grand Karnataka Tour" — 8-day Karnataka holiday package, India. Scene: scenic highlights of Hampi ruins, Coorg coffee hills, Mysore palace. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/karnataka-grand-karnataka-tour-8d7n-v3.png`

Create a photorealistic travel image for "Grand Karnataka Tour" — 8-day Karnataka holiday package, India. Scene: scenic highlights of Hampi ruins, Coorg coffee hills, Mysore palace. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/karnataka-grand-karnataka-tour-8d7n-v4.png`

Create a photorealistic travel image for "Grand Karnataka Tour" — 8-day Karnataka holiday package, India. Scene: scenic highlights of Hampi ruins, Coorg coffee hills, Mysore palace. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/karnataka-grand-karnataka-tour-8d7n-v5.png`

Create a photorealistic travel image for "Grand Karnataka Tour" — 8-day Karnataka holiday package, India. Scene: scenic highlights of Hampi ruins, Coorg coffee hills, Mysore palace. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/karnataka-grand-karnataka-tour-8d7n-v6.png`

Create a photorealistic travel image for "Grand Karnataka Tour" — 8-day Karnataka holiday package, India. Scene: scenic highlights of Hampi ruins, Coorg coffee hills, Mysore palace. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/karnataka-grand-karnataka-tour-8d7n-v7.png`

Create a photorealistic travel image for "Grand Karnataka Tour" — 8-day Karnataka holiday package, India. Scene: scenic highlights of Hampi ruins, Coorg coffee hills, Mysore palace. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/karnataka-grand-karnataka-tour-8d7n-v8.png`

Create a photorealistic travel image for "Grand Karnataka Tour" — 8-day Karnataka holiday package, India. Scene: scenic highlights of Hampi ruins, Coorg coffee hills, Mysore palace. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/karnataka-grand-karnataka-tour-8d7n-v9.png`

Create a photorealistic travel image for "Grand Karnataka Tour" — 8-day Karnataka holiday package, India. Scene: scenic highlights of Hampi ruins, Coorg coffee hills, Mysore palace. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/karnataka-grand-karnataka-tour-8d7n-v10.png`

Create a photorealistic travel image for "Grand Karnataka Tour" — 8-day Karnataka holiday package, India. Scene: scenic highlights of Hampi ruins, Coorg coffee hills, Mysore palace. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.


### Kashmir (6 packages)

#### Kashmir Highlights Tour
Slug: `kashmir-kashmir-highlights-tour-5d4n` | 5D/4N | ₹ 22,999

**v1** → `public/images/packages/kashmir-kashmir-highlights-tour-5d4n-v1.png`

Create a photorealistic travel image for "Kashmir Highlights Tour" — 5-day Kashmir holiday package, India. Scene: scenic highlights of Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/kashmir-kashmir-highlights-tour-5d4n-v2.png`

Create a photorealistic travel image for "Kashmir Highlights Tour" — 5-day Kashmir holiday package, India. Scene: scenic highlights of Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/kashmir-kashmir-highlights-tour-5d4n-v3.png`

Create a photorealistic travel image for "Kashmir Highlights Tour" — 5-day Kashmir holiday package, India. Scene: scenic highlights of Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/kashmir-kashmir-highlights-tour-5d4n-v4.png`

Create a photorealistic travel image for "Kashmir Highlights Tour" — 5-day Kashmir holiday package, India. Scene: scenic highlights of Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/kashmir-kashmir-highlights-tour-5d4n-v5.png`

Create a photorealistic travel image for "Kashmir Highlights Tour" — 5-day Kashmir holiday package, India. Scene: scenic highlights of Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/kashmir-kashmir-highlights-tour-5d4n-v6.png`

Create a photorealistic travel image for "Kashmir Highlights Tour" — 5-day Kashmir holiday package, India. Scene: scenic highlights of Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/kashmir-kashmir-highlights-tour-5d4n-v7.png`

Create a photorealistic travel image for "Kashmir Highlights Tour" — 5-day Kashmir holiday package, India. Scene: scenic highlights of Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/kashmir-kashmir-highlights-tour-5d4n-v8.png`

Create a photorealistic travel image for "Kashmir Highlights Tour" — 5-day Kashmir holiday package, India. Scene: scenic highlights of Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/kashmir-kashmir-highlights-tour-5d4n-v9.png`

Create a photorealistic travel image for "Kashmir Highlights Tour" — 5-day Kashmir holiday package, India. Scene: scenic highlights of Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/kashmir-kashmir-highlights-tour-5d4n-v10.png`

Create a photorealistic travel image for "Kashmir Highlights Tour" — 5-day Kashmir holiday package, India. Scene: scenic highlights of Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Kashmir Family Tour Package
Slug: `kashmir-kashmir-family-tour-package-5d4n` | 5D/4N | ₹ 24,999

**v1** → `public/images/packages/kashmir-kashmir-family-tour-package-5d4n-v1.png`

Create a photorealistic travel image for "Kashmir Family Tour Package" — 5-day Kashmir holiday package, India. Scene: family-friendly Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, cheerful safe travel. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/kashmir-kashmir-family-tour-package-5d4n-v2.png`

Create a photorealistic travel image for "Kashmir Family Tour Package" — 5-day Kashmir holiday package, India. Scene: family-friendly Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, cheerful safe travel. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/kashmir-kashmir-family-tour-package-5d4n-v3.png`

Create a photorealistic travel image for "Kashmir Family Tour Package" — 5-day Kashmir holiday package, India. Scene: family-friendly Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, cheerful safe travel. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/kashmir-kashmir-family-tour-package-5d4n-v4.png`

Create a photorealistic travel image for "Kashmir Family Tour Package" — 5-day Kashmir holiday package, India. Scene: family-friendly Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, cheerful safe travel. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/kashmir-kashmir-family-tour-package-5d4n-v5.png`

Create a photorealistic travel image for "Kashmir Family Tour Package" — 5-day Kashmir holiday package, India. Scene: family-friendly Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, cheerful safe travel. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/kashmir-kashmir-family-tour-package-5d4n-v6.png`

Create a photorealistic travel image for "Kashmir Family Tour Package" — 5-day Kashmir holiday package, India. Scene: family-friendly Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, cheerful safe travel. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/kashmir-kashmir-family-tour-package-5d4n-v7.png`

Create a photorealistic travel image for "Kashmir Family Tour Package" — 5-day Kashmir holiday package, India. Scene: family-friendly Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, cheerful safe travel. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/kashmir-kashmir-family-tour-package-5d4n-v8.png`

Create a photorealistic travel image for "Kashmir Family Tour Package" — 5-day Kashmir holiday package, India. Scene: family-friendly Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, cheerful safe travel. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/kashmir-kashmir-family-tour-package-5d4n-v9.png`

Create a photorealistic travel image for "Kashmir Family Tour Package" — 5-day Kashmir holiday package, India. Scene: family-friendly Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, cheerful safe travel. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/kashmir-kashmir-family-tour-package-5d4n-v10.png`

Create a photorealistic travel image for "Kashmir Family Tour Package" — 5-day Kashmir holiday package, India. Scene: family-friendly Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, cheerful safe travel. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Kashmir Honeymoon Package
Slug: `kashmir-kashmir-honeymoon-package-6d5n` | 6D/5N | ₹ 32,999

**v1** → `public/images/packages/kashmir-kashmir-honeymoon-package-6d5n-v1.png`

Create a photorealistic travel image for "Kashmir Honeymoon Package" — 6-day Kashmir holiday package, India. Scene: romantic Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, intimate luxury mood. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/kashmir-kashmir-honeymoon-package-6d5n-v2.png`

Create a photorealistic travel image for "Kashmir Honeymoon Package" — 6-day Kashmir holiday package, India. Scene: romantic Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, intimate luxury mood. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/kashmir-kashmir-honeymoon-package-6d5n-v3.png`

Create a photorealistic travel image for "Kashmir Honeymoon Package" — 6-day Kashmir holiday package, India. Scene: romantic Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, intimate luxury mood. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/kashmir-kashmir-honeymoon-package-6d5n-v4.png`

Create a photorealistic travel image for "Kashmir Honeymoon Package" — 6-day Kashmir holiday package, India. Scene: romantic Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, intimate luxury mood. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/kashmir-kashmir-honeymoon-package-6d5n-v5.png`

Create a photorealistic travel image for "Kashmir Honeymoon Package" — 6-day Kashmir holiday package, India. Scene: romantic Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, intimate luxury mood. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/kashmir-kashmir-honeymoon-package-6d5n-v6.png`

Create a photorealistic travel image for "Kashmir Honeymoon Package" — 6-day Kashmir holiday package, India. Scene: romantic Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, intimate luxury mood. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/kashmir-kashmir-honeymoon-package-6d5n-v7.png`

Create a photorealistic travel image for "Kashmir Honeymoon Package" — 6-day Kashmir holiday package, India. Scene: romantic Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, intimate luxury mood. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/kashmir-kashmir-honeymoon-package-6d5n-v8.png`

Create a photorealistic travel image for "Kashmir Honeymoon Package" — 6-day Kashmir holiday package, India. Scene: romantic Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, intimate luxury mood. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/kashmir-kashmir-honeymoon-package-6d5n-v9.png`

Create a photorealistic travel image for "Kashmir Honeymoon Package" — 6-day Kashmir holiday package, India. Scene: romantic Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, intimate luxury mood. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/kashmir-kashmir-honeymoon-package-6d5n-v10.png`

Create a photorealistic travel image for "Kashmir Honeymoon Package" — 6-day Kashmir holiday package, India. Scene: romantic Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, intimate luxury mood. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Vaishno Devi with Kashmir Tour
Slug: `kashmir-vaishno-devi-with-kashmir-tour-6d5n` | 6D/5N | ₹ 28,999

**v1** → `public/images/packages/kashmir-vaishno-devi-with-kashmir-tour-6d5n-v1.png`

Create a photorealistic travel image for "Vaishno Devi with Kashmir Tour" — 6-day Kashmir holiday package, India. Scene: spiritual pilgrimage Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, respectful reverent mood. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/kashmir-vaishno-devi-with-kashmir-tour-6d5n-v2.png`

Create a photorealistic travel image for "Vaishno Devi with Kashmir Tour" — 6-day Kashmir holiday package, India. Scene: spiritual pilgrimage Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, respectful reverent mood. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/kashmir-vaishno-devi-with-kashmir-tour-6d5n-v3.png`

Create a photorealistic travel image for "Vaishno Devi with Kashmir Tour" — 6-day Kashmir holiday package, India. Scene: spiritual pilgrimage Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, respectful reverent mood. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/kashmir-vaishno-devi-with-kashmir-tour-6d5n-v4.png`

Create a photorealistic travel image for "Vaishno Devi with Kashmir Tour" — 6-day Kashmir holiday package, India. Scene: spiritual pilgrimage Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, respectful reverent mood. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/kashmir-vaishno-devi-with-kashmir-tour-6d5n-v5.png`

Create a photorealistic travel image for "Vaishno Devi with Kashmir Tour" — 6-day Kashmir holiday package, India. Scene: spiritual pilgrimage Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, respectful reverent mood. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/kashmir-vaishno-devi-with-kashmir-tour-6d5n-v6.png`

Create a photorealistic travel image for "Vaishno Devi with Kashmir Tour" — 6-day Kashmir holiday package, India. Scene: spiritual pilgrimage Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, respectful reverent mood. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/kashmir-vaishno-devi-with-kashmir-tour-6d5n-v7.png`

Create a photorealistic travel image for "Vaishno Devi with Kashmir Tour" — 6-day Kashmir holiday package, India. Scene: spiritual pilgrimage Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, respectful reverent mood. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/kashmir-vaishno-devi-with-kashmir-tour-6d5n-v8.png`

Create a photorealistic travel image for "Vaishno Devi with Kashmir Tour" — 6-day Kashmir holiday package, India. Scene: spiritual pilgrimage Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, respectful reverent mood. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/kashmir-vaishno-devi-with-kashmir-tour-6d5n-v9.png`

Create a photorealistic travel image for "Vaishno Devi with Kashmir Tour" — 6-day Kashmir holiday package, India. Scene: spiritual pilgrimage Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, respectful reverent mood. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/kashmir-vaishno-devi-with-kashmir-tour-6d5n-v10.png`

Create a photorealistic travel image for "Vaishno Devi with Kashmir Tour" — 6-day Kashmir holiday package, India. Scene: spiritual pilgrimage Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, respectful reverent mood. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Amritsar Jammu Kashmir Tour
Slug: `kashmir-amritsar-jammu-kashmir-tour-7d6n` | 7D/6N | ₹ 24,999

**v1** → `public/images/packages/kashmir-amritsar-jammu-kashmir-tour-7d6n-v1.png`

Create a photorealistic travel image for "Amritsar Jammu Kashmir Tour" — 7-day Kashmir holiday package, India. Scene: scenic highlights of Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/kashmir-amritsar-jammu-kashmir-tour-7d6n-v2.png`

Create a photorealistic travel image for "Amritsar Jammu Kashmir Tour" — 7-day Kashmir holiday package, India. Scene: scenic highlights of Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/kashmir-amritsar-jammu-kashmir-tour-7d6n-v3.png`

Create a photorealistic travel image for "Amritsar Jammu Kashmir Tour" — 7-day Kashmir holiday package, India. Scene: scenic highlights of Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/kashmir-amritsar-jammu-kashmir-tour-7d6n-v4.png`

Create a photorealistic travel image for "Amritsar Jammu Kashmir Tour" — 7-day Kashmir holiday package, India. Scene: scenic highlights of Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/kashmir-amritsar-jammu-kashmir-tour-7d6n-v5.png`

Create a photorealistic travel image for "Amritsar Jammu Kashmir Tour" — 7-day Kashmir holiday package, India. Scene: scenic highlights of Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/kashmir-amritsar-jammu-kashmir-tour-7d6n-v6.png`

Create a photorealistic travel image for "Amritsar Jammu Kashmir Tour" — 7-day Kashmir holiday package, India. Scene: scenic highlights of Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/kashmir-amritsar-jammu-kashmir-tour-7d6n-v7.png`

Create a photorealistic travel image for "Amritsar Jammu Kashmir Tour" — 7-day Kashmir holiday package, India. Scene: scenic highlights of Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/kashmir-amritsar-jammu-kashmir-tour-7d6n-v8.png`

Create a photorealistic travel image for "Amritsar Jammu Kashmir Tour" — 7-day Kashmir holiday package, India. Scene: scenic highlights of Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/kashmir-amritsar-jammu-kashmir-tour-7d6n-v9.png`

Create a photorealistic travel image for "Amritsar Jammu Kashmir Tour" — 7-day Kashmir holiday package, India. Scene: scenic highlights of Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/kashmir-amritsar-jammu-kashmir-tour-7d6n-v10.png`

Create a photorealistic travel image for "Amritsar Jammu Kashmir Tour" — 7-day Kashmir holiday package, India. Scene: scenic highlights of Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Premium Kashmir Honeymoon with Vaishno Devi
Slug: `kashmir-premium-kashmir-honeymoon-with-vaishno-devi-9d8n` | 9D/8N | ₹ 52,999

**v1** → `public/images/packages/kashmir-premium-kashmir-honeymoon-with-vaishno-devi-9d8n-v1.png`

Create a photorealistic travel image for "Premium Kashmir Honeymoon with Vaishno Devi" — 9-day Kashmir holiday package, India. Scene: romantic Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, intimate luxury mood. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/kashmir-premium-kashmir-honeymoon-with-vaishno-devi-9d8n-v2.png`

Create a photorealistic travel image for "Premium Kashmir Honeymoon with Vaishno Devi" — 9-day Kashmir holiday package, India. Scene: romantic Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, intimate luxury mood. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/kashmir-premium-kashmir-honeymoon-with-vaishno-devi-9d8n-v3.png`

Create a photorealistic travel image for "Premium Kashmir Honeymoon with Vaishno Devi" — 9-day Kashmir holiday package, India. Scene: romantic Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, intimate luxury mood. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/kashmir-premium-kashmir-honeymoon-with-vaishno-devi-9d8n-v4.png`

Create a photorealistic travel image for "Premium Kashmir Honeymoon with Vaishno Devi" — 9-day Kashmir holiday package, India. Scene: romantic Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, intimate luxury mood. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/kashmir-premium-kashmir-honeymoon-with-vaishno-devi-9d8n-v5.png`

Create a photorealistic travel image for "Premium Kashmir Honeymoon with Vaishno Devi" — 9-day Kashmir holiday package, India. Scene: romantic Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, intimate luxury mood. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/kashmir-premium-kashmir-honeymoon-with-vaishno-devi-9d8n-v6.png`

Create a photorealistic travel image for "Premium Kashmir Honeymoon with Vaishno Devi" — 9-day Kashmir holiday package, India. Scene: romantic Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, intimate luxury mood. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/kashmir-premium-kashmir-honeymoon-with-vaishno-devi-9d8n-v7.png`

Create a photorealistic travel image for "Premium Kashmir Honeymoon with Vaishno Devi" — 9-day Kashmir holiday package, India. Scene: romantic Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, intimate luxury mood. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/kashmir-premium-kashmir-honeymoon-with-vaishno-devi-9d8n-v8.png`

Create a photorealistic travel image for "Premium Kashmir Honeymoon with Vaishno Devi" — 9-day Kashmir holiday package, India. Scene: romantic Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, intimate luxury mood. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/kashmir-premium-kashmir-honeymoon-with-vaishno-devi-9d8n-v9.png`

Create a photorealistic travel image for "Premium Kashmir Honeymoon with Vaishno Devi" — 9-day Kashmir holiday package, India. Scene: romantic Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, intimate luxury mood. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/kashmir-premium-kashmir-honeymoon-with-vaishno-devi-9d8n-v10.png`

Create a photorealistic travel image for "Premium Kashmir Honeymoon with Vaishno Devi" — 9-day Kashmir holiday package, India. Scene: romantic Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley, intimate luxury mood. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.


### Kerala (6 packages)

#### Munnar Tea Hills Escape
Slug: `kerala-munnar-tea-hills-escape-4d3n` | 4D/3N | ₹ 13,999

**v1** → `public/images/packages/kerala-munnar-tea-hills-escape-4d3n-v1.png`

Create a photorealistic travel image for "Munnar Tea Hills Escape" — 4-day Kerala holiday package, India. Scene: scenic highlights of Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/kerala-munnar-tea-hills-escape-4d3n-v2.png`

Create a photorealistic travel image for "Munnar Tea Hills Escape" — 4-day Kerala holiday package, India. Scene: scenic highlights of Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/kerala-munnar-tea-hills-escape-4d3n-v3.png`

Create a photorealistic travel image for "Munnar Tea Hills Escape" — 4-day Kerala holiday package, India. Scene: scenic highlights of Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/kerala-munnar-tea-hills-escape-4d3n-v4.png`

Create a photorealistic travel image for "Munnar Tea Hills Escape" — 4-day Kerala holiday package, India. Scene: scenic highlights of Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/kerala-munnar-tea-hills-escape-4d3n-v5.png`

Create a photorealistic travel image for "Munnar Tea Hills Escape" — 4-day Kerala holiday package, India. Scene: scenic highlights of Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/kerala-munnar-tea-hills-escape-4d3n-v6.png`

Create a photorealistic travel image for "Munnar Tea Hills Escape" — 4-day Kerala holiday package, India. Scene: scenic highlights of Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/kerala-munnar-tea-hills-escape-4d3n-v7.png`

Create a photorealistic travel image for "Munnar Tea Hills Escape" — 4-day Kerala holiday package, India. Scene: scenic highlights of Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/kerala-munnar-tea-hills-escape-4d3n-v8.png`

Create a photorealistic travel image for "Munnar Tea Hills Escape" — 4-day Kerala holiday package, India. Scene: scenic highlights of Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/kerala-munnar-tea-hills-escape-4d3n-v9.png`

Create a photorealistic travel image for "Munnar Tea Hills Escape" — 4-day Kerala holiday package, India. Scene: scenic highlights of Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/kerala-munnar-tea-hills-escape-4d3n-v10.png`

Create a photorealistic travel image for "Munnar Tea Hills Escape" — 4-day Kerala holiday package, India. Scene: scenic highlights of Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Munnar – Thekkady – Alleppey Honeymoon Tour
Slug: `kerala-munnar-thekkady-alleppey-honeymoon-tour-5d4n` | 5D/4N | ₹ 19,999

**v1** → `public/images/packages/kerala-munnar-thekkady-alleppey-honeymoon-tour-5d4n-v1.png`

Create a photorealistic travel image for "Munnar – Thekkady – Alleppey Honeymoon Tour" — 5-day Kerala holiday package, India. Scene: romantic Alleppey houseboat backwaters, Munnar tea hills, coconut palms, intimate luxury mood. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/kerala-munnar-thekkady-alleppey-honeymoon-tour-5d4n-v2.png`

Create a photorealistic travel image for "Munnar – Thekkady – Alleppey Honeymoon Tour" — 5-day Kerala holiday package, India. Scene: romantic Alleppey houseboat backwaters, Munnar tea hills, coconut palms, intimate luxury mood. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/kerala-munnar-thekkady-alleppey-honeymoon-tour-5d4n-v3.png`

Create a photorealistic travel image for "Munnar – Thekkady – Alleppey Honeymoon Tour" — 5-day Kerala holiday package, India. Scene: romantic Alleppey houseboat backwaters, Munnar tea hills, coconut palms, intimate luxury mood. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/kerala-munnar-thekkady-alleppey-honeymoon-tour-5d4n-v4.png`

Create a photorealistic travel image for "Munnar – Thekkady – Alleppey Honeymoon Tour" — 5-day Kerala holiday package, India. Scene: romantic Alleppey houseboat backwaters, Munnar tea hills, coconut palms, intimate luxury mood. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/kerala-munnar-thekkady-alleppey-honeymoon-tour-5d4n-v5.png`

Create a photorealistic travel image for "Munnar – Thekkady – Alleppey Honeymoon Tour" — 5-day Kerala holiday package, India. Scene: romantic Alleppey houseboat backwaters, Munnar tea hills, coconut palms, intimate luxury mood. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/kerala-munnar-thekkady-alleppey-honeymoon-tour-5d4n-v6.png`

Create a photorealistic travel image for "Munnar – Thekkady – Alleppey Honeymoon Tour" — 5-day Kerala holiday package, India. Scene: romantic Alleppey houseboat backwaters, Munnar tea hills, coconut palms, intimate luxury mood. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/kerala-munnar-thekkady-alleppey-honeymoon-tour-5d4n-v7.png`

Create a photorealistic travel image for "Munnar – Thekkady – Alleppey Honeymoon Tour" — 5-day Kerala holiday package, India. Scene: romantic Alleppey houseboat backwaters, Munnar tea hills, coconut palms, intimate luxury mood. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/kerala-munnar-thekkady-alleppey-honeymoon-tour-5d4n-v8.png`

Create a photorealistic travel image for "Munnar – Thekkady – Alleppey Honeymoon Tour" — 5-day Kerala holiday package, India. Scene: romantic Alleppey houseboat backwaters, Munnar tea hills, coconut palms, intimate luxury mood. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/kerala-munnar-thekkady-alleppey-honeymoon-tour-5d4n-v9.png`

Create a photorealistic travel image for "Munnar – Thekkady – Alleppey Honeymoon Tour" — 5-day Kerala holiday package, India. Scene: romantic Alleppey houseboat backwaters, Munnar tea hills, coconut palms, intimate luxury mood. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/kerala-munnar-thekkady-alleppey-honeymoon-tour-5d4n-v10.png`

Create a photorealistic travel image for "Munnar – Thekkady – Alleppey Honeymoon Tour" — 5-day Kerala holiday package, India. Scene: romantic Alleppey houseboat backwaters, Munnar tea hills, coconut palms, intimate luxury mood. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### ‍‍‍ Kerala Family Holiday
Slug: `kerala-kerala-family-holiday-6d5n` | 6D/5N | ₹ 21,999

**v1** → `public/images/packages/kerala-kerala-family-holiday-6d5n-v1.png`

Create a photorealistic travel image for "‍‍‍ Kerala Family Holiday" — 6-day Kerala holiday package, India. Scene: family-friendly Alleppey houseboat backwaters, Munnar tea hills, coconut palms, cheerful safe travel. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/kerala-kerala-family-holiday-6d5n-v2.png`

Create a photorealistic travel image for "‍‍‍ Kerala Family Holiday" — 6-day Kerala holiday package, India. Scene: family-friendly Alleppey houseboat backwaters, Munnar tea hills, coconut palms, cheerful safe travel. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/kerala-kerala-family-holiday-6d5n-v3.png`

Create a photorealistic travel image for "‍‍‍ Kerala Family Holiday" — 6-day Kerala holiday package, India. Scene: family-friendly Alleppey houseboat backwaters, Munnar tea hills, coconut palms, cheerful safe travel. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/kerala-kerala-family-holiday-6d5n-v4.png`

Create a photorealistic travel image for "‍‍‍ Kerala Family Holiday" — 6-day Kerala holiday package, India. Scene: family-friendly Alleppey houseboat backwaters, Munnar tea hills, coconut palms, cheerful safe travel. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/kerala-kerala-family-holiday-6d5n-v5.png`

Create a photorealistic travel image for "‍‍‍ Kerala Family Holiday" — 6-day Kerala holiday package, India. Scene: family-friendly Alleppey houseboat backwaters, Munnar tea hills, coconut palms, cheerful safe travel. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/kerala-kerala-family-holiday-6d5n-v6.png`

Create a photorealistic travel image for "‍‍‍ Kerala Family Holiday" — 6-day Kerala holiday package, India. Scene: family-friendly Alleppey houseboat backwaters, Munnar tea hills, coconut palms, cheerful safe travel. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/kerala-kerala-family-holiday-6d5n-v7.png`

Create a photorealistic travel image for "‍‍‍ Kerala Family Holiday" — 6-day Kerala holiday package, India. Scene: family-friendly Alleppey houseboat backwaters, Munnar tea hills, coconut palms, cheerful safe travel. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/kerala-kerala-family-holiday-6d5n-v8.png`

Create a photorealistic travel image for "‍‍‍ Kerala Family Holiday" — 6-day Kerala holiday package, India. Scene: family-friendly Alleppey houseboat backwaters, Munnar tea hills, coconut palms, cheerful safe travel. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/kerala-kerala-family-holiday-6d5n-v9.png`

Create a photorealistic travel image for "‍‍‍ Kerala Family Holiday" — 6-day Kerala holiday package, India. Scene: family-friendly Alleppey houseboat backwaters, Munnar tea hills, coconut palms, cheerful safe travel. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/kerala-kerala-family-holiday-6d5n-v10.png`

Create a photorealistic travel image for "‍‍‍ Kerala Family Holiday" — 6-day Kerala holiday package, India. Scene: family-friendly Alleppey houseboat backwaters, Munnar tea hills, coconut palms, cheerful safe travel. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Kerala Backwaters & Beaches Tour
Slug: `kerala-kerala-backwaters-beaches-tour-6d5n` | 6D/5N | ₹ 22,999

**v1** → `public/images/packages/kerala-kerala-backwaters-beaches-tour-6d5n-v1.png`

Create a photorealistic travel image for "Kerala Backwaters & Beaches Tour" — 6-day Kerala holiday package, India. Scene: coastal beaches Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/kerala-kerala-backwaters-beaches-tour-6d5n-v2.png`

Create a photorealistic travel image for "Kerala Backwaters & Beaches Tour" — 6-day Kerala holiday package, India. Scene: coastal beaches Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/kerala-kerala-backwaters-beaches-tour-6d5n-v3.png`

Create a photorealistic travel image for "Kerala Backwaters & Beaches Tour" — 6-day Kerala holiday package, India. Scene: coastal beaches Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/kerala-kerala-backwaters-beaches-tour-6d5n-v4.png`

Create a photorealistic travel image for "Kerala Backwaters & Beaches Tour" — 6-day Kerala holiday package, India. Scene: coastal beaches Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/kerala-kerala-backwaters-beaches-tour-6d5n-v5.png`

Create a photorealistic travel image for "Kerala Backwaters & Beaches Tour" — 6-day Kerala holiday package, India. Scene: coastal beaches Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/kerala-kerala-backwaters-beaches-tour-6d5n-v6.png`

Create a photorealistic travel image for "Kerala Backwaters & Beaches Tour" — 6-day Kerala holiday package, India. Scene: coastal beaches Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/kerala-kerala-backwaters-beaches-tour-6d5n-v7.png`

Create a photorealistic travel image for "Kerala Backwaters & Beaches Tour" — 6-day Kerala holiday package, India. Scene: coastal beaches Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/kerala-kerala-backwaters-beaches-tour-6d5n-v8.png`

Create a photorealistic travel image for "Kerala Backwaters & Beaches Tour" — 6-day Kerala holiday package, India. Scene: coastal beaches Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/kerala-kerala-backwaters-beaches-tour-6d5n-v9.png`

Create a photorealistic travel image for "Kerala Backwaters & Beaches Tour" — 6-day Kerala holiday package, India. Scene: coastal beaches Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/kerala-kerala-backwaters-beaches-tour-6d5n-v10.png`

Create a photorealistic travel image for "Kerala Backwaters & Beaches Tour" — 6-day Kerala holiday package, India. Scene: coastal beaches Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Wayanad Nature & Adventure Tour
Slug: `kerala-wayanad-nature-adventure-tour-6d5n` | 6D/5N | ₹ 23,999

**v1** → `public/images/packages/kerala-wayanad-nature-adventure-tour-6d5n-v1.png`

Create a photorealistic travel image for "Wayanad Nature & Adventure Tour" — 6-day Kerala holiday package, India. Scene: adventure Alleppey houseboat backwaters, Munnar tea hills, coconut palms, thrilling outdoor. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/kerala-wayanad-nature-adventure-tour-6d5n-v2.png`

Create a photorealistic travel image for "Wayanad Nature & Adventure Tour" — 6-day Kerala holiday package, India. Scene: adventure Alleppey houseboat backwaters, Munnar tea hills, coconut palms, thrilling outdoor. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/kerala-wayanad-nature-adventure-tour-6d5n-v3.png`

Create a photorealistic travel image for "Wayanad Nature & Adventure Tour" — 6-day Kerala holiday package, India. Scene: adventure Alleppey houseboat backwaters, Munnar tea hills, coconut palms, thrilling outdoor. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/kerala-wayanad-nature-adventure-tour-6d5n-v4.png`

Create a photorealistic travel image for "Wayanad Nature & Adventure Tour" — 6-day Kerala holiday package, India. Scene: adventure Alleppey houseboat backwaters, Munnar tea hills, coconut palms, thrilling outdoor. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/kerala-wayanad-nature-adventure-tour-6d5n-v5.png`

Create a photorealistic travel image for "Wayanad Nature & Adventure Tour" — 6-day Kerala holiday package, India. Scene: adventure Alleppey houseboat backwaters, Munnar tea hills, coconut palms, thrilling outdoor. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/kerala-wayanad-nature-adventure-tour-6d5n-v6.png`

Create a photorealistic travel image for "Wayanad Nature & Adventure Tour" — 6-day Kerala holiday package, India. Scene: adventure Alleppey houseboat backwaters, Munnar tea hills, coconut palms, thrilling outdoor. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/kerala-wayanad-nature-adventure-tour-6d5n-v7.png`

Create a photorealistic travel image for "Wayanad Nature & Adventure Tour" — 6-day Kerala holiday package, India. Scene: adventure Alleppey houseboat backwaters, Munnar tea hills, coconut palms, thrilling outdoor. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/kerala-wayanad-nature-adventure-tour-6d5n-v8.png`

Create a photorealistic travel image for "Wayanad Nature & Adventure Tour" — 6-day Kerala holiday package, India. Scene: adventure Alleppey houseboat backwaters, Munnar tea hills, coconut palms, thrilling outdoor. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/kerala-wayanad-nature-adventure-tour-6d5n-v9.png`

Create a photorealistic travel image for "Wayanad Nature & Adventure Tour" — 6-day Kerala holiday package, India. Scene: adventure Alleppey houseboat backwaters, Munnar tea hills, coconut palms, thrilling outdoor. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/kerala-wayanad-nature-adventure-tour-6d5n-v10.png`

Create a photorealistic travel image for "Wayanad Nature & Adventure Tour" — 6-day Kerala holiday package, India. Scene: adventure Alleppey houseboat backwaters, Munnar tea hills, coconut palms, thrilling outdoor. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Complete Kerala & Kanyakumari Grand Tour
Slug: `kerala-complete-kerala-kanyakumari-grand-tour-9d8n` | 9D/8N | ₹ 34,999

**v1** → `public/images/packages/kerala-complete-kerala-kanyakumari-grand-tour-9d8n-v1.png`

Create a photorealistic travel image for "Complete Kerala & Kanyakumari Grand Tour" — 9-day Kerala holiday package, India. Scene: heritage circuit Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/kerala-complete-kerala-kanyakumari-grand-tour-9d8n-v2.png`

Create a photorealistic travel image for "Complete Kerala & Kanyakumari Grand Tour" — 9-day Kerala holiday package, India. Scene: heritage circuit Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/kerala-complete-kerala-kanyakumari-grand-tour-9d8n-v3.png`

Create a photorealistic travel image for "Complete Kerala & Kanyakumari Grand Tour" — 9-day Kerala holiday package, India. Scene: heritage circuit Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/kerala-complete-kerala-kanyakumari-grand-tour-9d8n-v4.png`

Create a photorealistic travel image for "Complete Kerala & Kanyakumari Grand Tour" — 9-day Kerala holiday package, India. Scene: heritage circuit Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/kerala-complete-kerala-kanyakumari-grand-tour-9d8n-v5.png`

Create a photorealistic travel image for "Complete Kerala & Kanyakumari Grand Tour" — 9-day Kerala holiday package, India. Scene: heritage circuit Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/kerala-complete-kerala-kanyakumari-grand-tour-9d8n-v6.png`

Create a photorealistic travel image for "Complete Kerala & Kanyakumari Grand Tour" — 9-day Kerala holiday package, India. Scene: heritage circuit Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/kerala-complete-kerala-kanyakumari-grand-tour-9d8n-v7.png`

Create a photorealistic travel image for "Complete Kerala & Kanyakumari Grand Tour" — 9-day Kerala holiday package, India. Scene: heritage circuit Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/kerala-complete-kerala-kanyakumari-grand-tour-9d8n-v8.png`

Create a photorealistic travel image for "Complete Kerala & Kanyakumari Grand Tour" — 9-day Kerala holiday package, India. Scene: heritage circuit Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/kerala-complete-kerala-kanyakumari-grand-tour-9d8n-v9.png`

Create a photorealistic travel image for "Complete Kerala & Kanyakumari Grand Tour" — 9-day Kerala holiday package, India. Scene: heritage circuit Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/kerala-complete-kerala-kanyakumari-grand-tour-9d8n-v10.png`

Create a photorealistic travel image for "Complete Kerala & Kanyakumari Grand Tour" — 9-day Kerala holiday package, India. Scene: heritage circuit Alleppey houseboat backwaters, Munnar tea hills, coconut palms. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.


### Ladakh (4 packages)

#### Leh – Nubra Valley – Pangong Lake Tour
Slug: `ladakh-leh-nubra-valley-pangong-lake-tour-7d6n` | 7D/6N | ₹ 29,999

**v1** → `public/images/packages/ladakh-leh-nubra-valley-pangong-lake-tour-7d6n-v1.png`

Create a photorealistic travel image for "Leh – Nubra Valley – Pangong Lake Tour" — 7-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/ladakh-leh-nubra-valley-pangong-lake-tour-7d6n-v2.png`

Create a photorealistic travel image for "Leh – Nubra Valley – Pangong Lake Tour" — 7-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/ladakh-leh-nubra-valley-pangong-lake-tour-7d6n-v3.png`

Create a photorealistic travel image for "Leh – Nubra Valley – Pangong Lake Tour" — 7-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/ladakh-leh-nubra-valley-pangong-lake-tour-7d6n-v4.png`

Create a photorealistic travel image for "Leh – Nubra Valley – Pangong Lake Tour" — 7-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/ladakh-leh-nubra-valley-pangong-lake-tour-7d6n-v5.png`

Create a photorealistic travel image for "Leh – Nubra Valley – Pangong Lake Tour" — 7-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/ladakh-leh-nubra-valley-pangong-lake-tour-7d6n-v6.png`

Create a photorealistic travel image for "Leh – Nubra Valley – Pangong Lake Tour" — 7-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/ladakh-leh-nubra-valley-pangong-lake-tour-7d6n-v7.png`

Create a photorealistic travel image for "Leh – Nubra Valley – Pangong Lake Tour" — 7-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/ladakh-leh-nubra-valley-pangong-lake-tour-7d6n-v8.png`

Create a photorealistic travel image for "Leh – Nubra Valley – Pangong Lake Tour" — 7-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/ladakh-leh-nubra-valley-pangong-lake-tour-7d6n-v9.png`

Create a photorealistic travel image for "Leh – Nubra Valley – Pangong Lake Tour" — 7-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/ladakh-leh-nubra-valley-pangong-lake-tour-7d6n-v10.png`

Create a photorealistic travel image for "Leh – Nubra Valley – Pangong Lake Tour" — 7-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Complete Ladakh Adventure Tour
Slug: `ladakh-complete-ladakh-adventure-tour-8d7n` | 8D/7N | ₹ 34,999

**v1** → `public/images/packages/ladakh-complete-ladakh-adventure-tour-8d7n-v1.png`

Create a photorealistic travel image for "Complete Ladakh Adventure Tour" — 8-day Ladakh holiday package, India. Scene: adventure high-altitude desert, monasteries, Pangong blue lake, thrilling outdoor. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/ladakh-complete-ladakh-adventure-tour-8d7n-v2.png`

Create a photorealistic travel image for "Complete Ladakh Adventure Tour" — 8-day Ladakh holiday package, India. Scene: adventure high-altitude desert, monasteries, Pangong blue lake, thrilling outdoor. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/ladakh-complete-ladakh-adventure-tour-8d7n-v3.png`

Create a photorealistic travel image for "Complete Ladakh Adventure Tour" — 8-day Ladakh holiday package, India. Scene: adventure high-altitude desert, monasteries, Pangong blue lake, thrilling outdoor. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/ladakh-complete-ladakh-adventure-tour-8d7n-v4.png`

Create a photorealistic travel image for "Complete Ladakh Adventure Tour" — 8-day Ladakh holiday package, India. Scene: adventure high-altitude desert, monasteries, Pangong blue lake, thrilling outdoor. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/ladakh-complete-ladakh-adventure-tour-8d7n-v5.png`

Create a photorealistic travel image for "Complete Ladakh Adventure Tour" — 8-day Ladakh holiday package, India. Scene: adventure high-altitude desert, monasteries, Pangong blue lake, thrilling outdoor. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/ladakh-complete-ladakh-adventure-tour-8d7n-v6.png`

Create a photorealistic travel image for "Complete Ladakh Adventure Tour" — 8-day Ladakh holiday package, India. Scene: adventure high-altitude desert, monasteries, Pangong blue lake, thrilling outdoor. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/ladakh-complete-ladakh-adventure-tour-8d7n-v7.png`

Create a photorealistic travel image for "Complete Ladakh Adventure Tour" — 8-day Ladakh holiday package, India. Scene: adventure high-altitude desert, monasteries, Pangong blue lake, thrilling outdoor. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/ladakh-complete-ladakh-adventure-tour-8d7n-v8.png`

Create a photorealistic travel image for "Complete Ladakh Adventure Tour" — 8-day Ladakh holiday package, India. Scene: adventure high-altitude desert, monasteries, Pangong blue lake, thrilling outdoor. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/ladakh-complete-ladakh-adventure-tour-8d7n-v9.png`

Create a photorealistic travel image for "Complete Ladakh Adventure Tour" — 8-day Ladakh holiday package, India. Scene: adventure high-altitude desert, monasteries, Pangong blue lake, thrilling outdoor. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/ladakh-complete-ladakh-adventure-tour-8d7n-v10.png`

Create a photorealistic travel image for "Complete Ladakh Adventure Tour" — 8-day Ladakh holiday package, India. Scene: adventure high-altitude desert, monasteries, Pangong blue lake, thrilling outdoor. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Srinagar – Kargil – Leh Road Trip
Slug: `ladakh-srinagar-kargil-leh-road-trip-8d7n` | 8D/7N | ₹ 31,999

**v1** → `public/images/packages/ladakh-srinagar-kargil-leh-road-trip-8d7n-v1.png`

Create a photorealistic travel image for "Srinagar – Kargil – Leh Road Trip" — 8-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/ladakh-srinagar-kargil-leh-road-trip-8d7n-v2.png`

Create a photorealistic travel image for "Srinagar – Kargil – Leh Road Trip" — 8-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/ladakh-srinagar-kargil-leh-road-trip-8d7n-v3.png`

Create a photorealistic travel image for "Srinagar – Kargil – Leh Road Trip" — 8-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/ladakh-srinagar-kargil-leh-road-trip-8d7n-v4.png`

Create a photorealistic travel image for "Srinagar – Kargil – Leh Road Trip" — 8-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/ladakh-srinagar-kargil-leh-road-trip-8d7n-v5.png`

Create a photorealistic travel image for "Srinagar – Kargil – Leh Road Trip" — 8-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/ladakh-srinagar-kargil-leh-road-trip-8d7n-v6.png`

Create a photorealistic travel image for "Srinagar – Kargil – Leh Road Trip" — 8-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/ladakh-srinagar-kargil-leh-road-trip-8d7n-v7.png`

Create a photorealistic travel image for "Srinagar – Kargil – Leh Road Trip" — 8-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/ladakh-srinagar-kargil-leh-road-trip-8d7n-v8.png`

Create a photorealistic travel image for "Srinagar – Kargil – Leh Road Trip" — 8-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/ladakh-srinagar-kargil-leh-road-trip-8d7n-v9.png`

Create a photorealistic travel image for "Srinagar – Kargil – Leh Road Trip" — 8-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/ladakh-srinagar-kargil-leh-road-trip-8d7n-v10.png`

Create a photorealistic travel image for "Srinagar – Kargil – Leh Road Trip" — 8-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Delhi – Manali – Leh Expedition
Slug: `ladakh-delhi-manali-leh-expedition-10d9n` | 10D/9N | ₹ 39,999

**v1** → `public/images/packages/ladakh-delhi-manali-leh-expedition-10d9n-v1.png`

Create a photorealistic travel image for "Delhi – Manali – Leh Expedition" — 10-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/ladakh-delhi-manali-leh-expedition-10d9n-v2.png`

Create a photorealistic travel image for "Delhi – Manali – Leh Expedition" — 10-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/ladakh-delhi-manali-leh-expedition-10d9n-v3.png`

Create a photorealistic travel image for "Delhi – Manali – Leh Expedition" — 10-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/ladakh-delhi-manali-leh-expedition-10d9n-v4.png`

Create a photorealistic travel image for "Delhi – Manali – Leh Expedition" — 10-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/ladakh-delhi-manali-leh-expedition-10d9n-v5.png`

Create a photorealistic travel image for "Delhi – Manali – Leh Expedition" — 10-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/ladakh-delhi-manali-leh-expedition-10d9n-v6.png`

Create a photorealistic travel image for "Delhi – Manali – Leh Expedition" — 10-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/ladakh-delhi-manali-leh-expedition-10d9n-v7.png`

Create a photorealistic travel image for "Delhi – Manali – Leh Expedition" — 10-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/ladakh-delhi-manali-leh-expedition-10d9n-v8.png`

Create a photorealistic travel image for "Delhi – Manali – Leh Expedition" — 10-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/ladakh-delhi-manali-leh-expedition-10d9n-v9.png`

Create a photorealistic travel image for "Delhi – Manali – Leh Expedition" — 10-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/ladakh-delhi-manali-leh-expedition-10d9n-v10.png`

Create a photorealistic travel image for "Delhi – Manali – Leh Expedition" — 10-day Ladakh holiday package, India. Scene: scenic highlights of high-altitude desert, monasteries, Pangong blue lake. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.


### Lakshadweep (6 packages)

#### Lakshadweep Island Escape
Slug: `lakshadweep-lakshadweep-island-escape-4d3n` | 4D/3N | ₹ 24,999

**v1** → `public/images/packages/lakshadweep-lakshadweep-island-escape-4d3n-v1.png`

Create a photorealistic travel image for "Lakshadweep Island Escape" — 4-day Lakshadweep holiday package, India. Scene: scenic highlights of crystal clear lagoon, coral atoll, tropical island. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/lakshadweep-lakshadweep-island-escape-4d3n-v2.png`

Create a photorealistic travel image for "Lakshadweep Island Escape" — 4-day Lakshadweep holiday package, India. Scene: scenic highlights of crystal clear lagoon, coral atoll, tropical island. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/lakshadweep-lakshadweep-island-escape-4d3n-v3.png`

Create a photorealistic travel image for "Lakshadweep Island Escape" — 4-day Lakshadweep holiday package, India. Scene: scenic highlights of crystal clear lagoon, coral atoll, tropical island. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/lakshadweep-lakshadweep-island-escape-4d3n-v4.png`

Create a photorealistic travel image for "Lakshadweep Island Escape" — 4-day Lakshadweep holiday package, India. Scene: scenic highlights of crystal clear lagoon, coral atoll, tropical island. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/lakshadweep-lakshadweep-island-escape-4d3n-v5.png`

Create a photorealistic travel image for "Lakshadweep Island Escape" — 4-day Lakshadweep holiday package, India. Scene: scenic highlights of crystal clear lagoon, coral atoll, tropical island. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/lakshadweep-lakshadweep-island-escape-4d3n-v6.png`

Create a photorealistic travel image for "Lakshadweep Island Escape" — 4-day Lakshadweep holiday package, India. Scene: scenic highlights of crystal clear lagoon, coral atoll, tropical island. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/lakshadweep-lakshadweep-island-escape-4d3n-v7.png`

Create a photorealistic travel image for "Lakshadweep Island Escape" — 4-day Lakshadweep holiday package, India. Scene: scenic highlights of crystal clear lagoon, coral atoll, tropical island. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/lakshadweep-lakshadweep-island-escape-4d3n-v8.png`

Create a photorealistic travel image for "Lakshadweep Island Escape" — 4-day Lakshadweep holiday package, India. Scene: scenic highlights of crystal clear lagoon, coral atoll, tropical island. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/lakshadweep-lakshadweep-island-escape-4d3n-v9.png`

Create a photorealistic travel image for "Lakshadweep Island Escape" — 4-day Lakshadweep holiday package, India. Scene: scenic highlights of crystal clear lagoon, coral atoll, tropical island. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/lakshadweep-lakshadweep-island-escape-4d3n-v10.png`

Create a photorealistic travel image for "Lakshadweep Island Escape" — 4-day Lakshadweep holiday package, India. Scene: scenic highlights of crystal clear lagoon, coral atoll, tropical island. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Lakshadweep Honeymoon Retreat
Slug: `lakshadweep-lakshadweep-honeymoon-retreat-5d4n` | 5D/4N | ₹ 39,999

**v1** → `public/images/packages/lakshadweep-lakshadweep-honeymoon-retreat-5d4n-v1.png`

Create a photorealistic travel image for "Lakshadweep Honeymoon Retreat" — 5-day Lakshadweep holiday package, India. Scene: romantic crystal clear lagoon, coral atoll, tropical island, intimate luxury mood. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/lakshadweep-lakshadweep-honeymoon-retreat-5d4n-v2.png`

Create a photorealistic travel image for "Lakshadweep Honeymoon Retreat" — 5-day Lakshadweep holiday package, India. Scene: romantic crystal clear lagoon, coral atoll, tropical island, intimate luxury mood. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/lakshadweep-lakshadweep-honeymoon-retreat-5d4n-v3.png`

Create a photorealistic travel image for "Lakshadweep Honeymoon Retreat" — 5-day Lakshadweep holiday package, India. Scene: romantic crystal clear lagoon, coral atoll, tropical island, intimate luxury mood. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/lakshadweep-lakshadweep-honeymoon-retreat-5d4n-v4.png`

Create a photorealistic travel image for "Lakshadweep Honeymoon Retreat" — 5-day Lakshadweep holiday package, India. Scene: romantic crystal clear lagoon, coral atoll, tropical island, intimate luxury mood. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/lakshadweep-lakshadweep-honeymoon-retreat-5d4n-v5.png`

Create a photorealistic travel image for "Lakshadweep Honeymoon Retreat" — 5-day Lakshadweep holiday package, India. Scene: romantic crystal clear lagoon, coral atoll, tropical island, intimate luxury mood. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/lakshadweep-lakshadweep-honeymoon-retreat-5d4n-v6.png`

Create a photorealistic travel image for "Lakshadweep Honeymoon Retreat" — 5-day Lakshadweep holiday package, India. Scene: romantic crystal clear lagoon, coral atoll, tropical island, intimate luxury mood. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/lakshadweep-lakshadweep-honeymoon-retreat-5d4n-v7.png`

Create a photorealistic travel image for "Lakshadweep Honeymoon Retreat" — 5-day Lakshadweep holiday package, India. Scene: romantic crystal clear lagoon, coral atoll, tropical island, intimate luxury mood. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/lakshadweep-lakshadweep-honeymoon-retreat-5d4n-v8.png`

Create a photorealistic travel image for "Lakshadweep Honeymoon Retreat" — 5-day Lakshadweep holiday package, India. Scene: romantic crystal clear lagoon, coral atoll, tropical island, intimate luxury mood. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/lakshadweep-lakshadweep-honeymoon-retreat-5d4n-v9.png`

Create a photorealistic travel image for "Lakshadweep Honeymoon Retreat" — 5-day Lakshadweep holiday package, India. Scene: romantic crystal clear lagoon, coral atoll, tropical island, intimate luxury mood. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/lakshadweep-lakshadweep-honeymoon-retreat-5d4n-v10.png`

Create a photorealistic travel image for "Lakshadweep Honeymoon Retreat" — 5-day Lakshadweep holiday package, India. Scene: romantic crystal clear lagoon, coral atoll, tropical island, intimate luxury mood. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### ‍‍‍ Lakshadweep Family Vacation
Slug: `lakshadweep-lakshadweep-family-vacation-5d4n` | 5D/4N | ₹ 29,999

**v1** → `public/images/packages/lakshadweep-lakshadweep-family-vacation-5d4n-v1.png`

Create a photorealistic travel image for "‍‍‍ Lakshadweep Family Vacation" — 5-day Lakshadweep holiday package, India. Scene: family-friendly crystal clear lagoon, coral atoll, tropical island, cheerful safe travel. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/lakshadweep-lakshadweep-family-vacation-5d4n-v2.png`

Create a photorealistic travel image for "‍‍‍ Lakshadweep Family Vacation" — 5-day Lakshadweep holiday package, India. Scene: family-friendly crystal clear lagoon, coral atoll, tropical island, cheerful safe travel. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/lakshadweep-lakshadweep-family-vacation-5d4n-v3.png`

Create a photorealistic travel image for "‍‍‍ Lakshadweep Family Vacation" — 5-day Lakshadweep holiday package, India. Scene: family-friendly crystal clear lagoon, coral atoll, tropical island, cheerful safe travel. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/lakshadweep-lakshadweep-family-vacation-5d4n-v4.png`

Create a photorealistic travel image for "‍‍‍ Lakshadweep Family Vacation" — 5-day Lakshadweep holiday package, India. Scene: family-friendly crystal clear lagoon, coral atoll, tropical island, cheerful safe travel. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/lakshadweep-lakshadweep-family-vacation-5d4n-v5.png`

Create a photorealistic travel image for "‍‍‍ Lakshadweep Family Vacation" — 5-day Lakshadweep holiday package, India. Scene: family-friendly crystal clear lagoon, coral atoll, tropical island, cheerful safe travel. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/lakshadweep-lakshadweep-family-vacation-5d4n-v6.png`

Create a photorealistic travel image for "‍‍‍ Lakshadweep Family Vacation" — 5-day Lakshadweep holiday package, India. Scene: family-friendly crystal clear lagoon, coral atoll, tropical island, cheerful safe travel. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/lakshadweep-lakshadweep-family-vacation-5d4n-v7.png`

Create a photorealistic travel image for "‍‍‍ Lakshadweep Family Vacation" — 5-day Lakshadweep holiday package, India. Scene: family-friendly crystal clear lagoon, coral atoll, tropical island, cheerful safe travel. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/lakshadweep-lakshadweep-family-vacation-5d4n-v8.png`

Create a photorealistic travel image for "‍‍‍ Lakshadweep Family Vacation" — 5-day Lakshadweep holiday package, India. Scene: family-friendly crystal clear lagoon, coral atoll, tropical island, cheerful safe travel. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/lakshadweep-lakshadweep-family-vacation-5d4n-v9.png`

Create a photorealistic travel image for "‍‍‍ Lakshadweep Family Vacation" — 5-day Lakshadweep holiday package, India. Scene: family-friendly crystal clear lagoon, coral atoll, tropical island, cheerful safe travel. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/lakshadweep-lakshadweep-family-vacation-5d4n-v10.png`

Create a photorealistic travel image for "‍‍‍ Lakshadweep Family Vacation" — 5-day Lakshadweep holiday package, India. Scene: family-friendly crystal clear lagoon, coral atoll, tropical island, cheerful safe travel. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Lakshadweep Adventure & Scuba Tour
Slug: `lakshadweep-lakshadweep-adventure-scuba-tour-6d5n` | 6D/5N | ₹ 34,999

**v1** → `public/images/packages/lakshadweep-lakshadweep-adventure-scuba-tour-6d5n-v1.png`

Create a photorealistic travel image for "Lakshadweep Adventure & Scuba Tour" — 6-day Lakshadweep holiday package, India. Scene: adventure crystal clear lagoon, coral atoll, tropical island, thrilling outdoor. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/lakshadweep-lakshadweep-adventure-scuba-tour-6d5n-v2.png`

Create a photorealistic travel image for "Lakshadweep Adventure & Scuba Tour" — 6-day Lakshadweep holiday package, India. Scene: adventure crystal clear lagoon, coral atoll, tropical island, thrilling outdoor. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/lakshadweep-lakshadweep-adventure-scuba-tour-6d5n-v3.png`

Create a photorealistic travel image for "Lakshadweep Adventure & Scuba Tour" — 6-day Lakshadweep holiday package, India. Scene: adventure crystal clear lagoon, coral atoll, tropical island, thrilling outdoor. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/lakshadweep-lakshadweep-adventure-scuba-tour-6d5n-v4.png`

Create a photorealistic travel image for "Lakshadweep Adventure & Scuba Tour" — 6-day Lakshadweep holiday package, India. Scene: adventure crystal clear lagoon, coral atoll, tropical island, thrilling outdoor. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/lakshadweep-lakshadweep-adventure-scuba-tour-6d5n-v5.png`

Create a photorealistic travel image for "Lakshadweep Adventure & Scuba Tour" — 6-day Lakshadweep holiday package, India. Scene: adventure crystal clear lagoon, coral atoll, tropical island, thrilling outdoor. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/lakshadweep-lakshadweep-adventure-scuba-tour-6d5n-v6.png`

Create a photorealistic travel image for "Lakshadweep Adventure & Scuba Tour" — 6-day Lakshadweep holiday package, India. Scene: adventure crystal clear lagoon, coral atoll, tropical island, thrilling outdoor. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/lakshadweep-lakshadweep-adventure-scuba-tour-6d5n-v7.png`

Create a photorealistic travel image for "Lakshadweep Adventure & Scuba Tour" — 6-day Lakshadweep holiday package, India. Scene: adventure crystal clear lagoon, coral atoll, tropical island, thrilling outdoor. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/lakshadweep-lakshadweep-adventure-scuba-tour-6d5n-v8.png`

Create a photorealistic travel image for "Lakshadweep Adventure & Scuba Tour" — 6-day Lakshadweep holiday package, India. Scene: adventure crystal clear lagoon, coral atoll, tropical island, thrilling outdoor. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/lakshadweep-lakshadweep-adventure-scuba-tour-6d5n-v9.png`

Create a photorealistic travel image for "Lakshadweep Adventure & Scuba Tour" — 6-day Lakshadweep holiday package, India. Scene: adventure crystal clear lagoon, coral atoll, tropical island, thrilling outdoor. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/lakshadweep-lakshadweep-adventure-scuba-tour-6d5n-v10.png`

Create a photorealistic travel image for "Lakshadweep Adventure & Scuba Tour" — 6-day Lakshadweep holiday package, India. Scene: adventure crystal clear lagoon, coral atoll, tropical island, thrilling outdoor. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Agatti & Bangaram Island Explorer
Slug: `lakshadweep-agatti-bangaram-island-explorer-6d5n` | 6D/5N | ₹ 36,999

**v1** → `public/images/packages/lakshadweep-agatti-bangaram-island-explorer-6d5n-v1.png`

Create a photorealistic travel image for "Agatti & Bangaram Island Explorer" — 6-day Lakshadweep holiday package, India. Scene: scenic highlights of crystal clear lagoon, coral atoll, tropical island. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/lakshadweep-agatti-bangaram-island-explorer-6d5n-v2.png`

Create a photorealistic travel image for "Agatti & Bangaram Island Explorer" — 6-day Lakshadweep holiday package, India. Scene: scenic highlights of crystal clear lagoon, coral atoll, tropical island. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/lakshadweep-agatti-bangaram-island-explorer-6d5n-v3.png`

Create a photorealistic travel image for "Agatti & Bangaram Island Explorer" — 6-day Lakshadweep holiday package, India. Scene: scenic highlights of crystal clear lagoon, coral atoll, tropical island. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/lakshadweep-agatti-bangaram-island-explorer-6d5n-v4.png`

Create a photorealistic travel image for "Agatti & Bangaram Island Explorer" — 6-day Lakshadweep holiday package, India. Scene: scenic highlights of crystal clear lagoon, coral atoll, tropical island. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/lakshadweep-agatti-bangaram-island-explorer-6d5n-v5.png`

Create a photorealistic travel image for "Agatti & Bangaram Island Explorer" — 6-day Lakshadweep holiday package, India. Scene: scenic highlights of crystal clear lagoon, coral atoll, tropical island. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/lakshadweep-agatti-bangaram-island-explorer-6d5n-v6.png`

Create a photorealistic travel image for "Agatti & Bangaram Island Explorer" — 6-day Lakshadweep holiday package, India. Scene: scenic highlights of crystal clear lagoon, coral atoll, tropical island. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/lakshadweep-agatti-bangaram-island-explorer-6d5n-v7.png`

Create a photorealistic travel image for "Agatti & Bangaram Island Explorer" — 6-day Lakshadweep holiday package, India. Scene: scenic highlights of crystal clear lagoon, coral atoll, tropical island. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/lakshadweep-agatti-bangaram-island-explorer-6d5n-v8.png`

Create a photorealistic travel image for "Agatti & Bangaram Island Explorer" — 6-day Lakshadweep holiday package, India. Scene: scenic highlights of crystal clear lagoon, coral atoll, tropical island. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/lakshadweep-agatti-bangaram-island-explorer-6d5n-v9.png`

Create a photorealistic travel image for "Agatti & Bangaram Island Explorer" — 6-day Lakshadweep holiday package, India. Scene: scenic highlights of crystal clear lagoon, coral atoll, tropical island. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/lakshadweep-agatti-bangaram-island-explorer-6d5n-v10.png`

Create a photorealistic travel image for "Agatti & Bangaram Island Explorer" — 6-day Lakshadweep holiday package, India. Scene: scenic highlights of crystal clear lagoon, coral atoll, tropical island. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Complete Lakshadweep Grand Tour
Slug: `lakshadweep-complete-lakshadweep-grand-tour-7d6n` | 7D/6N | ₹ 44,999

**v1** → `public/images/packages/lakshadweep-complete-lakshadweep-grand-tour-7d6n-v1.png`

Create a photorealistic travel image for "Complete Lakshadweep Grand Tour" — 7-day Lakshadweep holiday package, India. Scene: heritage circuit crystal clear lagoon, coral atoll, tropical island. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/lakshadweep-complete-lakshadweep-grand-tour-7d6n-v2.png`

Create a photorealistic travel image for "Complete Lakshadweep Grand Tour" — 7-day Lakshadweep holiday package, India. Scene: heritage circuit crystal clear lagoon, coral atoll, tropical island. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/lakshadweep-complete-lakshadweep-grand-tour-7d6n-v3.png`

Create a photorealistic travel image for "Complete Lakshadweep Grand Tour" — 7-day Lakshadweep holiday package, India. Scene: heritage circuit crystal clear lagoon, coral atoll, tropical island. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/lakshadweep-complete-lakshadweep-grand-tour-7d6n-v4.png`

Create a photorealistic travel image for "Complete Lakshadweep Grand Tour" — 7-day Lakshadweep holiday package, India. Scene: heritage circuit crystal clear lagoon, coral atoll, tropical island. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/lakshadweep-complete-lakshadweep-grand-tour-7d6n-v5.png`

Create a photorealistic travel image for "Complete Lakshadweep Grand Tour" — 7-day Lakshadweep holiday package, India. Scene: heritage circuit crystal clear lagoon, coral atoll, tropical island. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/lakshadweep-complete-lakshadweep-grand-tour-7d6n-v6.png`

Create a photorealistic travel image for "Complete Lakshadweep Grand Tour" — 7-day Lakshadweep holiday package, India. Scene: heritage circuit crystal clear lagoon, coral atoll, tropical island. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/lakshadweep-complete-lakshadweep-grand-tour-7d6n-v7.png`

Create a photorealistic travel image for "Complete Lakshadweep Grand Tour" — 7-day Lakshadweep holiday package, India. Scene: heritage circuit crystal clear lagoon, coral atoll, tropical island. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/lakshadweep-complete-lakshadweep-grand-tour-7d6n-v8.png`

Create a photorealistic travel image for "Complete Lakshadweep Grand Tour" — 7-day Lakshadweep holiday package, India. Scene: heritage circuit crystal clear lagoon, coral atoll, tropical island. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/lakshadweep-complete-lakshadweep-grand-tour-7d6n-v9.png`

Create a photorealistic travel image for "Complete Lakshadweep Grand Tour" — 7-day Lakshadweep holiday package, India. Scene: heritage circuit crystal clear lagoon, coral atoll, tropical island. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/lakshadweep-complete-lakshadweep-grand-tour-7d6n-v10.png`

Create a photorealistic travel image for "Complete Lakshadweep Grand Tour" — 7-day Lakshadweep holiday package, India. Scene: heritage circuit crystal clear lagoon, coral atoll, tropical island. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.


### Madhya Pradesh (4 packages)

#### Ujjain Spiritual Tour Package
Slug: `madhya-pradesh-ujjain-spiritual-tour-package-3d2n` | 3D/2N | ₹ 8,999

**v1** → `public/images/packages/madhya-pradesh-ujjain-spiritual-tour-package-3d2n-v1.png`

Create a photorealistic travel image for "Ujjain Spiritual Tour Package" — 3-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/madhya-pradesh-ujjain-spiritual-tour-package-3d2n-v2.png`

Create a photorealistic travel image for "Ujjain Spiritual Tour Package" — 3-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/madhya-pradesh-ujjain-spiritual-tour-package-3d2n-v3.png`

Create a photorealistic travel image for "Ujjain Spiritual Tour Package" — 3-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/madhya-pradesh-ujjain-spiritual-tour-package-3d2n-v4.png`

Create a photorealistic travel image for "Ujjain Spiritual Tour Package" — 3-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/madhya-pradesh-ujjain-spiritual-tour-package-3d2n-v5.png`

Create a photorealistic travel image for "Ujjain Spiritual Tour Package" — 3-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/madhya-pradesh-ujjain-spiritual-tour-package-3d2n-v6.png`

Create a photorealistic travel image for "Ujjain Spiritual Tour Package" — 3-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/madhya-pradesh-ujjain-spiritual-tour-package-3d2n-v7.png`

Create a photorealistic travel image for "Ujjain Spiritual Tour Package" — 3-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/madhya-pradesh-ujjain-spiritual-tour-package-3d2n-v8.png`

Create a photorealistic travel image for "Ujjain Spiritual Tour Package" — 3-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/madhya-pradesh-ujjain-spiritual-tour-package-3d2n-v9.png`

Create a photorealistic travel image for "Ujjain Spiritual Tour Package" — 3-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/madhya-pradesh-ujjain-spiritual-tour-package-3d2n-v10.png`

Create a photorealistic travel image for "Ujjain Spiritual Tour Package" — 3-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Ujjain & Omkareshwar Tour Package
Slug: `madhya-pradesh-ujjain-omkareshwar-tour-package-4d3n` | 4D/3N | ₹ 12,999

**v1** → `public/images/packages/madhya-pradesh-ujjain-omkareshwar-tour-package-4d3n-v1.png`

Create a photorealistic travel image for "Ujjain & Omkareshwar Tour Package" — 4-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/madhya-pradesh-ujjain-omkareshwar-tour-package-4d3n-v2.png`

Create a photorealistic travel image for "Ujjain & Omkareshwar Tour Package" — 4-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/madhya-pradesh-ujjain-omkareshwar-tour-package-4d3n-v3.png`

Create a photorealistic travel image for "Ujjain & Omkareshwar Tour Package" — 4-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/madhya-pradesh-ujjain-omkareshwar-tour-package-4d3n-v4.png`

Create a photorealistic travel image for "Ujjain & Omkareshwar Tour Package" — 4-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/madhya-pradesh-ujjain-omkareshwar-tour-package-4d3n-v5.png`

Create a photorealistic travel image for "Ujjain & Omkareshwar Tour Package" — 4-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/madhya-pradesh-ujjain-omkareshwar-tour-package-4d3n-v6.png`

Create a photorealistic travel image for "Ujjain & Omkareshwar Tour Package" — 4-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/madhya-pradesh-ujjain-omkareshwar-tour-package-4d3n-v7.png`

Create a photorealistic travel image for "Ujjain & Omkareshwar Tour Package" — 4-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/madhya-pradesh-ujjain-omkareshwar-tour-package-4d3n-v8.png`

Create a photorealistic travel image for "Ujjain & Omkareshwar Tour Package" — 4-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/madhya-pradesh-ujjain-omkareshwar-tour-package-4d3n-v9.png`

Create a photorealistic travel image for "Ujjain & Omkareshwar Tour Package" — 4-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/madhya-pradesh-ujjain-omkareshwar-tour-package-4d3n-v10.png`

Create a photorealistic travel image for "Ujjain & Omkareshwar Tour Package" — 4-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Bandhavgarh & Jabalpur Tour Package
Slug: `madhya-pradesh-bandhavgarh-jabalpur-tour-package-5d4n` | 5D/4N | ₹ 18,999

**v1** → `public/images/packages/madhya-pradesh-bandhavgarh-jabalpur-tour-package-5d4n-v1.png`

Create a photorealistic travel image for "Bandhavgarh & Jabalpur Tour Package" — 5-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/madhya-pradesh-bandhavgarh-jabalpur-tour-package-5d4n-v2.png`

Create a photorealistic travel image for "Bandhavgarh & Jabalpur Tour Package" — 5-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/madhya-pradesh-bandhavgarh-jabalpur-tour-package-5d4n-v3.png`

Create a photorealistic travel image for "Bandhavgarh & Jabalpur Tour Package" — 5-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/madhya-pradesh-bandhavgarh-jabalpur-tour-package-5d4n-v4.png`

Create a photorealistic travel image for "Bandhavgarh & Jabalpur Tour Package" — 5-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/madhya-pradesh-bandhavgarh-jabalpur-tour-package-5d4n-v5.png`

Create a photorealistic travel image for "Bandhavgarh & Jabalpur Tour Package" — 5-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/madhya-pradesh-bandhavgarh-jabalpur-tour-package-5d4n-v6.png`

Create a photorealistic travel image for "Bandhavgarh & Jabalpur Tour Package" — 5-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/madhya-pradesh-bandhavgarh-jabalpur-tour-package-5d4n-v7.png`

Create a photorealistic travel image for "Bandhavgarh & Jabalpur Tour Package" — 5-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/madhya-pradesh-bandhavgarh-jabalpur-tour-package-5d4n-v8.png`

Create a photorealistic travel image for "Bandhavgarh & Jabalpur Tour Package" — 5-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/madhya-pradesh-bandhavgarh-jabalpur-tour-package-5d4n-v9.png`

Create a photorealistic travel image for "Bandhavgarh & Jabalpur Tour Package" — 5-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/madhya-pradesh-bandhavgarh-jabalpur-tour-package-5d4n-v10.png`

Create a photorealistic travel image for "Bandhavgarh & Jabalpur Tour Package" — 5-day Madhya Pradesh holiday package, India. Scene: scenic highlights of Khajuraho temples, wildlife safari, marble rocks. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Bandhavgarh & Kanha Wildlife Tour
Slug: `madhya-pradesh-bandhavgarh-kanha-wildlife-tour-6d5n` | 6D/5N | ₹ 24,999

**v1** → `public/images/packages/madhya-pradesh-bandhavgarh-kanha-wildlife-tour-6d5n-v1.png`

Create a photorealistic travel image for "Bandhavgarh & Kanha Wildlife Tour" — 6-day Madhya Pradesh holiday package, India. Scene: wildlife safari Khajuraho temples, wildlife safari, marble rocks. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/madhya-pradesh-bandhavgarh-kanha-wildlife-tour-6d5n-v2.png`

Create a photorealistic travel image for "Bandhavgarh & Kanha Wildlife Tour" — 6-day Madhya Pradesh holiday package, India. Scene: wildlife safari Khajuraho temples, wildlife safari, marble rocks. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/madhya-pradesh-bandhavgarh-kanha-wildlife-tour-6d5n-v3.png`

Create a photorealistic travel image for "Bandhavgarh & Kanha Wildlife Tour" — 6-day Madhya Pradesh holiday package, India. Scene: wildlife safari Khajuraho temples, wildlife safari, marble rocks. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/madhya-pradesh-bandhavgarh-kanha-wildlife-tour-6d5n-v4.png`

Create a photorealistic travel image for "Bandhavgarh & Kanha Wildlife Tour" — 6-day Madhya Pradesh holiday package, India. Scene: wildlife safari Khajuraho temples, wildlife safari, marble rocks. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/madhya-pradesh-bandhavgarh-kanha-wildlife-tour-6d5n-v5.png`

Create a photorealistic travel image for "Bandhavgarh & Kanha Wildlife Tour" — 6-day Madhya Pradesh holiday package, India. Scene: wildlife safari Khajuraho temples, wildlife safari, marble rocks. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/madhya-pradesh-bandhavgarh-kanha-wildlife-tour-6d5n-v6.png`

Create a photorealistic travel image for "Bandhavgarh & Kanha Wildlife Tour" — 6-day Madhya Pradesh holiday package, India. Scene: wildlife safari Khajuraho temples, wildlife safari, marble rocks. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/madhya-pradesh-bandhavgarh-kanha-wildlife-tour-6d5n-v7.png`

Create a photorealistic travel image for "Bandhavgarh & Kanha Wildlife Tour" — 6-day Madhya Pradesh holiday package, India. Scene: wildlife safari Khajuraho temples, wildlife safari, marble rocks. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/madhya-pradesh-bandhavgarh-kanha-wildlife-tour-6d5n-v8.png`

Create a photorealistic travel image for "Bandhavgarh & Kanha Wildlife Tour" — 6-day Madhya Pradesh holiday package, India. Scene: wildlife safari Khajuraho temples, wildlife safari, marble rocks. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/madhya-pradesh-bandhavgarh-kanha-wildlife-tour-6d5n-v9.png`

Create a photorealistic travel image for "Bandhavgarh & Kanha Wildlife Tour" — 6-day Madhya Pradesh holiday package, India. Scene: wildlife safari Khajuraho temples, wildlife safari, marble rocks. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/madhya-pradesh-bandhavgarh-kanha-wildlife-tour-6d5n-v10.png`

Create a photorealistic travel image for "Bandhavgarh & Kanha Wildlife Tour" — 6-day Madhya Pradesh holiday package, India. Scene: wildlife safari Khajuraho temples, wildlife safari, marble rocks. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.


### Maharashtra (7 packages)

#### Mumbai City Tour Package
Slug: `maharashtra-mumbai-city-tour-package-3d2n` | 3D/2N | ₹ 9,999

**v1** → `public/images/packages/maharashtra-mumbai-city-tour-package-3d2n-v1.png`

Create a photorealistic travel image for "Mumbai City Tour Package" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/maharashtra-mumbai-city-tour-package-3d2n-v2.png`

Create a photorealistic travel image for "Mumbai City Tour Package" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/maharashtra-mumbai-city-tour-package-3d2n-v3.png`

Create a photorealistic travel image for "Mumbai City Tour Package" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/maharashtra-mumbai-city-tour-package-3d2n-v4.png`

Create a photorealistic travel image for "Mumbai City Tour Package" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/maharashtra-mumbai-city-tour-package-3d2n-v5.png`

Create a photorealistic travel image for "Mumbai City Tour Package" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/maharashtra-mumbai-city-tour-package-3d2n-v6.png`

Create a photorealistic travel image for "Mumbai City Tour Package" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/maharashtra-mumbai-city-tour-package-3d2n-v7.png`

Create a photorealistic travel image for "Mumbai City Tour Package" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/maharashtra-mumbai-city-tour-package-3d2n-v8.png`

Create a photorealistic travel image for "Mumbai City Tour Package" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/maharashtra-mumbai-city-tour-package-3d2n-v9.png`

Create a photorealistic travel image for "Mumbai City Tour Package" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/maharashtra-mumbai-city-tour-package-3d2n-v10.png`

Create a photorealistic travel image for "Mumbai City Tour Package" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Lonavala – Khandala Weekend Tour
Slug: `maharashtra-lonavala-khandala-weekend-tour-3d2n` | 3D/2N | ₹ 10,999

**v1** → `public/images/packages/maharashtra-lonavala-khandala-weekend-tour-3d2n-v1.png`

Create a photorealistic travel image for "Lonavala – Khandala Weekend Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/maharashtra-lonavala-khandala-weekend-tour-3d2n-v2.png`

Create a photorealistic travel image for "Lonavala – Khandala Weekend Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/maharashtra-lonavala-khandala-weekend-tour-3d2n-v3.png`

Create a photorealistic travel image for "Lonavala – Khandala Weekend Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/maharashtra-lonavala-khandala-weekend-tour-3d2n-v4.png`

Create a photorealistic travel image for "Lonavala – Khandala Weekend Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/maharashtra-lonavala-khandala-weekend-tour-3d2n-v5.png`

Create a photorealistic travel image for "Lonavala – Khandala Weekend Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/maharashtra-lonavala-khandala-weekend-tour-3d2n-v6.png`

Create a photorealistic travel image for "Lonavala – Khandala Weekend Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/maharashtra-lonavala-khandala-weekend-tour-3d2n-v7.png`

Create a photorealistic travel image for "Lonavala – Khandala Weekend Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/maharashtra-lonavala-khandala-weekend-tour-3d2n-v8.png`

Create a photorealistic travel image for "Lonavala – Khandala Weekend Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/maharashtra-lonavala-khandala-weekend-tour-3d2n-v9.png`

Create a photorealistic travel image for "Lonavala – Khandala Weekend Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/maharashtra-lonavala-khandala-weekend-tour-3d2n-v10.png`

Create a photorealistic travel image for "Lonavala – Khandala Weekend Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Mahabaleshwar – Panchgani Hill Station Tour
Slug: `maharashtra-mahabaleshwar-panchgani-hill-station-tour-4d3n` | 4D/3N | ₹ 14,999

**v1** → `public/images/packages/maharashtra-mahabaleshwar-panchgani-hill-station-tour-4d3n-v1.png`

Create a photorealistic travel image for "Mahabaleshwar – Panchgani Hill Station Tour" — 4-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/maharashtra-mahabaleshwar-panchgani-hill-station-tour-4d3n-v2.png`

Create a photorealistic travel image for "Mahabaleshwar – Panchgani Hill Station Tour" — 4-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/maharashtra-mahabaleshwar-panchgani-hill-station-tour-4d3n-v3.png`

Create a photorealistic travel image for "Mahabaleshwar – Panchgani Hill Station Tour" — 4-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/maharashtra-mahabaleshwar-panchgani-hill-station-tour-4d3n-v4.png`

Create a photorealistic travel image for "Mahabaleshwar – Panchgani Hill Station Tour" — 4-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/maharashtra-mahabaleshwar-panchgani-hill-station-tour-4d3n-v5.png`

Create a photorealistic travel image for "Mahabaleshwar – Panchgani Hill Station Tour" — 4-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/maharashtra-mahabaleshwar-panchgani-hill-station-tour-4d3n-v6.png`

Create a photorealistic travel image for "Mahabaleshwar – Panchgani Hill Station Tour" — 4-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/maharashtra-mahabaleshwar-panchgani-hill-station-tour-4d3n-v7.png`

Create a photorealistic travel image for "Mahabaleshwar – Panchgani Hill Station Tour" — 4-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/maharashtra-mahabaleshwar-panchgani-hill-station-tour-4d3n-v8.png`

Create a photorealistic travel image for "Mahabaleshwar – Panchgani Hill Station Tour" — 4-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/maharashtra-mahabaleshwar-panchgani-hill-station-tour-4d3n-v9.png`

Create a photorealistic travel image for "Mahabaleshwar – Panchgani Hill Station Tour" — 4-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/maharashtra-mahabaleshwar-panchgani-hill-station-tour-4d3n-v10.png`

Create a photorealistic travel image for "Mahabaleshwar – Panchgani Hill Station Tour" — 4-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Shirdi – Shani Shingnapur Spiritual Tour
Slug: `maharashtra-shirdi-shani-shingnapur-spiritual-tour-3d2n` | 3D/2N | ₹ 10,999

**v1** → `public/images/packages/maharashtra-shirdi-shani-shingnapur-spiritual-tour-3d2n-v1.png`

Create a photorealistic travel image for "Shirdi – Shani Shingnapur Spiritual Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/maharashtra-shirdi-shani-shingnapur-spiritual-tour-3d2n-v2.png`

Create a photorealistic travel image for "Shirdi – Shani Shingnapur Spiritual Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/maharashtra-shirdi-shani-shingnapur-spiritual-tour-3d2n-v3.png`

Create a photorealistic travel image for "Shirdi – Shani Shingnapur Spiritual Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/maharashtra-shirdi-shani-shingnapur-spiritual-tour-3d2n-v4.png`

Create a photorealistic travel image for "Shirdi – Shani Shingnapur Spiritual Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/maharashtra-shirdi-shani-shingnapur-spiritual-tour-3d2n-v5.png`

Create a photorealistic travel image for "Shirdi – Shani Shingnapur Spiritual Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/maharashtra-shirdi-shani-shingnapur-spiritual-tour-3d2n-v6.png`

Create a photorealistic travel image for "Shirdi – Shani Shingnapur Spiritual Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/maharashtra-shirdi-shani-shingnapur-spiritual-tour-3d2n-v7.png`

Create a photorealistic travel image for "Shirdi – Shani Shingnapur Spiritual Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/maharashtra-shirdi-shani-shingnapur-spiritual-tour-3d2n-v8.png`

Create a photorealistic travel image for "Shirdi – Shani Shingnapur Spiritual Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/maharashtra-shirdi-shani-shingnapur-spiritual-tour-3d2n-v9.png`

Create a photorealistic travel image for "Shirdi – Shani Shingnapur Spiritual Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/maharashtra-shirdi-shani-shingnapur-spiritual-tour-3d2n-v10.png`

Create a photorealistic travel image for "Shirdi – Shani Shingnapur Spiritual Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Tadoba Wildlife Safari Tour
Slug: `maharashtra-tadoba-wildlife-safari-tour-4d3n` | 4D/3N | ₹ 16,999

**v1** → `public/images/packages/maharashtra-tadoba-wildlife-safari-tour-4d3n-v1.png`

Create a photorealistic travel image for "Tadoba Wildlife Safari Tour" — 4-day Maharashtra holiday package, India. Scene: wildlife safari Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/maharashtra-tadoba-wildlife-safari-tour-4d3n-v2.png`

Create a photorealistic travel image for "Tadoba Wildlife Safari Tour" — 4-day Maharashtra holiday package, India. Scene: wildlife safari Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/maharashtra-tadoba-wildlife-safari-tour-4d3n-v3.png`

Create a photorealistic travel image for "Tadoba Wildlife Safari Tour" — 4-day Maharashtra holiday package, India. Scene: wildlife safari Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/maharashtra-tadoba-wildlife-safari-tour-4d3n-v4.png`

Create a photorealistic travel image for "Tadoba Wildlife Safari Tour" — 4-day Maharashtra holiday package, India. Scene: wildlife safari Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/maharashtra-tadoba-wildlife-safari-tour-4d3n-v5.png`

Create a photorealistic travel image for "Tadoba Wildlife Safari Tour" — 4-day Maharashtra holiday package, India. Scene: wildlife safari Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/maharashtra-tadoba-wildlife-safari-tour-4d3n-v6.png`

Create a photorealistic travel image for "Tadoba Wildlife Safari Tour" — 4-day Maharashtra holiday package, India. Scene: wildlife safari Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/maharashtra-tadoba-wildlife-safari-tour-4d3n-v7.png`

Create a photorealistic travel image for "Tadoba Wildlife Safari Tour" — 4-day Maharashtra holiday package, India. Scene: wildlife safari Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/maharashtra-tadoba-wildlife-safari-tour-4d3n-v8.png`

Create a photorealistic travel image for "Tadoba Wildlife Safari Tour" — 4-day Maharashtra holiday package, India. Scene: wildlife safari Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/maharashtra-tadoba-wildlife-safari-tour-4d3n-v9.png`

Create a photorealistic travel image for "Tadoba Wildlife Safari Tour" — 4-day Maharashtra holiday package, India. Scene: wildlife safari Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/maharashtra-tadoba-wildlife-safari-tour-4d3n-v10.png`

Create a photorealistic travel image for "Tadoba Wildlife Safari Tour" — 4-day Maharashtra holiday package, India. Scene: wildlife safari Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Best of Maharashtra Tour
Slug: `maharashtra-best-of-maharashtra-tour-9d8n` | 9D/8N | ₹ 34,999

**v1** → `public/images/packages/maharashtra-best-of-maharashtra-tour-9d8n-v1.png`

Create a photorealistic travel image for "Best of Maharashtra Tour" — 9-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/maharashtra-best-of-maharashtra-tour-9d8n-v2.png`

Create a photorealistic travel image for "Best of Maharashtra Tour" — 9-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/maharashtra-best-of-maharashtra-tour-9d8n-v3.png`

Create a photorealistic travel image for "Best of Maharashtra Tour" — 9-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/maharashtra-best-of-maharashtra-tour-9d8n-v4.png`

Create a photorealistic travel image for "Best of Maharashtra Tour" — 9-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/maharashtra-best-of-maharashtra-tour-9d8n-v5.png`

Create a photorealistic travel image for "Best of Maharashtra Tour" — 9-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/maharashtra-best-of-maharashtra-tour-9d8n-v6.png`

Create a photorealistic travel image for "Best of Maharashtra Tour" — 9-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/maharashtra-best-of-maharashtra-tour-9d8n-v7.png`

Create a photorealistic travel image for "Best of Maharashtra Tour" — 9-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/maharashtra-best-of-maharashtra-tour-9d8n-v8.png`

Create a photorealistic travel image for "Best of Maharashtra Tour" — 9-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/maharashtra-best-of-maharashtra-tour-9d8n-v9.png`

Create a photorealistic travel image for "Best of Maharashtra Tour" — 9-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/maharashtra-best-of-maharashtra-tour-9d8n-v10.png`

Create a photorealistic travel image for "Best of Maharashtra Tour" — 9-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Matheran Hill Station Tour
Slug: `maharashtra-matheran-hill-station-tour-3d2n` | 3D/2N | ₹ 9,999

**v1** → `public/images/packages/maharashtra-matheran-hill-station-tour-3d2n-v1.png`

Create a photorealistic travel image for "Matheran Hill Station Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/maharashtra-matheran-hill-station-tour-3d2n-v2.png`

Create a photorealistic travel image for "Matheran Hill Station Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/maharashtra-matheran-hill-station-tour-3d2n-v3.png`

Create a photorealistic travel image for "Matheran Hill Station Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/maharashtra-matheran-hill-station-tour-3d2n-v4.png`

Create a photorealistic travel image for "Matheran Hill Station Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/maharashtra-matheran-hill-station-tour-3d2n-v5.png`

Create a photorealistic travel image for "Matheran Hill Station Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/maharashtra-matheran-hill-station-tour-3d2n-v6.png`

Create a photorealistic travel image for "Matheran Hill Station Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/maharashtra-matheran-hill-station-tour-3d2n-v7.png`

Create a photorealistic travel image for "Matheran Hill Station Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/maharashtra-matheran-hill-station-tour-3d2n-v8.png`

Create a photorealistic travel image for "Matheran Hill Station Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/maharashtra-matheran-hill-station-tour-3d2n-v9.png`

Create a photorealistic travel image for "Matheran Hill Station Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/maharashtra-matheran-hill-station-tour-3d2n-v10.png`

Create a photorealistic travel image for "Matheran Hill Station Tour" — 3-day Maharashtra holiday package, India. Scene: scenic highlights of Mumbai gateway, Ajanta Ellora caves, hill stations. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.


### North East India (15 packages)

#### Kaziranga Wildlife Escape
Slug: `northeast-kaziranga-wildlife-escape-4d3n` | 4D/3N | ₹ 15,999

**v1** → `public/images/packages/northeast-kaziranga-wildlife-escape-4d3n-v1.png`

Create a photorealistic travel image for "Kaziranga Wildlife Escape" — 4-day North East India holiday package, India. Scene: wildlife safari living root bridges, Kaziranga, misty hills, tribal culture. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/northeast-kaziranga-wildlife-escape-4d3n-v2.png`

Create a photorealistic travel image for "Kaziranga Wildlife Escape" — 4-day North East India holiday package, India. Scene: wildlife safari living root bridges, Kaziranga, misty hills, tribal culture. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/northeast-kaziranga-wildlife-escape-4d3n-v3.png`

Create a photorealistic travel image for "Kaziranga Wildlife Escape" — 4-day North East India holiday package, India. Scene: wildlife safari living root bridges, Kaziranga, misty hills, tribal culture. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/northeast-kaziranga-wildlife-escape-4d3n-v4.png`

Create a photorealistic travel image for "Kaziranga Wildlife Escape" — 4-day North East India holiday package, India. Scene: wildlife safari living root bridges, Kaziranga, misty hills, tribal culture. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/northeast-kaziranga-wildlife-escape-4d3n-v5.png`

Create a photorealistic travel image for "Kaziranga Wildlife Escape" — 4-day North East India holiday package, India. Scene: wildlife safari living root bridges, Kaziranga, misty hills, tribal culture. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/northeast-kaziranga-wildlife-escape-4d3n-v6.png`

Create a photorealistic travel image for "Kaziranga Wildlife Escape" — 4-day North East India holiday package, India. Scene: wildlife safari living root bridges, Kaziranga, misty hills, tribal culture. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/northeast-kaziranga-wildlife-escape-4d3n-v7.png`

Create a photorealistic travel image for "Kaziranga Wildlife Escape" — 4-day North East India holiday package, India. Scene: wildlife safari living root bridges, Kaziranga, misty hills, tribal culture. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/northeast-kaziranga-wildlife-escape-4d3n-v8.png`

Create a photorealistic travel image for "Kaziranga Wildlife Escape" — 4-day North East India holiday package, India. Scene: wildlife safari living root bridges, Kaziranga, misty hills, tribal culture. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/northeast-kaziranga-wildlife-escape-4d3n-v9.png`

Create a photorealistic travel image for "Kaziranga Wildlife Escape" — 4-day North East India holiday package, India. Scene: wildlife safari living root bridges, Kaziranga, misty hills, tribal culture. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/northeast-kaziranga-wildlife-escape-4d3n-v10.png`

Create a photorealistic travel image for "Kaziranga Wildlife Escape" — 4-day North East India holiday package, India. Scene: wildlife safari living root bridges, Kaziranga, misty hills, tribal culture. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Guwahati & Kaziranga Tour
Slug: `northeast-guwahati-kaziranga-tour-5d4n` | 5D/4N | ₹ 19,999

**v1** → `public/images/packages/northeast-guwahati-kaziranga-tour-5d4n-v1.png`

Create a photorealistic travel image for "Guwahati & Kaziranga Tour" — 5-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/northeast-guwahati-kaziranga-tour-5d4n-v2.png`

Create a photorealistic travel image for "Guwahati & Kaziranga Tour" — 5-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/northeast-guwahati-kaziranga-tour-5d4n-v3.png`

Create a photorealistic travel image for "Guwahati & Kaziranga Tour" — 5-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/northeast-guwahati-kaziranga-tour-5d4n-v4.png`

Create a photorealistic travel image for "Guwahati & Kaziranga Tour" — 5-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/northeast-guwahati-kaziranga-tour-5d4n-v5.png`

Create a photorealistic travel image for "Guwahati & Kaziranga Tour" — 5-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/northeast-guwahati-kaziranga-tour-5d4n-v6.png`

Create a photorealistic travel image for "Guwahati & Kaziranga Tour" — 5-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/northeast-guwahati-kaziranga-tour-5d4n-v7.png`

Create a photorealistic travel image for "Guwahati & Kaziranga Tour" — 5-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/northeast-guwahati-kaziranga-tour-5d4n-v8.png`

Create a photorealistic travel image for "Guwahati & Kaziranga Tour" — 5-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/northeast-guwahati-kaziranga-tour-5d4n-v9.png`

Create a photorealistic travel image for "Guwahati & Kaziranga Tour" — 5-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/northeast-guwahati-kaziranga-tour-5d4n-v10.png`

Create a photorealistic travel image for "Guwahati & Kaziranga Tour" — 5-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Complete Assam Explorer
Slug: `northeast-complete-assam-explorer-7d6n` | 7D/6N | ₹ 29,999

**v1** → `public/images/packages/northeast-complete-assam-explorer-7d6n-v1.png`

Create a photorealistic travel image for "Complete Assam Explorer" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/northeast-complete-assam-explorer-7d6n-v2.png`

Create a photorealistic travel image for "Complete Assam Explorer" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/northeast-complete-assam-explorer-7d6n-v3.png`

Create a photorealistic travel image for "Complete Assam Explorer" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/northeast-complete-assam-explorer-7d6n-v4.png`

Create a photorealistic travel image for "Complete Assam Explorer" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/northeast-complete-assam-explorer-7d6n-v5.png`

Create a photorealistic travel image for "Complete Assam Explorer" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/northeast-complete-assam-explorer-7d6n-v6.png`

Create a photorealistic travel image for "Complete Assam Explorer" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/northeast-complete-assam-explorer-7d6n-v7.png`

Create a photorealistic travel image for "Complete Assam Explorer" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/northeast-complete-assam-explorer-7d6n-v8.png`

Create a photorealistic travel image for "Complete Assam Explorer" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/northeast-complete-assam-explorer-7d6n-v9.png`

Create a photorealistic travel image for "Complete Assam Explorer" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/northeast-complete-assam-explorer-7d6n-v10.png`

Create a photorealistic travel image for "Complete Assam Explorer" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Shillong & Cherrapunji Escape
Slug: `northeast-shillong-cherrapunji-escape-4d3n` | 4D/3N | ₹ 16,999

**v1** → `public/images/packages/northeast-shillong-cherrapunji-escape-4d3n-v1.png`

Create a photorealistic travel image for "Shillong & Cherrapunji Escape" — 4-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/northeast-shillong-cherrapunji-escape-4d3n-v2.png`

Create a photorealistic travel image for "Shillong & Cherrapunji Escape" — 4-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/northeast-shillong-cherrapunji-escape-4d3n-v3.png`

Create a photorealistic travel image for "Shillong & Cherrapunji Escape" — 4-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/northeast-shillong-cherrapunji-escape-4d3n-v4.png`

Create a photorealistic travel image for "Shillong & Cherrapunji Escape" — 4-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/northeast-shillong-cherrapunji-escape-4d3n-v5.png`

Create a photorealistic travel image for "Shillong & Cherrapunji Escape" — 4-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/northeast-shillong-cherrapunji-escape-4d3n-v6.png`

Create a photorealistic travel image for "Shillong & Cherrapunji Escape" — 4-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/northeast-shillong-cherrapunji-escape-4d3n-v7.png`

Create a photorealistic travel image for "Shillong & Cherrapunji Escape" — 4-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/northeast-shillong-cherrapunji-escape-4d3n-v8.png`

Create a photorealistic travel image for "Shillong & Cherrapunji Escape" — 4-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/northeast-shillong-cherrapunji-escape-4d3n-v9.png`

Create a photorealistic travel image for "Shillong & Cherrapunji Escape" — 4-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/northeast-shillong-cherrapunji-escape-4d3n-v10.png`

Create a photorealistic travel image for "Shillong & Cherrapunji Escape" — 4-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Meghalaya Nature Adventure
Slug: `northeast-meghalaya-nature-adventure-5d4n` | 5D/4N | ₹ 22,999

**v1** → `public/images/packages/northeast-meghalaya-nature-adventure-5d4n-v1.png`

Create a photorealistic travel image for "Meghalaya Nature Adventure" — 5-day North East India holiday package, India. Scene: adventure living root bridges, Kaziranga, misty hills, tribal culture, thrilling outdoor. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/northeast-meghalaya-nature-adventure-5d4n-v2.png`

Create a photorealistic travel image for "Meghalaya Nature Adventure" — 5-day North East India holiday package, India. Scene: adventure living root bridges, Kaziranga, misty hills, tribal culture, thrilling outdoor. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/northeast-meghalaya-nature-adventure-5d4n-v3.png`

Create a photorealistic travel image for "Meghalaya Nature Adventure" — 5-day North East India holiday package, India. Scene: adventure living root bridges, Kaziranga, misty hills, tribal culture, thrilling outdoor. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/northeast-meghalaya-nature-adventure-5d4n-v4.png`

Create a photorealistic travel image for "Meghalaya Nature Adventure" — 5-day North East India holiday package, India. Scene: adventure living root bridges, Kaziranga, misty hills, tribal culture, thrilling outdoor. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/northeast-meghalaya-nature-adventure-5d4n-v5.png`

Create a photorealistic travel image for "Meghalaya Nature Adventure" — 5-day North East India holiday package, India. Scene: adventure living root bridges, Kaziranga, misty hills, tribal culture, thrilling outdoor. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/northeast-meghalaya-nature-adventure-5d4n-v6.png`

Create a photorealistic travel image for "Meghalaya Nature Adventure" — 5-day North East India holiday package, India. Scene: adventure living root bridges, Kaziranga, misty hills, tribal culture, thrilling outdoor. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/northeast-meghalaya-nature-adventure-5d4n-v7.png`

Create a photorealistic travel image for "Meghalaya Nature Adventure" — 5-day North East India holiday package, India. Scene: adventure living root bridges, Kaziranga, misty hills, tribal culture, thrilling outdoor. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/northeast-meghalaya-nature-adventure-5d4n-v8.png`

Create a photorealistic travel image for "Meghalaya Nature Adventure" — 5-day North East India holiday package, India. Scene: adventure living root bridges, Kaziranga, misty hills, tribal culture, thrilling outdoor. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/northeast-meghalaya-nature-adventure-5d4n-v9.png`

Create a photorealistic travel image for "Meghalaya Nature Adventure" — 5-day North East India holiday package, India. Scene: adventure living root bridges, Kaziranga, misty hills, tribal culture, thrilling outdoor. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/northeast-meghalaya-nature-adventure-5d4n-v10.png`

Create a photorealistic travel image for "Meghalaya Nature Adventure" — 5-day North East India holiday package, India. Scene: adventure living root bridges, Kaziranga, misty hills, tribal culture, thrilling outdoor. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Complete Meghalaya Explorer
Slug: `northeast-complete-meghalaya-explorer-6d5n` | 6D/5N | ₹ 28,999

**v1** → `public/images/packages/northeast-complete-meghalaya-explorer-6d5n-v1.png`

Create a photorealistic travel image for "Complete Meghalaya Explorer" — 6-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/northeast-complete-meghalaya-explorer-6d5n-v2.png`

Create a photorealistic travel image for "Complete Meghalaya Explorer" — 6-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/northeast-complete-meghalaya-explorer-6d5n-v3.png`

Create a photorealistic travel image for "Complete Meghalaya Explorer" — 6-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/northeast-complete-meghalaya-explorer-6d5n-v4.png`

Create a photorealistic travel image for "Complete Meghalaya Explorer" — 6-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/northeast-complete-meghalaya-explorer-6d5n-v5.png`

Create a photorealistic travel image for "Complete Meghalaya Explorer" — 6-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/northeast-complete-meghalaya-explorer-6d5n-v6.png`

Create a photorealistic travel image for "Complete Meghalaya Explorer" — 6-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/northeast-complete-meghalaya-explorer-6d5n-v7.png`

Create a photorealistic travel image for "Complete Meghalaya Explorer" — 6-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/northeast-complete-meghalaya-explorer-6d5n-v8.png`

Create a photorealistic travel image for "Complete Meghalaya Explorer" — 6-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/northeast-complete-meghalaya-explorer-6d5n-v9.png`

Create a photorealistic travel image for "Complete Meghalaya Explorer" — 6-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/northeast-complete-meghalaya-explorer-6d5n-v10.png`

Create a photorealistic travel image for "Complete Meghalaya Explorer" — 6-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Gangtok Delight
Slug: `northeast-gangtok-delight-4d3n` | 4D/3N | ₹ 16,999

**v1** → `public/images/packages/northeast-gangtok-delight-4d3n-v1.png`

Create a photorealistic travel image for "Gangtok Delight" — 4-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/northeast-gangtok-delight-4d3n-v2.png`

Create a photorealistic travel image for "Gangtok Delight" — 4-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/northeast-gangtok-delight-4d3n-v3.png`

Create a photorealistic travel image for "Gangtok Delight" — 4-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/northeast-gangtok-delight-4d3n-v4.png`

Create a photorealistic travel image for "Gangtok Delight" — 4-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/northeast-gangtok-delight-4d3n-v5.png`

Create a photorealistic travel image for "Gangtok Delight" — 4-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/northeast-gangtok-delight-4d3n-v6.png`

Create a photorealistic travel image for "Gangtok Delight" — 4-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/northeast-gangtok-delight-4d3n-v7.png`

Create a photorealistic travel image for "Gangtok Delight" — 4-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/northeast-gangtok-delight-4d3n-v8.png`

Create a photorealistic travel image for "Gangtok Delight" — 4-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/northeast-gangtok-delight-4d3n-v9.png`

Create a photorealistic travel image for "Gangtok Delight" — 4-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/northeast-gangtok-delight-4d3n-v10.png`

Create a photorealistic travel image for "Gangtok Delight" — 4-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Gangtok & North Sikkim Adventure
Slug: `northeast-gangtok-north-sikkim-adventure-6d5n` | 6D/5N | ₹ 24,999

**v1** → `public/images/packages/northeast-gangtok-north-sikkim-adventure-6d5n-v1.png`

Create a photorealistic travel image for "Gangtok & North Sikkim Adventure" — 6-day North East India holiday package, India. Scene: adventure living root bridges, Kaziranga, misty hills, tribal culture, thrilling outdoor. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/northeast-gangtok-north-sikkim-adventure-6d5n-v2.png`

Create a photorealistic travel image for "Gangtok & North Sikkim Adventure" — 6-day North East India holiday package, India. Scene: adventure living root bridges, Kaziranga, misty hills, tribal culture, thrilling outdoor. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/northeast-gangtok-north-sikkim-adventure-6d5n-v3.png`

Create a photorealistic travel image for "Gangtok & North Sikkim Adventure" — 6-day North East India holiday package, India. Scene: adventure living root bridges, Kaziranga, misty hills, tribal culture, thrilling outdoor. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/northeast-gangtok-north-sikkim-adventure-6d5n-v4.png`

Create a photorealistic travel image for "Gangtok & North Sikkim Adventure" — 6-day North East India holiday package, India. Scene: adventure living root bridges, Kaziranga, misty hills, tribal culture, thrilling outdoor. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/northeast-gangtok-north-sikkim-adventure-6d5n-v5.png`

Create a photorealistic travel image for "Gangtok & North Sikkim Adventure" — 6-day North East India holiday package, India. Scene: adventure living root bridges, Kaziranga, misty hills, tribal culture, thrilling outdoor. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/northeast-gangtok-north-sikkim-adventure-6d5n-v6.png`

Create a photorealistic travel image for "Gangtok & North Sikkim Adventure" — 6-day North East India holiday package, India. Scene: adventure living root bridges, Kaziranga, misty hills, tribal culture, thrilling outdoor. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/northeast-gangtok-north-sikkim-adventure-6d5n-v7.png`

Create a photorealistic travel image for "Gangtok & North Sikkim Adventure" — 6-day North East India holiday package, India. Scene: adventure living root bridges, Kaziranga, misty hills, tribal culture, thrilling outdoor. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/northeast-gangtok-north-sikkim-adventure-6d5n-v8.png`

Create a photorealistic travel image for "Gangtok & North Sikkim Adventure" — 6-day North East India holiday package, India. Scene: adventure living root bridges, Kaziranga, misty hills, tribal culture, thrilling outdoor. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/northeast-gangtok-north-sikkim-adventure-6d5n-v9.png`

Create a photorealistic travel image for "Gangtok & North Sikkim Adventure" — 6-day North East India holiday package, India. Scene: adventure living root bridges, Kaziranga, misty hills, tribal culture, thrilling outdoor. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/northeast-gangtok-north-sikkim-adventure-6d5n-v10.png`

Create a photorealistic travel image for "Gangtok & North Sikkim Adventure" — 6-day North East India holiday package, India. Scene: adventure living root bridges, Kaziranga, misty hills, tribal culture, thrilling outdoor. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### ⭐ Complete Sikkim Explorer (Featured Package)
Slug: `northeast-complete-sikkim-explorer-featured-package-7d6n` | 7D/6N | ₹ 31,999

**v1** → `public/images/packages/northeast-complete-sikkim-explorer-featured-package-7d6n-v1.png`

Create a photorealistic travel image for "⭐ Complete Sikkim Explorer (Featured Package)" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/northeast-complete-sikkim-explorer-featured-package-7d6n-v2.png`

Create a photorealistic travel image for "⭐ Complete Sikkim Explorer (Featured Package)" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/northeast-complete-sikkim-explorer-featured-package-7d6n-v3.png`

Create a photorealistic travel image for "⭐ Complete Sikkim Explorer (Featured Package)" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/northeast-complete-sikkim-explorer-featured-package-7d6n-v4.png`

Create a photorealistic travel image for "⭐ Complete Sikkim Explorer (Featured Package)" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/northeast-complete-sikkim-explorer-featured-package-7d6n-v5.png`

Create a photorealistic travel image for "⭐ Complete Sikkim Explorer (Featured Package)" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/northeast-complete-sikkim-explorer-featured-package-7d6n-v6.png`

Create a photorealistic travel image for "⭐ Complete Sikkim Explorer (Featured Package)" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/northeast-complete-sikkim-explorer-featured-package-7d6n-v7.png`

Create a photorealistic travel image for "⭐ Complete Sikkim Explorer (Featured Package)" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/northeast-complete-sikkim-explorer-featured-package-7d6n-v8.png`

Create a photorealistic travel image for "⭐ Complete Sikkim Explorer (Featured Package)" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/northeast-complete-sikkim-explorer-featured-package-7d6n-v9.png`

Create a photorealistic travel image for "⭐ Complete Sikkim Explorer (Featured Package)" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/northeast-complete-sikkim-explorer-featured-package-7d6n-v10.png`

Create a photorealistic travel image for "⭐ Complete Sikkim Explorer (Featured Package)" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Tawang Escape
Slug: `northeast-tawang-escape-5d4n` | 5D/4N | ₹ 21,999

**v1** → `public/images/packages/northeast-tawang-escape-5d4n-v1.png`

Create a photorealistic travel image for "Tawang Escape" — 5-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/northeast-tawang-escape-5d4n-v2.png`

Create a photorealistic travel image for "Tawang Escape" — 5-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/northeast-tawang-escape-5d4n-v3.png`

Create a photorealistic travel image for "Tawang Escape" — 5-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/northeast-tawang-escape-5d4n-v4.png`

Create a photorealistic travel image for "Tawang Escape" — 5-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/northeast-tawang-escape-5d4n-v5.png`

Create a photorealistic travel image for "Tawang Escape" — 5-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/northeast-tawang-escape-5d4n-v6.png`

Create a photorealistic travel image for "Tawang Escape" — 5-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/northeast-tawang-escape-5d4n-v7.png`

Create a photorealistic travel image for "Tawang Escape" — 5-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/northeast-tawang-escape-5d4n-v8.png`

Create a photorealistic travel image for "Tawang Escape" — 5-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/northeast-tawang-escape-5d4n-v9.png`

Create a photorealistic travel image for "Tawang Escape" — 5-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/northeast-tawang-escape-5d4n-v10.png`

Create a photorealistic travel image for "Tawang Escape" — 5-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Dirang – Bomdila – Tawang Tour
Slug: `northeast-dirang-bomdila-tawang-tour-6d5n` | 6D/5N | ₹ 25,999

**v1** → `public/images/packages/northeast-dirang-bomdila-tawang-tour-6d5n-v1.png`

Create a photorealistic travel image for "Dirang – Bomdila – Tawang Tour" — 6-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/northeast-dirang-bomdila-tawang-tour-6d5n-v2.png`

Create a photorealistic travel image for "Dirang – Bomdila – Tawang Tour" — 6-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/northeast-dirang-bomdila-tawang-tour-6d5n-v3.png`

Create a photorealistic travel image for "Dirang – Bomdila – Tawang Tour" — 6-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/northeast-dirang-bomdila-tawang-tour-6d5n-v4.png`

Create a photorealistic travel image for "Dirang – Bomdila – Tawang Tour" — 6-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/northeast-dirang-bomdila-tawang-tour-6d5n-v5.png`

Create a photorealistic travel image for "Dirang – Bomdila – Tawang Tour" — 6-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/northeast-dirang-bomdila-tawang-tour-6d5n-v6.png`

Create a photorealistic travel image for "Dirang – Bomdila – Tawang Tour" — 6-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/northeast-dirang-bomdila-tawang-tour-6d5n-v7.png`

Create a photorealistic travel image for "Dirang – Bomdila – Tawang Tour" — 6-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/northeast-dirang-bomdila-tawang-tour-6d5n-v8.png`

Create a photorealistic travel image for "Dirang – Bomdila – Tawang Tour" — 6-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/northeast-dirang-bomdila-tawang-tour-6d5n-v9.png`

Create a photorealistic travel image for "Dirang – Bomdila – Tawang Tour" — 6-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/northeast-dirang-bomdila-tawang-tour-6d5n-v10.png`

Create a photorealistic travel image for "Dirang – Bomdila – Tawang Tour" — 6-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### ⭐ Complete Arunachal Explorer (Featured Package)
Slug: `northeast-complete-arunachal-explorer-featured-package-7d6n` | 7D/6N | ₹ 33,999

**v1** → `public/images/packages/northeast-complete-arunachal-explorer-featured-package-7d6n-v1.png`

Create a photorealistic travel image for "⭐ Complete Arunachal Explorer (Featured Package)" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/northeast-complete-arunachal-explorer-featured-package-7d6n-v2.png`

Create a photorealistic travel image for "⭐ Complete Arunachal Explorer (Featured Package)" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/northeast-complete-arunachal-explorer-featured-package-7d6n-v3.png`

Create a photorealistic travel image for "⭐ Complete Arunachal Explorer (Featured Package)" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/northeast-complete-arunachal-explorer-featured-package-7d6n-v4.png`

Create a photorealistic travel image for "⭐ Complete Arunachal Explorer (Featured Package)" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/northeast-complete-arunachal-explorer-featured-package-7d6n-v5.png`

Create a photorealistic travel image for "⭐ Complete Arunachal Explorer (Featured Package)" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/northeast-complete-arunachal-explorer-featured-package-7d6n-v6.png`

Create a photorealistic travel image for "⭐ Complete Arunachal Explorer (Featured Package)" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/northeast-complete-arunachal-explorer-featured-package-7d6n-v7.png`

Create a photorealistic travel image for "⭐ Complete Arunachal Explorer (Featured Package)" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/northeast-complete-arunachal-explorer-featured-package-7d6n-v8.png`

Create a photorealistic travel image for "⭐ Complete Arunachal Explorer (Featured Package)" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/northeast-complete-arunachal-explorer-featured-package-7d6n-v9.png`

Create a photorealistic travel image for "⭐ Complete Arunachal Explorer (Featured Package)" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/northeast-complete-arunachal-explorer-featured-package-7d6n-v10.png`

Create a photorealistic travel image for "⭐ Complete Arunachal Explorer (Featured Package)" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Seven Sisters Highlights
Slug: `northeast-seven-sisters-highlights-7d6n` | 7D/6N | ₹ 29,999

**v1** → `public/images/packages/northeast-seven-sisters-highlights-7d6n-v1.png`

Create a photorealistic travel image for "Seven Sisters Highlights" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/northeast-seven-sisters-highlights-7d6n-v2.png`

Create a photorealistic travel image for "Seven Sisters Highlights" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/northeast-seven-sisters-highlights-7d6n-v3.png`

Create a photorealistic travel image for "Seven Sisters Highlights" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/northeast-seven-sisters-highlights-7d6n-v4.png`

Create a photorealistic travel image for "Seven Sisters Highlights" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/northeast-seven-sisters-highlights-7d6n-v5.png`

Create a photorealistic travel image for "Seven Sisters Highlights" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/northeast-seven-sisters-highlights-7d6n-v6.png`

Create a photorealistic travel image for "Seven Sisters Highlights" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/northeast-seven-sisters-highlights-7d6n-v7.png`

Create a photorealistic travel image for "Seven Sisters Highlights" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/northeast-seven-sisters-highlights-7d6n-v8.png`

Create a photorealistic travel image for "Seven Sisters Highlights" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/northeast-seven-sisters-highlights-7d6n-v9.png`

Create a photorealistic travel image for "Seven Sisters Highlights" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/northeast-seven-sisters-highlights-7d6n-v10.png`

Create a photorealistic travel image for "Seven Sisters Highlights" — 7-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Eastern Himalaya Explorer
Slug: `northeast-eastern-himalaya-explorer-8d7n` | 8D/7N | ₹ 34,999

**v1** → `public/images/packages/northeast-eastern-himalaya-explorer-8d7n-v1.png`

Create a photorealistic travel image for "Eastern Himalaya Explorer" — 8-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/northeast-eastern-himalaya-explorer-8d7n-v2.png`

Create a photorealistic travel image for "Eastern Himalaya Explorer" — 8-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/northeast-eastern-himalaya-explorer-8d7n-v3.png`

Create a photorealistic travel image for "Eastern Himalaya Explorer" — 8-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/northeast-eastern-himalaya-explorer-8d7n-v4.png`

Create a photorealistic travel image for "Eastern Himalaya Explorer" — 8-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/northeast-eastern-himalaya-explorer-8d7n-v5.png`

Create a photorealistic travel image for "Eastern Himalaya Explorer" — 8-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/northeast-eastern-himalaya-explorer-8d7n-v6.png`

Create a photorealistic travel image for "Eastern Himalaya Explorer" — 8-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/northeast-eastern-himalaya-explorer-8d7n-v7.png`

Create a photorealistic travel image for "Eastern Himalaya Explorer" — 8-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/northeast-eastern-himalaya-explorer-8d7n-v8.png`

Create a photorealistic travel image for "Eastern Himalaya Explorer" — 8-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/northeast-eastern-himalaya-explorer-8d7n-v9.png`

Create a photorealistic travel image for "Eastern Himalaya Explorer" — 8-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/northeast-eastern-himalaya-explorer-8d7n-v10.png`

Create a photorealistic travel image for "Eastern Himalaya Explorer" — 8-day North East India holiday package, India. Scene: scenic highlights of living root bridges, Kaziranga, misty hills, tribal culture. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### ⭐ Complete North East Grand Tour (Featured Package)
Slug: `northeast-complete-north-east-grand-tour-featured-package-11d10n` | 11D/10N | ₹ 49,999

**v1** → `public/images/packages/northeast-complete-north-east-grand-tour-featured-package-11d10n-v1.png`

Create a photorealistic travel image for "⭐ Complete North East Grand Tour (Featured Package)" — 11-day North East India holiday package, India. Scene: heritage circuit living root bridges, Kaziranga, misty hills, tribal culture. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/northeast-complete-north-east-grand-tour-featured-package-11d10n-v2.png`

Create a photorealistic travel image for "⭐ Complete North East Grand Tour (Featured Package)" — 11-day North East India holiday package, India. Scene: heritage circuit living root bridges, Kaziranga, misty hills, tribal culture. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/northeast-complete-north-east-grand-tour-featured-package-11d10n-v3.png`

Create a photorealistic travel image for "⭐ Complete North East Grand Tour (Featured Package)" — 11-day North East India holiday package, India. Scene: heritage circuit living root bridges, Kaziranga, misty hills, tribal culture. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/northeast-complete-north-east-grand-tour-featured-package-11d10n-v4.png`

Create a photorealistic travel image for "⭐ Complete North East Grand Tour (Featured Package)" — 11-day North East India holiday package, India. Scene: heritage circuit living root bridges, Kaziranga, misty hills, tribal culture. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/northeast-complete-north-east-grand-tour-featured-package-11d10n-v5.png`

Create a photorealistic travel image for "⭐ Complete North East Grand Tour (Featured Package)" — 11-day North East India holiday package, India. Scene: heritage circuit living root bridges, Kaziranga, misty hills, tribal culture. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/northeast-complete-north-east-grand-tour-featured-package-11d10n-v6.png`

Create a photorealistic travel image for "⭐ Complete North East Grand Tour (Featured Package)" — 11-day North East India holiday package, India. Scene: heritage circuit living root bridges, Kaziranga, misty hills, tribal culture. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/northeast-complete-north-east-grand-tour-featured-package-11d10n-v7.png`

Create a photorealistic travel image for "⭐ Complete North East Grand Tour (Featured Package)" — 11-day North East India holiday package, India. Scene: heritage circuit living root bridges, Kaziranga, misty hills, tribal culture. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/northeast-complete-north-east-grand-tour-featured-package-11d10n-v8.png`

Create a photorealistic travel image for "⭐ Complete North East Grand Tour (Featured Package)" — 11-day North East India holiday package, India. Scene: heritage circuit living root bridges, Kaziranga, misty hills, tribal culture. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/northeast-complete-north-east-grand-tour-featured-package-11d10n-v9.png`

Create a photorealistic travel image for "⭐ Complete North East Grand Tour (Featured Package)" — 11-day North East India holiday package, India. Scene: heritage circuit living root bridges, Kaziranga, misty hills, tribal culture. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/northeast-complete-north-east-grand-tour-featured-package-11d10n-v10.png`

Create a photorealistic travel image for "⭐ Complete North East Grand Tour (Featured Package)" — 11-day North East India holiday package, India. Scene: heritage circuit living root bridges, Kaziranga, misty hills, tribal culture. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.


### Odisha (6 packages)

#### Golden Triangle of Odisha
Slug: `odisha-golden-triangle-of-odisha-5d4n` | 5D/4N | ₹ 17,999

**v1** → `public/images/packages/odisha-golden-triangle-of-odisha-5d4n-v1.png`

Create a photorealistic travel image for "Golden Triangle of Odisha" — 5-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/odisha-golden-triangle-of-odisha-5d4n-v2.png`

Create a photorealistic travel image for "Golden Triangle of Odisha" — 5-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/odisha-golden-triangle-of-odisha-5d4n-v3.png`

Create a photorealistic travel image for "Golden Triangle of Odisha" — 5-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/odisha-golden-triangle-of-odisha-5d4n-v4.png`

Create a photorealistic travel image for "Golden Triangle of Odisha" — 5-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/odisha-golden-triangle-of-odisha-5d4n-v5.png`

Create a photorealistic travel image for "Golden Triangle of Odisha" — 5-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/odisha-golden-triangle-of-odisha-5d4n-v6.png`

Create a photorealistic travel image for "Golden Triangle of Odisha" — 5-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/odisha-golden-triangle-of-odisha-5d4n-v7.png`

Create a photorealistic travel image for "Golden Triangle of Odisha" — 5-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/odisha-golden-triangle-of-odisha-5d4n-v8.png`

Create a photorealistic travel image for "Golden Triangle of Odisha" — 5-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/odisha-golden-triangle-of-odisha-5d4n-v9.png`

Create a photorealistic travel image for "Golden Triangle of Odisha" — 5-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/odisha-golden-triangle-of-odisha-5d4n-v10.png`

Create a photorealistic travel image for "Golden Triangle of Odisha" — 5-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Jagannath Puri Spiritual Tour
Slug: `odisha-jagannath-puri-spiritual-tour-4d3n` | 4D/3N | ₹ 14,999

**v1** → `public/images/packages/odisha-jagannath-puri-spiritual-tour-4d3n-v1.png`

Create a photorealistic travel image for "Jagannath Puri Spiritual Tour" — 4-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/odisha-jagannath-puri-spiritual-tour-4d3n-v2.png`

Create a photorealistic travel image for "Jagannath Puri Spiritual Tour" — 4-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/odisha-jagannath-puri-spiritual-tour-4d3n-v3.png`

Create a photorealistic travel image for "Jagannath Puri Spiritual Tour" — 4-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/odisha-jagannath-puri-spiritual-tour-4d3n-v4.png`

Create a photorealistic travel image for "Jagannath Puri Spiritual Tour" — 4-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/odisha-jagannath-puri-spiritual-tour-4d3n-v5.png`

Create a photorealistic travel image for "Jagannath Puri Spiritual Tour" — 4-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/odisha-jagannath-puri-spiritual-tour-4d3n-v6.png`

Create a photorealistic travel image for "Jagannath Puri Spiritual Tour" — 4-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/odisha-jagannath-puri-spiritual-tour-4d3n-v7.png`

Create a photorealistic travel image for "Jagannath Puri Spiritual Tour" — 4-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/odisha-jagannath-puri-spiritual-tour-4d3n-v8.png`

Create a photorealistic travel image for "Jagannath Puri Spiritual Tour" — 4-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/odisha-jagannath-puri-spiritual-tour-4d3n-v9.png`

Create a photorealistic travel image for "Jagannath Puri Spiritual Tour" — 4-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/odisha-jagannath-puri-spiritual-tour-4d3n-v10.png`

Create a photorealistic travel image for "Jagannath Puri Spiritual Tour" — 4-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Chilika Lake & Coastal Escape
Slug: `odisha-chilika-lake-coastal-escape-5d4n` | 5D/4N | ₹ 18,999

**v1** → `public/images/packages/odisha-chilika-lake-coastal-escape-5d4n-v1.png`

Create a photorealistic travel image for "Chilika Lake & Coastal Escape" — 5-day Odisha holiday package, India. Scene: coastal beaches Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/odisha-chilika-lake-coastal-escape-5d4n-v2.png`

Create a photorealistic travel image for "Chilika Lake & Coastal Escape" — 5-day Odisha holiday package, India. Scene: coastal beaches Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/odisha-chilika-lake-coastal-escape-5d4n-v3.png`

Create a photorealistic travel image for "Chilika Lake & Coastal Escape" — 5-day Odisha holiday package, India. Scene: coastal beaches Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/odisha-chilika-lake-coastal-escape-5d4n-v4.png`

Create a photorealistic travel image for "Chilika Lake & Coastal Escape" — 5-day Odisha holiday package, India. Scene: coastal beaches Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/odisha-chilika-lake-coastal-escape-5d4n-v5.png`

Create a photorealistic travel image for "Chilika Lake & Coastal Escape" — 5-day Odisha holiday package, India. Scene: coastal beaches Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/odisha-chilika-lake-coastal-escape-5d4n-v6.png`

Create a photorealistic travel image for "Chilika Lake & Coastal Escape" — 5-day Odisha holiday package, India. Scene: coastal beaches Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/odisha-chilika-lake-coastal-escape-5d4n-v7.png`

Create a photorealistic travel image for "Chilika Lake & Coastal Escape" — 5-day Odisha holiday package, India. Scene: coastal beaches Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/odisha-chilika-lake-coastal-escape-5d4n-v8.png`

Create a photorealistic travel image for "Chilika Lake & Coastal Escape" — 5-day Odisha holiday package, India. Scene: coastal beaches Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/odisha-chilika-lake-coastal-escape-5d4n-v9.png`

Create a photorealistic travel image for "Chilika Lake & Coastal Escape" — 5-day Odisha holiday package, India. Scene: coastal beaches Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/odisha-chilika-lake-coastal-escape-5d4n-v10.png`

Create a photorealistic travel image for "Chilika Lake & Coastal Escape" — 5-day Odisha holiday package, India. Scene: coastal beaches Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Bhubaneswar – Puri – Gopalpur Beach Holiday
Slug: `odisha-bhubaneswar-puri-gopalpur-beach-holiday-6d5n` | 6D/5N | ₹ 21,999

**v1** → `public/images/packages/odisha-bhubaneswar-puri-gopalpur-beach-holiday-6d5n-v1.png`

Create a photorealistic travel image for "Bhubaneswar – Puri – Gopalpur Beach Holiday" — 6-day Odisha holiday package, India. Scene: coastal beaches Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/odisha-bhubaneswar-puri-gopalpur-beach-holiday-6d5n-v2.png`

Create a photorealistic travel image for "Bhubaneswar – Puri – Gopalpur Beach Holiday" — 6-day Odisha holiday package, India. Scene: coastal beaches Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/odisha-bhubaneswar-puri-gopalpur-beach-holiday-6d5n-v3.png`

Create a photorealistic travel image for "Bhubaneswar – Puri – Gopalpur Beach Holiday" — 6-day Odisha holiday package, India. Scene: coastal beaches Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/odisha-bhubaneswar-puri-gopalpur-beach-holiday-6d5n-v4.png`

Create a photorealistic travel image for "Bhubaneswar – Puri – Gopalpur Beach Holiday" — 6-day Odisha holiday package, India. Scene: coastal beaches Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/odisha-bhubaneswar-puri-gopalpur-beach-holiday-6d5n-v5.png`

Create a photorealistic travel image for "Bhubaneswar – Puri – Gopalpur Beach Holiday" — 6-day Odisha holiday package, India. Scene: coastal beaches Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/odisha-bhubaneswar-puri-gopalpur-beach-holiday-6d5n-v6.png`

Create a photorealistic travel image for "Bhubaneswar – Puri – Gopalpur Beach Holiday" — 6-day Odisha holiday package, India. Scene: coastal beaches Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/odisha-bhubaneswar-puri-gopalpur-beach-holiday-6d5n-v7.png`

Create a photorealistic travel image for "Bhubaneswar – Puri – Gopalpur Beach Holiday" — 6-day Odisha holiday package, India. Scene: coastal beaches Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/odisha-bhubaneswar-puri-gopalpur-beach-holiday-6d5n-v8.png`

Create a photorealistic travel image for "Bhubaneswar – Puri – Gopalpur Beach Holiday" — 6-day Odisha holiday package, India. Scene: coastal beaches Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/odisha-bhubaneswar-puri-gopalpur-beach-holiday-6d5n-v9.png`

Create a photorealistic travel image for "Bhubaneswar – Puri – Gopalpur Beach Holiday" — 6-day Odisha holiday package, India. Scene: coastal beaches Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/odisha-bhubaneswar-puri-gopalpur-beach-holiday-6d5n-v10.png`

Create a photorealistic travel image for "Bhubaneswar – Puri – Gopalpur Beach Holiday" — 6-day Odisha holiday package, India. Scene: coastal beaches Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Odisha Wildlife & Nature Expedition Trending
Slug: `odisha-odisha-wildlife-nature-expedition-trending-6d5n` | 6D/5N | ₹ 22,999

**v1** → `public/images/packages/odisha-odisha-wildlife-nature-expedition-trending-6d5n-v1.png`

Create a photorealistic travel image for "Odisha Wildlife & Nature Expedition Trending" — 6-day Odisha holiday package, India. Scene: wildlife safari Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/odisha-odisha-wildlife-nature-expedition-trending-6d5n-v2.png`

Create a photorealistic travel image for "Odisha Wildlife & Nature Expedition Trending" — 6-day Odisha holiday package, India. Scene: wildlife safari Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/odisha-odisha-wildlife-nature-expedition-trending-6d5n-v3.png`

Create a photorealistic travel image for "Odisha Wildlife & Nature Expedition Trending" — 6-day Odisha holiday package, India. Scene: wildlife safari Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/odisha-odisha-wildlife-nature-expedition-trending-6d5n-v4.png`

Create a photorealistic travel image for "Odisha Wildlife & Nature Expedition Trending" — 6-day Odisha holiday package, India. Scene: wildlife safari Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/odisha-odisha-wildlife-nature-expedition-trending-6d5n-v5.png`

Create a photorealistic travel image for "Odisha Wildlife & Nature Expedition Trending" — 6-day Odisha holiday package, India. Scene: wildlife safari Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/odisha-odisha-wildlife-nature-expedition-trending-6d5n-v6.png`

Create a photorealistic travel image for "Odisha Wildlife & Nature Expedition Trending" — 6-day Odisha holiday package, India. Scene: wildlife safari Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/odisha-odisha-wildlife-nature-expedition-trending-6d5n-v7.png`

Create a photorealistic travel image for "Odisha Wildlife & Nature Expedition Trending" — 6-day Odisha holiday package, India. Scene: wildlife safari Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/odisha-odisha-wildlife-nature-expedition-trending-6d5n-v8.png`

Create a photorealistic travel image for "Odisha Wildlife & Nature Expedition Trending" — 6-day Odisha holiday package, India. Scene: wildlife safari Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/odisha-odisha-wildlife-nature-expedition-trending-6d5n-v9.png`

Create a photorealistic travel image for "Odisha Wildlife & Nature Expedition Trending" — 6-day Odisha holiday package, India. Scene: wildlife safari Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/odisha-odisha-wildlife-nature-expedition-trending-6d5n-v10.png`

Create a photorealistic travel image for "Odisha Wildlife & Nature Expedition Trending" — 6-day Odisha holiday package, India. Scene: wildlife safari Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Complete Odisha Explorer ⭐ Premium
Slug: `odisha-complete-odisha-explorer-premium-8d7n` | 8D/7N | ₹ 31,999

**v1** → `public/images/packages/odisha-complete-odisha-explorer-premium-8d7n-v1.png`

Create a photorealistic travel image for "Complete Odisha Explorer ⭐ Premium" — 8-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/odisha-complete-odisha-explorer-premium-8d7n-v2.png`

Create a photorealistic travel image for "Complete Odisha Explorer ⭐ Premium" — 8-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/odisha-complete-odisha-explorer-premium-8d7n-v3.png`

Create a photorealistic travel image for "Complete Odisha Explorer ⭐ Premium" — 8-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/odisha-complete-odisha-explorer-premium-8d7n-v4.png`

Create a photorealistic travel image for "Complete Odisha Explorer ⭐ Premium" — 8-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/odisha-complete-odisha-explorer-premium-8d7n-v5.png`

Create a photorealistic travel image for "Complete Odisha Explorer ⭐ Premium" — 8-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/odisha-complete-odisha-explorer-premium-8d7n-v6.png`

Create a photorealistic travel image for "Complete Odisha Explorer ⭐ Premium" — 8-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/odisha-complete-odisha-explorer-premium-8d7n-v7.png`

Create a photorealistic travel image for "Complete Odisha Explorer ⭐ Premium" — 8-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/odisha-complete-odisha-explorer-premium-8d7n-v8.png`

Create a photorealistic travel image for "Complete Odisha Explorer ⭐ Premium" — 8-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/odisha-complete-odisha-explorer-premium-8d7n-v9.png`

Create a photorealistic travel image for "Complete Odisha Explorer ⭐ Premium" — 8-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/odisha-complete-odisha-explorer-premium-8d7n-v10.png`

Create a photorealistic travel image for "Complete Odisha Explorer ⭐ Premium" — 8-day Odisha holiday package, India. Scene: scenic highlights of Jagannath Puri, Konark Sun Temple, Chilika lake. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.


### Rajasthan (6 packages)

#### Jaipur Heritage Tour Package
Slug: `rajasthan-jaipur-heritage-tour-package-3d2n` | 3D/2N | ₹ 8,999

**v1** → `public/images/packages/rajasthan-jaipur-heritage-tour-package-3d2n-v1.png`

Create a photorealistic travel image for "Jaipur Heritage Tour Package" — 3-day Rajasthan holiday package, India. Scene: heritage circuit amber forts, desert palaces, royal heritage architecture. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/rajasthan-jaipur-heritage-tour-package-3d2n-v2.png`

Create a photorealistic travel image for "Jaipur Heritage Tour Package" — 3-day Rajasthan holiday package, India. Scene: heritage circuit amber forts, desert palaces, royal heritage architecture. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/rajasthan-jaipur-heritage-tour-package-3d2n-v3.png`

Create a photorealistic travel image for "Jaipur Heritage Tour Package" — 3-day Rajasthan holiday package, India. Scene: heritage circuit amber forts, desert palaces, royal heritage architecture. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/rajasthan-jaipur-heritage-tour-package-3d2n-v4.png`

Create a photorealistic travel image for "Jaipur Heritage Tour Package" — 3-day Rajasthan holiday package, India. Scene: heritage circuit amber forts, desert palaces, royal heritage architecture. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/rajasthan-jaipur-heritage-tour-package-3d2n-v5.png`

Create a photorealistic travel image for "Jaipur Heritage Tour Package" — 3-day Rajasthan holiday package, India. Scene: heritage circuit amber forts, desert palaces, royal heritage architecture. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/rajasthan-jaipur-heritage-tour-package-3d2n-v6.png`

Create a photorealistic travel image for "Jaipur Heritage Tour Package" — 3-day Rajasthan holiday package, India. Scene: heritage circuit amber forts, desert palaces, royal heritage architecture. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/rajasthan-jaipur-heritage-tour-package-3d2n-v7.png`

Create a photorealistic travel image for "Jaipur Heritage Tour Package" — 3-day Rajasthan holiday package, India. Scene: heritage circuit amber forts, desert palaces, royal heritage architecture. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/rajasthan-jaipur-heritage-tour-package-3d2n-v8.png`

Create a photorealistic travel image for "Jaipur Heritage Tour Package" — 3-day Rajasthan holiday package, India. Scene: heritage circuit amber forts, desert palaces, royal heritage architecture. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/rajasthan-jaipur-heritage-tour-package-3d2n-v9.png`

Create a photorealistic travel image for "Jaipur Heritage Tour Package" — 3-day Rajasthan holiday package, India. Scene: heritage circuit amber forts, desert palaces, royal heritage architecture. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/rajasthan-jaipur-heritage-tour-package-3d2n-v10.png`

Create a photorealistic travel image for "Jaipur Heritage Tour Package" — 3-day Rajasthan holiday package, India. Scene: heritage circuit amber forts, desert palaces, royal heritage architecture. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Jaisalmer Desert Experience Package
Slug: `rajasthan-jaisalmer-desert-experience-package-3d2n` | 3D/2N | ₹ 11,999

**v1** → `public/images/packages/rajasthan-jaisalmer-desert-experience-package-3d2n-v1.png`

Create a photorealistic travel image for "Jaisalmer Desert Experience Package" — 3-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/rajasthan-jaisalmer-desert-experience-package-3d2n-v2.png`

Create a photorealistic travel image for "Jaisalmer Desert Experience Package" — 3-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/rajasthan-jaisalmer-desert-experience-package-3d2n-v3.png`

Create a photorealistic travel image for "Jaisalmer Desert Experience Package" — 3-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/rajasthan-jaisalmer-desert-experience-package-3d2n-v4.png`

Create a photorealistic travel image for "Jaisalmer Desert Experience Package" — 3-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/rajasthan-jaisalmer-desert-experience-package-3d2n-v5.png`

Create a photorealistic travel image for "Jaisalmer Desert Experience Package" — 3-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/rajasthan-jaisalmer-desert-experience-package-3d2n-v6.png`

Create a photorealistic travel image for "Jaisalmer Desert Experience Package" — 3-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/rajasthan-jaisalmer-desert-experience-package-3d2n-v7.png`

Create a photorealistic travel image for "Jaisalmer Desert Experience Package" — 3-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/rajasthan-jaisalmer-desert-experience-package-3d2n-v8.png`

Create a photorealistic travel image for "Jaisalmer Desert Experience Package" — 3-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/rajasthan-jaisalmer-desert-experience-package-3d2n-v9.png`

Create a photorealistic travel image for "Jaisalmer Desert Experience Package" — 3-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/rajasthan-jaisalmer-desert-experience-package-3d2n-v10.png`

Create a photorealistic travel image for "Jaisalmer Desert Experience Package" — 3-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Udaipur – Nathdwara Weekend Tour
Slug: `rajasthan-udaipur-nathdwara-weekend-tour-3d2n` | 3D/2N | ₹ 10,999

**v1** → `public/images/packages/rajasthan-udaipur-nathdwara-weekend-tour-3d2n-v1.png`

Create a photorealistic travel image for "Udaipur – Nathdwara Weekend Tour" — 3-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/rajasthan-udaipur-nathdwara-weekend-tour-3d2n-v2.png`

Create a photorealistic travel image for "Udaipur – Nathdwara Weekend Tour" — 3-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/rajasthan-udaipur-nathdwara-weekend-tour-3d2n-v3.png`

Create a photorealistic travel image for "Udaipur – Nathdwara Weekend Tour" — 3-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/rajasthan-udaipur-nathdwara-weekend-tour-3d2n-v4.png`

Create a photorealistic travel image for "Udaipur – Nathdwara Weekend Tour" — 3-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/rajasthan-udaipur-nathdwara-weekend-tour-3d2n-v5.png`

Create a photorealistic travel image for "Udaipur – Nathdwara Weekend Tour" — 3-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/rajasthan-udaipur-nathdwara-weekend-tour-3d2n-v6.png`

Create a photorealistic travel image for "Udaipur – Nathdwara Weekend Tour" — 3-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/rajasthan-udaipur-nathdwara-weekend-tour-3d2n-v7.png`

Create a photorealistic travel image for "Udaipur – Nathdwara Weekend Tour" — 3-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/rajasthan-udaipur-nathdwara-weekend-tour-3d2n-v8.png`

Create a photorealistic travel image for "Udaipur – Nathdwara Weekend Tour" — 3-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/rajasthan-udaipur-nathdwara-weekend-tour-3d2n-v9.png`

Create a photorealistic travel image for "Udaipur – Nathdwara Weekend Tour" — 3-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/rajasthan-udaipur-nathdwara-weekend-tour-3d2n-v10.png`

Create a photorealistic travel image for "Udaipur – Nathdwara Weekend Tour" — 3-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Jodhpur – Jaisalmer Desert Tour
Slug: `rajasthan-jodhpur-jaisalmer-desert-tour-6d5n` | 6D/5N | ₹ 18,999

**v1** → `public/images/packages/rajasthan-jodhpur-jaisalmer-desert-tour-6d5n-v1.png`

Create a photorealistic travel image for "Jodhpur – Jaisalmer Desert Tour" — 6-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/rajasthan-jodhpur-jaisalmer-desert-tour-6d5n-v2.png`

Create a photorealistic travel image for "Jodhpur – Jaisalmer Desert Tour" — 6-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/rajasthan-jodhpur-jaisalmer-desert-tour-6d5n-v3.png`

Create a photorealistic travel image for "Jodhpur – Jaisalmer Desert Tour" — 6-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/rajasthan-jodhpur-jaisalmer-desert-tour-6d5n-v4.png`

Create a photorealistic travel image for "Jodhpur – Jaisalmer Desert Tour" — 6-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/rajasthan-jodhpur-jaisalmer-desert-tour-6d5n-v5.png`

Create a photorealistic travel image for "Jodhpur – Jaisalmer Desert Tour" — 6-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/rajasthan-jodhpur-jaisalmer-desert-tour-6d5n-v6.png`

Create a photorealistic travel image for "Jodhpur – Jaisalmer Desert Tour" — 6-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/rajasthan-jodhpur-jaisalmer-desert-tour-6d5n-v7.png`

Create a photorealistic travel image for "Jodhpur – Jaisalmer Desert Tour" — 6-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/rajasthan-jodhpur-jaisalmer-desert-tour-6d5n-v8.png`

Create a photorealistic travel image for "Jodhpur – Jaisalmer Desert Tour" — 6-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/rajasthan-jodhpur-jaisalmer-desert-tour-6d5n-v9.png`

Create a photorealistic travel image for "Jodhpur – Jaisalmer Desert Tour" — 6-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/rajasthan-jodhpur-jaisalmer-desert-tour-6d5n-v10.png`

Create a photorealistic travel image for "Jodhpur – Jaisalmer Desert Tour" — 6-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Best of Rajasthan Tour
Slug: `rajasthan-best-of-rajasthan-tour-10d9n` | 10D/9N | ₹ 29,999

**v1** → `public/images/packages/rajasthan-best-of-rajasthan-tour-10d9n-v1.png`

Create a photorealistic travel image for "Best of Rajasthan Tour" — 10-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/rajasthan-best-of-rajasthan-tour-10d9n-v2.png`

Create a photorealistic travel image for "Best of Rajasthan Tour" — 10-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/rajasthan-best-of-rajasthan-tour-10d9n-v3.png`

Create a photorealistic travel image for "Best of Rajasthan Tour" — 10-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/rajasthan-best-of-rajasthan-tour-10d9n-v4.png`

Create a photorealistic travel image for "Best of Rajasthan Tour" — 10-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/rajasthan-best-of-rajasthan-tour-10d9n-v5.png`

Create a photorealistic travel image for "Best of Rajasthan Tour" — 10-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/rajasthan-best-of-rajasthan-tour-10d9n-v6.png`

Create a photorealistic travel image for "Best of Rajasthan Tour" — 10-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/rajasthan-best-of-rajasthan-tour-10d9n-v7.png`

Create a photorealistic travel image for "Best of Rajasthan Tour" — 10-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/rajasthan-best-of-rajasthan-tour-10d9n-v8.png`

Create a photorealistic travel image for "Best of Rajasthan Tour" — 10-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/rajasthan-best-of-rajasthan-tour-10d9n-v9.png`

Create a photorealistic travel image for "Best of Rajasthan Tour" — 10-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/rajasthan-best-of-rajasthan-tour-10d9n-v10.png`

Create a photorealistic travel image for "Best of Rajasthan Tour" — 10-day Rajasthan holiday package, India. Scene: scenic highlights of amber forts, desert palaces, royal heritage architecture. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Jawai Leopard Safari Escape
Slug: `rajasthan-jawai-leopard-safari-escape-3d2n` | 3D/2N | ₹ 15,999

**v1** → `public/images/packages/rajasthan-jawai-leopard-safari-escape-3d2n-v1.png`

Create a photorealistic travel image for "Jawai Leopard Safari Escape" — 3-day Rajasthan holiday package, India. Scene: wildlife safari amber forts, desert palaces, royal heritage architecture. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/rajasthan-jawai-leopard-safari-escape-3d2n-v2.png`

Create a photorealistic travel image for "Jawai Leopard Safari Escape" — 3-day Rajasthan holiday package, India. Scene: wildlife safari amber forts, desert palaces, royal heritage architecture. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/rajasthan-jawai-leopard-safari-escape-3d2n-v3.png`

Create a photorealistic travel image for "Jawai Leopard Safari Escape" — 3-day Rajasthan holiday package, India. Scene: wildlife safari amber forts, desert palaces, royal heritage architecture. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/rajasthan-jawai-leopard-safari-escape-3d2n-v4.png`

Create a photorealistic travel image for "Jawai Leopard Safari Escape" — 3-day Rajasthan holiday package, India. Scene: wildlife safari amber forts, desert palaces, royal heritage architecture. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/rajasthan-jawai-leopard-safari-escape-3d2n-v5.png`

Create a photorealistic travel image for "Jawai Leopard Safari Escape" — 3-day Rajasthan holiday package, India. Scene: wildlife safari amber forts, desert palaces, royal heritage architecture. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/rajasthan-jawai-leopard-safari-escape-3d2n-v6.png`

Create a photorealistic travel image for "Jawai Leopard Safari Escape" — 3-day Rajasthan holiday package, India. Scene: wildlife safari amber forts, desert palaces, royal heritage architecture. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/rajasthan-jawai-leopard-safari-escape-3d2n-v7.png`

Create a photorealistic travel image for "Jawai Leopard Safari Escape" — 3-day Rajasthan holiday package, India. Scene: wildlife safari amber forts, desert palaces, royal heritage architecture. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/rajasthan-jawai-leopard-safari-escape-3d2n-v8.png`

Create a photorealistic travel image for "Jawai Leopard Safari Escape" — 3-day Rajasthan holiday package, India. Scene: wildlife safari amber forts, desert palaces, royal heritage architecture. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/rajasthan-jawai-leopard-safari-escape-3d2n-v9.png`

Create a photorealistic travel image for "Jawai Leopard Safari Escape" — 3-day Rajasthan holiday package, India. Scene: wildlife safari amber forts, desert palaces, royal heritage architecture. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/rajasthan-jawai-leopard-safari-escape-3d2n-v10.png`

Create a photorealistic travel image for "Jawai Leopard Safari Escape" — 3-day Rajasthan holiday package, India. Scene: wildlife safari amber forts, desert palaces, royal heritage architecture. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.


### Tamil Nadu (6 packages)

#### Chennai – Mahabalipuram – Pondicherry Coastal Escape
Slug: `tamil-nadu-chennai-mahabalipuram-pondicherry-coastal-escape-4d3n` | 4D/3N | ₹ 12,999

**v1** → `public/images/packages/tamil-nadu-chennai-mahabalipuram-pondicherry-coastal-escape-4d3n-v1.png`

Create a photorealistic travel image for "Chennai – Mahabalipuram – Pondicherry Coastal Escape" — 4-day Tamil Nadu holiday package, India. Scene: coastal beaches Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/tamil-nadu-chennai-mahabalipuram-pondicherry-coastal-escape-4d3n-v2.png`

Create a photorealistic travel image for "Chennai – Mahabalipuram – Pondicherry Coastal Escape" — 4-day Tamil Nadu holiday package, India. Scene: coastal beaches Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/tamil-nadu-chennai-mahabalipuram-pondicherry-coastal-escape-4d3n-v3.png`

Create a photorealistic travel image for "Chennai – Mahabalipuram – Pondicherry Coastal Escape" — 4-day Tamil Nadu holiday package, India. Scene: coastal beaches Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/tamil-nadu-chennai-mahabalipuram-pondicherry-coastal-escape-4d3n-v4.png`

Create a photorealistic travel image for "Chennai – Mahabalipuram – Pondicherry Coastal Escape" — 4-day Tamil Nadu holiday package, India. Scene: coastal beaches Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/tamil-nadu-chennai-mahabalipuram-pondicherry-coastal-escape-4d3n-v5.png`

Create a photorealistic travel image for "Chennai – Mahabalipuram – Pondicherry Coastal Escape" — 4-day Tamil Nadu holiday package, India. Scene: coastal beaches Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/tamil-nadu-chennai-mahabalipuram-pondicherry-coastal-escape-4d3n-v6.png`

Create a photorealistic travel image for "Chennai – Mahabalipuram – Pondicherry Coastal Escape" — 4-day Tamil Nadu holiday package, India. Scene: coastal beaches Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/tamil-nadu-chennai-mahabalipuram-pondicherry-coastal-escape-4d3n-v7.png`

Create a photorealistic travel image for "Chennai – Mahabalipuram – Pondicherry Coastal Escape" — 4-day Tamil Nadu holiday package, India. Scene: coastal beaches Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/tamil-nadu-chennai-mahabalipuram-pondicherry-coastal-escape-4d3n-v8.png`

Create a photorealistic travel image for "Chennai – Mahabalipuram – Pondicherry Coastal Escape" — 4-day Tamil Nadu holiday package, India. Scene: coastal beaches Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/tamil-nadu-chennai-mahabalipuram-pondicherry-coastal-escape-4d3n-v9.png`

Create a photorealistic travel image for "Chennai – Mahabalipuram – Pondicherry Coastal Escape" — 4-day Tamil Nadu holiday package, India. Scene: coastal beaches Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/tamil-nadu-chennai-mahabalipuram-pondicherry-coastal-escape-4d3n-v10.png`

Create a photorealistic travel image for "Chennai – Mahabalipuram – Pondicherry Coastal Escape" — 4-day Tamil Nadu holiday package, India. Scene: coastal beaches Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Madurai – Rameswaram – Kanyakumari Pilgrimage Tour
Slug: `tamil-nadu-madurai-rameswaram-kanyakumari-pilgrimage-tour-5d4n` | 5D/4N | ₹ 15,999

**v1** → `public/images/packages/tamil-nadu-madurai-rameswaram-kanyakumari-pilgrimage-tour-5d4n-v1.png`

Create a photorealistic travel image for "Madurai – Rameswaram – Kanyakumari Pilgrimage Tour" — 5-day Tamil Nadu holiday package, India. Scene: spiritual pilgrimage Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset, respectful reverent mood. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/tamil-nadu-madurai-rameswaram-kanyakumari-pilgrimage-tour-5d4n-v2.png`

Create a photorealistic travel image for "Madurai – Rameswaram – Kanyakumari Pilgrimage Tour" — 5-day Tamil Nadu holiday package, India. Scene: spiritual pilgrimage Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset, respectful reverent mood. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/tamil-nadu-madurai-rameswaram-kanyakumari-pilgrimage-tour-5d4n-v3.png`

Create a photorealistic travel image for "Madurai – Rameswaram – Kanyakumari Pilgrimage Tour" — 5-day Tamil Nadu holiday package, India. Scene: spiritual pilgrimage Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset, respectful reverent mood. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/tamil-nadu-madurai-rameswaram-kanyakumari-pilgrimage-tour-5d4n-v4.png`

Create a photorealistic travel image for "Madurai – Rameswaram – Kanyakumari Pilgrimage Tour" — 5-day Tamil Nadu holiday package, India. Scene: spiritual pilgrimage Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset, respectful reverent mood. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/tamil-nadu-madurai-rameswaram-kanyakumari-pilgrimage-tour-5d4n-v5.png`

Create a photorealistic travel image for "Madurai – Rameswaram – Kanyakumari Pilgrimage Tour" — 5-day Tamil Nadu holiday package, India. Scene: spiritual pilgrimage Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset, respectful reverent mood. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/tamil-nadu-madurai-rameswaram-kanyakumari-pilgrimage-tour-5d4n-v6.png`

Create a photorealistic travel image for "Madurai – Rameswaram – Kanyakumari Pilgrimage Tour" — 5-day Tamil Nadu holiday package, India. Scene: spiritual pilgrimage Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset, respectful reverent mood. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/tamil-nadu-madurai-rameswaram-kanyakumari-pilgrimage-tour-5d4n-v7.png`

Create a photorealistic travel image for "Madurai – Rameswaram – Kanyakumari Pilgrimage Tour" — 5-day Tamil Nadu holiday package, India. Scene: spiritual pilgrimage Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset, respectful reverent mood. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/tamil-nadu-madurai-rameswaram-kanyakumari-pilgrimage-tour-5d4n-v8.png`

Create a photorealistic travel image for "Madurai – Rameswaram – Kanyakumari Pilgrimage Tour" — 5-day Tamil Nadu holiday package, India. Scene: spiritual pilgrimage Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset, respectful reverent mood. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/tamil-nadu-madurai-rameswaram-kanyakumari-pilgrimage-tour-5d4n-v9.png`

Create a photorealistic travel image for "Madurai – Rameswaram – Kanyakumari Pilgrimage Tour" — 5-day Tamil Nadu holiday package, India. Scene: spiritual pilgrimage Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset, respectful reverent mood. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/tamil-nadu-madurai-rameswaram-kanyakumari-pilgrimage-tour-5d4n-v10.png`

Create a photorealistic travel image for "Madurai – Rameswaram – Kanyakumari Pilgrimage Tour" — 5-day Tamil Nadu holiday package, India. Scene: spiritual pilgrimage Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset, respectful reverent mood. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Ooty – Coonoor – Madurai Heritage Escape
Slug: `tamil-nadu-ooty-coonoor-madurai-heritage-escape-6d5n` | 6D/5N | ₹ 19,999

**v1** → `public/images/packages/tamil-nadu-ooty-coonoor-madurai-heritage-escape-6d5n-v1.png`

Create a photorealistic travel image for "Ooty – Coonoor – Madurai Heritage Escape" — 6-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/tamil-nadu-ooty-coonoor-madurai-heritage-escape-6d5n-v2.png`

Create a photorealistic travel image for "Ooty – Coonoor – Madurai Heritage Escape" — 6-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/tamil-nadu-ooty-coonoor-madurai-heritage-escape-6d5n-v3.png`

Create a photorealistic travel image for "Ooty – Coonoor – Madurai Heritage Escape" — 6-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/tamil-nadu-ooty-coonoor-madurai-heritage-escape-6d5n-v4.png`

Create a photorealistic travel image for "Ooty – Coonoor – Madurai Heritage Escape" — 6-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/tamil-nadu-ooty-coonoor-madurai-heritage-escape-6d5n-v5.png`

Create a photorealistic travel image for "Ooty – Coonoor – Madurai Heritage Escape" — 6-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/tamil-nadu-ooty-coonoor-madurai-heritage-escape-6d5n-v6.png`

Create a photorealistic travel image for "Ooty – Coonoor – Madurai Heritage Escape" — 6-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/tamil-nadu-ooty-coonoor-madurai-heritage-escape-6d5n-v7.png`

Create a photorealistic travel image for "Ooty – Coonoor – Madurai Heritage Escape" — 6-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/tamil-nadu-ooty-coonoor-madurai-heritage-escape-6d5n-v8.png`

Create a photorealistic travel image for "Ooty – Coonoor – Madurai Heritage Escape" — 6-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/tamil-nadu-ooty-coonoor-madurai-heritage-escape-6d5n-v9.png`

Create a photorealistic travel image for "Ooty – Coonoor – Madurai Heritage Escape" — 6-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/tamil-nadu-ooty-coonoor-madurai-heritage-escape-6d5n-v10.png`

Create a photorealistic travel image for "Ooty – Coonoor – Madurai Heritage Escape" — 6-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Chennai – Kanchipuram – Mahabalipuram Heritage Tour
Slug: `tamil-nadu-chennai-kanchipuram-mahabalipuram-heritage-tour-4d3n` | 4D/3N | ₹ 13,999

**v1** → `public/images/packages/tamil-nadu-chennai-kanchipuram-mahabalipuram-heritage-tour-4d3n-v1.png`

Create a photorealistic travel image for "Chennai – Kanchipuram – Mahabalipuram Heritage Tour" — 4-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/tamil-nadu-chennai-kanchipuram-mahabalipuram-heritage-tour-4d3n-v2.png`

Create a photorealistic travel image for "Chennai – Kanchipuram – Mahabalipuram Heritage Tour" — 4-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/tamil-nadu-chennai-kanchipuram-mahabalipuram-heritage-tour-4d3n-v3.png`

Create a photorealistic travel image for "Chennai – Kanchipuram – Mahabalipuram Heritage Tour" — 4-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/tamil-nadu-chennai-kanchipuram-mahabalipuram-heritage-tour-4d3n-v4.png`

Create a photorealistic travel image for "Chennai – Kanchipuram – Mahabalipuram Heritage Tour" — 4-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/tamil-nadu-chennai-kanchipuram-mahabalipuram-heritage-tour-4d3n-v5.png`

Create a photorealistic travel image for "Chennai – Kanchipuram – Mahabalipuram Heritage Tour" — 4-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/tamil-nadu-chennai-kanchipuram-mahabalipuram-heritage-tour-4d3n-v6.png`

Create a photorealistic travel image for "Chennai – Kanchipuram – Mahabalipuram Heritage Tour" — 4-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/tamil-nadu-chennai-kanchipuram-mahabalipuram-heritage-tour-4d3n-v7.png`

Create a photorealistic travel image for "Chennai – Kanchipuram – Mahabalipuram Heritage Tour" — 4-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/tamil-nadu-chennai-kanchipuram-mahabalipuram-heritage-tour-4d3n-v8.png`

Create a photorealistic travel image for "Chennai – Kanchipuram – Mahabalipuram Heritage Tour" — 4-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/tamil-nadu-chennai-kanchipuram-mahabalipuram-heritage-tour-4d3n-v9.png`

Create a photorealistic travel image for "Chennai – Kanchipuram – Mahabalipuram Heritage Tour" — 4-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/tamil-nadu-chennai-kanchipuram-mahabalipuram-heritage-tour-4d3n-v10.png`

Create a photorealistic travel image for "Chennai – Kanchipuram – Mahabalipuram Heritage Tour" — 4-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Ooty – Madurai Family Getaway
Slug: `tamil-nadu-ooty-madurai-family-getaway-5d4n` | 5D/4N | ₹ 17,999

**v1** → `public/images/packages/tamil-nadu-ooty-madurai-family-getaway-5d4n-v1.png`

Create a photorealistic travel image for "Ooty – Madurai Family Getaway" — 5-day Tamil Nadu holiday package, India. Scene: family-friendly Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset, cheerful safe travel. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/tamil-nadu-ooty-madurai-family-getaway-5d4n-v2.png`

Create a photorealistic travel image for "Ooty – Madurai Family Getaway" — 5-day Tamil Nadu holiday package, India. Scene: family-friendly Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset, cheerful safe travel. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/tamil-nadu-ooty-madurai-family-getaway-5d4n-v3.png`

Create a photorealistic travel image for "Ooty – Madurai Family Getaway" — 5-day Tamil Nadu holiday package, India. Scene: family-friendly Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset, cheerful safe travel. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/tamil-nadu-ooty-madurai-family-getaway-5d4n-v4.png`

Create a photorealistic travel image for "Ooty – Madurai Family Getaway" — 5-day Tamil Nadu holiday package, India. Scene: family-friendly Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset, cheerful safe travel. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/tamil-nadu-ooty-madurai-family-getaway-5d4n-v5.png`

Create a photorealistic travel image for "Ooty – Madurai Family Getaway" — 5-day Tamil Nadu holiday package, India. Scene: family-friendly Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset, cheerful safe travel. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/tamil-nadu-ooty-madurai-family-getaway-5d4n-v6.png`

Create a photorealistic travel image for "Ooty – Madurai Family Getaway" — 5-day Tamil Nadu holiday package, India. Scene: family-friendly Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset, cheerful safe travel. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/tamil-nadu-ooty-madurai-family-getaway-5d4n-v7.png`

Create a photorealistic travel image for "Ooty – Madurai Family Getaway" — 5-day Tamil Nadu holiday package, India. Scene: family-friendly Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset, cheerful safe travel. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/tamil-nadu-ooty-madurai-family-getaway-5d4n-v8.png`

Create a photorealistic travel image for "Ooty – Madurai Family Getaway" — 5-day Tamil Nadu holiday package, India. Scene: family-friendly Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset, cheerful safe travel. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/tamil-nadu-ooty-madurai-family-getaway-5d4n-v9.png`

Create a photorealistic travel image for "Ooty – Madurai Family Getaway" — 5-day Tamil Nadu holiday package, India. Scene: family-friendly Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset, cheerful safe travel. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/tamil-nadu-ooty-madurai-family-getaway-5d4n-v10.png`

Create a photorealistic travel image for "Ooty – Madurai Family Getaway" — 5-day Tamil Nadu holiday package, India. Scene: family-friendly Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset, cheerful safe travel. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### ⭐ Complete Tamil Nadu Grand Tour
Slug: `tamil-nadu-complete-tamil-nadu-grand-tour-7d6n` | 7D/6N | ₹ 27,999

**v1** → `public/images/packages/tamil-nadu-complete-tamil-nadu-grand-tour-7d6n-v1.png`

Create a photorealistic travel image for "⭐ Complete Tamil Nadu Grand Tour" — 7-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/tamil-nadu-complete-tamil-nadu-grand-tour-7d6n-v2.png`

Create a photorealistic travel image for "⭐ Complete Tamil Nadu Grand Tour" — 7-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/tamil-nadu-complete-tamil-nadu-grand-tour-7d6n-v3.png`

Create a photorealistic travel image for "⭐ Complete Tamil Nadu Grand Tour" — 7-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/tamil-nadu-complete-tamil-nadu-grand-tour-7d6n-v4.png`

Create a photorealistic travel image for "⭐ Complete Tamil Nadu Grand Tour" — 7-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/tamil-nadu-complete-tamil-nadu-grand-tour-7d6n-v5.png`

Create a photorealistic travel image for "⭐ Complete Tamil Nadu Grand Tour" — 7-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/tamil-nadu-complete-tamil-nadu-grand-tour-7d6n-v6.png`

Create a photorealistic travel image for "⭐ Complete Tamil Nadu Grand Tour" — 7-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/tamil-nadu-complete-tamil-nadu-grand-tour-7d6n-v7.png`

Create a photorealistic travel image for "⭐ Complete Tamil Nadu Grand Tour" — 7-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/tamil-nadu-complete-tamil-nadu-grand-tour-7d6n-v8.png`

Create a photorealistic travel image for "⭐ Complete Tamil Nadu Grand Tour" — 7-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/tamil-nadu-complete-tamil-nadu-grand-tour-7d6n-v9.png`

Create a photorealistic travel image for "⭐ Complete Tamil Nadu Grand Tour" — 7-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/tamil-nadu-complete-tamil-nadu-grand-tour-7d6n-v10.png`

Create a photorealistic travel image for "⭐ Complete Tamil Nadu Grand Tour" — 7-day Tamil Nadu holiday package, India. Scene: heritage circuit Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.


### Uttar Pradesh (6 packages)

#### Kashi Vishwanath Spiritual Tour
Slug: `uttar-pradesh-kashi-vishwanath-spiritual-tour-3d2n` | 3D/2N | ₹ 9,999

**v1** → `public/images/packages/uttar-pradesh-kashi-vishwanath-spiritual-tour-3d2n-v1.png`

Create a photorealistic travel image for "Kashi Vishwanath Spiritual Tour" — 3-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/uttar-pradesh-kashi-vishwanath-spiritual-tour-3d2n-v2.png`

Create a photorealistic travel image for "Kashi Vishwanath Spiritual Tour" — 3-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/uttar-pradesh-kashi-vishwanath-spiritual-tour-3d2n-v3.png`

Create a photorealistic travel image for "Kashi Vishwanath Spiritual Tour" — 3-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/uttar-pradesh-kashi-vishwanath-spiritual-tour-3d2n-v4.png`

Create a photorealistic travel image for "Kashi Vishwanath Spiritual Tour" — 3-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/uttar-pradesh-kashi-vishwanath-spiritual-tour-3d2n-v5.png`

Create a photorealistic travel image for "Kashi Vishwanath Spiritual Tour" — 3-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/uttar-pradesh-kashi-vishwanath-spiritual-tour-3d2n-v6.png`

Create a photorealistic travel image for "Kashi Vishwanath Spiritual Tour" — 3-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/uttar-pradesh-kashi-vishwanath-spiritual-tour-3d2n-v7.png`

Create a photorealistic travel image for "Kashi Vishwanath Spiritual Tour" — 3-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/uttar-pradesh-kashi-vishwanath-spiritual-tour-3d2n-v8.png`

Create a photorealistic travel image for "Kashi Vishwanath Spiritual Tour" — 3-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/uttar-pradesh-kashi-vishwanath-spiritual-tour-3d2n-v9.png`

Create a photorealistic travel image for "Kashi Vishwanath Spiritual Tour" — 3-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/uttar-pradesh-kashi-vishwanath-spiritual-tour-3d2n-v10.png`

Create a photorealistic travel image for "Kashi Vishwanath Spiritual Tour" — 3-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Ayodhya & Kashi Divine Tour
Slug: `uttar-pradesh-ayodhya-kashi-divine-tour-5d4n` | 5D/4N | ₹ 16,999

**v1** → `public/images/packages/uttar-pradesh-ayodhya-kashi-divine-tour-5d4n-v1.png`

Create a photorealistic travel image for "Ayodhya & Kashi Divine Tour" — 5-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/uttar-pradesh-ayodhya-kashi-divine-tour-5d4n-v2.png`

Create a photorealistic travel image for "Ayodhya & Kashi Divine Tour" — 5-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/uttar-pradesh-ayodhya-kashi-divine-tour-5d4n-v3.png`

Create a photorealistic travel image for "Ayodhya & Kashi Divine Tour" — 5-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/uttar-pradesh-ayodhya-kashi-divine-tour-5d4n-v4.png`

Create a photorealistic travel image for "Ayodhya & Kashi Divine Tour" — 5-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/uttar-pradesh-ayodhya-kashi-divine-tour-5d4n-v5.png`

Create a photorealistic travel image for "Ayodhya & Kashi Divine Tour" — 5-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/uttar-pradesh-ayodhya-kashi-divine-tour-5d4n-v6.png`

Create a photorealistic travel image for "Ayodhya & Kashi Divine Tour" — 5-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/uttar-pradesh-ayodhya-kashi-divine-tour-5d4n-v7.png`

Create a photorealistic travel image for "Ayodhya & Kashi Divine Tour" — 5-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/uttar-pradesh-ayodhya-kashi-divine-tour-5d4n-v8.png`

Create a photorealistic travel image for "Ayodhya & Kashi Divine Tour" — 5-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/uttar-pradesh-ayodhya-kashi-divine-tour-5d4n-v9.png`

Create a photorealistic travel image for "Ayodhya & Kashi Divine Tour" — 5-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/uttar-pradesh-ayodhya-kashi-divine-tour-5d4n-v10.png`

Create a photorealistic travel image for "Ayodhya & Kashi Divine Tour" — 5-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Prayagraj – Varanasi – Ayodhya Tour
Slug: `uttar-pradesh-prayagraj-varanasi-ayodhya-tour-6d5n` | 6D/5N | ₹ 19,999

**v1** → `public/images/packages/uttar-pradesh-prayagraj-varanasi-ayodhya-tour-6d5n-v1.png`

Create a photorealistic travel image for "Prayagraj – Varanasi – Ayodhya Tour" — 6-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/uttar-pradesh-prayagraj-varanasi-ayodhya-tour-6d5n-v2.png`

Create a photorealistic travel image for "Prayagraj – Varanasi – Ayodhya Tour" — 6-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/uttar-pradesh-prayagraj-varanasi-ayodhya-tour-6d5n-v3.png`

Create a photorealistic travel image for "Prayagraj – Varanasi – Ayodhya Tour" — 6-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/uttar-pradesh-prayagraj-varanasi-ayodhya-tour-6d5n-v4.png`

Create a photorealistic travel image for "Prayagraj – Varanasi – Ayodhya Tour" — 6-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/uttar-pradesh-prayagraj-varanasi-ayodhya-tour-6d5n-v5.png`

Create a photorealistic travel image for "Prayagraj – Varanasi – Ayodhya Tour" — 6-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/uttar-pradesh-prayagraj-varanasi-ayodhya-tour-6d5n-v6.png`

Create a photorealistic travel image for "Prayagraj – Varanasi – Ayodhya Tour" — 6-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/uttar-pradesh-prayagraj-varanasi-ayodhya-tour-6d5n-v7.png`

Create a photorealistic travel image for "Prayagraj – Varanasi – Ayodhya Tour" — 6-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/uttar-pradesh-prayagraj-varanasi-ayodhya-tour-6d5n-v8.png`

Create a photorealistic travel image for "Prayagraj – Varanasi – Ayodhya Tour" — 6-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/uttar-pradesh-prayagraj-varanasi-ayodhya-tour-6d5n-v9.png`

Create a photorealistic travel image for "Prayagraj – Varanasi – Ayodhya Tour" — 6-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/uttar-pradesh-prayagraj-varanasi-ayodhya-tour-6d5n-v10.png`

Create a photorealistic travel image for "Prayagraj – Varanasi – Ayodhya Tour" — 6-day Uttar Pradesh holiday package, India. Scene: scenic highlights of Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Agra – Mathura – Vrindavan Heritage Tour
Slug: `uttar-pradesh-agra-mathura-vrindavan-heritage-tour-5d4n` | 5D/4N | ₹ 17,999

**v1** → `public/images/packages/uttar-pradesh-agra-mathura-vrindavan-heritage-tour-5d4n-v1.png`

Create a photorealistic travel image for "Agra – Mathura – Vrindavan Heritage Tour" — 5-day Uttar Pradesh holiday package, India. Scene: heritage circuit Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/uttar-pradesh-agra-mathura-vrindavan-heritage-tour-5d4n-v2.png`

Create a photorealistic travel image for "Agra – Mathura – Vrindavan Heritage Tour" — 5-day Uttar Pradesh holiday package, India. Scene: heritage circuit Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/uttar-pradesh-agra-mathura-vrindavan-heritage-tour-5d4n-v3.png`

Create a photorealistic travel image for "Agra – Mathura – Vrindavan Heritage Tour" — 5-day Uttar Pradesh holiday package, India. Scene: heritage circuit Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/uttar-pradesh-agra-mathura-vrindavan-heritage-tour-5d4n-v4.png`

Create a photorealistic travel image for "Agra – Mathura – Vrindavan Heritage Tour" — 5-day Uttar Pradesh holiday package, India. Scene: heritage circuit Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/uttar-pradesh-agra-mathura-vrindavan-heritage-tour-5d4n-v5.png`

Create a photorealistic travel image for "Agra – Mathura – Vrindavan Heritage Tour" — 5-day Uttar Pradesh holiday package, India. Scene: heritage circuit Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/uttar-pradesh-agra-mathura-vrindavan-heritage-tour-5d4n-v6.png`

Create a photorealistic travel image for "Agra – Mathura – Vrindavan Heritage Tour" — 5-day Uttar Pradesh holiday package, India. Scene: heritage circuit Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/uttar-pradesh-agra-mathura-vrindavan-heritage-tour-5d4n-v7.png`

Create a photorealistic travel image for "Agra – Mathura – Vrindavan Heritage Tour" — 5-day Uttar Pradesh holiday package, India. Scene: heritage circuit Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/uttar-pradesh-agra-mathura-vrindavan-heritage-tour-5d4n-v8.png`

Create a photorealistic travel image for "Agra – Mathura – Vrindavan Heritage Tour" — 5-day Uttar Pradesh holiday package, India. Scene: heritage circuit Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/uttar-pradesh-agra-mathura-vrindavan-heritage-tour-5d4n-v9.png`

Create a photorealistic travel image for "Agra – Mathura – Vrindavan Heritage Tour" — 5-day Uttar Pradesh holiday package, India. Scene: heritage circuit Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/uttar-pradesh-agra-mathura-vrindavan-heritage-tour-5d4n-v10.png`

Create a photorealistic travel image for "Agra – Mathura – Vrindavan Heritage Tour" — 5-day Uttar Pradesh holiday package, India. Scene: heritage circuit Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Dudhwa Wildlife & Lucknow Tour
Slug: `uttar-pradesh-dudhwa-wildlife-lucknow-tour-5d4n` | 5D/4N | ₹ 18,999

**v1** → `public/images/packages/uttar-pradesh-dudhwa-wildlife-lucknow-tour-5d4n-v1.png`

Create a photorealistic travel image for "Dudhwa Wildlife & Lucknow Tour" — 5-day Uttar Pradesh holiday package, India. Scene: wildlife safari Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/uttar-pradesh-dudhwa-wildlife-lucknow-tour-5d4n-v2.png`

Create a photorealistic travel image for "Dudhwa Wildlife & Lucknow Tour" — 5-day Uttar Pradesh holiday package, India. Scene: wildlife safari Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/uttar-pradesh-dudhwa-wildlife-lucknow-tour-5d4n-v3.png`

Create a photorealistic travel image for "Dudhwa Wildlife & Lucknow Tour" — 5-day Uttar Pradesh holiday package, India. Scene: wildlife safari Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/uttar-pradesh-dudhwa-wildlife-lucknow-tour-5d4n-v4.png`

Create a photorealistic travel image for "Dudhwa Wildlife & Lucknow Tour" — 5-day Uttar Pradesh holiday package, India. Scene: wildlife safari Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/uttar-pradesh-dudhwa-wildlife-lucknow-tour-5d4n-v5.png`

Create a photorealistic travel image for "Dudhwa Wildlife & Lucknow Tour" — 5-day Uttar Pradesh holiday package, India. Scene: wildlife safari Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/uttar-pradesh-dudhwa-wildlife-lucknow-tour-5d4n-v6.png`

Create a photorealistic travel image for "Dudhwa Wildlife & Lucknow Tour" — 5-day Uttar Pradesh holiday package, India. Scene: wildlife safari Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/uttar-pradesh-dudhwa-wildlife-lucknow-tour-5d4n-v7.png`

Create a photorealistic travel image for "Dudhwa Wildlife & Lucknow Tour" — 5-day Uttar Pradesh holiday package, India. Scene: wildlife safari Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/uttar-pradesh-dudhwa-wildlife-lucknow-tour-5d4n-v8.png`

Create a photorealistic travel image for "Dudhwa Wildlife & Lucknow Tour" — 5-day Uttar Pradesh holiday package, India. Scene: wildlife safari Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/uttar-pradesh-dudhwa-wildlife-lucknow-tour-5d4n-v9.png`

Create a photorealistic travel image for "Dudhwa Wildlife & Lucknow Tour" — 5-day Uttar Pradesh holiday package, India. Scene: wildlife safari Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/uttar-pradesh-dudhwa-wildlife-lucknow-tour-5d4n-v10.png`

Create a photorealistic travel image for "Dudhwa Wildlife & Lucknow Tour" — 5-day Uttar Pradesh holiday package, India. Scene: wildlife safari Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Complete Uttar Pradesh Grand Tour
Slug: `uttar-pradesh-complete-uttar-pradesh-grand-tour-9d8n` | 9D/8N | ₹ 31,999

**v1** → `public/images/packages/uttar-pradesh-complete-uttar-pradesh-grand-tour-9d8n-v1.png`

Create a photorealistic travel image for "Complete Uttar Pradesh Grand Tour" — 9-day Uttar Pradesh holiday package, India. Scene: heritage circuit Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/uttar-pradesh-complete-uttar-pradesh-grand-tour-9d8n-v2.png`

Create a photorealistic travel image for "Complete Uttar Pradesh Grand Tour" — 9-day Uttar Pradesh holiday package, India. Scene: heritage circuit Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/uttar-pradesh-complete-uttar-pradesh-grand-tour-9d8n-v3.png`

Create a photorealistic travel image for "Complete Uttar Pradesh Grand Tour" — 9-day Uttar Pradesh holiday package, India. Scene: heritage circuit Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/uttar-pradesh-complete-uttar-pradesh-grand-tour-9d8n-v4.png`

Create a photorealistic travel image for "Complete Uttar Pradesh Grand Tour" — 9-day Uttar Pradesh holiday package, India. Scene: heritage circuit Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/uttar-pradesh-complete-uttar-pradesh-grand-tour-9d8n-v5.png`

Create a photorealistic travel image for "Complete Uttar Pradesh Grand Tour" — 9-day Uttar Pradesh holiday package, India. Scene: heritage circuit Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/uttar-pradesh-complete-uttar-pradesh-grand-tour-9d8n-v6.png`

Create a photorealistic travel image for "Complete Uttar Pradesh Grand Tour" — 9-day Uttar Pradesh holiday package, India. Scene: heritage circuit Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/uttar-pradesh-complete-uttar-pradesh-grand-tour-9d8n-v7.png`

Create a photorealistic travel image for "Complete Uttar Pradesh Grand Tour" — 9-day Uttar Pradesh holiday package, India. Scene: heritage circuit Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/uttar-pradesh-complete-uttar-pradesh-grand-tour-9d8n-v8.png`

Create a photorealistic travel image for "Complete Uttar Pradesh Grand Tour" — 9-day Uttar Pradesh holiday package, India. Scene: heritage circuit Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/uttar-pradesh-complete-uttar-pradesh-grand-tour-9d8n-v9.png`

Create a photorealistic travel image for "Complete Uttar Pradesh Grand Tour" — 9-day Uttar Pradesh holiday package, India. Scene: heritage circuit Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/uttar-pradesh-complete-uttar-pradesh-grand-tour-9d8n-v10.png`

Create a photorealistic travel image for "Complete Uttar Pradesh Grand Tour" — 9-day Uttar Pradesh holiday package, India. Scene: heritage circuit Taj Mahal Agra, Varanasi ghats, spiritual heritage. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.


### Uttarakhand (6 packages)

#### Haridwar – Rishikesh Spiritual Tour
Slug: `uttarakhand-haridwar-rishikesh-spiritual-tour-3d2n` | 3D/2N | ₹ 8,999

**v1** → `public/images/packages/uttarakhand-haridwar-rishikesh-spiritual-tour-3d2n-v1.png`

Create a photorealistic travel image for "Haridwar – Rishikesh Spiritual Tour" — 3-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/uttarakhand-haridwar-rishikesh-spiritual-tour-3d2n-v2.png`

Create a photorealistic travel image for "Haridwar – Rishikesh Spiritual Tour" — 3-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/uttarakhand-haridwar-rishikesh-spiritual-tour-3d2n-v3.png`

Create a photorealistic travel image for "Haridwar – Rishikesh Spiritual Tour" — 3-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/uttarakhand-haridwar-rishikesh-spiritual-tour-3d2n-v4.png`

Create a photorealistic travel image for "Haridwar – Rishikesh Spiritual Tour" — 3-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/uttarakhand-haridwar-rishikesh-spiritual-tour-3d2n-v5.png`

Create a photorealistic travel image for "Haridwar – Rishikesh Spiritual Tour" — 3-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/uttarakhand-haridwar-rishikesh-spiritual-tour-3d2n-v6.png`

Create a photorealistic travel image for "Haridwar – Rishikesh Spiritual Tour" — 3-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/uttarakhand-haridwar-rishikesh-spiritual-tour-3d2n-v7.png`

Create a photorealistic travel image for "Haridwar – Rishikesh Spiritual Tour" — 3-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/uttarakhand-haridwar-rishikesh-spiritual-tour-3d2n-v8.png`

Create a photorealistic travel image for "Haridwar – Rishikesh Spiritual Tour" — 3-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/uttarakhand-haridwar-rishikesh-spiritual-tour-3d2n-v9.png`

Create a photorealistic travel image for "Haridwar – Rishikesh Spiritual Tour" — 3-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/uttarakhand-haridwar-rishikesh-spiritual-tour-3d2n-v10.png`

Create a photorealistic travel image for "Haridwar – Rishikesh Spiritual Tour" — 3-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Mussoorie Hill Station Tour
Slug: `uttarakhand-mussoorie-hill-station-tour-3d2n` | 3D/2N | ₹ 10,999

**v1** → `public/images/packages/uttarakhand-mussoorie-hill-station-tour-3d2n-v1.png`

Create a photorealistic travel image for "Mussoorie Hill Station Tour" — 3-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/uttarakhand-mussoorie-hill-station-tour-3d2n-v2.png`

Create a photorealistic travel image for "Mussoorie Hill Station Tour" — 3-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/uttarakhand-mussoorie-hill-station-tour-3d2n-v3.png`

Create a photorealistic travel image for "Mussoorie Hill Station Tour" — 3-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/uttarakhand-mussoorie-hill-station-tour-3d2n-v4.png`

Create a photorealistic travel image for "Mussoorie Hill Station Tour" — 3-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/uttarakhand-mussoorie-hill-station-tour-3d2n-v5.png`

Create a photorealistic travel image for "Mussoorie Hill Station Tour" — 3-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/uttarakhand-mussoorie-hill-station-tour-3d2n-v6.png`

Create a photorealistic travel image for "Mussoorie Hill Station Tour" — 3-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/uttarakhand-mussoorie-hill-station-tour-3d2n-v7.png`

Create a photorealistic travel image for "Mussoorie Hill Station Tour" — 3-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/uttarakhand-mussoorie-hill-station-tour-3d2n-v8.png`

Create a photorealistic travel image for "Mussoorie Hill Station Tour" — 3-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/uttarakhand-mussoorie-hill-station-tour-3d2n-v9.png`

Create a photorealistic travel image for "Mussoorie Hill Station Tour" — 3-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/uttarakhand-mussoorie-hill-station-tour-3d2n-v10.png`

Create a photorealistic travel image for "Mussoorie Hill Station Tour" — 3-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Nainital & Jim Corbett Tour
Slug: `uttarakhand-nainital-jim-corbett-tour-5d4n` | 5D/4N | ₹ 17,999

**v1** → `public/images/packages/uttarakhand-nainital-jim-corbett-tour-5d4n-v1.png`

Create a photorealistic travel image for "Nainital & Jim Corbett Tour" — 5-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/uttarakhand-nainital-jim-corbett-tour-5d4n-v2.png`

Create a photorealistic travel image for "Nainital & Jim Corbett Tour" — 5-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/uttarakhand-nainital-jim-corbett-tour-5d4n-v3.png`

Create a photorealistic travel image for "Nainital & Jim Corbett Tour" — 5-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/uttarakhand-nainital-jim-corbett-tour-5d4n-v4.png`

Create a photorealistic travel image for "Nainital & Jim Corbett Tour" — 5-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/uttarakhand-nainital-jim-corbett-tour-5d4n-v5.png`

Create a photorealistic travel image for "Nainital & Jim Corbett Tour" — 5-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/uttarakhand-nainital-jim-corbett-tour-5d4n-v6.png`

Create a photorealistic travel image for "Nainital & Jim Corbett Tour" — 5-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/uttarakhand-nainital-jim-corbett-tour-5d4n-v7.png`

Create a photorealistic travel image for "Nainital & Jim Corbett Tour" — 5-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/uttarakhand-nainital-jim-corbett-tour-5d4n-v8.png`

Create a photorealistic travel image for "Nainital & Jim Corbett Tour" — 5-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/uttarakhand-nainital-jim-corbett-tour-5d4n-v9.png`

Create a photorealistic travel image for "Nainital & Jim Corbett Tour" — 5-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/uttarakhand-nainital-jim-corbett-tour-5d4n-v10.png`

Create a photorealistic travel image for "Nainital & Jim Corbett Tour" — 5-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Nainital Honeymoon Package
Slug: `uttarakhand-nainital-honeymoon-package-4d3n` | 4D/3N | ₹ 15,999

**v1** → `public/images/packages/uttarakhand-nainital-honeymoon-package-4d3n-v1.png`

Create a photorealistic travel image for "Nainital Honeymoon Package" — 4-day Uttarakhand holiday package, India. Scene: romantic Himalayan spirituality, Rishikesh, hill stations, intimate luxury mood. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/uttarakhand-nainital-honeymoon-package-4d3n-v2.png`

Create a photorealistic travel image for "Nainital Honeymoon Package" — 4-day Uttarakhand holiday package, India. Scene: romantic Himalayan spirituality, Rishikesh, hill stations, intimate luxury mood. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/uttarakhand-nainital-honeymoon-package-4d3n-v3.png`

Create a photorealistic travel image for "Nainital Honeymoon Package" — 4-day Uttarakhand holiday package, India. Scene: romantic Himalayan spirituality, Rishikesh, hill stations, intimate luxury mood. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/uttarakhand-nainital-honeymoon-package-4d3n-v4.png`

Create a photorealistic travel image for "Nainital Honeymoon Package" — 4-day Uttarakhand holiday package, India. Scene: romantic Himalayan spirituality, Rishikesh, hill stations, intimate luxury mood. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/uttarakhand-nainital-honeymoon-package-4d3n-v5.png`

Create a photorealistic travel image for "Nainital Honeymoon Package" — 4-day Uttarakhand holiday package, India. Scene: romantic Himalayan spirituality, Rishikesh, hill stations, intimate luxury mood. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/uttarakhand-nainital-honeymoon-package-4d3n-v6.png`

Create a photorealistic travel image for "Nainital Honeymoon Package" — 4-day Uttarakhand holiday package, India. Scene: romantic Himalayan spirituality, Rishikesh, hill stations, intimate luxury mood. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/uttarakhand-nainital-honeymoon-package-4d3n-v7.png`

Create a photorealistic travel image for "Nainital Honeymoon Package" — 4-day Uttarakhand holiday package, India. Scene: romantic Himalayan spirituality, Rishikesh, hill stations, intimate luxury mood. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/uttarakhand-nainital-honeymoon-package-4d3n-v8.png`

Create a photorealistic travel image for "Nainital Honeymoon Package" — 4-day Uttarakhand holiday package, India. Scene: romantic Himalayan spirituality, Rishikesh, hill stations, intimate luxury mood. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/uttarakhand-nainital-honeymoon-package-4d3n-v9.png`

Create a photorealistic travel image for "Nainital Honeymoon Package" — 4-day Uttarakhand holiday package, India. Scene: romantic Himalayan spirituality, Rishikesh, hill stations, intimate luxury mood. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/uttarakhand-nainital-honeymoon-package-4d3n-v10.png`

Create a photorealistic travel image for "Nainital Honeymoon Package" — 4-day Uttarakhand holiday package, India. Scene: romantic Himalayan spirituality, Rishikesh, hill stations, intimate luxury mood. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Char Dham Yatra Package
Slug: `uttarakhand-char-dham-yatra-package-10d9n` | 10D/9N | ₹ 29,999

**v1** → `public/images/packages/uttarakhand-char-dham-yatra-package-10d9n-v1.png`

Create a photorealistic travel image for "Char Dham Yatra Package" — 10-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/uttarakhand-char-dham-yatra-package-10d9n-v2.png`

Create a photorealistic travel image for "Char Dham Yatra Package" — 10-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/uttarakhand-char-dham-yatra-package-10d9n-v3.png`

Create a photorealistic travel image for "Char Dham Yatra Package" — 10-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/uttarakhand-char-dham-yatra-package-10d9n-v4.png`

Create a photorealistic travel image for "Char Dham Yatra Package" — 10-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/uttarakhand-char-dham-yatra-package-10d9n-v5.png`

Create a photorealistic travel image for "Char Dham Yatra Package" — 10-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/uttarakhand-char-dham-yatra-package-10d9n-v6.png`

Create a photorealistic travel image for "Char Dham Yatra Package" — 10-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/uttarakhand-char-dham-yatra-package-10d9n-v7.png`

Create a photorealistic travel image for "Char Dham Yatra Package" — 10-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/uttarakhand-char-dham-yatra-package-10d9n-v8.png`

Create a photorealistic travel image for "Char Dham Yatra Package" — 10-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/uttarakhand-char-dham-yatra-package-10d9n-v9.png`

Create a photorealistic travel image for "Char Dham Yatra Package" — 10-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/uttarakhand-char-dham-yatra-package-10d9n-v10.png`

Create a photorealistic travel image for "Char Dham Yatra Package" — 10-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Complete Uttarakhand Tour Package
Slug: `uttarakhand-complete-uttarakhand-tour-package-9d8n` | 9D/8N | ₹ 32,999

**v1** → `public/images/packages/uttarakhand-complete-uttarakhand-tour-package-9d8n-v1.png`

Create a photorealistic travel image for "Complete Uttarakhand Tour Package" — 9-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/uttarakhand-complete-uttarakhand-tour-package-9d8n-v2.png`

Create a photorealistic travel image for "Complete Uttarakhand Tour Package" — 9-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/uttarakhand-complete-uttarakhand-tour-package-9d8n-v3.png`

Create a photorealistic travel image for "Complete Uttarakhand Tour Package" — 9-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/uttarakhand-complete-uttarakhand-tour-package-9d8n-v4.png`

Create a photorealistic travel image for "Complete Uttarakhand Tour Package" — 9-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/uttarakhand-complete-uttarakhand-tour-package-9d8n-v5.png`

Create a photorealistic travel image for "Complete Uttarakhand Tour Package" — 9-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/uttarakhand-complete-uttarakhand-tour-package-9d8n-v6.png`

Create a photorealistic travel image for "Complete Uttarakhand Tour Package" — 9-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/uttarakhand-complete-uttarakhand-tour-package-9d8n-v7.png`

Create a photorealistic travel image for "Complete Uttarakhand Tour Package" — 9-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/uttarakhand-complete-uttarakhand-tour-package-9d8n-v8.png`

Create a photorealistic travel image for "Complete Uttarakhand Tour Package" — 9-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/uttarakhand-complete-uttarakhand-tour-package-9d8n-v9.png`

Create a photorealistic travel image for "Complete Uttarakhand Tour Package" — 9-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/uttarakhand-complete-uttarakhand-tour-package-9d8n-v10.png`

Create a photorealistic travel image for "Complete Uttarakhand Tour Package" — 9-day Uttarakhand holiday package, India. Scene: scenic highlights of Himalayan spirituality, Rishikesh, hill stations. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.


### West Bengal (9 packages)

#### Jagannath & Kolkata Heritage Tour
Slug: `west-bengal-jagannath-kolkata-heritage-tour-6d5n` | 6D/5N | ₹ 19,999

**v1** → `public/images/packages/west-bengal-jagannath-kolkata-heritage-tour-6d5n-v1.png`

Create a photorealistic travel image for "Jagannath & Kolkata Heritage Tour" — 6-day West Bengal holiday package, India. Scene: heritage circuit Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/west-bengal-jagannath-kolkata-heritage-tour-6d5n-v2.png`

Create a photorealistic travel image for "Jagannath & Kolkata Heritage Tour" — 6-day West Bengal holiday package, India. Scene: heritage circuit Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/west-bengal-jagannath-kolkata-heritage-tour-6d5n-v3.png`

Create a photorealistic travel image for "Jagannath & Kolkata Heritage Tour" — 6-day West Bengal holiday package, India. Scene: heritage circuit Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/west-bengal-jagannath-kolkata-heritage-tour-6d5n-v4.png`

Create a photorealistic travel image for "Jagannath & Kolkata Heritage Tour" — 6-day West Bengal holiday package, India. Scene: heritage circuit Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/west-bengal-jagannath-kolkata-heritage-tour-6d5n-v5.png`

Create a photorealistic travel image for "Jagannath & Kolkata Heritage Tour" — 6-day West Bengal holiday package, India. Scene: heritage circuit Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/west-bengal-jagannath-kolkata-heritage-tour-6d5n-v6.png`

Create a photorealistic travel image for "Jagannath & Kolkata Heritage Tour" — 6-day West Bengal holiday package, India. Scene: heritage circuit Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/west-bengal-jagannath-kolkata-heritage-tour-6d5n-v7.png`

Create a photorealistic travel image for "Jagannath & Kolkata Heritage Tour" — 6-day West Bengal holiday package, India. Scene: heritage circuit Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/west-bengal-jagannath-kolkata-heritage-tour-6d5n-v8.png`

Create a photorealistic travel image for "Jagannath & Kolkata Heritage Tour" — 6-day West Bengal holiday package, India. Scene: heritage circuit Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/west-bengal-jagannath-kolkata-heritage-tour-6d5n-v9.png`

Create a photorealistic travel image for "Jagannath & Kolkata Heritage Tour" — 6-day West Bengal holiday package, India. Scene: heritage circuit Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/west-bengal-jagannath-kolkata-heritage-tour-6d5n-v10.png`

Create a photorealistic travel image for "Jagannath & Kolkata Heritage Tour" — 6-day West Bengal holiday package, India. Scene: heritage circuit Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Odisha & Sundarbans Wildlife Tour
Slug: `west-bengal-odisha-sundarbans-wildlife-tour-7d6n` | 7D/6N | ₹ 24,999

**v1** → `public/images/packages/west-bengal-odisha-sundarbans-wildlife-tour-7d6n-v1.png`

Create a photorealistic travel image for "Odisha & Sundarbans Wildlife Tour" — 7-day West Bengal holiday package, India. Scene: wildlife safari Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/west-bengal-odisha-sundarbans-wildlife-tour-7d6n-v2.png`

Create a photorealistic travel image for "Odisha & Sundarbans Wildlife Tour" — 7-day West Bengal holiday package, India. Scene: wildlife safari Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/west-bengal-odisha-sundarbans-wildlife-tour-7d6n-v3.png`

Create a photorealistic travel image for "Odisha & Sundarbans Wildlife Tour" — 7-day West Bengal holiday package, India. Scene: wildlife safari Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/west-bengal-odisha-sundarbans-wildlife-tour-7d6n-v4.png`

Create a photorealistic travel image for "Odisha & Sundarbans Wildlife Tour" — 7-day West Bengal holiday package, India. Scene: wildlife safari Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/west-bengal-odisha-sundarbans-wildlife-tour-7d6n-v5.png`

Create a photorealistic travel image for "Odisha & Sundarbans Wildlife Tour" — 7-day West Bengal holiday package, India. Scene: wildlife safari Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/west-bengal-odisha-sundarbans-wildlife-tour-7d6n-v6.png`

Create a photorealistic travel image for "Odisha & Sundarbans Wildlife Tour" — 7-day West Bengal holiday package, India. Scene: wildlife safari Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/west-bengal-odisha-sundarbans-wildlife-tour-7d6n-v7.png`

Create a photorealistic travel image for "Odisha & Sundarbans Wildlife Tour" — 7-day West Bengal holiday package, India. Scene: wildlife safari Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/west-bengal-odisha-sundarbans-wildlife-tour-7d6n-v8.png`

Create a photorealistic travel image for "Odisha & Sundarbans Wildlife Tour" — 7-day West Bengal holiday package, India. Scene: wildlife safari Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/west-bengal-odisha-sundarbans-wildlife-tour-7d6n-v9.png`

Create a photorealistic travel image for "Odisha & Sundarbans Wildlife Tour" — 7-day West Bengal holiday package, India. Scene: wildlife safari Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/west-bengal-odisha-sundarbans-wildlife-tour-7d6n-v10.png`

Create a photorealistic travel image for "Odisha & Sundarbans Wildlife Tour" — 7-day West Bengal holiday package, India. Scene: wildlife safari Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Odisha & Darjeeling Explorer ⭐ Premium
Slug: `west-bengal-odisha-darjeeling-explorer-premium-9d8n` | 9D/8N | ₹ 34,999

**v1** → `public/images/packages/west-bengal-odisha-darjeeling-explorer-premium-9d8n-v1.png`

Create a photorealistic travel image for "Odisha & Darjeeling Explorer ⭐ Premium" — 9-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/west-bengal-odisha-darjeeling-explorer-premium-9d8n-v2.png`

Create a photorealistic travel image for "Odisha & Darjeeling Explorer ⭐ Premium" — 9-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/west-bengal-odisha-darjeeling-explorer-premium-9d8n-v3.png`

Create a photorealistic travel image for "Odisha & Darjeeling Explorer ⭐ Premium" — 9-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/west-bengal-odisha-darjeeling-explorer-premium-9d8n-v4.png`

Create a photorealistic travel image for "Odisha & Darjeeling Explorer ⭐ Premium" — 9-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/west-bengal-odisha-darjeeling-explorer-premium-9d8n-v5.png`

Create a photorealistic travel image for "Odisha & Darjeeling Explorer ⭐ Premium" — 9-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/west-bengal-odisha-darjeeling-explorer-premium-9d8n-v6.png`

Create a photorealistic travel image for "Odisha & Darjeeling Explorer ⭐ Premium" — 9-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/west-bengal-odisha-darjeeling-explorer-premium-9d8n-v7.png`

Create a photorealistic travel image for "Odisha & Darjeeling Explorer ⭐ Premium" — 9-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/west-bengal-odisha-darjeeling-explorer-premium-9d8n-v8.png`

Create a photorealistic travel image for "Odisha & Darjeeling Explorer ⭐ Premium" — 9-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/west-bengal-odisha-darjeeling-explorer-premium-9d8n-v9.png`

Create a photorealistic travel image for "Odisha & Darjeeling Explorer ⭐ Premium" — 9-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/west-bengal-odisha-darjeeling-explorer-premium-9d8n-v10.png`

Create a photorealistic travel image for "Odisha & Darjeeling Explorer ⭐ Premium" — 9-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Darjeeling Himalayan Escape
Slug: `west-bengal-darjeeling-himalayan-escape-5d4n` | 5D/4N | ₹ 18,999

**v1** → `public/images/packages/west-bengal-darjeeling-himalayan-escape-5d4n-v1.png`

Create a photorealistic travel image for "Darjeeling Himalayan Escape" — 5-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/west-bengal-darjeeling-himalayan-escape-5d4n-v2.png`

Create a photorealistic travel image for "Darjeeling Himalayan Escape" — 5-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/west-bengal-darjeeling-himalayan-escape-5d4n-v3.png`

Create a photorealistic travel image for "Darjeeling Himalayan Escape" — 5-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/west-bengal-darjeeling-himalayan-escape-5d4n-v4.png`

Create a photorealistic travel image for "Darjeeling Himalayan Escape" — 5-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/west-bengal-darjeeling-himalayan-escape-5d4n-v5.png`

Create a photorealistic travel image for "Darjeeling Himalayan Escape" — 5-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/west-bengal-darjeeling-himalayan-escape-5d4n-v6.png`

Create a photorealistic travel image for "Darjeeling Himalayan Escape" — 5-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/west-bengal-darjeeling-himalayan-escape-5d4n-v7.png`

Create a photorealistic travel image for "Darjeeling Himalayan Escape" — 5-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/west-bengal-darjeeling-himalayan-escape-5d4n-v8.png`

Create a photorealistic travel image for "Darjeeling Himalayan Escape" — 5-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/west-bengal-darjeeling-himalayan-escape-5d4n-v9.png`

Create a photorealistic travel image for "Darjeeling Himalayan Escape" — 5-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/west-bengal-darjeeling-himalayan-escape-5d4n-v10.png`

Create a photorealistic travel image for "Darjeeling Himalayan Escape" — 5-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Dooars Wildlife & Tea Garden Tour
Slug: `west-bengal-dooars-wildlife-tea-garden-tour-6d5n` | 6D/5N | ₹ 21,999

**v1** → `public/images/packages/west-bengal-dooars-wildlife-tea-garden-tour-6d5n-v1.png`

Create a photorealistic travel image for "Dooars Wildlife & Tea Garden Tour" — 6-day West Bengal holiday package, India. Scene: wildlife safari Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/west-bengal-dooars-wildlife-tea-garden-tour-6d5n-v2.png`

Create a photorealistic travel image for "Dooars Wildlife & Tea Garden Tour" — 6-day West Bengal holiday package, India. Scene: wildlife safari Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/west-bengal-dooars-wildlife-tea-garden-tour-6d5n-v3.png`

Create a photorealistic travel image for "Dooars Wildlife & Tea Garden Tour" — 6-day West Bengal holiday package, India. Scene: wildlife safari Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/west-bengal-dooars-wildlife-tea-garden-tour-6d5n-v4.png`

Create a photorealistic travel image for "Dooars Wildlife & Tea Garden Tour" — 6-day West Bengal holiday package, India. Scene: wildlife safari Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/west-bengal-dooars-wildlife-tea-garden-tour-6d5n-v5.png`

Create a photorealistic travel image for "Dooars Wildlife & Tea Garden Tour" — 6-day West Bengal holiday package, India. Scene: wildlife safari Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/west-bengal-dooars-wildlife-tea-garden-tour-6d5n-v6.png`

Create a photorealistic travel image for "Dooars Wildlife & Tea Garden Tour" — 6-day West Bengal holiday package, India. Scene: wildlife safari Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/west-bengal-dooars-wildlife-tea-garden-tour-6d5n-v7.png`

Create a photorealistic travel image for "Dooars Wildlife & Tea Garden Tour" — 6-day West Bengal holiday package, India. Scene: wildlife safari Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/west-bengal-dooars-wildlife-tea-garden-tour-6d5n-v8.png`

Create a photorealistic travel image for "Dooars Wildlife & Tea Garden Tour" — 6-day West Bengal holiday package, India. Scene: wildlife safari Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/west-bengal-dooars-wildlife-tea-garden-tour-6d5n-v9.png`

Create a photorealistic travel image for "Dooars Wildlife & Tea Garden Tour" — 6-day West Bengal holiday package, India. Scene: wildlife safari Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/west-bengal-dooars-wildlife-tea-garden-tour-6d5n-v10.png`

Create a photorealistic travel image for "Dooars Wildlife & Tea Garden Tour" — 6-day West Bengal holiday package, India. Scene: wildlife safari Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Kolkata – Digha Coastal Holiday
Slug: `west-bengal-kolkata-digha-coastal-holiday-5d4n` | 5D/4N | ₹ 18,499

**v1** → `public/images/packages/west-bengal-kolkata-digha-coastal-holiday-5d4n-v1.png`

Create a photorealistic travel image for "Kolkata – Digha Coastal Holiday" — 5-day West Bengal holiday package, India. Scene: coastal beaches Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/west-bengal-kolkata-digha-coastal-holiday-5d4n-v2.png`

Create a photorealistic travel image for "Kolkata – Digha Coastal Holiday" — 5-day West Bengal holiday package, India. Scene: coastal beaches Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/west-bengal-kolkata-digha-coastal-holiday-5d4n-v3.png`

Create a photorealistic travel image for "Kolkata – Digha Coastal Holiday" — 5-day West Bengal holiday package, India. Scene: coastal beaches Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/west-bengal-kolkata-digha-coastal-holiday-5d4n-v4.png`

Create a photorealistic travel image for "Kolkata – Digha Coastal Holiday" — 5-day West Bengal holiday package, India. Scene: coastal beaches Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/west-bengal-kolkata-digha-coastal-holiday-5d4n-v5.png`

Create a photorealistic travel image for "Kolkata – Digha Coastal Holiday" — 5-day West Bengal holiday package, India. Scene: coastal beaches Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/west-bengal-kolkata-digha-coastal-holiday-5d4n-v6.png`

Create a photorealistic travel image for "Kolkata – Digha Coastal Holiday" — 5-day West Bengal holiday package, India. Scene: coastal beaches Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/west-bengal-kolkata-digha-coastal-holiday-5d4n-v7.png`

Create a photorealistic travel image for "Kolkata – Digha Coastal Holiday" — 5-day West Bengal holiday package, India. Scene: coastal beaches Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/west-bengal-kolkata-digha-coastal-holiday-5d4n-v8.png`

Create a photorealistic travel image for "Kolkata – Digha Coastal Holiday" — 5-day West Bengal holiday package, India. Scene: coastal beaches Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/west-bengal-kolkata-digha-coastal-holiday-5d4n-v9.png`

Create a photorealistic travel image for "Kolkata – Digha Coastal Holiday" — 5-day West Bengal holiday package, India. Scene: coastal beaches Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/west-bengal-kolkata-digha-coastal-holiday-5d4n-v10.png`

Create a photorealistic travel image for "Kolkata – Digha Coastal Holiday" — 5-day West Bengal holiday package, India. Scene: coastal beaches Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Kolkata – Shantiniketan Cultural Journey
Slug: `west-bengal-kolkata-shantiniketan-cultural-journey-5d4n` | 5D/4N | ₹ 19,999

**v1** → `public/images/packages/west-bengal-kolkata-shantiniketan-cultural-journey-5d4n-v1.png`

Create a photorealistic travel image for "Kolkata – Shantiniketan Cultural Journey" — 5-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/west-bengal-kolkata-shantiniketan-cultural-journey-5d4n-v2.png`

Create a photorealistic travel image for "Kolkata – Shantiniketan Cultural Journey" — 5-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/west-bengal-kolkata-shantiniketan-cultural-journey-5d4n-v3.png`

Create a photorealistic travel image for "Kolkata – Shantiniketan Cultural Journey" — 5-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/west-bengal-kolkata-shantiniketan-cultural-journey-5d4n-v4.png`

Create a photorealistic travel image for "Kolkata – Shantiniketan Cultural Journey" — 5-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/west-bengal-kolkata-shantiniketan-cultural-journey-5d4n-v5.png`

Create a photorealistic travel image for "Kolkata – Shantiniketan Cultural Journey" — 5-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/west-bengal-kolkata-shantiniketan-cultural-journey-5d4n-v6.png`

Create a photorealistic travel image for "Kolkata – Shantiniketan Cultural Journey" — 5-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/west-bengal-kolkata-shantiniketan-cultural-journey-5d4n-v7.png`

Create a photorealistic travel image for "Kolkata – Shantiniketan Cultural Journey" — 5-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/west-bengal-kolkata-shantiniketan-cultural-journey-5d4n-v8.png`

Create a photorealistic travel image for "Kolkata – Shantiniketan Cultural Journey" — 5-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/west-bengal-kolkata-shantiniketan-cultural-journey-5d4n-v9.png`

Create a photorealistic travel image for "Kolkata – Shantiniketan Cultural Journey" — 5-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/west-bengal-kolkata-shantiniketan-cultural-journey-5d4n-v10.png`

Create a photorealistic travel image for "Kolkata – Shantiniketan Cultural Journey" — 5-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### Complete North Bengal Explorer
Slug: `west-bengal-complete-north-bengal-explorer-8d7n` | 8D/7N | ₹ 29,999

**v1** → `public/images/packages/west-bengal-complete-north-bengal-explorer-8d7n-v1.png`

Create a photorealistic travel image for "Complete North Bengal Explorer" — 8-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/west-bengal-complete-north-bengal-explorer-8d7n-v2.png`

Create a photorealistic travel image for "Complete North Bengal Explorer" — 8-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/west-bengal-complete-north-bengal-explorer-8d7n-v3.png`

Create a photorealistic travel image for "Complete North Bengal Explorer" — 8-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/west-bengal-complete-north-bengal-explorer-8d7n-v4.png`

Create a photorealistic travel image for "Complete North Bengal Explorer" — 8-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/west-bengal-complete-north-bengal-explorer-8d7n-v5.png`

Create a photorealistic travel image for "Complete North Bengal Explorer" — 8-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/west-bengal-complete-north-bengal-explorer-8d7n-v6.png`

Create a photorealistic travel image for "Complete North Bengal Explorer" — 8-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/west-bengal-complete-north-bengal-explorer-8d7n-v7.png`

Create a photorealistic travel image for "Complete North Bengal Explorer" — 8-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/west-bengal-complete-north-bengal-explorer-8d7n-v8.png`

Create a photorealistic travel image for "Complete North Bengal Explorer" — 8-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/west-bengal-complete-north-bengal-explorer-8d7n-v9.png`

Create a photorealistic travel image for "Complete North Bengal Explorer" — 8-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/west-bengal-complete-north-bengal-explorer-8d7n-v10.png`

Create a photorealistic travel image for "Complete North Bengal Explorer" — 8-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

#### ⭐ Grand West Bengal Explorer (Premium)
Slug: `west-bengal-grand-west-bengal-explorer-premium-10d9n` | 10D/9N | ₹ 39,999

**v1** → `public/images/packages/west-bengal-grand-west-bengal-explorer-premium-10d9n-v1.png`

Create a photorealistic travel image for "⭐ Grand West Bengal Explorer (Premium)" — 10-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Wide cinematic golden-hour landscape, premium travel brochure. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v2** → `public/images/packages/west-bengal-grand-west-bengal-explorer-premium-10d9n-v2.png`

Create a photorealistic travel image for "⭐ Grand West Bengal Explorer (Premium)" — 10-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Bright daylight vibrant colors, inviting family-friendly mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v3** → `public/images/packages/west-bengal-grand-west-bengal-explorer-premium-10d9n-v3.png`

Create a photorealistic travel image for "⭐ Grand West Bengal Explorer (Premium)" — 10-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Soft morning mist, peaceful serene atmosphere. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v4** → `public/images/packages/west-bengal-grand-west-bengal-explorer-premium-10d9n-v4.png`

Create a photorealistic travel image for "⭐ Grand West Bengal Explorer (Premium)" — 10-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Dramatic sunset warm orange-pink sky, romantic mood. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v5** → `public/images/packages/west-bengal-grand-west-bengal-explorer-premium-10d9n-v5.png`

Create a photorealistic travel image for "⭐ Grand West Bengal Explorer (Premium)" — 10-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Aerial drone bird's-eye view, epic panoramic scale. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v6** → `public/images/packages/west-bengal-grand-west-bengal-explorer-premium-10d9n-v6.png`

Create a photorealistic travel image for "⭐ Grand West Bengal Explorer (Premium)" — 10-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Close-up iconic landmark detail, shallow depth of field. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v7** → `public/images/packages/west-bengal-grand-west-bengal-explorer-premium-10d9n-v7.png`

Create a photorealistic travel image for "⭐ Grand West Bengal Explorer (Premium)" — 10-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Cultural heritage focus — temples, forts, or local architecture. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v8** → `public/images/packages/west-bengal-grand-west-bengal-explorer-premium-10d9n-v8.png`

Create a photorealistic travel image for "⭐ Grand West Bengal Explorer (Premium)" — 10-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Nature adventure — mountains, forests, rivers, wildlife hints. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v9** → `public/images/packages/west-bengal-grand-west-bengal-explorer-premium-10d9n-v9.png`

Create a photorealistic travel image for "⭐ Grand West Bengal Explorer (Premium)" — 10-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Coastal or lakeside calm water reflection composition. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

**v10** → `public/images/packages/west-bengal-grand-west-bengal-explorer-premium-10d9n-v10.png`

Create a photorealistic travel image for "⭐ Grand West Bengal Explorer (Premium)" — 10-day West Bengal holiday package, India. Scene: scenic highlights of Darjeeling tea gardens, Sundarbans, Kolkata heritage. Style: Clean package-card thumbnail — subject centered, minimal clutter. YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark. Technical: 3:2 landscape 1200×800.

