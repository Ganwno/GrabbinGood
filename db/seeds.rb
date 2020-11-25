# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
Stock.delete_all

Stock.create!({company_name: 'Amazon', stock_symbol:"AMZN", price: 3111, description: "h"})
Stock.create!({company_name: 'Disney', stock_symbol:"DIS", price: 140.11, description: "h"})
Stock.create!({company_name: 'Apple', stock_symbol:"AAPL", price: 118.88, description: "h"})
Stock.create!({company_name: 'Starbucks', stock_symbol:"SBUX", price: 97.05, description: "h"})
Stock.create!({company_name: 'Tesla', stock_symbol:"TSLA", price: 493.15, description: "h"})
Stock.create!({company_name: 'Zoom', stock_symbol:"ZM", price: 414.18, description: "h"})
Stock.create!({company_name: 'Facebook', stock_symbol:"FB", price: 272.24, description: "h"})
Stock.create!({company_name: 'Nike', stock_symbol:"NKE", price: 130.01, description: "h"})
Stock.create!({company_name: 'Microsoft', stock_symbol:"MSFT", price: 211.95, description: "h"})
Stock.create!({company_name: 'AMD', stock_symbol:"AMD", price: 85.03, description: "h"})
Stock.create!({company_name: 'Boeing', stock_symbol:"BA", price: 202.50, description: "h"})
Stock.create!({company_name: 'American Airlines', stock_symbol:"AAL", price: 12.71, description: "h"})
Stock.create!({company_name: 'Delta Airlines', stock_symbol:"DAL", price: 37.44, description: "h"})
Stock.create!({company_name: 'Carnival', stock_symbol:"CCL", price: 17.96, description: "h"})
Stock.create!({company_name: 'GoPro', stock_symbol:"GPRO", price: 6.99, description: "h"})
Stock.create!({company_name: 'Pfizer', stock_symbol:"PFE", price: 36.43, description: "h"})
Stock.create!({company_name: 'Alibaba', stock_symbol:"BABA", price: 258.88, description: "h"})
Stock.create!({company_name: 'Moderna', stock_symbol:"MRNA", price: 94.10, description: "h"})
Stock.create!({company_name: 'Bank of America', stock_symbol:"BAC", price: 26.69, description: "h"})
Stock.create!({company_name: 'Snap', stock_symbol:"SNAP", price: 42.50, description: "h"})
Stock.create!({company_name: 'Fitbit', stock_symbol:"FIT", price: 7.17, description: "h"})
Stock.create!({company_name: 'Norwegian Cruise Line', stock_symbol:"NCLH", price: 20.85, description: "h"})
Stock.create!({company_name: 'United Airlines', stock_symbol:"UAL", price: 40.30, description: "h"})
Stock.create!({company_name: 'Netflix', stock_symbol:"NFLX", price: 483.79, description: "h"})
Stock.create!({company_name: 'Twitter', stock_symbol:"TWTR", price: 43.54, description: "h"})
Stock.create!({company_name: 'NVIDIA', stock_symbol:"NVDA", price: 533.53, description: "h"})
Stock.create!({company_name: 'Uber', stock_symbol:"UBER", price: 48.40, description: "h"})
Stock.create!({company_name: 'Walmart', stock_symbol:"WMT", price: 151.35, description: "h"})
Stock.create!({company_name: 'SONY', stock_symbol:"SNE", price: 88.85, description: "h"})
Stock.create!({company_name: 'Paypal', stock_symbol:"PYPL", price: 191.77, description: "h"})
