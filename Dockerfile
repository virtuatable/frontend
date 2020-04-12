FROM ruby:2.6.5

WORKDIR /frontend

COPY . /frontend

RUN gem install bundler:{{bundler}}
RUN bundle update --bundler
RUN bundle install

CMD rackup -p {{port}} -o 0.0.0.0 --env production