import {Container} from "pixi.js";
import ReelView from "../Reel/ReelView.js";

export default class SlotMachineView extends Container{
  #data;
  #reels;
  constructor(data) {
    super();
    this.#data = data
    this.#createReels()
  }

  update() {
    this.#reels.forEach((reel) => reel.update())
  }

  #createReels() {
    this.#reels = this.#data.reels.map((reelData, index) => {
      const reel = new ReelView(reelData);
      reel.x = (349 + 40) * index;
      reel.y = -304 * Math.trunc(reelData.sequence.length / 2)
      return reel
    })
    this.addChild(...this.#reels)
  }
}
