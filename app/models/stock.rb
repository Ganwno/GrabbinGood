class Stock < ApplicationRecord
    validates :company_name, :description, :stock_symbol, :price, presence: true
    validates :company_name, uniqueness: true
    validates :stock_symbol, uniqueness: true

    has_many :watchlists,
    primary_key: :id,
    foreign_key: :stock_id,
    class_name: :Watchlist
end