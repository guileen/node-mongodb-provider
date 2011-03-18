###
Part of codes borrow from mongoose
https://github.com/LearnBoost/mongoose/blob/master/lib/mongoose/connection.js
###
url = require 'url'

exports.connect = (host, database, port, callback) ->
  if typeof database isnt 'string'
    uri = url.parse host
    host = uri.hostname
    port = uri.port || 27017
    callback = database
    database = uri.pathname.replace(/\//g, '')
  else
    callback or= port
    port = typeof port == 'number' ? port : 27017

  # handle authentication
  if uri and uri.auth
    auth = uri.auth.split(':')
    user = auth[0]
    pass = auth[1]
  else 
    user = pass = undefined
  
  if (!host) 
    if ('function' == typeof callback)
      callback(new Error('Please provide a valid hostname.'))
    return this

  if (!database) 
    if ('function' == typeof callback)
      callback(new Error('Please provide a database to connect to.'))

  db = new Db(database, new Server(host, port))
  db.open callback
  return db

