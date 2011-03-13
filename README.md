# MongoProvider

Base on [node-mongo-native](https://github.com/christkv/node-mongodb-native)

# API

## MongoProvider

* Bridge all the method from Collection
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
* additional method
    collection(callback(err,collection))
    findItems(..., callback(err, itemsArray))
### example

> MongoProvider = require("mongo-provider").MongoProvider;
> var db = new Db("provider-example", new Server(host, port), {});
> var users = new MongoProvider(db, "users");
> users.insert([ { 'a': 1 }, { 'a': 2 }, { 'b': 3 } ], function(docs) {
>   users.count(function(err, count) {
>     return sys.puts("There are " + count + " records.");
>   });
>   users.find(function(err, cursor) {
>     sys.puts("Printing docs from Cursor Each");
>     return cursor.each(function(err, doc) {
>       if (doc !== null) {
>         return sys.puts("Doc from Each " + sys.inspect(doc));
>       }
>     });
>   });
>   users.findItems({}, { 'skip': 1, 'limit': 1, 'sort': 'a' }, function(err, docs) {
>     return sys.puts("Returned #" + docs.length + " documents");
>   });
> }
