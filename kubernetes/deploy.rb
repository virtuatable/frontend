require 'faraday'
require 'json'

# This sleep is here to prevent the non-actualization of the cache
# on the docker side that would take the previous image to deployment.
sleep(10)

url = "https://registry.hub.docker.com/v2/repositories/virtuatable/frontend/tags"
body = JSON.parse(Faraday.get(url).body)
version = body['results'][0]['name']

content = File.read(File.join(__dir__, 'kubernetes.yml'))
content.gsub!('{{version}}', version)

puts content