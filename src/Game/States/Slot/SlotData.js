import SlotMachineData from "../../components/SlotMachine/SlotMachineData.js";

export default class SlotData {
  constructor() {
    this.slotMachine = new SlotMachineData()
    this.bets = [1, 10, 50, 100, 200, 500, 1000]
    this.currentBet = 0;
  }
}
