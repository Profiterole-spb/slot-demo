import {
  SM_STATES,
  SmIdleState,
  SmSpinningState,
  SmStartingState,
  SmStoppingState,
  SmStopState
} from "./SlotMachineStates.js";
import Reel from "../Reel/Reel.js";

export default class SlotMachine {
  #data
  #states
  #reels

  get reels() {
    return this.#reels
  }

  constructor(data) {
    this.#data = data
    this.#createStates()
    this.#createReels()
    this.setState(SM_STATES.SM_IDLE)
  }

  spin() {
    this.setState(SM_STATES.SM_STARTING)
  }

  stop(positions) {
    this.#reels.forEach((reel, index)=> reel.stop(positions[index]))
    this.setState(SM_STATES.SM_STOPPING)
  }

  update(deltaMS) {
    this.currentState.handleInput()
    this.#reels.forEach(reel => reel.update(deltaMS))
  }

  setState(state) {
    if (!this.#states[state]) {
      return;
    }
    this.currentState = this.#states[state]
    this.currentState.enter()
  }

  #createStates() {
    this.#states = [
      new SmIdleState(this),
      new SmStartingState(this),
      new SmSpinningState(this),
      new SmStoppingState(this),
      new SmStopState(this)
    ]
  }

  #createReels() {
    this.#reels = this.#data.reels.map((reelData) => {
      return new Reel(reelData)
    })
  }
}
