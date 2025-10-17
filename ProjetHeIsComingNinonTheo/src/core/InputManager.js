export default class InputManager {
  constructor(player, map) {
    this.player = player;
    this.map = map;
    this.move = this.move.bind(this);
    this.bindKeys();
  }

  bindKeys() {
    window.addEventListener("keydown",this.move);
  }

  unbindKeys(){
    window.removeEventListener("keydown", this.move);
  }

  move(e) {
    const arrowDirection = e.key.replace("Arrow", "").toLowerCase();
    if (["up", "down", "left", "right"].includes(arrowDirection)) {
      let direction = this.getDirectionPosition(arrowDirection);
      if (this.map.canMove(this.getFuturePosition(direction))) {
        this.map.moveCamera(direction);
        this.player.move(direction);
      }
    }
  }
  getDirectionPosition(direction){
    let position =  {x:0, y:0};
    switch(direction){
      case "right":
      position.x = 1;
      break;
      case "left":
      position.x = -1;
      break;
      case "up":
      position.y = -1;
      break;
      case "down":
      position.y = 1;
      break;
    }
    return position;
  }

  getFuturePosition(direction){
    return {
      x:this.player.position.x + direction.x,
      y:this.player.position.y + direction.y,
    }
  }
}
