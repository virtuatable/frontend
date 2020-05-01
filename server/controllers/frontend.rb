module Controllers
  class Frontend < Controllers::Base
    get '/' do
      erb :index
    end
  end
end