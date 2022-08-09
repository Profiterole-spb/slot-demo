import {Container, Sprite, Texture} from "pixi.js";
import Locator from "../../../Services/Locator.js";

export default class SymbolView extends Container {
  #data
  #sprite
  #resources
  constructor(data) {
    super();
    this.#data = data
    this.#resources = Locator.getLoader().resources;
    this.#createSprite()
  }

  update() {
    this.#sprite.texture = this.#resources[this.#data.texture].texture
    this.position.set(
      this.#data.position.x,
      this.#data.position.y,
    )
  }

  #createSprite() {
    this.#sprite = new Sprite(Texture.WHITE)
    // this.#sprite.width = 349;
    // this.#sprite.height = 304;
    this.#sprite.anchor.set(0.5)
    this.addChild(this.#sprite)
  }
}
