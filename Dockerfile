FROM ruby:2.6.5

WORKDIR /frontend

COPY server /frontend

RUN gem install bundler:2.1.4
RUN bundle update --bundler

CMD rackup -p 80 -o 0.0.0.0 --env production