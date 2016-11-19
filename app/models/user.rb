class User < ApplicationRecord
  validates :name, uniqueness: true
  validates :email, uniqueness: true
  has_many :videos
end
