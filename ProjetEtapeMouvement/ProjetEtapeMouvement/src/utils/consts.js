export const TILE_SIZE = 50;

export const MAP_SIZE = 15;

export const API_URL = "https://www.mmi.alarmitou.fr/api";

export const IMG_URL = "https://www.mmi.alarmitou.fr/imgs";

export const TILE_TYPES = {
  FOREST: 0,
  ROAD:1
}

export const GAME_X = 0;

export const GAME_Y = 0;

export const GAME_WIDTH = window.innerWidth - TILE_SIZE*4;

export const GAME_HEIGHT = window.innerHeight - TILE_SIZE * 4;

export const MIDDLE_OF_GRID = Math.floor(MAP_SIZE / 2);

export const BASE_PLAYER_POSITION = {
  X:MIDDLE_OF_GRID,
  Y:MIDDLE_OF_GRID
}
