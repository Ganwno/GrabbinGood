class Api::WatchlistsController < ApplicationController

   def create
    @watchlist = Watchlist.new(watchlist_params)
    @user = @watchlist.user
    if @watchlist.save
        render "api/users/watchlist"
    else
         render json: @watchlist.errors.full_messages, status: 422
    end
   end

   private
   def watchlist_params 
        params.require(:watchlist).permit(:stock_id, :user_id, :num_stocks)
    end

end