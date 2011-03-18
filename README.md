# MongoProvider

Base on [node-mongodb-native](https://github.com/christkv/node-mongodb-native)

## Installation

>     npm install mongodb-provider

## Why MongoProvider

before 
>     db.collection('users', function(error, collection){ 
>      if(error)
>        log(error) 
>      else 
>        collection.find( function(error, cursor){
>          if(error)
>            log(error)
>          else
>            cursor.toArray(function(error, items){
>              if(error)
>                log(error)
>              else 
>                handle(items)
>            })
>         })
>      })
now
>     var userProvider = new MongoProvider(db, 'users')
>     userProvider.findItems(function(error,items){ 
>       if(error)
>         log(error)
>       eles
>         handle(items)
>     })

## MongoProvider

### Bridge all the methods from Collection  

>     checkCollectionName
>     count
>     createIndex
>     distinct
>     drop
>     dropIndex
>     dropIndexes
>     ensureIndex
>     find
>     findAndModify
>     findOne
>     group
>     indexInformation
>     insert
>     insertAll
>     mapReduce
>     normalizeHintField
>     options
>     remove
>     rename
>     save
>     update

### additional methods  

>     collection(callback(err,collection))
>     findItems(..., callback(err, itemsArray))
>     findEach(..., callback(err, item))

### example

>     MongoProvider = require("mongodb-provider").MongoProvider;
>     var db = new Db("provider-example", new Server(host, port), {});
>     var users = new MongoProvider(db, "users");
>     users.insert([ { 'a': 1 }, { 'a': 2 }, { 'b': 3 } ], function(docs) {
>       users.count(function(err, count) {
>         return sys.puts("There are " + count + " records.");
>       });
>       users.find(function(err, cursor) {
>         sys.puts("Printing docs from Cursor Each");
>         return cursor.each(function(err, doc) {
>           if (doc !== null) {
>             return sys.puts("Doc from Each " + sys.inspect(doc));
>           }
>         });
>       });
>       users.findEach(function(err, doc) {
>         if (doc !== null) {
>           return sys.puts('Doc from findEach ' + sys.inspect(doc));
>         }
>       });
>       users.findItems({}, { 'skip': 1, 'limit': 1, 'sort': 'a' }, function(err, docs) {
>         return sys.puts("Returned #" + docs.length + " documents");
>       });
>     }
