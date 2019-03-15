// run this file to populate the db in the first time

const dataProvider = require("./fakedata-provider");
const dbService = require("./service/db")
const client = dbService.newClient();


client.connect().then(async _ => {
    const initialData = await dataProvider.getServers();
    const db = client.db(dbService.dbName);
    const res = await db.collection('servers').insertMany(initialData);
    // assert.equal(initialData.length, res.insertedCount);
    client.close();
});