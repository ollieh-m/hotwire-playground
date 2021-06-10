import { Controller } from "stimulus"

export default class extends Controller {
  // Let Turbo make the request.
  // Let Turbo handle the `turbo_stream` response.
  // But use that response to render an element that emits a custom event containing the error payload.
  handleError(event) {
    const json = event.detail.payload
    console.log("Do stuff with the json...", json)
  }
}
