import Bullet from "./Bullet";

export default class BulletEmitter {
  constructor(game) {
    this.game = game;
    this.bullets = [];

    for (let i = 0; i < 100; i++) {
      this.bullets.push(new Bullet(this.game, 0, 300, 20, 20));
      this.game.getPixi().stage.addChild(this.bullets[i]);
    }
  }

  update(delta) {
    for (let bullet of this.bullets) {
      bullet.update(delta);
    }
  }

  activateBullet(x, y) {
    for (let i = 0; i < this.bullets.length; i++) {
      if (!this.bullets[i].active) {
        this.bullets[i].alpha = 1;
        this.bullets[i].x = x;
        this.bullets[i].y = y;
        this.bullets[i].dir = { x: 0, y: -1 };
        this.bullets[i].active = true;

        return;
      }
    }
  }
}
