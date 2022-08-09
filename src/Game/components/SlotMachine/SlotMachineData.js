import ReelData from "../Reel/ReelData.js";

export default class SlotMachineData {
  reels
  constructor() {
    this.reels = [
      new ReelData(),
      new ReelData(),
      new ReelData(),
    ]
  }
}
