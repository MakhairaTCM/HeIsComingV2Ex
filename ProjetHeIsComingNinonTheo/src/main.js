import { Application, Container, Graphics, GraphicsContext, Sprite, Texture } from "pixi.js";
import Map from './world/Map';
import Player from './entities/Player';
import UI from './ui/UI';
import {MAP_SIZE, GAME_WIDTH, GAME_HEIGHT, GAME_X, GAME_Y} from './utils/consts';
import InputManager from './core/InputManager';
import { getChest, getItems, getMonsters } from "./utils/factory";

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



  const map = new Map();
  const player = new Player({x:Math.floor(MAP_SIZE / 2),y:Math.floor(MAP_SIZE / 2)});

  const inputManager = new InputManager(player, map);

  
  const ui = new UI(player);
  uiContainer.addChild(ui.getContainer());

  gameContainer.addChild(background);
  gameContainer.addChild(mask);
  app.stage.addChild(gameContainer);  
  app.stage.addChild(uiContainer);   

  gameContainer.addChild(map.container);
  player.render(gameContainer);

  await map.load();
  map.render();


  const items = await getItems(map); 

  for (let item of items){
    item.render(map.container);
  }
  const enemies = await getMonsters(map); 

  for (const enemy of enemies) {
    enemy.render(map.container);
  }
  const treasures = await getChest(map);
  for (let treasure of treasures){
    treasure.render(map.container); 
    
  } 

  app.ticker.add(() => {
    ui.updateStats();
    player.update(items, enemies, treasures, map.container);
  });


  
  
})();
