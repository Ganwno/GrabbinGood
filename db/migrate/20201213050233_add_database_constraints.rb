class AddDatabaseConstraints < ActiveRecord::Migration[5.2]
  def change
    change_column :watchlists, :stock_id, :integer, null:false
    change_column :watchlists, :user_id, :integer, null:false
    change_column :watchlists, :num_stocks, :integer, null:false
  end
end
