import { getItems } from "../utils/itemFactory.js";
import { Application, Container, Graphics, GraphicsContext, Sprite, Texture } from "pixi.js";
import {TILE_SIZE} from "../utils/consts.js";


export default class Items{
  constructor(armor, atk, hits, hp, speed, type, x, y){
    this.hp = hp;
    this.atk = atk;
    this.armor = armor;
    this.hits = hits;
    this.speed = speed; 
    this.type = type;
    this.x = x;
    this.y = y;

  }

  render(container){
    console.log("coucou c'est la méthode render de Items"); 
    const graphic = new GraphicsContext()
          .rect(0, 0, TILE_SIZE, TILE_SIZE)
          .fill("yellow");
    this.sprite = new Graphics(graphic);
    this.sprite.x = this.x * TILE_SIZE;
    this.sprite.y = this.y * TILE_SIZE;
    console.log(this.x + " " + this.y); 
    container.addChild(this.sprite);
  }

  attach(){
    console.log(getItems()); 
  }

  dettach(){

  }
}