class UsersController < ApplicationController
    def show
      user = User.find_by(username: params[:username])
      if user
        render json: user.tweets.order(created_at: :desc), status: :ok
      else
        render json: { errors: ['User not found'] }, status: :not_found
      end
    end
  end