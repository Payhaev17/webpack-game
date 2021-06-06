import * as PIXI from "pixi.js";
import { Constants } from "../Constants";

export default class Player extends PIXI.Graphics {
  constructor(game, x, y, w, h) {
    super();

    this.beginFill("0x" + Constants.COLOR_2);
    this.drawRect(x, y, w, h);
    this.endFill();

    this.game = game;
  }

  update(delta) {}
}
