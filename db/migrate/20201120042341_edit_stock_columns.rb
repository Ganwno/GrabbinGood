class EditStockColumns < ActiveRecord::Migration[5.2]
  def change
    change_column :stocks, :price, :float
  end
end
