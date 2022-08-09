import {Container, Sprite, Texture} from "pixi.js";
import Locator from "../../../Services/Locator.js";
import SlotMachineView from "../../components/SlotMachine/SlotMachineView.js";

export default class SlotScreen extends Container {
  #data;
  #resources;
  #background;
  #spinBtn;
  #slotMachine;
  constructor(data) {
    super();
    this.#data = data;
    this.#resources = Locator.getLoader().resources;
    this.#createScene();
  }

  update(deltaMS) {
    this.#slotMachine.update(deltaMS)
  }

  #createScene() {
    this.#createSlotMachine();
    this.#createBackground();
    this.#createSpinBtn();
  }

  #createSlotMachine() {
    this.#slotMachine = new SlotMachineView(this.#data.slotMachine)
    this.#slotMachine.position.set(
      570,
      500
    )
    this.addChild(this.#slotMachine)
  }

  #createBackground() {
    this.#background = new Sprite(this.#resources['Background'].texture)
    this.#background.cacheAsBitmap = true;
    this.addChild(this.#background)
  }

  #createSpinBtn() {
    this.#spinBtn = new Sprite(this.#resources['Spin'].texture)
    this.#spinBtn.anchor.set(0.5)
    this.#spinBtn.position.set(
      Locator.getRenderer().width / 2,
      Locator.getRenderer().height - 150,
    )
    this.addChild(this.#spinBtn)

    this.#spinBtn.interactive = true;
    this.#spinBtn.on('pointerup', this.#handleClickOnSpinBtn, this)
  }

  #handleClickOnSpinBtn() {
    this.emit('clickOnSpin')
  }
}
