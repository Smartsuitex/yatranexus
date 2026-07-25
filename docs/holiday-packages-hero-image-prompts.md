# Holiday Packages — Hero Section Image Prompts

Use these prompts to generate **Hero Section** images for YatraNexus holiday package pages.

## Specs (match website)

| Setting | Value |
|--------|--------|
| Aspect ratio | **21:9** (ultra-wide) |
| Recommended size | **2560 × 1097** (or 1920 × 823) |
| Style | Photorealistic, cinematic travel photography |
| Brand colours | Navy `#2D235F` · Orange `#D86417` |
| Layout | Left ~35% darker for white title text; right scenic destination |
| Avoid | Text, logos, watermarks, UI, stickers, collage, cartoon look, close-up faces |

**Page URLs**

- Destination hero → `/holiday-packages/domestic/{slug}`
- Package hero → `/holiday-packages/package/{package-slug}` (can reuse destination hero or package-specific)

---

## Master prompt (base for every image)

Copy this first, then add the destination-specific line below.

```text
Ultra-wide cinematic travel hero banner for a premium Indian holiday website, 21:9 aspect ratio, 2560x1097. Left third softly darkened with deep navy-purple (#2D235F) gradient for white headline text overlay; right two-thirds bright scenic destination view. Natural golden-hour light, sharp detail, editorial travel magazine look. Photorealistic, high resolution, clean composition with open calm space on the left for typography. No text, no logos, no watermarks, no UI elements, no people faces in close-up.
```

### Short version (ChatGPT / Gemini)

```text
Create a 21:9 ultra-wide holiday website hero image. Photorealistic travel photography, left side darker navy gradient for text overlay, right side scenic landmark, golden hour, no text, no logo, premium tourism brand look. Subject: [DESTINATION SCENE BELOW]
```

---

## Hub / listing heroes

### Holiday packages hub (`/holiday-packages`)

```text
[MASTER PROMPT] + collage-feel single frame (not a grid): India travel mood — Himalayas fading into Kerala backwaters and a Goa beach under one golden sky, premium wanderlust atmosphere, seamless cinematic blend, no text.
```

### Domestic holidays hub (`/holiday-packages/domestic`)

```text
[MASTER PROMPT] + sweeping India domestic travel map mood without map graphics — mountain road, temple silhouette, and palm beach in one cinematic wide frame, warm travel brand lighting, no text.
```

---

## Destination heroes (one per state / region)

### 1. Goa — `goa`

**Page:** `/holiday-packages/domestic/goa`

```text
[MASTER PROMPT] + South Goa beach at sunset — Palolem palms, golden sand, turquoise water, soft waves, calm luxury coastal holiday mood, Portuguese coastal charm in the distance, no text.
```

**Filename suggestion:** `hero-goa-21x9.jpg`

---

### 2. Kerala — `kerala`

**Page:** `/holiday-packages/domestic/kerala`

```text
[MASTER PROMPT] + Kerala backwaters at dawn — traditional houseboat on still water, misty coconut palms, green reflections, serene God's Own Country mood, soft fog, no text.
```

**Filename suggestion:** `hero-kerala-21x9.jpg`

---

### 3. Rajasthan — `rajasthan`

**Page:** `/holiday-packages/domestic/rajasthan`

```text
[MASTER PROMPT] + Rajasthan royal heritage at golden hour — sandstone fort and palace silhouette, desert dunes glow, warm amber light, majestic royal India mood, no text.
```

**Filename suggestion:** `hero-rajasthan-21x9.jpg`

---

### 4. Kashmir — `kashmir`

**Page:** `/holiday-packages/domestic/kashmir`

```text
[MASTER PROMPT] + Dal Lake Srinagar — wooden shikara on calm water, snow peaks in background, autumn poplars, paradise valley mood, soft morning light, no text.
```

**Filename suggestion:** `hero-kashmir-21x9.jpg`

---

### 5. Himachal Pradesh — `himachal`

**Page:** `/holiday-packages/domestic/himachal`

```text
[MASTER PROMPT] + Himachal Himalayan valley — pine forests, snow-capped peaks, mountain viewpoint, crisp blue sky, adventure hill-station mood, no text.
```

**Filename suggestion:** `hero-himachal-21x9.jpg`

---

### 6. Uttarakhand — `uttarakhand`

**Page:** `/holiday-packages/domestic/uttarakhand`

```text
[MASTER PROMPT] + Uttarakhand Himalayas — sacred river valley near Rishikesh or Mussoorie hills, misty forests, temple bells mood without text, spiritual mountain calm, no text.
```

