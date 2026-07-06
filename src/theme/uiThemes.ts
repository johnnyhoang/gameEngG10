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
    name: 'Hiện tại',
    shortName: 'Current',
    tagline: 'Cyber neon đang dùng',
    description: 'Giữ phong cách cyber hiện tại với cảm giác game hóa rõ nét, sáng và mạnh.',
    mood: 'Neon, hiện đại, công nghệ',
    iconSet: ['⚡', '🎛️', '✨'],
    accentLabel: 'Cyan + Magenta',
    fontLabel: 'Orbitron + Inter'
  },
  {
    id: 'cute-pink-pastel',
    name: 'Cute Pink Pastel',
    shortName: 'Cute Pink',
    tagline: 'Style MIKAWAII đáng yêu nhất',
    description: 'Hồng pastel, tím nhạt, trắng kem. Nhẹ nhàng, mềm mại, nhiều bong bóng và lấp lánh.',
    mood: 'Nữ tính, đáng yêu, ngọt ngào',
    iconSet: ['🌸', '🎀', '🐰'],
    accentLabel: 'Hồng pastel + tím sữa',
    fontLabel: 'Rounded display',
    recommended: true
  },
  {
    id: 'space-adventure',
    name: 'Space Adventure',
    shortName: 'Space',
    tagline: 'Phiêu lưu cùng vũ trụ',
    description: 'Navy, tím, cyan với cảm giác tàu vũ trụ, sao băng, robot và phi hành gia.',
    mood: 'Khám phá, khoa học, phiêu lưu',
    iconSet: ['🚀', '🪐', '🤖'],
    accentLabel: 'Navy + cyan + tím',
    fontLabel: 'Sharp futuristic'
  },
  {
    id: 'fantasy-forest',
    name: 'Fantasy Forest',
    shortName: 'Forest',
    tagline: 'Rừng cổ tích xanh mát',
    description: 'Xanh lá, vàng nhạt, nâu. Lá rơi, đom đóm, cây và sinh vật rừng thân thiện.',
    mood: 'Thiên nhiên, cổ tích, ấm áp',
    iconSet: ['🌳', '🍄', '🦊'],
    accentLabel: 'Xanh lá + vàng kem',
    fontLabel: 'Soft storybook'
  },
  {
    id: 'pixel-arcade',
    name: 'Pixel Arcade',
    shortName: 'Pixel',
    tagline: 'Game hóa mạnh kiểu 8-bit',
    description: 'Xanh lá, xanh dương, cam. Pixel, block, coin và hiệu ứng arcade mạnh tay.',
    mood: 'Retro game, năng lượng, vui nhộn',
    iconSet: ['🟩', '🪙', '💎'],
    accentLabel: '8-bit green + blue + orange',
    fontLabel: 'Pixel display'
  }
];

export const DEFAULT_UI_THEME: UiThemeId = 'current';

export const getUiTheme = (themeId: UiThemeId) =>
  UI_THEMES.find(theme => theme.id === themeId) ?? UI_THEMES[0];
