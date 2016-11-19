Rails.application.routes.draw do
  resources :users
  resources :videos
  get 'teacher', to: 'teacher_view#index'
end
