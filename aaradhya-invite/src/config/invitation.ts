/**
 * ─────────────────────────────────────────────────────────────
 *  INVITATION CONFIG — the only file you need to edit per client
 * ─────────────────────────────────────────────────────────────
 *  • Dates use ISO 8601 with the +05:30 offset (Asia/Kolkata).
 *  • Photos: put files in /public/photos and set `src: '/photos/name.jpg'`.
 *    Leave `src: null` to show the built-in illustrated placeholder.
 *  • Optional fields can be set to null / empty — sections adapt.
 */

import type { ThemeName } from './themes';

export type InvitationMode = 'newborn' | 'babyShower';
export type BabyGender = 'girl' | 'boy' | 'unknown';
export type PlaceholderKind =
  | 'baby' | 'closeup' | 'sleeping' | 'parents' | 'family' | 'parentsBaby' | 'venue' | 'maternity';

export interface Photo {
  src: string | null;
  alt: string;
  /** CSS object-position, e.g. '50% 30%' to keep a face in frame */
  focus?: string;
  placeholder: PlaceholderKind;
}

export interface FamilyMember {
  relation: string; // e.g. 'नाना जी'
  name: string;
}

export interface InvitationConfig {
  invitationMode: InvitationMode;
  theme: ThemeName;

  babyName: string | null; // not required for babyShower
  babyGender: BabyGender;
  babyBirthDate: string | null; // 'YYYY-MM-DD'
  birthTime: string | null; // free text, e.g. 'सुबह 6:42 बजे'
  birthWeight: string | null; // e.g. '3.2 किलोग्राम'
  birthPlace: string | null;
  /** babyShower mode only — expected month, e.g. '2027-02' */
  dueMonth: string | null;

  eventName: string | null; // null = automatic name for the mode
  eventDateTime: string; // ISO with offset
  eventEndDateTime: string; // used for calendar + "completed" state
  timezone: string;

  fatherName: string;
  motherName: string;
  grandfatherName: string | null;
  grandmotherName: string | null;
  familyMembers: FamilyMember[];
  familySurname: string; // 'शर्मा' → "शर्मा परिवार की ओर से…"

  venue: {
    name: string;
    addressLines: string[];
    /** Text sent to Google Maps. Use the full postal address or a Plus Code. */
    mapsQuery: string;
    /** Optional exact Google Maps link (overrides mapsQuery for the "view" buttons) */
    mapsUrl: string | null;
    /** Optional Google Maps embed URL (Share → Embed a map → copy src). Leave null for the illustrated map card. */
    mapEmbedUrl: string | null;
    photo: Photo;
  };

  heroPhoto: Photo;
  revealPhotos: Photo[]; // 2–4 photos for the gift-box reveal
  babyGallery: Photo[];
  parentsPhoto: Photo;
  familyPhoto: Photo | null;

  /** Properly licensed audio file, e.g. '/audio/lullaby.mp3'. null = no music control. */
  music: { src: string | null; title: string };

  /** Shows a small "फ़ोटो" tag on illustrated placeholders so clients know what to replace. */
  showPlaceholderBadge: boolean;
}

export const invitation: InvitationConfig = {
  invitationMode: 'newborn',
  theme: 'dreamyBlush',

  babyName: 'आराध्या शर्मा',
  babyGender: 'girl',
  babyBirthDate: '2026-11-15',
  birthTime: null,
  birthWeight: null,
  birthPlace: null,
  dueMonth: null,

  eventName: null,
  eventDateTime: '2026-12-20T17:00:00+05:30',
  eventEndDateTime: '2026-12-20T22:00:00+05:30',
  timezone: 'Asia/Kolkata',

  fatherName: 'श्री रोहित शर्मा',
  motherName: 'श्रीमती नेहा शर्मा',
  grandfatherName: 'श्री राजेंद्र शर्मा',
  grandmotherName: 'श्रीमती सुनीता शर्मा',
  // Example: { relation: 'नाना जी', name: 'श्री …' }
  familyMembers: [],
  familySurname: 'शर्मा',

  venue: {
    name: 'Royal Celebration Garden',
    addressLines: ['Jaipur, Rajasthan'],
    mapsQuery: 'Royal Celebration Garden, Jaipur, Rajasthan',
    mapsUrl: null,
    mapEmbedUrl: null,
    photo: { src: null, alt: 'रॉयल सेलिब्रेशन गार्डन का सजा हुआ प्रांगण', placeholder: 'venue' },
  },

  heroPhoto: { src: null, alt: 'नन्ही आराध्या की मुस्कुराती तस्वीर', placeholder: 'baby' },
  revealPhotos: [
    { src: null, alt: 'नन्ही आराध्या का मासूम चेहरा', placeholder: 'closeup' },
    { src: null, alt: 'नींद में मुस्कुराती आराध्या', placeholder: 'sleeping' },
    { src: null, alt: 'मम्मी-पापा की गोद में आराध्या', placeholder: 'parentsBaby' },
  ],
  babyGallery: [
    { src: null, alt: 'आराध्या की पहली तस्वीर', placeholder: 'baby' },
    { src: null, alt: 'चैन की नींद सोती नन्ही आराध्या', placeholder: 'sleeping' },
    { src: null, alt: 'आराध्या का नज़दीक से लिया गया प्यारा चेहरा', placeholder: 'closeup' },
    { src: null, alt: 'पूरे शर्मा परिवार के साथ आराध्या', placeholder: 'family' },
    { src: null, alt: 'मम्मी-पापा के साथ नन्ही आराध्या', placeholder: 'parentsBaby' },
    { src: null, alt: 'आराध्या के नन्हे पल', placeholder: 'closeup' },
  ],
  parentsPhoto: { src: null, alt: 'रोहित और नेहा शर्मा की साथ में तस्वीर', placeholder: 'parents' },
  familyPhoto: { src: null, alt: 'शर्मा परिवार की पारिवारिक तस्वीर', placeholder: 'family' },

  music: { src: null, title: 'लोरी' },

  showPlaceholderBadge: true,
};
