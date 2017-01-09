source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.0.0', '>= 5.0.0.1'
# Use postgresql as the database for Active Record
gem 'pg', '~> 0.18'
# Use Puma as the app server
gem 'puma', '~> 3.0'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'
gem 'best_in_place', '~> 3.0.1'
gem 'turbolinks', '~> 5.0.0'
# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

gem 'rb-readline'
#make pry work
gem 'figaro'
#hide your stuff
gem 'active_model_serializers', '~> 0.10.0'
#api serializers
gem 'faraday'
#for http requests
gem 'faker'
# for seed data
gem 'd3-rails'

gem "slugify"

gem 'rails_12factor', group: :production


group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
  gem 'pry'
  #duh
  gem 'launchy'
  #because restarting the server every time sucks
  gem 'rspec-rails'
  #testing suite
  gem 'capybara'
  #headless browser feature testing
  gem 'factory_girl_rails'
  #creating objects for tests
  gem 'simplecov'
  #so we can tell what's being hit by tests
  gem 'database_cleaner'
  #keep it clean

  gem 'table_print'
  #pretty print tables
end

group :test do
  gem 'vcr'
  #for testing our api's - avoid hitting rate limits
  gem 'webmock'
  #used in conjuction with vcr to intercept out web calls
  gem 'selenium-webdriver'
end

  group :development do
    # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
    gem 'web-console'
    gem 'listen', '~> 3.0.5'
  end

  # Windows does not include zoneinfo files, so bundle the tzinfo-data gem
  gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
