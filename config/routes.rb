Rails.application.routes.draw do


  root to: "cities#index"

  resources :cities, only:[:show]

  namespace :api do
    namespace :v1 do
      resources :cities, only:[:index, :show]
      resources :countries, only:[:show]
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
