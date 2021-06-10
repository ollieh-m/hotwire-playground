import { Controller } from "stimulus"

export default class extends Controller {
  static values = {
    payload: Object
  }

  connect() {
    this.element.dispatchEvent(
      new CustomEvent("error", { bubbles: true, detail: { payload: this.payloadValue } })
    )

    this.payloadValue = undefined
  }
}
