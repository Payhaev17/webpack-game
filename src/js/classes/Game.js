import * as PIXI from "pixi.js";
import { Constants } from "../Constants";
import Player from "./Player";
import EnemyEmitter from "./EnemyEmitter";
import BulletEmitter from "./BulletEmitter";

export default class Game {
  constructor() {
    this.pixi = new PIXI.Application({
      width: 500,
      height: 800,
      backgroundColor: "0x" + Constants.COLOR_3,
      resolution: 1,
    });

    document.body.appendChild(this.pixi.view);

    this.player = new Player(this, 0, this.pixi.view.height - 40, 40, 40);
    this.pixi.stage.addChild(this.player);

    this.enemyEmitter = new EnemyEmitter(this);
    this.bulletEmitter = new BulletEmitter(this);

    this.pixi.ticker.add((delta) => this.update(delta));
  }

  getPixi() {
    return this.pixi;
  }

  getBulletEmitter() {
    return this.bulletEmitter;
  }

  getEnemyEmitter() {
    return this.enemyEmitter;
  }

  update(delta) {
    this.player.update(delta);
    this.enemyEmitter.update(delta);
    this.bulletEmitter.update(delta);
  }
}
