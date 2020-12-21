class EditingUserToIncludeDatabaseConstraints < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :account_balance, :decimal, null:false
  end
end
