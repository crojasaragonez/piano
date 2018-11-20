require 'sinatra'
require 'json'

set :server, 'thin'
connections = []

get '/' do
  halt erb(:login, layout: :layout) unless color
  erb :piano, locals: { color: color }
end

get '/stream', provides: 'text/event-stream' do
  stream :keep_open do |out|
    connections << out
    out.callback { connections.delete(out) }
  end
end

post '/' do
  msg = { note: params[:note], color: color }
  connections.each { |out| out << "data: #{msg.to_json}\n\n" }
  204 # response without entity body
end

def color
  @color ||= params[:color]
end
