const express = require("express");
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'http://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    }else{
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

app.get("/api", (req, res) => {
  res.send("Hello! I'm your new e-commerce :D");
});

app.get("/api/new-rute", (req,res) => {
  res.send("Hello, I'm a new rute");
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port,() => {
  console.log('My port ' + port);
});

