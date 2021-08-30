Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/reveal_image', to: 'main#reveal_image'

  get '/reveal_till_now', to: 'main#reveal_till_now'

  get '/', to: 'main#index'
end
