import EventEmitter from '../Services/EventEmitter.js';
import Locator from '../Services/Locator.js';
import {Renderer, Loader} from 'pixi.js';
import {SETTINGS} from './settings.js';
import Bridge from '../Services/Bridge.js';
import {ErrorState, GAME_STATES, LoadingState, SlotState} from "./States.js";
import GameData from "./GameData.js";

export default class Game extends EventEmitter {
  #states;
  #data

  constructor() {
    super();

    this.#data = new GameData()

    this.#setupServices()
    this.#setupClock()
    this.#setupStates()

    this.setState(GAME_STATES.LOADING)
  }

  update() {
    if (this.currentState.name === 'ERROR') return;
    this.currentState.handleInput();
    if (this.currentState.controller)
      this.currentState.controller.update();
    if (this.currentState.screen) {
      this.currentState.screen.update();
      Locator.getRenderer().render(this.currentState.screen, {clear: true});
    }
  }

  start() {
    Locator.getClock().run()
  }

  setState(state) {
    if (!this.#states[state]) {
      console.error(`The State [${state}] doesn't exist`)
      this.currentState = this.#states[GAME_STATES.ERROR]
      this.currentState.enter()
      return;
    }
    this.currentState = this.#states[state]
    this.currentState.enter()
  }

  #setupServices() {
    Locator.provideCanvas(document.querySelector('.webgl'));
    Locator.provideRenderer(new Renderer({view: Locator.getCanvas(), ...SETTINGS.renderer}));
    Locator.provideLoader(new Loader());
    Locator.provideBridge(new Bridge());
  }

  #setupClock() {
    Locator.getClock().addEventListener('tick', this.update, this);
  }

  #setupStates() {
    this.#states = [
      new LoadingState(this),
      new SlotState(this),
      null,
      null,
      new ErrorState(this)
    ]
  }
}
