export default class InputManager {
    constructor(player, map) {
        this.player = player;
        this.map = map;
        this.keys = new Set();
        this.processed = new Set();

        window.addEventListener("keydown", (e) => {
            this.keys.add(e.key);
        });

        window.addEventListener("keyup", (e) => {
            this.keys.delete(e.key);
            this.processed.delete(e.key); // reset pour nouveau press
        });
    }

    getDirection() {
        // ZQSD ou flèches
        const dirMap = {
            ArrowUp: { dx: 0, dy: -1 },
            z: { dx: 0, dy: -1 },
            ArrowDown: { dx: 0, dy: 1 },
            s: { dx: 0, dy: 1 },
            ArrowLeft: { dx: -1, dy: 0 },
            q: { dx: -1, dy: 0 },
            ArrowRight: { dx: 1, dy: 0 },
            d: { dx: 1, dy: 0 },
        };

        for (let key of this.keys) {
            if (!this.processed.has(key) && dirMap[key]) {
                this.processed.add(key);
                return dirMap[key];
            }
        }

        return { dx: 0, dy: 0 };
    }
}
