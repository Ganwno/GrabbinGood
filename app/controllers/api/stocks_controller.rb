class Api::StocksController < ApplicationController

    def index
        @stocks = Stock.all
        render "api/stocks/index"
    end

    def show
        @stock = Stock.find_by_id(params[:id])
    end

    
end