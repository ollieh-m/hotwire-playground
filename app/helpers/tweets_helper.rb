module TweetsHelper
  def form_attributes(error_handling_test)
    case error_handling_test
    when "prevent_default"
      prevent_default_error_handling
    when "custom_event"
      custom_event_error_handling
    when "without_turbo"
      without_turbo_error_handling
    else
      {}
    end
  end

  def prevent_default_error_handling
    {
      data: {
        controller: "prevent-default",
        action: "submit->prevent-default#dummySubmit turbo:before-fetch-response@document->prevent-default#preventDefault"
      },
      url: tweets_url(error_handling_test: "prevent_default")
    }
  end

  def custom_event_error_handling
    {
      data: {
        controller: "custom-event",
        action: "error->custom-event#handleError"
      },
      url: tweets_url(error_handling_test: "custom_event")
    }
  end

  def without_turbo_error_handling
    {
      data: {
        controller: "without-turbo",
        without_turbo_success_path: tweets_url(error_handling_test: "without_turbo"),
        action: "ajax:error->without-turbo#handleError ajax:success->without-turbo#handleSuccess"
      },
      local: false,
      url: tweets_url(error_handling_test: "without_turbo")
    }
  end
end
