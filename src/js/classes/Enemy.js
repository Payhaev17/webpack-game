import * as PIXI from "pixi.js";
import { Constants } from "../Constants";

export default class Enemy extends PIXI.Graphics {
  constructor(game, x, y, w, h) {
    super();

    this.beginFill("0x" + Constants.COLOR_1);
    this.drawRect(x, y, w, h);
    this.endFill();

    this.game = game;
    this.dir = { x: 0, y: 0 };
    this.speed = 15;
  }

  update(delta) {
    this.x += this.dir.x * (this.speed * delta);
    this.y += this.dir.y * (this.speed * delta);
  }
}
