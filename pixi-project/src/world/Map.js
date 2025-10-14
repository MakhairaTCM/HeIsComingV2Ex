import { Container, Graphics, GraphicsContext } from "pixi.js";
import axios from "axios";
import { Tile_Size } from "../utils/const";
import { Tile_Type } from "../utils/const";



export class Map {
  constructor() {
    this.container = new Container();
    this.grid = [];
  }


  async load() {
    const response = await axios.get("https://mmi.alarmitou.fr/api/map");
    this.grid = response.data;
    
  }

  
  render() {
    
    const roadTileContext = new GraphicsContext().rect(Tile_Size, Tile_Size, Tile_Size, Tile_Size).fill("brown");
    const forestTileContext = new GraphicsContext().rect(Tile_Size, Tile_Size, Tile_Size, Tile_Size).fill("green");
    

    for (let y = 0; y < this.grid.length; y++) {
        for (let x = 0; x < this.grid[y].length; x++) {
            const tileContext = this.grid[y][x] === Tile_Type.FOREST ? forestTileContext : roadTileContext;
            const tile = new Graphics(tileContext);
            tile.x = x * Tile_Size;
            tile.y = y * Tile_Size;
            this.container.addChild(tile);
        }
    }
  }

  getContainer() {
    return this.container;
  }
}
