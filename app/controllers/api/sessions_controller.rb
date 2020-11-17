class Api::SessionsController < ApplicationController 
    def create
        @user = User.find_by_credentials(
        params[:user][:username],
        params[:user][:password]
        )

        if @user.nil?
            render json: ["Invalid username/password"], status: 401
        else
            login_user!(@user)
            render "api/users/show"
        end
    end

    def destroy
        @user = current_user
        if @user != nil
        logout_user!
        render json: {}
        
        else 
            
            render json: ["No one is signed in"], status: 404
        end
    end
end