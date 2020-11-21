class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :company_name, null:false
      t.text :description, null:false
      t.string :stock_symbol, null:false
      t.integer :price, null:false
      t.timestamps
    end
  end
end
