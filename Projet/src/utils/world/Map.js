import { Container, GraphicsContext, Graphics } from "pixi.js";
import axios from "axios";
import { TILE_SIZE, API } from "../consts.js";

export default class GameMap {
    constructor() {
        this.container = new Container();
        this.grid = [];
        this.width = 0;
        this.height = 0;
        this.playerX = 0;
        this.playerY = 0;
    }

    async load() {
        const response = await axios.get(API.map);
        this.grid = response.data;
        this.height = this.grid.length;
        this.width = this.grid[0].length;

        const roadTile = new GraphicsContext()
            .rect(0, 0, TILE_SIZE, TILE_SIZE)
            .fill("brown");

        const forestTile = new GraphicsContext()
            .rect(0, 0, TILE_SIZE, TILE_SIZE)
            .fill("green");

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const tileGraphicContext = this.grid[y][x] === 0 ? forestTile : roadTile;
                const tile = new Graphics(tileGraphicContext);
                tile.x = x * TILE_SIZE;
                tile.y = y * TILE_SIZE;
                this.container.addChild(tile);
            }
        }

        // Centrer le joueur
        this.playerX = Math.floor(this.width / 2);
        this.playerY = Math.floor(this.height / 2);

        if (!this.isWalkable(this.playerX, this.playerY)) this.findNearestRoad();

        this.updateView();
    }

    isWalkable(x, y) {
        return (
            y >= 0 &&
            y < this.height &&
            x >= 0 &&
            x < this.width &&
            this.grid[y][x] === 1
        );
    }

    findNearestRoad() {
        for (let radius = 1; radius < Math.max(this.width, this.height); radius++) {
            for (let dy = -radius; dy <= radius; dy++) {
                for (let dx = -radius; dx <= radius; dx++) {
                    const nx = this.playerX + dx;
                    const ny = this.playerY + dy;
                    if (this.isWalkable(nx, ny)) {
                        this.playerX = nx;
                        this.playerY = ny;
                        return;
                    }
                }
            }
        }
    }

    move(dx, dy) {
        const newX = this.playerX + dx;
        const newY = this.playerY + dy;

        // Déplacement d’une case seulement si marchable
        if (this.isWalkable(newX, newY)) {
            this.playerX = newX;
            this.playerY = newY;
            this.updateView();
        }
    }

    updateView() {
        this.container.x =
            -this.playerX * TILE_SIZE + window.innerWidth / 2 - TILE_SIZE / 2;
        this.container.y =
            -this.playerY * TILE_SIZE + window.innerHeight / 2 - TILE_SIZE / 2;
    }
}
