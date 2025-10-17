export function detectItemCollision(player, items) {
  return items.find(
    i =>
      i &&
      i.position &&
      i.position[0] === player.position.x &&
      i.position[1] === player.position.y
  );
}

export function detectEnemyCollision(player, enemies) {
  return enemies.find(
    e =>
      e &&
      e.position &&
      e.position[0] === player.position.x &&
      e.position[1] === player.position.y
  );
}
