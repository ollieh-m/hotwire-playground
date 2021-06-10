import { Controller } from "stimulus"
import Rails from "@rails/ujs"

export default class extends Controller {
  connect() {
    this.number = 0
  }
  // Let Turbo make the request.
  // Check the response is unsuccessful, stop Turbo attempting to render the response.
  // Instead, use the JSON or (for example) emit a custom event similar to `ajax:error`.
  // If the response is successful, let Turbo handle the redirect.

  // Test intercepting the request then resubmitting it...
  async dummySubmit(event) {
    this.number = this.number + 1
    if (this.number == 1) {
      event.preventDefault()
      event.stopImmediatePropagation()

      setTimeout(()=>{
        // This works - emitting 'submit' on the element - and triggers a Turbo submission
        Rails.fire(this.element, "submit")
      }, 3000)
    }
  }

  async preventDefault(event) {
    // The response is available here and we can block Turbo's default behaviour.
    // But the event target is `document`, and there isn't a way to check that we have the correct `fetchResponse` for the current form.
    // (We can store the `fetchResponse` in `turbo:submitEnd` but that happens after this event)
    if (!event.detail.fetchResponse.succeeded) {
      event.preventDefault()

      const json = await event.detail.fetchResponse.response.clone().json()
      console.log("Do stuff with the json...", json)
    }
  }
}
