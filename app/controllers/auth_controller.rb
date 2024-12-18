# filepath: /d:/react-twitter-clone/app/controllers/auth_controller.rb
class AuthController < ApplicationController
  def signup
    user = User.new(user_params)
    if user.save
      token = encode_token({ user_id: user.id })
      render json: { token: token }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      token = encode_token({ user_id: user.id })
      render json: { token: token }, status: :ok
    else
      render json: { errors: ['Invalid email or password'] }, status: :unauthorized
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end