import {RESOURCES} from "../../resources.js";

export default class LoadingData {
  constructor() {
    this.progress = 0;
    this.complete = false;
    this.loading = false;
    this.assets = RESOURCES
  }
}
