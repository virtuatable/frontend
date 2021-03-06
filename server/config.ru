require 'bundler'
Bundler.require(ENV['RACK_ENV'].to_sym || :development)

Dotenv.load

require 'singleton'
require 'logger'
require 'yaml'

require './utils/exceptions/environment.rb'
require './controllers/base.rb'
require './controllers/frontend.rb'
require './controllers/api.rb'
require './services/forwarding.rb'
require './services/configuration.rb'

Services::Forwarding.instance.load
Services::Configuration.instance.load

map('/api') { run Controllers::Api.new }
run Controllers::Frontend.new