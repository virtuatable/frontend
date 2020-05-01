module Controllers
  class Base < Sinatra::Base
    configure do
      set :root, File.absolute_path(File.join(__dir__, '..'))
      set :public_folder, File.join(settings.root, 'public')
      set :views, File.join(settings.root, 'views')
      set :logger, Logger.new(STDOUT)

      use Rack::Session::Cookie, secret: ENV['SESSION_SECRET']
      use Rack::Csrf, raise: true
    end
    
    helpers do
      def csrf_tag; Rack::Csrf.tag(env); end
    end

    def js_files
      simplify_files('js')
    end

    def css_files
      simplify_files('css')
    end

    def simplify_files(folder)
      Dir[File.join(settings.root, 'public', folder, '**', "*.#{folder}")].map do |file|
        file.gsub(File.join(settings.root, 'public'), '')
      end
    end
  end
end