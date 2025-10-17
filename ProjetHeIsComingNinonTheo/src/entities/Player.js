import { GraphicsContext, Graphics } from 'pixi.js';
import { TILE_SIZE, GAME_WIDTH, GAME_HEIGHT } from '../utils/consts.js';
import Inventory from '../core/inventory.js';
import { detectItemCollision, detectEnemyCollision } from '../utils/collision.js';
import CombatManager from '../core/CombatManager.js';

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
    this.onCombatStart = null; 
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

  update(items, enemies) {
    const collidedItem = detectItemCollision(this, items);
    if (collidedItem) {
      this.pickupItem(collidedItem);
    }

    const collidedEnemy = detectEnemyCollision(this, enemies);
    if (collidedEnemy) {
      this.startCombat(collidedEnemy);
    }
  }

  pickupItem(item) {
    if (!this.inventory.has(item)) {
      this.inventory.add(item);
      item.hide?.();
      this.applyItemStats(item);

      console.log(`${this.name} ramasse ${item.type}`);
      if (this.onItemPickup) this.onItemPickup(item);
    }
  }

  startCombat(enemy) {
    if (enemy.isDead?.()) return;

    if (enemy.inCombat) return;
    enemy.inCombat = true;

    console.log(`Combat déclenché contre ${enemy.type}!`);
    const combat = new CombatManager(this, enemy);
    const result = combat.fight();

    console.log(`Résultat du combat : ${result}`);

    if (result === "PLAYER") {
      if (enemy.sprite?.parent) enemy.sprite.parent.removeChild(enemy.sprite);
    } else {
      console.log("Game Over !");
    }
    enemy.inCombat = false;

    if (this.onCombatStart) this.onCombatStart(enemy, result);
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

  get(stat) {
    return this[stat];
  }

  defend(damage) {
    const effectiveDamage = Math.max(0, damage - this.armor);
    this.hp -= effectiveDamage;
    if (this.hp < 0) this.hp = 0;
  }

  repairSelf() {
    this.hp = Math.min(this.hpMax, this.hp + 2);
  }
}
