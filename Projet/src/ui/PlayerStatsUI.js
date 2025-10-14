import { Container, Text, Graphics } from "pixi.js";
import { UI as UI_CONSTS } from "../utils/consts.js";

export default class PlayerStatsUI extends Container {
    constructor(player) {
        super();
        this.player = player;

        this.panelWidth = UI_CONSTS.panelWidth;
        this.gap = UI_CONSTS.gap;

        this.bgTop = new Graphics();
        this.addChild(this.bgTop);

        this.bgBottom = new Graphics();
        this.addChild(this.bgBottom);

        this.title = new Text({ text: "Player Stats", style: { fill: UI_CONSTS.colors.textPrimary, fontSize: 18, fontWeight: "bold" } });
        this.title.x = 10;
        this.title.y = 8;
        this.addChild(this.title);

        this.lines = {
            pv: new Text({ text: "", style: { fill: UI_CONSTS.colors.textPrimary, fontSize: 14 } }),
            attack: new Text({ text: "", style: { fill: UI_CONSTS.colors.textPrimary, fontSize: 14 } }),
            armor: new Text({ text: "", style: { fill: UI_CONSTS.colors.textPrimary, fontSize: 14 } }),
            speed: new Text({ text: "", style: { fill: UI_CONSTS.colors.textPrimary, fontSize: 14 } }),
            hits: new Text({ text: "", style: { fill: UI_CONSTS.colors.textPrimary, fontSize: 14 } }),
        };

        this.lines.pv.x = 10; this.lines.pv.y = 34;
        this.lines.attack.x = 10; this.lines.attack.y = 54;
        this.lines.armor.x = 10; this.lines.armor.y = 74;
        this.lines.speed.x = 10; this.lines.speed.y = 94;
        this.lines.hits.x = 10; this.lines.hits.y = 114;

        this.addChild(this.lines.pv);
        this.addChild(this.lines.attack);
        this.addChild(this.lines.armor);
        this.addChild(this.lines.speed);
        this.addChild(this.lines.hits);

        this.inventoryTitle = new Text({ text: "Inventory", style: { fill: UI_CONSTS.colors.textSecondary, fontSize: 16, fontWeight: "bold" } });
        this.addChild(this.inventoryTitle);

        this.inventoryList = new Container();
        this.addChild(this.inventoryList);

        this.layout();
        this.update();

        window.addEventListener("resize", () => this.layout());
    }

    update() {
        const stats = this.player.stats;
        this.lines.pv.text = `PV: ${stats.pv.current} / ${stats.pv.max}`;
        this.lines.attack.text = `Attack: ${stats.attack.current} / ${stats.attack.max}`;
        this.lines.armor.text = `Armor: ${stats.armor.current} / ${stats.armor.max}`;
        this.lines.speed.text = `Speed: ${stats.speed.current} / ${stats.speed.max}`;
        this.lines.hits.text = `Hits: ${stats.hits.current} / ${stats.hits.max}`;

        this.renderInventory();
    }

    layout() {
        const totalHeight = Math.max(200, window.innerHeight - 20);
        const statsHeight = Math.round(totalHeight * UI_CONSTS.statsRatio);
        const inventoryHeight = Math.max(0, totalHeight - statsHeight - this.gap);

        this.bgTop.clear();
        this.bgTop.roundRect(0, 0, this.panelWidth, statsHeight, 8).fill({ color: UI_CONSTS.colors.statsBg });

        this.bgBottom.clear();
        this.bgBottom.roundRect(0, statsHeight + this.gap, this.panelWidth, inventoryHeight, 8).fill({ color: UI_CONSTS.colors.inventoryBg });

        this.inventoryTitle.x = 10;
        this.inventoryTitle.y = statsHeight + this.gap + 8;
        this.inventoryList.x = 10;
        this.inventoryList.y = this.inventoryTitle.y + 22;
        this.inventoryList.width = this.panelWidth - 20;
    }

    renderInventory() {
        // Clear previous entries
        this.inventoryList.removeChildren();
        const inventoryItems = this.player.inventory || [];
        const equippedItems = this.player.items || [];

        let currentY = 0;
        for (const item of inventoryItems) {
            const isEquipped = equippedItems.includes(item);
            const itemLabel = this.#formatItemLabel(item, isEquipped);
            const itemText = new Text({ text: itemLabel, style: { fill: isEquipped ? UI_CONSTS.colors.textPrimary : UI_CONSTS.colors.textSecondary, fontSize: 14 } });
            itemText.y = currentY;
            itemText.eventMode = "static";
            itemText.cursor = "pointer";
            itemText.on("pointertap", () => {
                if (isEquipped) {
                    this.player.unequip(item);
                } else {
                    this.player.equip(item);
                }
                this.update();
            });
            this.inventoryList.addChild(itemText);
            currentY += 20;
        }
    }

    #formatItemLabel(item, isEquipped) {
        const name = item?.name || "Item";
        const modifiers = item?.modifiers || {};
        const modifierParts = [];
        for (const statName of ["pv", "attack", "armor", "speed", "hits"]) {
            const value = modifiers[statName];
            if (value) modifierParts.push(`${statName}+${value}`);
        }
        const modifiersText = modifierParts.length ? ` (${modifierParts.join(", ")})` : "";
        const equipFlag = isEquipped ? "[E] " : "";
        return `${equipFlag}${name}${modifiersText}`;
    }
}
