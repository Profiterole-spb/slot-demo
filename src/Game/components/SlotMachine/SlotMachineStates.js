import State from "../State/State.js";
import Locator from "../../../Services/Locator.js";
import {SLOT_STATES} from "../../States/Slot/SlotStates.js";

export const SM_STATES = {
  SM_IDLE: 0,
  SM_STARTING: 1,
  SM_SPINNING: 2,
  SM_STOPPING: 3,
  SM_STOP: 4
}

export class SmIdleState extends State {
  #slotMachine;
  constructor(slotMachine) {
    super('SM_IDLE_STATE');
    this.#slotMachine = slotMachine
  }

  enter() {
    super.enter();
  }

  handleInput() {

  }
}

export class SmStartingState extends State{
  #slotMachine;
  #startingDelay;
  #time;
  #counter;
  constructor(slotMachine) {
    super('SM_STARTING_STATE');
    this.#slotMachine = slotMachine
    this.#startingDelay = 200;
    this.#time = 0;
  }

  enter() {
    super.enter();
    this.#time = 0;
    this.#counter = -1;
  }

  handleInput() {
    this.#time += Locator.getClock().delta
    const currentCount = Math.trunc(this.#time / this.#startingDelay)
    if (this.#counter !== currentCount && this.#counter < this.#slotMachine.reels.length - 1) {
      this.#counter += 1;
      this.#slotMachine.reels[this.#counter].spin()
    }

    const areReelsSpinning = this.#slotMachine.reels.every(reel => {
      return reel.currentState.name === 'REEL_SPINNING_STATE'
    })
    if (areReelsSpinning) {
      this.#slotMachine.setState(SM_STATES.SM_SPINNING)
    }
  }
}

export class SmSpinningState extends State{
  #slotMachine;
  constructor(slotMachine) {
    super('SM_SPINNING_STATE');
    this.#slotMachine = slotMachine
  }

  enter() {
    super.enter();
  }

  handleInput() {

  }
}

export class SmStoppingState extends State{
  #slotMachine;
  constructor(slotMachine) {
    super('SM_STOPPING_STATE');
    this.#slotMachine = slotMachine
  }

  enter() {
    super.enter();
  }

  handleInput() {
    const areReelsStop = this.#slotMachine.reels.every(reel => {
      return reel.currentState.name === 'REEL_IDLE_STATE'
    })
    if (areReelsStop) {
      this.#slotMachine.setState(SM_STATES.SM_STOP)
    }
  }
}

export class SmStopState extends State{
  #slotMachine;
  constructor(slotMachine) {
    super('SM_STOP_STATE');
    this.#slotMachine = slotMachine
  }

  enter() {
    super.enter();
  }

  handleInput() {
    this.#slotMachine.setState(SLOT_STATES.IDLE)
  }
}
