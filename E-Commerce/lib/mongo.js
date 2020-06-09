const { config } = require("../config");
const { MongoClient } = require("mongodb");

// console.log("config " + encodeURIComponent(config));
// console.log("config2 " + config);

// console.log("config con Json.parse " + JSON.parse(config));
// console.log("config 3 : " + JSON.parse(config));

// console.log("config2 " + config);

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
// console.log("PASSWORD " + PASSWORD);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/?authSource=${DB_NAME}`;

// Alternative URI
// const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/test?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    console.log("Logueando password " + PASSWORD);
    console.log("Logueando la URI " + MONGO_URI);

    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect((error) => {
        if (error) {
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
}

module.exports = MongoLib;
