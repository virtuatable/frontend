module Controllers
  class Api < Controllers::Base
    post '/' do
      begin
        forwarded = Services::Forwarding.instance.forward(request.body)
        halt forwarded.status, forwarded.body
      rescue Utils::Exceptions::Environment => exception
        halt 500, exception.to_json
      rescue Faraday::TimeoutError => exception
        halt 500, {error: 'timeout'}.to_json
      end
    end
  end
end