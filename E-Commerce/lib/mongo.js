const { MongoClient, ObjectId } = require("mongodb");
const debug = require("debug")("app:mongo");
const { config } = require("../config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
// console.log("PASSWORD " + PASSWORD);
const DB_NAME = config.dbName;

// Alternative URI
// Si usas Atlas, no es necesario declarar el puerto en el URI
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/test?retryWrites=true&w=majority`; // prettier-ignore

class MongoLib {
  constructor() {
    console.log(MONGO_URI);
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
    // this.connect();
  }

  connect() {
    console.log("Estamos aqui");

    return new Promise((resolve, reject) => {
      this.client.connect((error) => {
        if (error) {
          console.log(error);
          reject(error);
        }

        console.log("Connected succesfully to mongo");
        resolve(this.client.db(this.dbName));
      });
    });
  }

  getAll(collection, query) {
    return this.connect().then((db) => {
      return db.collection(collection).find(query).toArray();
    });
  }

  get(collection, id) {
    return this.connect().then((db) => {
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  create(collection, data) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).insertOne(data);
      })
      .then((result) => result.insertedId);
  }

  update(collection, id, data) {
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      })
      .then((result) => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(() => id);
  }
}

module.exports = MongoLib;
