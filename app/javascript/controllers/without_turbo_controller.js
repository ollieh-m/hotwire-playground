import { Controller } from "stimulus"
import { Turbo } from "@hotwired/turbo-rails"

export default class extends Controller {
  // Perform the request with UJS instead of Turbo.
  // Hook into the regular `ajax:error` event when the response is unsuccessful.
  // This means we cannot leverage the Turbo redirect.
  // Instead, visit the new page using `Turbo.visit`
  static values = {
    successPath: String
  }

  handleSuccess(event) {
    Turbo.visit(this.successPathValue, { action: "replace" })
  }

  handleError(event) {
    console.log(event)
  }
}
