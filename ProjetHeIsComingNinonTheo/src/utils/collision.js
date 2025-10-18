export function detectCollision(player, objects) {
  return objects.find(
    obj =>
      obj &&
      obj.position &&
      obj.position[0] === player.position.x &&
      obj.position[1] === player.position.y
  );
}
