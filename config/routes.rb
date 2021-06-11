Rails.application.routes.draw do
  resources :tweets, only: %i(index create)
end
