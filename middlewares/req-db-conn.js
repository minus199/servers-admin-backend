const dbService = require("../service/db");

//When a request goes through this middleware, it will get a db connection. Once the response has finished, the db connection will be closed by this mw
const dbConnMiddleware = (req, res, next) => {
    console.info("Connecting to db...");

    const client = dbService.newClient();

    client.connect().then(_ => {
        req.dbConn = client.db(dbService.dbName);
        console.info("Acquired connection to db");
        next()
    }).catch(next);

    res.on("finish", function () {
        // Its very important to not leave unused open connections
        console.info("Shutting down database connection (cleaning up resources)");
        client.close();
    });
};

module.exports = dbConnMiddleware;