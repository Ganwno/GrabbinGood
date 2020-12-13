@user.watchlists.each do |watchlist|
    json.set! watchlist.stock.stock_symbol do 
        json.extract! watchlist, :id, :stock_id, :user_id, :num_stocks
        json.stock_symbol watchlist.stock.stock_symbol
    end
end

