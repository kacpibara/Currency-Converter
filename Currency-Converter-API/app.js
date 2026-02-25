require('dotenv').config(); // loading variables from .env file 
const express = require('express'); // import express
const cors = require('cors'); // import cors

// middlewares import
const myRequestLogger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

// routes import
const indexRoutes = require('./routes/index');
const convertRoutes = require('./routes/convert');

const app = express();
const PORT = process.env.PORT || 3000; // load port from env else use 3000 default

// global middlewares
app.use(myRequestLogger);
app.use(cors());         // cors accepts frontend requests
app.use(express.json()); // json middleware


app.use('/', indexRoutes);
app.use('/convert', convertRoutes);

// errors logger
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server Working on http://localhost:${PORT}`);
});