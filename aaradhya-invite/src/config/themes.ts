/**
 * Colour themes. Each value becomes a CSS custom property on <html>,
 * so every component, SVG and gradient follows the selected theme.
 */
export type ThemeName =
  | 'dreamyBlush'
  | 'softPinkPrincess'
  | 'royalBabyBlue'
  | 'neutralTeddy'
  | 'mintWonderland';

export interface ThemeTokens {
  ivory: string; // page background
  cream: string; // secondary surfaces
  blush: string; // primary pastel
  blushDeep: string; // stronger pastel for fills
  peach: string;
  lavender: string;
  beige: string;
  gold: string;
  goldLight: string;
  goldDeep: string;
  ink: string; // headings / body text
  inkSoft: string;
  night1: string; // opening sky (top)
  night2: string; // opening sky (middle)
  night3: string; // opening sky (horizon glow)
}

const gold = { gold: '#C29A45', goldLight: '#EBD7A1', goldDeep: '#8E6B25' };

export const themes: Record<ThemeName, ThemeTokens> = {
  dreamyBlush: {
    ivory: '#FFFAF4', cream: '#FBF1E6', blush: '#F7DFE0', blushDeep: '#E8B9BF',
    peach: '#F9DCCB', lavender: '#E7DEF2', beige: '#EBDFCD', ...gold,
    ink: '#4B3940', inkSoft: '#7D6970',
    night1: '#2B2747', night2: '#5A4C78', night3: '#E9B9C0',
  },
  softPinkPrincess: {
    ivory: '#FFF7F8', cream: '#FCEEF1', blush: '#F9D5DE', blushDeep: '#EDA9BB',
    peach: '#FBDDD3', lavender: '#F0DDEE', beige: '#EFDCD8', ...gold,
    ink: '#55303D', inkSoft: '#8A6270',
    night1: '#3A2340', night2: '#7A4A72', night3: '#F2B7C6',
  },
  royalBabyBlue: {
    ivory: '#F8FAFE', cream: '#EEF3FA', blush: '#DCE8F6', blushDeep: '#A9C3E3',
    peach: '#E6EEF8', lavender: '#E1E1F4', beige: '#E5E3DA', ...gold,
    ink: '#28344F', inkSoft: '#5D6A85',
    night1: '#16213F', night2: '#2F4775', night3: '#A9C6EA',
  },
  neutralTeddy: {
    ivory: '#FCF8F2', cream: '#F4EBDD', blush: '#EADCC6', blushDeep: '#D2B996',
    peach: '#F1DECB', lavender: '#E8E1D6', beige: '#E3D3BC', ...gold,
    ink: '#4A3B2E', inkSoft: '#7F6C5A',
    night1: '#2E2620', night2: '#5E4B3C', night3: '#E2C4A1',
  },
  mintWonderland: {
    ivory: '#F8FCF9', cream: '#EDF6F0', blush: '#D6EEE2', blushDeep: '#A6D4BE',
    peach: '#F3E7D6', lavender: '#E2EBEE', beige: '#E3E4D6', ...gold,
    ink: '#2E4038', inkSoft: '#5E7268',
    night1: '#1C3330', night2: '#3C6158', night3: '#B9E0CF',
  },
};

const kebab = (s: string) => s.replace(/[A-Z0-9]/g, (m) => '-' + m.toLowerCase());

export function applyTheme(name: ThemeName) {
  const tokens = themes[name] ?? themes.dreamyBlush;
  const root = document.documentElement;
  (Object.keys(tokens) as (keyof ThemeTokens)[]).forEach((k) => {
    root.style.setProperty(`--${kebab(k)}`, tokens[k]);
  });
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', tokens.night1);
}
