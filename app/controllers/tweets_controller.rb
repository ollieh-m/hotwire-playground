class TweetsController < ApplicationController
  def index
    @tweets = Tweet.all
    @tweet = Tweet.new
  end

  def create
    @tweet = Tweet.new(tweet_params)

    respond_to do |format|
      if @tweet.save
        flash[:notice] = "Successfully created"
        format.json { render :show, status: :created }
        format.html { redirect_to tweets_url(error_handling_test: params[:error_handling_test]) }
      else
        error_response(format)
      end
    end
  end

  private

    def tweet_params
      params.require(:tweet).permit(:body)
    end

    def error_response(format)
      case params[:error_handling_test]
      when "prevent_default"
        format.turbo_stream { render json: @tweet.errors, status: :unprocessable_entity }
      when "custom_event"
        format.turbo_stream { render "pass_error" }
      when "without_turbo"
        format.json { render json: @tweet.errors, status: :unprocessable_entity }
      end
    end
end
