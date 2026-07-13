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
    name: 'Phong Cách Học Đường Nguyệt Dạ 🌙',
    shortName: 'Nguyệt Dạ',
    tagline: 'Bản sắc bóng đêm huyền bí',
    description: 'Giữ chất cyber neon tối huyền bí, độ tương phản cao giúp tăng sự tập trung.',
    mood: 'Bóng đêm, công nghệ, huyền ảo',
    iconSet: ['🌙', '⚡', '✨'],
    accentLabel: 'Cyber Neon Cyan + Magenta',
    fontLabel: 'Be Vietnam Pro, dễ đọc'
  },
  {
    id: 'cute-pink-pastel',
    name: 'Phong Cách Học Đường Đào Hoa 🌸',
    shortName: 'Đào Hoa',
    tagline: 'Bản sắc đào hoa ngọt ngào',
    description: 'Tông màu hồng đào, tím pastel nhẹ nhàng và kem sữa êm ái.',
    mood: 'Ngọt ngào, đáng yêu, ấm áp',
    iconSet: ['🌸', '🎀', '🐰'],
    accentLabel: 'Hồng đào pastel + tím sữa',
    fontLabel: 'Be Vietnam Pro, bo tròn',
    recommended: true
  },
  {
    id: 'space-adventure',
    name: 'Phong Cách Học Đường Tinh Không ⭐',
    shortName: 'Tinh Không',
    tagline: 'Bản sắc tinh tú ngân hà',
    description: 'Tông xanh tím vũ trụ sâu thẳm rõ chữ, khơi gợi đam mê du hành khám phá.',
    mood: 'Du hành, ngân hà, bao la',
    iconSet: ['⭐', '🚀', '🪐'],
    accentLabel: 'Sky navy + lavender + cyan',
    fontLabel: 'Lexend, chắc chữ'
  },
  {
    id: 'fantasy-forest',
    name: 'Phong Cách Học Đường Trúc Lâm 🎋',
    shortName: 'Trúc Lâm',
    tagline: 'Bản sắc tre xanh mát mắt',
    description: 'Tông tre trúc xanh tươi thanh tịnh, đem lại cảm giác tự nhiên yên bình.',
    mood: 'Tre xanh, thiên nhiên, thanh tịnh',
    iconSet: ['🎋', '🌳', '🦊'],
    accentLabel: 'Xanh tre trúc + vàng đất',
    fontLabel: 'Be Vietnam Pro, dịu chữ'
  },
  {
    id: 'pixel-arcade',
    name: 'Phong Cách Học Đường Thu Phong 🍁',
    shortName: 'Thu Phong',
    tagline: 'Bản sắc mùa thu hoài cổ',
    description: 'Màu cam đất hoài niệm, tạo tiết tấu luyện chữ và học tập vững chãi.',
    mood: 'Hoài cổ, tĩnh lặng, ấm áp',
    iconSet: ['🍁', '🪙', '💎'],
    accentLabel: 'Cam mùa thu + nâu đất',
    fontLabel: 'Lexend, rõ chữ'
  },
  {
    id: 'unicorn-dream',
    name: 'Phong Cách Học Đường Tuyết Sơn ❄️',
    shortName: 'Tuyết Sơn',
    tagline: 'Bản sắc tuyết phủ tinh khiết',
    description: 'Màu trắng tuyết và lam ngọc lấp lánh như sương mai, trong trẻo và thanh khiết.',
    mood: 'Băng giá, tinh khiết, phép màu',
    iconSet: ['❄️', '🦄', '🌈'],
    accentLabel: 'Trắng tuyết + lam ngọc',
    fontLabel: 'Be Vietnam Pro, sáng chữ'
  }
];

export const DEFAULT_UI_THEME: UiThemeId = 'current';

export const getUiTheme = (themeId: UiThemeId) =>
  UI_THEMES.find(theme => theme.id === themeId) ?? UI_THEMES[0];

export const isLightTheme = (themeId: UiThemeId): boolean => {
  return themeId === 'cute-pink-pastel' || themeId === 'fantasy-forest' || themeId === 'unicorn-dream';
};
