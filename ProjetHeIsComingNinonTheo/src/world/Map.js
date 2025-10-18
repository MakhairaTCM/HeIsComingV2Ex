import {TILE_SIZE, TILE_TYPES, GAME_HEIGHT, GAME_WIDTH} from "../utils/consts.js";
import { GraphicsContext, Graphics, Container } from 'pixi.js';
import { getMap } from "../utils/api.js";

export default class Map {

  constructor(){
    this.container = new Container();
    this.roadTile = new GraphicsContext().rect(0, 0, TILE_SIZE, TILE_SIZE).fill("brown");
    this.forestTile = new GraphicsContext().rect(0, 0, TILE_SIZE, TILE_SIZE).fill("green");
    this.road = [];
    this.items = []; 
  }

  async load(){
    this.grid = await getMap();
    this.takeroadposition();
  }

  render(){
    this.container.removeChildren();
    for (let y = 0; y < this.grid.length; y ++ ){
      for (let x = 0; x < this.grid[y].length; x ++){
        const tileGraphicContext = this.grid[y][x] == TILE_TYPES.FOREST ? this.forestTile : this.roadTile;
        const tile = new Graphics(tileGraphicContext);
        tile.x = x * TILE_SIZE;
        tile.y = y * TILE_SIZE;
        this.container.addChild(tile);
      }
    }
    const mapWidth = this.grid[0].length * TILE_SIZE;
    const mapHeight = this.grid.length * TILE_SIZE;
    this.container.x = (GAME_WIDTH - mapWidth) / 2;
    this.container.y = (GAME_HEIGHT - mapHeight) / 2;
  }

  canMove(direction) {
    if (direction.y < 0 || direction.y >= this.grid.length) return false;
    if (direction.x < 0 || direction.x >= this.grid[0].length) return false;
    return this.grid[direction.y][direction.x] >= 1;
  }

  moveCamera(direction) {
    this.container.x -= direction.x * TILE_SIZE;
    this.container.y -= direction.y * TILE_SIZE;
  }

  takeroadposition(){ 
     for (let y = 0; y < this.grid.length; y ++ ){
      for (let x = 0; x < this.grid[y].length; x ++){
        if (this.grid[y][x] == 1 ){
          this.road.push([x, y]); 
        }
      }
    }
  }

  roadrandom(){
    const r = Math.floor(Math.random() * this.road.length); 
    return this.road.splice(r, 1)[0]; 
  }

}