const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'hosting-admin-panel';

module.exports = {
    get dbName() {
        return dbName;
    },

    newClient() {
        return new MongoClient(url);
    }
}