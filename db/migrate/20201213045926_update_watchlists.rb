class UpdateWatchlists < ActiveRecord::Migration[5.2]
  def change
    add_column :watchlists, :num_stocks, :integer
  end
end
