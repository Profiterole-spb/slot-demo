import {REEL_STATES, ReelIdleState, ReelSpinningState, ReelStartingState, ReelStoppingState} from "./ReelStates.js";

export default class Reel {
  #data
  #states
  get data() {
    return this.#data
  }

  constructor(data) {
    this.#data = data
    this.#createStates()
    this.setState(REEL_STATES.IDLE)
  }

  spin() {
    this.setState(REEL_STATES.STARTING)
  }

  stop(position) {
    if (typeof position !== 'number' || position >= this.#data.sequence.length) {
      console.error('Incorrect stop position')
      return;
    }
    this.#data.stopPosition = position
    this.setState(REEL_STATES.STOPPING)
  }

  update(delta) {
    this.currentState.handleInput();
    this.#spin();

    this.#data.symbols.forEach((symbol, index) => {
      const middleOffset = Math.trunc(this.#data.sequence.length / 2)
      const position = (this.#data.position + index + middleOffset) % this.#data.sequence.length
      symbol.position.y = position * this.#data.distanceBetweenSymbols
    })
  }

  setState(state) {
    this.currentState = this.#states[state]
    this.currentState.enter()
  }

  #spin() {
    this.#data.position += this.currentState.velocity
    if (this.#data.position >= this.#data.sequence.length) {
      this.#data.position = 0
    }
  }

  #createStates() {
    this.#states = [
      new ReelIdleState(this),
      new ReelStartingState(this),
      new ReelSpinningState(this),
      new ReelStoppingState(this)
    ]
  }
}
