export const TILE_SIZE = 50;

export const GAME_SIZE = { width: 1280, height: 720 };

export const LAYOUT = {
  topEmptyRatio: 0.2, // top purple band height ratio
};

export const UI = {
  panelWidth: 220,
  statsRatio: 0.3,
  inventoryRatio: 0.7,
  gap: 10,
  colors: {
    statsBg: 0x666666,
    inventoryBg: 0x2e7d32,
    topBg: 0x6a0dad,
    textPrimary: 0xffffff,
    textSecondary: 0xd0ffd6,
  },
  statColors: {
    pv: 0xff4d4f,      // red
    attack: 0xffa940,  // orange
    armor: 0xbfbfbf,   // gray
    speed: 0x40a9ff,   // blue
    hits: 0xb37feb,    // purple
  },
};

export const API = {
  base: "https://mmi.alarmitou.fr/api",
  get map() { return `${this.base}/map`; },
  get objects() { return `${this.base}/objects`; },
};