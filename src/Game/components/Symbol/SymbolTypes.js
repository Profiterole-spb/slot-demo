


class SymbolType {
  constructor(name, texture) {
    this.name = name;
    this.texture = texture;
  }
}

class SymbolA extends SymbolType {
  constructor() {
    super('A', 'Banana')
  }
}

class SymbolB extends SymbolType {
  constructor() {
    super('B', 'Blackberry')
  }
}

class SymbolC extends SymbolType {
  constructor() {
    super('B', 'Cherry')
  }
}

export const SYMBOL_TYPES = {
  A: SymbolA,
  B: SymbolB,
  C: SymbolC
}
