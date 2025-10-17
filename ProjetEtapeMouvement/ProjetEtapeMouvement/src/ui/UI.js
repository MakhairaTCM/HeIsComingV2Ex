import { Container, Text, Graphics } from "pixi.js";
import { UI_WIDTH, MARGIN, STATS_HEIGHT, INVENTORY_HEIGHT, START_X, START_Y, SPACING, ITEMS_PER_ROW } from "../utils/consts.js";

export default class UI {
  constructor(player) {
    this.player = player;
    this.container = new Container();
    this.texts = {};

    this.createStatsSection();
    this.createInventorySection();

    // 🔔 lie la mise à jour automatique à l'événement du joueur
    this.player.onItemPickup = (item) => this.updateInventoryUI();
  }

  createStatsSection() {
    this.statsContainer = new Container();
    this.statsContainer.x = MARGIN;
    this.statsContainer.y = MARGIN;

    const statsBg = new Graphics();
    statsBg.rect(0, 0, UI_WIDTH, STATS_HEIGHT).fill({ color: 0x0066cc, alpha: 0.8 });
    this.statsContainer.addChild(statsBg);

    const title = new Text("STATISTICS", { fontSize: 18, fill: "white" });
    title.x = 10;
    title.y = 10;
    this.statsContainer.addChild(title);

    this.createStatsTexts();
    this.container.addChild(this.statsContainer);
  }

  createInventorySection() {
    this.inventoryContainer = new Container();
    this.inventoryContainer.x = MARGIN;
    this.inventoryContainer.y = STATS_HEIGHT + MARGIN * 2;

    const inventoryBg = new Graphics();
    inventoryBg.rect(0, 0, UI_WIDTH, INVENTORY_HEIGHT - MARGIN * 3).fill({ color: 0x00cc66, alpha: 0.8 });
    this.inventoryContainer.addChild(inventoryBg);

    const title = new Text("INVENTORY", { fontSize: 18, fill: "white" });
    title.x = 10;
    title.y = 10;
    this.inventoryContainer.addChild(title);

    this.container.addChild(this.inventoryContainer);
  }

  createStatsTexts() {
    const stats = ["Name", "HP", "Attack", "Armor", "Speed", "Hits"];
    const values = [
      this.player.name,
      `${this.player.hp}/${this.player.hpMax}`,
      `${this.player.atk}/${this.player.atkMax}`,
      `${this.player.armor}/${this.player.armorMax}`,
      `${this.player.speed}/${this.player.speedMax}`,
      `${this.player.hits}/${this.player.hitsMax}`,
    ];

    for (let i = 0; i < stats.length; i++) {
      const text = new Text(`${stats[i]}: ${values[i]}`, { fontSize: 16, fill: "white" });
      text.x = 10;
      text.y = 50 + i * 25;
      this.statsContainer.addChild(text);
      this.texts[stats[i].toLowerCase()] = text;
    }
  }

  updateStats() {
    this.texts.name.text = `Name: ${this.player.name}`;
    this.texts.hp.text = `HP: ${this.player.hp}/${this.player.hpMax}`;
    this.texts.attack.text = `Attack: ${this.player.atk}/${this.player.atkMax}`;
    this.texts.armor.text = `Armor: ${this.player.armor}/${this.player.armorMax}`;
    this.texts.speed.text = `Speed: ${this.player.speed}/${this.player.speedMax}`;
    this.texts.hits.text = `Hits: ${this.player.hits}/${this.player.hitsMax}`;
  }

  updateInventoryUI() {
    while (this.inventoryContainer.children.length > 2) {
      this.inventoryContainer.removeChildAt(2);
    }
    const items = this.player.inventory.getAll();

    items.forEach((item, index) => {
      if (!item.sprite) return;
      const spriteCopy = new Graphics(item.sprite.context);
      spriteCopy.scale.set(0.5);
      spriteCopy.x = START_X + (index % ITEMS_PER_ROW) * SPACING;
      spriteCopy.y = START_Y + Math.floor(index / ITEMS_PER_ROW) * SPACING;
      this.inventoryContainer.addChild(spriteCopy);
    });
  }

  getContainer() {
    return this.container;
  }
}
