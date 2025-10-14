import { Application, Container, Graphics, GraphicsContext, Sprite, Texture } from "pixi.js";
import Map from './world/Map';
import Player from './entities/Player';
import {GAME_X, GAME_Y, GAME_WIDTH, GAME_HEIGHT, MAP_SIZE} from './utils/consts';
import InputManager from './core/InputManager';
(async () => {
  const app = new Application();
  await app.init({ background: "#1099bb", resizeTo: window });

  document.getElementById("pixi-container").appendChild(app.canvas);

  const gameContainer = new Container();
  const uiContainer = new Container();

  let backgroundColor = new GraphicsContext().rect(0, 0, GAME_WIDTH, GAME_HEIGHT).fill(0x111111);
  const background = new Graphics(backgroundColor);

  const mask = new Sprite(Texture.WHITE);
  mask.width = GAME_WIDTH;
  mask.height = GAME_HEIGHT;
  gameContainer.mask = mask;
  gameContainer.x = GAME_X;
  gameContainer.y = GAME_Y;


  const mid = Math.floor(MAP_SIZE / 2);

  const map = new Map();
  const player = new Player({x:mid,y:mid});
  const inputManager = new InputManager(player, map);

  gameContainer.addChild(background);
  gameContainer.addChild(mask);
  app.stage.addChild(gameContainer);
  app.stage.addChild(uiContainer);
  gameContainer.addChild(map.container);
  player.render(gameContainer);

  await map.load();
  map.render();
})();
