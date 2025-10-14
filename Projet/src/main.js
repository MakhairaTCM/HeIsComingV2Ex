import { Application, Container, Graphics } from "pixi.js";
import axios from "axios";
import GameMap from "./utils/world/Map.js";
import Player from "./Entités/Player.js";
import InputManager from "./systems/InputManager.js";
import PlayerStatsUI from "./ui/PlayerStatsUI.js";
import { LAYOUT, UI as UI_CONSTS, API } from "./utils/consts.js";

(async () => {
  const app = new Application();
  await app.init({ background: "#1099bb", resizeTo: window });
  document.getElementById("pixi-container").appendChild(app.canvas);

  const topBg = new Graphics();
  app.stage.addChildAt(topBg, 0);

  const gameContainer = new Container();
  app.stage.addChild(gameContainer);

  const gameMask = new Graphics();
  app.stage.addChild(gameMask);
  gameContainer.mask = gameMask;

  const uiContainer = new Container();
  uiContainer.x = 10;
  uiContainer.y = 10;
  app.stage.addChild(uiContainer);

  const map = new GameMap();
  await map.load();
  gameContainer.addChild(map.container);

  const player = new Player();
  gameContainer.addChild(player);

  const input = new InputManager(player, map);

  const statsUI = new PlayerStatsUI(player);
  uiContainer.addChild(statsUI);

  // Inventory starts empty; items will appear when collected/equipped in-game.

  const layoutGameArea = () => {
    const topEmpty = Math.floor(window.innerHeight * LAYOUT.topEmptyRatio);
    const gameHeight = Math.floor(window.innerHeight * (1 - LAYOUT.topEmptyRatio));
    topBg.clear();
    topBg.rect(0, 0, window.innerWidth, topEmpty).fill({ color: UI_CONSTS.colors.topBg });
    gameContainer.y = topEmpty;
    gameMask.clear();
    gameMask.rect(0, topEmpty, window.innerWidth, gameHeight).fill({ color: 0x000000, alpha: 1 });
  };
  layoutGameArea();
  
  window.addEventListener("resize", layoutGameArea);

  app.ticker.add(() => {
    const { dx, dy } = input.getDirection();
    if (dx !== 0 || dy !== 0) {
      map.move(dx, dy);
    }
  });
})();
