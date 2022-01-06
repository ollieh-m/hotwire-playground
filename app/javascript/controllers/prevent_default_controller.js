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
      // Note that if the response content-type is turbo-stream or the status is 4XX or 5XX,
      // Turbo's default behaviour won't error anyway -
      // so we could use the JSON and _allow_ the default behaviour
      event.preventDefault()

      // Turbo itself uses clone() when reading the response, so the response is never locked
      const json = await event.detail.fetchResponse.response.clone().json()
      console.log("Do stuff with the json...", json)
    }
  }
}
