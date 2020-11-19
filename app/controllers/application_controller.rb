class ApplicationController < ActionController::Base
     protect_from_forgery with: :exception

    helper_method :current_user
    helper_method :logged_in?



    def current_user
        return nil unless session[:session_token]
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def logged_in?
        !current_user.nil?
    end

    def login_user!(user)
        user.reset_session_token!
        session[:session_token] = user.session_token
        @current_user = user
    end

    def logout_user!
        current_user.reset_session_token!
        session[:session_token] = nil
    end

    def ensure_logged_in
        redirect_to new_session_url unless logged_in?
    end 
end
