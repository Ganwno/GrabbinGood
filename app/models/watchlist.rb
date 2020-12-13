class Watchlist < ApplicationRecord

    validates :stock_id, :user_id, presence: true
    
    belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

    belongs_to :stock,
    primary_key: :id,
    foreign_key: :stock_id,
    class_name: :Stock
end