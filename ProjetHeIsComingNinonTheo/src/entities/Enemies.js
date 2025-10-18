import { TILE_SIZE , IMG_URL } from "../utils/consts.js";
import {Sprite, Assets } from "pixi.js";

export default class Enemies {
  constructor(armor, atk, hits, hp, speed, type, meta_name, x, y) {
    this.armor = armor;
    this.atk = atk;
    this.hits = hits;
    this.hp = hp;
    this.speed = speed;
    this.type = type;
    this.meta_name = meta_name; 
    this.position = [x, y];
  }

  async render(container) {
    const texture = await Assets.load(IMG_URL+`/${this.meta_name}.png`); 
    this.sprite = new Sprite(texture);
    this.sprite.x = this.position[0] * TILE_SIZE;
    this.sprite.y = this.position[1] * TILE_SIZE;
    this.sprite.width = TILE_SIZE; 
    this.sprite.height = TILE_SIZE; 
    container.addChild(this.sprite);
  }

  get(stat) {
    return this[stat];
  }

  defend(damage) {
    const effectiveDamage = Math.max(0, damage - this.armor);
    this.hp -= effectiveDamage;
    if (this.hp < 0) this.hp = 0;
  }

  isDead() {
    return this.hp <= 0;
  }
}
