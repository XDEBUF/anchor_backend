import { MongoClient } from "mongodb";
import pkg2 from 'mongoose';
const { mongoose } = pkg2;
let dbConnection;
export async function connectToDb(cb) {
    mongoose.connect("mongodb://0.0.0.0:27017/poc_hash_storage",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
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