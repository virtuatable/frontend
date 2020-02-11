module Utils
  module Exceptions
    class Environment < StandardError

      attr_accessor :key

      def initialize(key)
        @key = key
      end

      def to_json
        {
          key: key
        }
      end
    end
  end
end