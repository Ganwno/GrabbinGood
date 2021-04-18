class User < ApplicationRecord
    validates :username, :password_digest, :session_token, presence: true
    validates :username, uniqueness: true
    validates :password, length: {minimum: 6}, allow_nil: true 

    attr_reader :password

    after_initialize :ensure_session_token

    has_many :watchlists,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :Watchlist

    has_many :stocks,
    through: :watchlists,
    source: :stock

    #password method is a setter method that stores password digest into db using bcrypt hashing function

    def password=(password) 
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password) 
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        return nil if user.nil?
        user.is_password?(password) ? user : nil
    end

    def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64(16)
        self.save!
        self.session_token
    end

    private
    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64(16)
    end


end