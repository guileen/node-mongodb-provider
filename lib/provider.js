(function() {
  var Collection, MongoProvider, bind, method, name, _ref;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
  Collection = require("mongodb").Collection;
  MongoProvider = (function() {
    function MongoProvider(db, collectionName) {
      this.db = db;
      this.collectionName = collectionName;
    }
    MongoProvider.prototype.collection = function(fn) {
      if (this._collection) {
        return fn(void 0, this._collection);
      } else {
        return this.db.collection(this.collectionName, __bind(function(err, collection) {
          if (err) {
            return fn(err);
          } else {
            this._collection = collection;
            return fn(void 0, collection);
          }
        }, this));
      }
    };
    MongoProvider.prototype.findItems = function() {
      var args, fn, _i;
      args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), fn = arguments[_i++];
      return this.find.apply(this, __slice.call(args).concat([function(err, cursor) {
        if (err) {
          return fn(err);
        } else {
          return cursor.toArray(fn);
        }
      }]));
    };
    MongoProvider.prototype.findEach = function() {
      var args, fn, _i;
      args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), fn = arguments[_i++];
      return this.find.apply(this, __slice.call(args).concat([function(err, cursor) {
        if (err) {
          return fn(err);
        } else {
          return cursor.each(fn);
        }
      }]));
    };
    return MongoProvider;
  })();
  /*
    bind these methods from Collection.prototype to Provider

    methods:
      insert
      checkCollectionName
      remove
      rename
      insertAll
      save
      update
      distinct
      count
      drop
      findAndModify
      find
      normalizeHintField
      findOne
      createIndex
      ensureIndex
      indexInformation
      dropIndex
      dropIndexes
      mapReduce
      group
      options
  */
  bind = function(name, method) {
    return MongoProvider.prototype[name] = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.collection(function(err, collection) {
        if (err) {
          return args[args.length - 1](err);
        } else {
          return method.apply(collection, args);
        }
      });
    };
  };
  _ref = Collection.prototype;
  for (name in _ref) {
    method = _ref[name];
    bind(name, method);
  }
  exports.MongoProvider = MongoProvider;
}).call(this);