**Filename suggestion:** `hero-uttarakhand-21x9.jpg`

---

### 7. Ladakh — `ladakh`

**Page:** `/holiday-packages/domestic/ladakh`

```text
[MASTER PROMPT] + Ladakh high-altitude landscape — Pangong blue lake, barren mountains, dramatic clouds, adventure Himalayan desert mood, no text.
```

**Filename suggestion:** `hero-ladakh-21x9.jpg`

---

### 8. Andaman Islands — `andaman`

**Page:** `/holiday-packages/domestic/andaman`

```text
[MASTER PROMPT] + Andaman white sand beach — crystal turquoise lagoon, tropical palms, aerial coastal paradise, Havelock island mood, no text.
```

**Filename suggestion:** `hero-andaman-21x9.jpg`

---

### 9. Lakshadweep — `lakshadweep`

**Page:** `/holiday-packages/domestic/lakshadweep`

```text
[MASTER PROMPT] + Lakshadweep coral island — turquoise lagoon, white sand spit, clear shallow reef water from above, untouched tropical paradise, no text.
```

**Filename suggestion:** `hero-lakshadweep-21x9.jpg`

---

### 10. Tamil Nadu — `tamil-nadu`

**Page:** `/holiday-packages/domestic/tamil-nadu`

```text
[MASTER PROMPT] + Tamil Nadu temple gopuram and coastal sunrise — ornate South Indian temple tower, warm stone texture, Mahabalipuram/shore mood, cultural heritage, no text.
```

**Filename suggestion:** `hero-tamil-nadu-21x9.jpg`

---

### 11. Madhya Pradesh — `madhya-pradesh`

**Page:** `/holiday-packages/domestic/madhya-pradesh`

```text
[MASTER PROMPT] + Madhya Pradesh spiritual and wildlife mood — Mahakal temple corridor glow or Kanha forest mist with tiger habitat feel (no animal close-up), Central India heritage, no text.
```

**Filename suggestion:** `hero-madhya-pradesh-21x9.jpg`

---

### 12. Gujarat — `gujarat`

**Page:** `/holiday-packages/domestic/gujarat`

```text
[MASTER PROMPT] + Gujarat White Rann of Kutch at nightfall — white salt desert under purple-orange sky, distant tents glow, cultural festival mood without crowd faces, no text.
```

**Filename suggestion:** `hero-gujarat-21x9.jpg`

---

### 13. Maharashtra — `maharashtra`

**Page:** `/holiday-packages/domestic/maharashtra`

```text
[MASTER PROMPT] + Maharashtra coastal city + hills blend — Gateway of India silhouette at dusk fading into Lonavala green hills, vibrant West India travel mood, no text.
```

**Filename suggestion:** `hero-maharashtra-21x9.jpg`

---

### 14. Uttar Pradesh — `uttar-pradesh`

**Page:** `/holiday-packages/domestic/uttar-pradesh`

```text
[MASTER PROMPT] + Uttar Pradesh spiritual heritage — Varanasi ghats at sunrise with Ganga mist, soft temple silhouettes, sacred India mood, respectful distant people as tiny figures only, no text.
```

**Filename suggestion:** `hero-uttar-pradesh-21x9.jpg`

---

### 15. Odisha — `odisha`

**Page:** `/holiday-packages/domestic/odisha`

```text
[MASTER PROMPT] + Odisha heritage coast — Konark Sun Temple stone wheels in warm light with Puri beach horizon, spiritual East India mood, no text.
```

**Filename suggestion:** `hero-odisha-21x9.jpg`

---

### 16. West Bengal — `west-bengal`

**Page:** `/holiday-packages/domestic/west-bengal`

```text
[MASTER PROMPT] + West Bengal travel mood — Victoria Memorial Kolkata at golden hour blending into Darjeeling tea slopes and Himalayan mist, cultural East India, no text.
```

**Filename suggestion:** `hero-west-bengal-21x9.jpg`

---

### 17. Assam — `assam`

**Page:** `/holiday-packages/domestic/assam`

```text
[MASTER PROMPT] + Assam Kaziranga landscape — tall elephant grass, morning mist, Brahmaputra river light, one-horned rhino habitat mood without close animal portrait, wildlife East India, no text.
```

**Filename suggestion:** `hero-assam-21x9.jpg`

---

### 18. Meghalaya — `meghalaya`

**Page:** `/holiday-packages/domestic/meghalaya`

```text
[MASTER PROMPT] + Meghalaya Abode of Clouds — living root bridge in lush green forest, misty waterfalls, crystal river Dawki blue water mood, no text.
```

**Filename suggestion:** `hero-meghalaya-21x9.jpg`

