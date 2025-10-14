import { Application, Container, Graphics, GraphicsContext } from "pixi.js";
import { Tile_Size, Map_Size, Game_Whidth,Game_Height } from "./utils/const.js";
import { Map } from "./world/Map.js";
import { Player } from "./entities/Player.js";

(async () => {
  const app = new Application();
  await app.init({ background: "#1099bb", resizeTo: window });
  document.getElementById("pixi-container").appendChild(app.canvas);

  const gameContainer = new Container();
  app.stage.addChild(gameContainer);

  let backgroundColor = new GraphicsContext()
    .rect(0, 0, Game_Whidth * Tile_Size, Game_Height * Tile_Size)
    .fill("red");
  const background = new Graphics(backgroundColor);
  gameContainer.addChild(background);

  const map = new Map();
  await map.load();
  map.render();
  gameContainer.addChild(map.getContainer());

  const mid = Math.floor(Map_Size / 2);
  const player = new Player(map);
  player.load(mid, mid);
  player.render();
  gameContainer.addChild(player.graphic);

  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
      case "z":
        player.move(0, -1);
        break;
      case "ArrowDown":
      case "s":
        player.move(0, 1);
        break;
      case "ArrowLeft":
      case "q":
        player.move(-1, 0);
        break;
      case "ArrowRight":
      case "d":
        player.move(1, 0);
        break;
    }
  });
})();
