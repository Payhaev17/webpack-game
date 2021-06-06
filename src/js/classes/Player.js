import * as PIXI from "pixi.js";
import { Constants } from "../Constants";

export default class Player extends PIXI.Graphics {
  constructor(game, x, y, w, h) {
    super();

    this.beginFill("0x" + Constants.COLOR_2);
    this.drawRect(0, 0, w, h);
    this.endFill();

    this.position.set(x, y);

    this.game = game;
    this.dir = { x: 0, y: 0 };
    this.speed = 15;
    this.lastMoveKey = false;
    this.spacebarDown = false;
    this.shootTimeout = { curr: 0, max: 2 };

    window.addEventListener("keydown", (e) => this.input(e));
    window.addEventListener("keyup", (e) => this.input(e));
  }

  update(delta) {
    this.shootTimeoutHandler(delta);
    this.changeDirection();
    this.atacked();

    this.x += this.dir.x * (this.speed * delta);
    this.y += this.dir.y * (this.speed * delta);
  }

  input(e) {
    switch (e.keyCode) {
      case 37:
        if (e.type === "keyup") {
          if (this.lastMoveKey === e.keyCode) {
            this.lastMoveKey = false;
          }
        } else {
          this.lastMoveKey = 37;
        }
        break;
      case 39:
        if (e.type === "keyup") {
          if (this.lastMoveKey === e.keyCode) {
            this.lastMoveKey = false;
          }
        } else {
          this.lastMoveKey = 39;
        }
        break;
      case 32:
        if (e.type === "keyup") {
          if (this.spacebarDown === true) {
            this.spacebarDown = false;
          }
        } else {
          this.spacebarDown = true;
        }
        break;
    }
  }

  shootTimeoutHandler(delta) {
    if (this.shootTimeout.curr > 0) {
      this.shootTimeout.curr -= delta;
    }
  }

  changeDirection() {
    switch (this.lastMoveKey) {
      case 37:
        this.dir = { x: -1, y: 0 };
        break;
      case 39:
        this.dir = { x: 1, y: 0 };
        break;
      default:
        this.dir = { x: 0, y: 0 };
        break;
    }
  }

  atacked() {
    if (this.spacebarDown) {
      if (this.shootTimeout.curr <= 0) {
        this.game
          .getBulletEmitter()
          .activateBullet(this.x + this.width / 2, this.y);
        this.shootTimeout.curr = this.shootTimeout.max;
      }
    }
  }
}
