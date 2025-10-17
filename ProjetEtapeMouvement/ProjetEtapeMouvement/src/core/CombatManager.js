export default class CombatManager {
  constructor(player, enemy){
    this.player = player;
    this.enemy = enemy;
    this.round = 1;
    this.turn = 1;
    this.isOver = false;
  }


  fight(){
    const winner = this.resolveFight();
    if (winner == "PLAYER") {
      this.player.repairSelf();
    } else {
      //GameOver
    }
    return winner;
  }

  resolveFight(){
    let attacker = this.player.speed >= this.enemy.speed ? this.player : this.enemy;
    let defender = attacker === this.player ? this.enemy : this.player;
    while (!this.isOver) {
       this.executeTurn(attacker, defender);
       [attacker, defender] = [defender, attacker];

       this.turn++;
       if (this.turn % 2 == 0 ){
         this.round ++;
       }
     }

     return this.player.get("hp") > 0 ? "PLAYER" : "ENEMY";
  }


  executeTurn(attacker, defender) {
    if (this.isOver) return;
    for (let hit = 0; hit < attacker.get("hits"); hit ++){
      defender.defend(attacker.get("atk"));
    }

    if (defender.get("hp") <= 0) {
      this.isOver = true;
    }
  }
}
