import State from "../State/State.js";
import Locator from "../../../Services/Locator.js";

export const REEL_STATES = {
  IDLE: 0,
  STARTING: 1,
  SPINNING: 2,
  STOPPING: 3,
}

const REEL_VELOCITY = 0.2

export class ReelIdleState extends State {
  constructor() {
    super('REEL_IDLE_STATE');
  }

  enter() {
    super.enter();
    this.velocity = 0;
  }

  handleInput() {

  }
}

export class ReelStartingState extends State {
  #reel
  constructor(reel) {
    super('REEL_STARTING_STATE');
    this.#reel = reel
  }

  enter() {
    super.enter();
    this.velocity = 0;
    this.time = 0
  }

  handleInput() {
    this.time += Locator.getClock().delta
    this.velocity += (0.001 * this.time) ** 2
    if (this.velocity >= 0.3) {
      this.#reel.setState(REEL_STATES.SPINNING)
    }
  }
}

export class ReelSpinningState extends State {
  #reel
  constructor(reel) {
    super('REEL_SPINNING_STATE');
    this.#reel = reel
  }

  enter() {
    super.enter();
    this.velocity = REEL_VELOCITY
  }

  handleInput() {

  }
}

export class ReelStoppingState extends State {
  #reel
  #stopPosition
  #time
  constructor(reel) {
    super('REEL_STOPPING_STATE');
    this.#reel = reel
  }

  enter() {
    super.enter();
    this.#time = 0
    this.#stopPosition = this.#reel.data.stopPosition
    this.velocity = REEL_VELOCITY
  }

  handleInput() {
    this.time += Locator.getClock().delta
    if (this.#reel.data.position > this.#stopPosition + 0.3 && this.#reel.data.position < this.#stopPosition + 0.6) {
      this.velocity = -REEL_VELOCITY / 7
    } else if (this.velocity < 0 && this.#reel.data.position <= this.#stopPosition) {
      this.#reel.data.position = this.#stopPosition
      this.#reel.setState(REEL_STATES.IDLE)
    }
  }
}
