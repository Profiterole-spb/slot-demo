
export default class Bridge {
  constructor() {

  }

  init() {

  }

  async spin() {
    return {
      positions: [
        this.#getRandomPosition(),
        this.#getRandomPosition(),
        this.#getRandomPosition()
      ],
      win: null
    }
  }

  #getRandomPosition() {
    return Math.trunc(Math.random() * 1000) % 6
  }
}
