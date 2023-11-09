import { MongoClient } from "mongodb";

let dbConnection;
export function connectToDb(cb) {
    MongoClient.connect("mongodb://0.0.0.0:27017/poc_hash_storage")
        .then((client) => {
            dbConnection = client.db();
            return cb();
        })
        .catch((err) => {
            console.log(err);
            return cb(err);
        });
}
export function getDb() { return dbConnection; }