import Enemy from "./Enemy";

export default class EnemyEmitter {
  constructor(game) {
    this.game = game;
    this.enemys = [];

    for (let i = 0; i < 100; i++) {
      this.enemys.push(new Enemy(this.game, 0, 0, 40, 40));
      this.game.getPixi().stage.addChild(this.enemys[i]);
    }
  }

  update(delta) {
    for (let enemy of this.enemys) {
      enemy.update(delta);
    }
  }
}
