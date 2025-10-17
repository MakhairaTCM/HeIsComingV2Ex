import { GraphicsContext, Graphics } from 'pixi.js';
import { TILE_SIZE, GAME_WIDTH, GAME_HEIGHT } from '../utils/consts';
import Inventory from '../core/inventory.js';

export default class Player {
  constructor(position) {
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
    this.inventory = new Inventory();

    this.onItemPickup = null;
  }

  render(container) {
    const graphic = new GraphicsContext().rect(0, 0, TILE_SIZE, TILE_SIZE).fill(0x6666ff);
    this.sprite = new Graphics(graphic);
    this.sprite.x = GAME_WIDTH / 2 - TILE_SIZE / 2;
    this.sprite.y = GAME_HEIGHT / 2 - TILE_SIZE / 2;
    container.addChild(this.sprite);  
  }

  move(direction) {
    this.position.x += direction.x;
    this.position.y += direction.y;
  }

  checkPickup(items) {
    const item = items.find(
      i =>
        i &&
        i.position &&
        i.position[0] === this.position.x &&
        i.position[1] === this.position.y
    );

    if (item && !this.inventory.has(item)) {
      this.inventory.add(item);
      item.hide();
      this.applyItemStats(item);

      console.log(`🧩 ${this.name} ramasse ${item.type}`);
      console.table({
        HP: `${this.hp}/${this.hpMax}`,
        ATK: `${this.atk}/${this.atkMax}`,
        ARMOR: `${this.armor}/${this.armorMax}`,
        SPEED: `${this.speed}/${this.speedMax}`,
        HITS: `${this.hits}/${this.hitsMax}`,
      });

      if (this.onItemPickup) {
        this.onItemPickup(item);
      }
    }
  }

  applyItemStats(item) {
    this.hp += item.hp || 0;
    this.hpMax += item.hp || 0;
    this.atk += item.atk || 0;
    this.atkMax += item.atk || 0;
    this.armor += item.armor || 0;
    this.armorMax += item.armor || 0;
    this.speed += item.speed || 0;
    this.speedMax += item.speed || 0;
    this.hits += item.hits || 0;
    this.hitsMax += item.hits || 0;
  }
}
