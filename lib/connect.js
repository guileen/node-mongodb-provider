(function() {
  /*
  Part of codes borrow from mongoose
  https://github.com/LearnBoost/mongoose/blob/master/lib/mongoose/connection.js
  */  var url;
  url = require('url');
  exports.connect = function(host, database, port, callback) {
    var auth, db, pass, uri, user, _ref;
    if (typeof database !== 'string') {
      uri = url.parse(host);
      host = uri.hostname;
      port = uri.port || 27017;
      callback = database;
      database = uri.pathname.replace(/\//g, '');
    } else {
      callback || (callback = port);
      port = (_ref = typeof port === 'number') != null ? _ref : {
        port: 27017
      };
    }
    if (uri && uri.auth) {
      auth = uri.auth.split(':');
      user = auth[0];
      pass = auth[1];
    } else {
      user = pass = void 0;
    }
    if (!host) {
      if ('function' === typeof callback) {
        callback(new Error('Please provide a valid hostname.'));
      }
      return this;
    }
    if (!database) {
      if ('function' === typeof callback) {
        callback(new Error('Please provide a database to connect to.'));
      }
    }
    db = new Db(database, new Server(host, port));
    db.open(callback);
    return db;
  };
}).call(this);
