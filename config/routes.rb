Rails.application.routes.draw do
  resources :users
  resources :videos
  root to: redirect('/teacher')
  get 'teacher', to: 'teacher_view#index'
end
