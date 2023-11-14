 MongoClient=require("mongodb");
let dbConnection;
 connectToDb=(cb) => {
    MongoClient.connect("mongodb://0.0.0.0:27017/poc_hash_storage")
    /*,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }).connection;*/
       .then((client) => {
            dbConnection = client.db();
            console.log('client connecté')
            return cb();
        })
        .catch((err) => {
            console.log(err);
            return cb(err);
        });/*
        mongoose.on('error', function(err) { console.log(err.message); });
        mongoose.once('open', function() {
        console.log("mongodb connection open");*/
        //});
}
getDb = () => { return dbConnection; }