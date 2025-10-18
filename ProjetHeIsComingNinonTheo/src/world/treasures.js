import { TILE_SIZE, IMG_URL} from "../utils/consts.js";
import {Sprite, Assets} from "pixi.js";

export default class Treasures{
    constructor(items_objects, x, y){
        this.Items = items_objects; 
        this.position = [x, y]; 
        this.isOpened = false;
    }

    async render(container){
        const texture = await Assets.load(IMG_URL+`/chest.png`); 
        this.sprite = new Sprite(texture);
        this.sprite.x = this.position[0] * TILE_SIZE;
        this.sprite.y = this.position[1] * TILE_SIZE;
        this.sprite.width = TILE_SIZE; 
        this.sprite.height = TILE_SIZE; 
        container.addChild(this.sprite);
    }

    open(onItemSelected) {
        if (this.isOpened) return;
        this.isOpened = true;

        this.Items.forEach((item, i) => {
            console.log(`${i} ${item.meta_name}`);
        });
         const choice = parseInt(prompt("Choisir un item :"), 10);
        if (!isNaN(choice) && choice >= 0 && choice <= this.Items.length) {
            const selectedItem = this.Items[choice];
            if (onItemSelected) {
                onItemSelected(selectedItem);
            }
        } else {
            console.log("Choix invalide.");}
}
}