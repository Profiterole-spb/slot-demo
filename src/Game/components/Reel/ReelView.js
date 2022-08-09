import {Container} from "pixi.js";
import SymbolView from "../Symbol/SymbolView.js";

export default class ReelView extends Container {
  #data
  #symbols
  constructor(data) {
    super();
    this.#data = data;
    this.#createSymbols()
    // this.scale.set(0.4)
  }

  update(delta) {
    this.#symbols.forEach((symbol) => {
      symbol.update(delta)
    })
  }

  #createSymbols() {
    this.#symbols = this.#data.sequence.map((symbolName, index) => {
      return new SymbolView(this.#data.symbols[index])
    })
    this.addChild(...this.#symbols)
  }
}
