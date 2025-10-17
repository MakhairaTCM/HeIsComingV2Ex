import { TILE_SIZE } from "../utils/consts.js";
import { GraphicsContext, Graphics } from "pixi.js";

export default class Enemies {
  constructor(armor, atk, hits, hp, speed, type, x, y) {
    this.armor = armor;
    this.atk = atk;
    this.hits = hits;
    this.hp = hp;
    this.speed = speed;
    this.type = type;
    this.position = [x, y];
  }

  render(container) {
    const color = "#CC00FF";
    const graphic = new GraphicsContext().rect(0, 0, TILE_SIZE, TILE_SIZE).fill(color);
    this.sprite = new Graphics(graphic);
    this.sprite.x = this.position[0] * TILE_SIZE;
    this.sprite.y = this.position[1] * TILE_SIZE;
    container.addChild(this.sprite);
  }

//   hide() {
//     if (this.sprite && this.sprite.parent) {
//       this.sprite.parent.removeChild(this.sprite);
//     }
//   }
}