class HomeController < ApplicationController
  before_action :redirect_if_not_logged_in, except: [:index]

  def index
  end

  private

  def redirect_if_not_logged_in
    unless logged_in?
      redirect_to '/auth' unless request.path == '/auth'
    end
  end
end