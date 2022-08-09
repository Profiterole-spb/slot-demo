import State from "../../components/State/State.js";
import Locator from "../../../Services/Locator.js";

export const SLOT_STATES = {
  IDLE: 0,
  SPINNING: 1,
  STOP: 2,
  WIN: 3
}

export class SlotIdleState extends State {
  #slot
  constructor(slot) {
    super('SLOT_IDLE_STATE');
    this.#slot = slot
  }

  enter() {
    super.enter();
  }

  handleInput() {

  }
}

export class SlotSpinningState extends State {
  #slot
  #time
  #spinningPeriod
  #result
  constructor(slot) {
    super('SLOT_SPINNING_STATE');
    this.#slot = slot
    this.#time = 0
    this.#spinningPeriod = 1000
    this.#result = null;
  }

  enter() {
    super.enter();
    this.#time = 0
    this.#result = null;
    Locator.getBridge().spin()
      .then((result) => {
        this.#result = result
      })

    this.#slot.slotMachine.spin()
  }

  handleInput() {
    this.#time += Locator.getClock().delta
    if (this.#time >= this.#spinningPeriod && this.#result) {
      this.#slot.slotMachine.stop(this.#result.positions)
      this.#slot.setState(SLOT_STATES.STOP)
    }
  }
}

export class SlotStopState extends State {
  #slot
  constructor(slot) {
    super('SLOT_STOP_STATE');
    this.#slot = slot
  }

  enter() {
    super.enter();
  }

  handleInput() {
    if (this.#slot.slotMachine.currentState.name === 'SM_IDLE_STATE') {
      this.#slot.setState(SLOT_STATES.IDLE)
    }
  }
}

export class SlotWinState extends State {
  constructor() {
    super('SLOT_WIN_STATE');
  }

  enter() {
    super.enter();
  }

  handleInput() {

  }
}
