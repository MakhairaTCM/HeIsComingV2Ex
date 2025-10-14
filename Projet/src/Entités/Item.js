export default class Item {
    constructor({ name, meta_name, type, modifiers }) {
        this.name = name || "Item";
        this.meta_name = meta_name || null;
        this.type = type || "item";
        this.modifiers = modifiers || { pv: 0, attack: 0, armor: 0, speed: 0, hits: 0 };
    }

    getStats() {
        return this.modifiers;
    }

    attach(player) {
        console.log("[Item.attach]", { name: this.name, modifiers: this.modifiers });
        const m = this.modifiers || {};
        for (const key of ["pv", "attack", "armor", "speed", "hits"]) {
            const delta = m[key] || 0;
            if (!delta) continue;
            const stat = player.stats[key];
            stat.max += delta;
            if (key === "pv") {
                stat.current = Math.min(stat.current, stat.max);
                if (delta > 0 && stat.current < stat.max) {
                    stat.current = Math.min(stat.max, stat.current + delta);
                }
            }
        }
    }

    detach(player) {
        console.log("[Item.detach]", { name: this.name, modifiers: this.modifiers });
        const m = this.modifiers || {};
        for (const key of ["pv", "attack", "armor", "speed", "hits"]) {
            const delta = m[key] || 0;
            if (!delta) continue;
            const stat = player.stats[key];
            stat.max -= delta;
            if (key === "pv") {
                stat.current = Math.min(stat.current, stat.max);
            }
        }
    }
}
