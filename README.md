# MongoProvider

Base on [node-mongo-native](https://github.com/christkv/node-mongodb-native)

# API

## MongoProvider

### Bridge all the method from Collection  

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

### additional method  

>     collection(callback(err,collection))
>     findItems(..., callback(err, itemsArray))
>     findEach(..., callback(err, item))

### example

>     MongoProvider = require("mongo-provider").MongoProvider;
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
>       user.findEach(function(err, doc) {
>         if (doc !== null) {
>           return sys.puts('Doc from findEach ' + sys.inspect(doc));
>         }
>       });
>       users.findItems({}, { 'skip': 1, 'limit': 1, 'sort': 'a' }, function(err, docs) {
>         return sys.puts("Returned #" + docs.length + " documents");
>       });
>     }
