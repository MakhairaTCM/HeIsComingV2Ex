import { Application, Container, Graphics, GraphicsContext } from "pixi.js";
// import axios from "axios";
// import { Tile_Size } from "./utils/const";
// import { Tile_Type } from "./utils/const";
import { Map } from "./world/Map";


(async () => {

  const app = new Application();
  await app.init({ background: "#1099bb", resizeTo: window });

  document.getElementById("pixi-container").appendChild(app.canvas);

  const gameContainer = new Container();
  app.stage.addChild(gameContainer);

  let


  //appel de la map
  const map = new Map();
  await map.load();      
  map.render();          

  const mid = Math.floor(MapSIze/2)
  const player = new Player (mid y , mid x )
  gameContainer.addChild(map.getContainer());
  }


  
)();
