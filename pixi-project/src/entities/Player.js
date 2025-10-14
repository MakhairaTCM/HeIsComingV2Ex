import { Graphics, GraphicsContext } from "pixi.js";
import { Tile_Size, Tile_Type } from "../utils/const.js";

export class Player {
  constructor(map) {
    this.map = map;
    this.tileX = 0;
    this.tileY = 0;
    this.graphic = null;
    this.moveDelay = 150;
    this.canMove = true;
  }

  load(startX, startY) {
    this.tileX = startX;
    this.tileY = startY;
  }

  render() {
    const playerGraphic = new GraphicsContext()
      .rect(0, 0, Tile_Size, Tile_Size)
      .fill("yellow");
    this.graphic = new Graphics(playerGraphic);

    this.updatePosition();
  }

  updatePosition() {
    this.graphic.x = this.tileX * Tile_Size;
    this.graphic.y = this.tileY * Tile_Size;
  }

  move(dx, dy) {
    if (!this.canMove) return;

    const newX = this.tileX + dx;
    const newY = this.tileY + dy;

    if (
      newX < 0 ||
      newY < 0 ||
      newX >= this.map.grid[0].length ||
      newY >= this.map.grid.length
    ) return;

    if (this.map.grid[newY][newX] !== Tile_Type.ROAD) return;

    this.tileX = newX;
    this.tileY = newY;
    this.updatePosition();

    this.canMove = false;
    setTimeout(() => (this.canMove = true), this.moveDelay);
  }
}
