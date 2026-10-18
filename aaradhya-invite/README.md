# Luxury Baby Invitation — नामकरण / गोद भराई निमंत्रण वेबसाइट

React + TypeScript + Vite + Tailwind CSS v4. Animations are pure CSS (fast on low-end phones), icons are local SVG — no animation or icon libraries needed.

## 1. Local setup

```bash
npm install
npm run dev        # http://localhost:5173
```

Requires Node.js 18+.

## 2. Build & deploy

```bash
npm run build      # output in /dist
npm run preview    # test the production build
npm run typecheck  # optional TypeScript check
```

Deploy the `dist` folder to any static host:

- **Netlify**: drag-and-drop `dist` on app.netlify.com/drop
- **Vercel**: `npx vercel` → framework "Vite"
- **GitHub Pages / Hostinger / cPanel**: upload the contents of `dist`

## 3. Replace demo content with a real client

Everything client-specific lives in **`src/config/invitation.ts`**:

| Field | What to change |
|---|---|
| `invitationMode` | `'newborn'` (नामकरण/स्वागत) or `'babyShower'` (गोद भराई) |
| `babyGender` | `'girl'`, `'boy'` or `'unknown'` — Hindi wording switches (नन्ही परी / नन्हा राजकुमार) |
| `theme` | `dreamyBlush`, `softPinkPrincess`, `royalBabyBlue`, `neutralTeddy`, `mintWonderland` |
| `babyName`, parents, grandparents | Names exactly as they should print |
| `familyMembers` | Extra cards, e.g. `{ relation: 'नाना जी', name: 'श्री …' }` |
| `babyBirthDate` | `'YYYY-MM-DD'` |
| `birthTime`, `birthWeight`, `birthPlace` | Optional — rows appear only when filled |
| `eventDateTime`, `eventEndDateTime` | ISO with `+05:30`, e.g. `'2026-12-20T17:00:00+05:30'` |
| `venue.mapsQuery` | Full address or Plus Code used by all map buttons |
| `venue.mapEmbedUrl` | Optional Google Maps embed `src` (else an illustrated map card is shown) |
| `music.src` | Optional licensed audio, e.g. `'/audio/lullaby.mp3'` (never autoplays) |
| `showPlaceholderBadge` | Set `false` once real photos are in |

### Photos
1. Put images in `public/photos/` (JPG/WebP, ~1600px long side, under 400 KB each).
2. Set `src: '/photos/hero.jpg'` on the matching photo entry.
3. Use `focus: '50% 30%'` to keep a face inside oval/arch crops.

Photos without a `src` (or that fail to load) show an illustrated placeholder automatically.

### Wording
All Hindi copy is generated in `src/config/content.ts` — edit lines there if a family wants different phrasing.

## 4. Structure

```
src/
  config/        invitation.ts (client data) · content.ts (wording) · themes.ts (colours)
  lib/           actions.ts (calendar .ics, Google Calendar, maps, copy, scroll) · date.ts · hooks.ts · context.tsx
  components/    MagicalOpening · BabyHero · BabyPhotoReveal · BirthAnnouncement
                 FamilySections (ParentsIntroduction, FamilyBlessings)
                 Celebration (CelebrationDetails, EventCountdown) · BabyGallery
                 Closing (InvitationMessage, VenueDirections, FinalInvitation) · Chrome (header, calendar sheet, toast, music)
                 ui.tsx (LuxuryButton, PhotoFrame, Reveal, SectionHeading)
                 art/ (door-scene SVGs: teddy, moon, clouds, balloons, ornaments, placeholders, icons)
  index.css      design tokens, layouts, all animations
```

## 5. Behaviour notes
- Opening: tap → seal glows → ribbon separates → 3D doors open → sparkles & light → zoom into the invitation. "इंट्रो छोड़ें" or Esc skips it. Reduced-motion users get a simple fade.
- Countdown uses the configured time zone offset, updates each second, then shows "आज है खुशियों का खास दिन!" during the event and a thank-you message afterwards.
- "कैलेंडर में सेव करें" offers Google Calendar or a downloadable `.ics` (with a 1-day reminder).
- No RSVP, WhatsApp or social buttons, by design.
