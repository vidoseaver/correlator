Rails.application.routes.draw do


  namespace :api do
    namespace :v1 do
      resources :country_cities, only: [:show]
    end
  end

  root to: "cities#index"

  get '/world_data', to: "cities#world_data"

  get '/tsv_data', to: "cities#tsv_data"

  resources :cities, only:[:show]

  namespace :api do
    namespace :v1 do
      resources :cities, only:[:index, :show]
      resources :countries, only:[:show]
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
