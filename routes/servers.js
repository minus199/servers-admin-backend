const serversRouter = require('express').Router();
const servicesRouter = require("./services");

// get all servers
serversRouter.get('/', async (req, res) => {
  const collection = req.dbConn.collection('servers')
  const servers = await collection.find({});
  servers.toArray().then(arrayData => res.json(arrayData))
});

// create a new server (req.body should be the same as a server doc in mongo)
serversRouter.post('/', function (req, res, next) {
  const collection = req.dbConn.collection('servers')
  collection.insertOne(req.body).then(doc => res.json({ status: 'OK', server: doc }))
});

// get one server by external id
serversRouter.get('/:id', async (req, res) => {
  const collection = req.dbConn.collection('servers')
  const server = await collection.findOne({ externalId: req.params.id });
  res.json(server);
});

// replace the server in mongo with the server from req.body 
serversRouter.put('/:id', function (req, res, next) {
  // we need to use collection.updateOne here
  res.status(500).send("Need to implement")
});

// update some values in a specific server. the body of the request should contain only the field we want to update
//See the fetch in handleToggleServerStatus in App.js (react)
serversRouter.patch('/:id', async (req, res) => {
  const collection = req.dbConn.collection('servers')
  const updateServer = await collection.findOneAndUpdate(
    { externalId: req.params.id },
    {
      $set: req.body,
      $currentDate: { updated: true }
    }
  )

  res.json(updateServer.value);
});

// nested router. the middleware(second argument) is for passing the path params to the services router
serversRouter.use("/:id/services", async (req, res, next) => {
  const collection = req.dbConn.collection('servers')
  req.server = await collection.findOne({ externalId: req.params.id });
  next();
}, servicesRouter)

module.exports = serversRouter;
