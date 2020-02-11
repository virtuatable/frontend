module Services
  class Forwarding
    include Singleton

    attr_accessor :app_key

    def forward(body)
      @body = parse_body(body)
      @url = @body.delete('url')
      @verb = @body.delete('method').downcase || 'get'

      @forwarded = get_connection.send(@verb) do |forwarded_request|
        if ['get', 'delete'].include? @verb
          forwarded_request.url @url, @body
        else
          forwarded_request.url @url
          forwarded_request.body = @body.to_json
        end
        forwarded_request.headers['Content-Type'] = 'application/json'
        forwarded_request.options.timeout = 20
        forwarded_request.options.open_timeout = 20
      end
    end

    def parse_body(body)
      body = JSON.parse(body.read.to_s) rescue {}
      body['app_key'] = app_key
      return body
    end

    def load
      unless ENV.key?('APP_KEY')
        raise Utils::Exceptions::Environment.new('APP_KEY')
      end
      @app_key = ENV['APP_KEY']
    end

    def get_connection
      gateway = Services::Configuration.instance.gateways.sample
      return Faraday.new(gateway) do |faraday|
        faraday.request  :url_encoded
        faraday.response :logger
        faraday.adapter  Faraday.default_adapter
      end
    end
  end
end
