import { Graphics } from "pixi.js";
import { TILE_SIZE } from "../utils/consts.js";

const STAT_KEYS = ["pv", "attack", "armor", "speed", "hits"];

export default class Player extends Graphics {
    constructor() {
        super();

        this.beginFill("blue");
        this.drawRect(0, 0, TILE_SIZE, TILE_SIZE);
        this.endFill();

        this.x = window.innerWidth / 2 - TILE_SIZE / 2;
        this.y = window.innerHeight / 2 - TILE_SIZE / 2;

        this.stats = {
            pv: { current: 100, max: 100 },
            attack: { current: 10, max: 10 },
            armor: { current: 5, max: 5 },
            speed: { current: 3, max: 3 },
            hits: { current: 0, max: 0 },
        };

        this.inventory = [];
        this.items = [];
    }

    equip(item) {
        if (!item || this.#isEquipped(item)) return;
        this.items.push(item);
        if (!this.#isInInventory(item)) this.inventory.push(item);
        if (typeof item.attach === "function") item.attach(this);
    }

    unequip(item) {
        if (!this.#isEquipped(item)) return;
        this.items = this.items.filter((it) => it !== item);
        this.inventory = this.inventory.filter((it) => it !== item);
        if (typeof item.detach === "function") item.detach(this);
    }


    #isInInventory(item) {
        return this.inventory.includes(item);
    }

    #isEquipped(item) {
        return this.items.includes(item);
    }
}
