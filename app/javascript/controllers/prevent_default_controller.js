import { Controller } from "stimulus"

export default class extends Controller {
  // Let Turbo make the request.
  // Check the response is unsuccessful, stop Turbo attempting to render the response.
  // Instead, use the JSON or (for example) emit a custom event similar to `ajax:error`.
  // If the response is successful, let Turbo handle the redirect.

  async preventDefault(event) {
    // Listening for turbo:before-fetch-response.
    // The response is available here and we can block Turbo's default behaviour.
    if (!event.detail.fetchResponse.succeeded) {
      event.preventDefault()

      // (Turbo itself uses clone() when reading the response, so the response is never locked)
      const json = await event.detail.fetchResponse.response.clone().json()
      console.log("Do stuff with the json...", json)
    }
  }
}
