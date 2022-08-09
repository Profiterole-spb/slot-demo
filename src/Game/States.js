
import LoadingController from "./States/Loading/LoadingController.js";
import LoadingScreen from "./States/Loading/LoadingScreen.js";
import LoadingData from "./States/Loading/LoadingData.js";
import SlotData from "./States/Slot/SlotData.js";
import SlotScreen from "./States/Slot/SlotScreen.js";
import Slot from "./States/Slot/Slot.js";
import State from "./components/State/State.js";

export const GAME_STATES = {
  LOADING: 0,
  SLOT: 1,
  RULES: 2,
  SETTINGS: 3,
  ERROR: 4
}

export class LoadingState extends State {
  #game;
  constructor(game) {
    super('LOADING')
    this.#game = game
    this.screen = null;
    this.controller = null;
    this.data = null;
  }

  enter() {
    super.enter()
    this.data = new LoadingData()
    this.screen = new LoadingScreen(this.data)
    this.controller = new LoadingController(this.screen, this.data)
    this.controller.load()
  }

  handleInput() {
    if (this.data.complete) {
      this.controller = null;
      this.screen.destroy();
      this.screen = null;
      this.data = null;

      this.#game.setState(GAME_STATES.SLOT)
    }
  }
}

export class SlotState extends State {
  #game;
  constructor(game) {
    super('SLOT')
    this.#game = game;
    this.screen = null;
    this.controller = null;
    this.data = null;
  }

  enter() {
    super.enter()
    this.data = new SlotData()
    console.log('slotData', this.data)
    this.screen = new SlotScreen(this.data)
    this.controller = new Slot(this.screen, this.data)
  }

  handleInput() {

  }
}


export class RulesState extends State {
  #game;
  constructor(game) {
    super('RULES')
    this.#game = game;
    this.screen = null;
  }

  enter() {

  }

  handleInput() {

  }
}

export class SettingsState extends State {
  #game;
  constructor(game) {
    super('SETTINGS')
    this.#game = game;
    this.screen = null;
  }

  enter() {

  }

  handleInput() {

  }
}

export class ErrorState extends State {
  #game;
  constructor(game) {
    super('ERROR')
    this.#game = game
  }

  enter() {

  }

  handleInput() {

  }
}

