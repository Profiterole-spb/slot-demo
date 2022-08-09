import SymbolData from "../Symbol/SymbolData.js";
import {SYMBOL_TYPES} from "../Symbol/SymbolTypes.js";

export default class ReelData {
  constructor() {
    this.sequence = ['A', 'A', 'B', 'C', 'B', 'A'];
    this.position = 0;
    this.distanceBetweenSymbols = 304;
    this.stopPosition = 0
    this.#createSymbols()
  }

  #createSymbols() {
    this.symbols = this.sequence.map(symbolName => {
      return new SymbolData(new SYMBOL_TYPES[symbolName])
    })
  }
}
