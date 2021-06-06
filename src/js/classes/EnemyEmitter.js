import Enemy from "./Enemy";

export default class EnemyEmitter {
  constructor(game) {
    this.game = game;
    this.enemys = [];
    this.spawnTimeout = { curr: 0, max: 10 };

    for (let i = 0; i < 100; i++) {
      this.enemys.push(new Enemy(this.game, 0, 0, 40, 40));
      this.game.getPixi().stage.addChild(this.enemys[i]);
    }
  }

  update(delta) {
    this.spawnTimeoutHandler(delta);

    for (let enemy of this.enemys) {
      enemy.update(delta);
    }
  }

  spawnTimeoutHandler(delta) {
    if (this.spawnTimeout.curr <= 0) {
      this.activateEnemy();
      this.spawnTimeout.curr = this.spawnTimeout.max;
    } else {
      this.spawnTimeout.curr -= delta;
    }
  }

  activateEnemy() {
    for (let i = 0; i < this.enemys.length; i++) {
      if (!this.enemys[i].active) {
        this.enemys[i].alpha = 1;
        this.enemys[i].x = Math.floor(
          Math.random() * this.game.getPixi().view.width - 40
        );
        this.enemys[i].y = -40;
        this.enemys[i].dir = { x: 0, y: 1 };
        this.enemys[i].active = true;

        return;
      }
    }
  }
}