---

### 19. Sikkim — `sikkim`

**Page:** `/holiday-packages/domestic/sikkim`

```text
[MASTER PROMPT] + Sikkim Eastern Himalaya — Gangtok mountain viewpoint, prayer flags soft motion, snow peaks, alpine lake Tsomgo mood, peaceful monastery landscape, no text.
```

**Filename suggestion:** `hero-sikkim-21x9.jpg`

---

### 20. Arunachal Pradesh — `arunachal-pradesh`

**Page:** `/holiday-packages/domestic/arunachal-pradesh`

```text
[MASTER PROMPT] + Arunachal Pradesh Land of Rising Sun — Tawang monastery on mountain ridge, Sela Pass snow road, pristine valley light, untouched Northeast Himalaya, no text.
```

**Filename suggestion:** `hero-arunachal-21x9.jpg`

---

### 21. North East India — `northeast`

**Page:** `/holiday-packages/domestic/northeast`

```text
[MASTER PROMPT] + North East India grand panorama — cascading green hills, river valley, distant snow peaks and tribal landscape mood, Seven Sisters travel epic, no text.
```

**Filename suggestion:** `hero-northeast-21x9.jpg`

---

## Optional international heroes (if enabled later)

### Dubai — `dubai`

```text
[MASTER PROMPT] + Dubai skyline at dusk — Burj Khalifa and desert safari dune glow in one cinematic frame, luxury Middle East travel, no text.
```

### Bali — `bali`

```text
[MASTER PROMPT] + Bali Ubud rice terraces at sunset fading into Tanah Lot ocean temple silhouette, tropical island of gods mood, no text.
```

---

## Package-level heroes (optional extras)

Use destination hero first. For featured packages, generate a tighter scene:

| Package idea | Extra scene line |
|--------------|------------------|
| Goa honeymoon | Candle-lit beach dinner setup at dusk, empty chairs, romantic coastal luxury, no people |
| Kerala honeymoon | Private houseboat deck at sunset, flower petals, still backwater, no people |
| Rajasthan desert | Luxury desert camp tents under stars, warm lanterns, dunes |
| Ladakh adventure | Motorbike silhouette on Manali–Leh road (tiny figure), epic mountain pass |
| Andaman scuba | Underwater coral reef turquoise clarity, soft light rays, no faces |
| Kashmir houseboat | Wooden houseboat interior window view of Dal Lake |

Template:

```text
[MASTER PROMPT] + [PACKAGE SCENE LINE], matching YatraNexus premium holiday brand, no text.
```

---

## Export & naming checklist

1. Export JPG or WebP, quality 80–90  
2. Name files: `hero-{slug}-21x9.jpg`  
3. Keep left side less busy (for title readability)  
4. After upload, set as destination `image` / package hero in CMS or `site-data`  
5. Prefer landscape subject that works under dark left overlay  

---

## Quick copy list (destination only)

| # | Slug | Filename |
|---|------|----------|
| 1 | goa | `hero-goa-21x9.jpg` |
| 2 | kerala | `hero-kerala-21x9.jpg` |
| 3 | rajasthan | `hero-rajasthan-21x9.jpg` |
| 4 | kashmir | `hero-kashmir-21x9.jpg` |
| 5 | himachal | `hero-himachal-21x9.jpg` |
| 6 | uttarakhand | `hero-uttarakhand-21x9.jpg` |
| 7 | ladakh | `hero-ladakh-21x9.jpg` |
| 8 | andaman | `hero-andaman-21x9.jpg` |
| 9 | lakshadweep | `hero-lakshadweep-21x9.jpg` |
| 10 | tamil-nadu | `hero-tamil-nadu-21x9.jpg` |
| 11 | madhya-pradesh | `hero-madhya-pradesh-21x9.jpg` |
| 12 | gujarat | `hero-gujarat-21x9.jpg` |
| 13 | maharashtra | `hero-maharashtra-21x9.jpg` |
| 14 | uttar-pradesh | `hero-uttar-pradesh-21x9.jpg` |
| 15 | odisha | `hero-odisha-21x9.jpg` |
| 16 | west-bengal | `hero-west-bengal-21x9.jpg` |
| 17 | assam | `hero-assam-21x9.jpg` |
| 18 | meghalaya | `hero-meghalaya-21x9.jpg` |
| 19 | sikkim | `hero-sikkim-21x9.jpg` |
| 20 | arunachal-pradesh | `hero-arunachal-21x9.jpg` |
| 21 | northeast | `hero-northeast-21x9.jpg` |

---

*YatraNexus · Holiday Packages Hero Art Brief*
