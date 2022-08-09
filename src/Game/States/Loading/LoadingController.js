import Locator from "../../../Services/Locator.js";

export default class LoadingController {
  #data
  constructor(screen, data) {
    this.#data = data
  }

  update(deltaMS) {

  }

  load() {
    this.#data.loading = true;
    const loader = Locator.getLoader();
    loader.add(this.#data.assets)
    loader.load(() => {
      this.#data.loading = false;
      this.#data.complete = true;
    })
    loader.onProgress.add(() => {
      this.#data.progress = loader.progress
    });
  }
}
