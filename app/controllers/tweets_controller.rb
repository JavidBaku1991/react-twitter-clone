# filepath: /d:/react-twitter-clone/app/controllers/tweets_controller.rb
class TweetsController < ApplicationController
    before_action :authorize_request, only: [:create, :destroy]
  
    def index
      tweets = Tweet.all.order(created_at: :desc)
      render json: tweets, status: :ok
    end
  
    def create
      tweet = @current_user.tweets.build(tweet_params)
      if tweet.save
        render json: tweet, status: :created
      else
        render json: { errors: tweet.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def destroy
      tweet = @current_user.tweets.find(params[:id])
      if tweet.destroy
        head :no_content
      else
        render json: { errors: tweet.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def tweet_params
      params.require(:tweet).permit(:content)
    end
  
    def authorize_request
      header = request.headers['Authorization']
      header = header.split(' ').last if header
      decoded = JWT.decode(header, Rails.application.secrets.secret_key_base)[0]
      @current_user = User.find(decoded['user_id'])
    rescue ActiveRecord::RecordNotFound, JWT::DecodeError
      render json: { errors: ['Unauthorized'] }, status: :unauthorized
    end
  end