import * as PIXI from "pixi.js";
import { Viewport } from "pixi-viewport";
import { Constants } from "../Constants";

export default class Game {
  constructor() {
    this.pixi = new PIXI.Application({
      backgroundColor: "0x" + Constants.COLOR_3,
    });
    document.body.appendChild(this.pixi.view);

    this.viewport = new Viewport({
      screenWidth: 100,
      screenHeight: 100,
      worldWidth: 1000,
      worldHeight: 1000,

      interaction: this.pixi.renderer.plugins.interaction,
    });

    this.pixi.stage.addChild(this.viewport);

    this.viewport.drag().pinch().wheel().decelerate();

    this.resizeView();
    window.addEventListener("resize", (e) => this.resizeView());

    this.pixi.ticker.add((delta) => this.update(delta));
  }

  resizeView() {
    this.viewport.screenWidth =
      window.innerWidth >= Constants.MAX_VIEW_WIDTH
        ? Constants.MAX_VIEW_WIDTH
        : window.innerWidth;
    this.viewport.screenHeight =
      window.innerHeight >= Constants.MAX_VIEW_HEIGHT
        ? Constants.MAX_VIEW_HEIGHT
        : window.innerHeight;
  }

  update(delta) {}
}
