Rails.application.routes.draw do
  root 'home#index'
  get '/feeds' => 'feeds#index'
  get '/:username', to: 'users#show', as: 'user'

  # USERS
  post '/users' => 'users#create'

  # SESSIONS
  post '/sessions' => 'sessions#create'
  get '/authenticated' => 'sessions#authenticated'
  delete '/sessions' => 'sessions#destroy'

  # TWEETS
  post '/tweets' => 'tweets#create'
  get '/tweets' => 'tweets#index'
  delete '/tweets/:id' => 'tweets#destroy'
  get '/users/:username/tweets' => 'tweets#index_by_user'

  # Catch-all route to handle React Router paths
  get '*path', to: 'home#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end