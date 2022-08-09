
export default class SymbolData {
  #type
  constructor(type) {
    this.#type = type
    this.position = {x: 0, y: 0}
  }

  get texture() {
    return this.#type.texture
  }
}
