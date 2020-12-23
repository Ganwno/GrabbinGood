class ChangingDatabase < ActiveRecord::Migration[5.2]
  def change

  create_table "stocks", force: :cascade do |t|
    t.string "company_name", null: false
    t.text "description", null: false
    t.string "stock_symbol", null: false
    t.float "price", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "account_balance", null: false
    t.index ["username"], name: "index_users_on_username"
  end

  create_table "watchlists", force: :cascade do |t|
    t.integer "stock_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "num_stocks", null: false
  end
  end
end
