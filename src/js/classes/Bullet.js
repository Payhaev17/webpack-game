import * as PIXI from "pixi.js";

import { Constants } from "../Constants";

export default class Bullet extends PIXI.Graphics {
  constructor(game, x, y, w, h) {
    super();

    this.beginFill("0x" + Constants.COLOR_2);
    this.drawRect(0, 0, w, h);
    this.endFill();

    this.position.set(x, y);

    this.game = game;
    this.active = false;
    this.alpha = 0;
    this.dir = { x: 0, y: 0 };
    this.speed = 15;
  }

  update(delta) {
    if (!this.active) return;

    for (let enemy of this.game.getEnemyEmitter().getEnemys()) {
      if (enemy.active && this.overlaps(enemy)) {
        this.deactivate();
        enemy.deactivate();
        return;
      }
    }

    if (this.y < 0) {
      this.deactivate();
    } else {
      this.x += this.dir.x * (this.speed * delta);
      this.y += this.dir.y * (this.speed * delta);
    }
  }

  deactivate() {
    this.active = false;
    this.alpha = 0;
  }

  overlaps(rect) {
    if (
      this.x < rect.x + rect.width &&
      this.x + this.width > rect.x &&
      this.y < rect.y + rect.height &&
      this.y + this.height > rect.y
    ) {
      return true;
    }
  }
}
