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

    window.addEventListener("keydown", (e) => this.input(e));
    window.addEventListener("keyup", (e) => this.input(e));
  }

  update(delta) {
    this.x += this.dir.x * (this.speed * delta);
    this.y += this.dir.y * (this.speed * delta);
  }

  input(e) {
    switch (e.keyCode) {
      case 37:
        if (e.type === "keyup") {
          if (this.lastMoveKey === e.keyCode) {
            this.dir = { x: 0, y: 0 };
          }
        } else {
          this.dir = { x: -1, y: 0 };
          this.lastMoveKey = 37;
        }
        break;
      case 39:
        if (e.type === "keyup") {
          if (this.lastMoveKey === e.keyCode) {
            this.dir = { x: 0, y: 0 };
          }
        } else {
          this.dir = { x: 1, y: 0 };
          this.lastMoveKey = 39;
        }
        break;
      case 32:
        this.game.getBulletEmitter().activateBullet(this.x, this.y);
        break;
    }
  }
}
