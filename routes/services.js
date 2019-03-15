const servicesRouter = require('express').Router();

//get all services for a server
servicesRouter.get('/', function (req, res, next) {
  res.json(req.server.services);
});

// add a service to a server
servicesRouter.post('/', function (req, res, next) {
  res.status(500).send("Need to implement")
});

//get a single service from a server.
//example: http://localhost:3000/servers/w42jt493zhb/services/SMTP:Client_Submission
servicesRouter.get('/:serviceName', function (req, res, next) {
  const serviceByName = req.server.services.find(service => service.name === req.params.serviceName)
  res.json(serviceByName);
});

servicesRouter.put('/:serviceName', function (req, res, next) {
  res.status(500).send("Need to implement")
});

servicesRouter.patch('/:serviceName', function (req, res, next) {
  res.status(500).send("Need to implement")
});

module.exports = servicesRouter;
