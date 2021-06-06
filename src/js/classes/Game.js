import * as PIXI from "pixi.js";
import { Constants } from "../Constants";
import Player from "./Player";

export default class Game {
  constructor() {
    this.pixi = new PIXI.Application({
      width: 500,
      height: 800,
      backgroundColor: "0x" + Constants.COLOR_3,
      resolution: 1,
    });

    this.resizeView();
    window.addEventListener("resize", (e) => this.resizeView());

    document.body.appendChild(this.pixi.view);

    this.player = new Player(
      this,
      this.pixi.view.width / 2 - 40 / 2,
      this.pixi.view.height - 40,
      40,
      40
    );
    this.pixi.stage.addChild(this.player);

    this.pixi.ticker.add((delta) => this.update(delta));
  }

  resizeView() {
    this.pixi.view.width =
      window.innerWidth >= Constants.MAX_VIEW_WIDTH
        ? Constants.MAX_VIEW_WIDTH
        : window.innerWidth;
    this.pixi.view.height =
      window.innerHeight >= Constants.MAX_VIEW_HEIGHT
        ? Constants.MAX_VIEW_HEIGHT
        : window.innerHeight;
  }

  getPixi() {
    return this.pixi;
  }

  update(delta) {
    this.player.update(delta);
  }
}
