import {Container, Sprite, Texture} from "pixi.js";

export default class LoadingScreen extends Container {
  #progress;
  #data;
  constructor(data) {
    super();
    this.#data = data;
    this.#progress = new Sprite(Texture.WHITE)
    this.#progress.position.set(300, 300)
    this.addChild(this.#progress)
  }

  update(deltaMS) {
    this.#progress.width = 300 * this.#data.progress / 100
  }
}
