import { GraphicsContext, Graphics, Container } from 'pixi.js';
import {TILE_SIZE, UI_WIDTH, UI_HEIGHT, GAME_WIDTH, GAME_HEIGHT } from '../utils/consts';



export default class Player{
  constructor(position){
    this.hp = 10;
    this.hpMax = 10;
    this.atk = 10;
    this.atkMax = 10;
    this.armor = 0;
    this.armorMax = 0;
    this.speed = 0;
    this.speedMax = 0;
    this.hits = 1;
    this.hitsMax = 1;
    this.name = "Joueur";
    this.position = position;
  }

  render(container){
    const graphic = new GraphicsContext()
      .rect(0, 0, TILE_SIZE, TILE_SIZE)
      .fill(0x6666ff);
    this.sprite = new Graphics(graphic);
    this.sprite.x = GAME_WIDTH / 2 - TILE_SIZE / 2;
    this.sprite.y = GAME_HEIGHT / 2 - TILE_SIZE / 2;
    container.addChild(this.sprite);
  }

  move(direction) {
    this.position.x += direction.x;
    this.position.y += direction.y;
  }


}
