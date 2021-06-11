class Tweet < ApplicationRecord
  validates :body, presence: true
end
