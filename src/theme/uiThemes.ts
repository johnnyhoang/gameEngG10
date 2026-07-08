import type { UiThemeId } from '../types/game';

export interface UiThemeConfig {
  id: UiThemeId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  mood: string;
  iconSet: string[];
  accentLabel: string;
  fontLabel: string;
  recommended?: boolean;
}

export const UI_THEMES: UiThemeConfig[] = [
  {
    id: 'current',
    name: 'Cyber Neon',
    shortName: 'Cyber',
    tagline: 'Phong cách hiện tại',
    description: 'Giữ chất cyber neon gốc nhưng gọn chữ, dễ đọc và vẫn đủ lực.',
    mood: 'Sáng, gọn, công nghệ',
    iconSet: ['⚡', '🎛️', '✨'],
    accentLabel: 'Cyan + Magenta',
    fontLabel: 'Be Vietnam Pro, dễ đọc'
  },
  {
    id: 'cute-pink-pastel',
    name: 'Cute Pink Pastel',
    shortName: 'Cute Pink',
    tagline: 'Style MIKAWAII đáng yêu nhất',
    description: 'Hồng pastel, tím nhạt, trắng kem. Nhẹ, mềm, không nhòe chữ.',
    mood: 'Mềm, sáng, đáng yêu',
    iconSet: ['🌸', '🎀', '🐰'],
    accentLabel: 'Hồng pastel + tím sữa',
    fontLabel: 'Be Vietnam Pro, bo tròn',
    recommended: true
  },
  {
    id: 'space-adventure',
    name: 'Space Adventure',
    shortName: 'Space',
    tagline: 'Vũ trụ nhẹ và mơ',
    description: 'Tông xanh tím thoáng hơn, rõ chữ, vẫn giữ cảm giác du hành.',
    mood: 'Khám phá, phiêu lưu, hiện đại',
    iconSet: ['🚀', '🪐', '🤖'],
    accentLabel: 'Sky navy + lavender + cyan nhẹ',
    fontLabel: 'Lexend, chắc chữ'
  },
  {
    id: 'fantasy-forest',
    name: 'Fantasy Forest',
    shortName: 'Forest',
    tagline: 'Rừng cổ tích xanh mát',
    description: 'Xanh lá, vàng nhạt, nâu. Mềm mắt nhưng vẫn rõ nét.',
    mood: 'Thiên nhiên, ấm áp, cổ tích',
    iconSet: ['🌳', '🍄', '🦊'],
    accentLabel: 'Xanh lá + vàng kem',
    fontLabel: 'Be Vietnam Pro, êm chữ'
  },
  {
    id: 'pixel-arcade',
    name: 'Pixel Arcade',
    shortName: 'Pixel',
    tagline: 'Game hóa mạnh kiểu 8-bit',
    description: 'Xanh lá, xanh dương, cam. Chữ phải rõ trước, hiệu ứng tính sau.',
    mood: 'Retro game, năng lượng, vui',
    iconSet: ['🟩', '🪙', '💎'],
    accentLabel: '8-bit green + blue + orange',
    fontLabel: 'Lexend, rõ chữ'
  },
  {
    id: 'unicorn-dream',
    name: 'Unicorn Dream',
    shortName: 'Unicorn',
    tagline: 'Thế giới thần tiên tri thức',
    description: 'Không gian mềm mại, trong trẻo và rõ nét để khám phá tri thức mỗi ngày.',
    mood: 'Mơ mộng, phép màu, ấm áp',
    iconSet: ['🦄', '🌈', '✨'],
    accentLabel: 'Lilac + pearl pink + mint',
    fontLabel: 'Be Vietnam Pro, sáng chữ'
  }
];

export const DEFAULT_UI_THEME: UiThemeId = 'current';

export const getUiTheme = (themeId: UiThemeId) =>
  UI_THEMES.find(theme => theme.id === themeId) ?? UI_THEMES[0];
