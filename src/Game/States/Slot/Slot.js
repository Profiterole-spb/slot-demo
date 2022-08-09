import SlotMachine from "../../components/SlotMachine/SlotMachine.js";
import {SLOT_STATES, SlotIdleState, SlotSpinningState, SlotStopState, SlotWinState} from "./SlotStates.js";

export default class Slot {
  #data
  #screen
  #slotMachine
  #states

  get slotMachine() {
    return this.#slotMachine
  }

  constructor(screen, data) {
    this.#data = data
    this.#screen = screen
    this.#screen.on('clickOnSpin', this.#handleClickOnSpin, this)
    this.#slotMachine = new SlotMachine(this.#data.slotMachine)
    this.#createStates()
    this.setState(SLOT_STATES.IDLE)
  }

  spin() {
    this.setState(SLOT_STATES.SPINNING)
  }

  setState(state) {
    this.currentState = this.#states[state]
    this.currentState.enter()
  }

  update(deltaMS) {
    this.currentState.handleInput()
    this.#slotMachine.update()
  }

  #handleClickOnSpin() {
    if (this.#slotMachine.currentState.name !== 'SM_IDLE_STATE') return;
    this.spin()
  }

  #createStates() {
    this.#states = [
      new SlotIdleState(this),
      new SlotSpinningState(this),
      new SlotStopState(this),
      new SlotWinState(this)
    ]
  }
}
