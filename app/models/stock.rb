class Stock < ApplicationRecord
    validates :company_name, :description, :stock_symbol, :price, presence: true
    validates :company_name, uniqueness: true
    validates :stock_symbol, uniqueness: true
end