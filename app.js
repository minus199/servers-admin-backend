const express = require('express');
const middlewares = require("./middlewares");
const indexRouter = require("./routes/index");
const serversRouter = require("./routes/servers");

const app = express();
app.use(middlewares.common)

app.use('/', indexRouter);
app.use('/servers', [middlewares.dbConn], serversRouter);

app.listen(3000, () => console.log('Server is up!'))