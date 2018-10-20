require 'sinatra'
require 'json'

set :server, 'thin'
connections = []
enable :sessions

get '/' do
  session['user'] = params[:user].gsub(/\W/, '') if params[:user]
  halt erb(:login, layout: :layout) unless session['user']
  erb :piano, locals: { user: session['user'] }
end

get '/stream', provides: 'text/event-stream' do
  stream :keep_open do |out|
    connections << out
    out.callback { connections.delete(out) }
  end
end

post '/' do
  msg = { note: params[:note], user: session['user'] }
  connections.each { |out| out << "data: #{msg.to_json}\n\n" }
  204 # response without entity body
end
