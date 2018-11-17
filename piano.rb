require 'sinatra'
require 'json'

set :server, 'thin'
connections = []
enable :sessions

get '/' do
  session['color'] = params[:color].gsub(/\W/, '') if params[:color]
  halt erb(:login, layout: :layout) unless session['color']
  erb :piano, locals: { color: session['color'] }
end

get '/stream', provides: 'text/event-stream' do
  stream :keep_open do |out|
    connections << out
    out.callback { connections.delete(out) }
  end
end

post '/' do
  msg = { note: params[:note], color: session['color'] }
  connections.each { |out| out << "data: #{msg.to_json}\n\n" }
  204 # response without entity body
end
