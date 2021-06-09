const express = require('express');
// import orderController from './controllers/orders.js'
const orderController = require('./controllers/orders');
const app = express();

app.use(express.json());

app.use(orderController);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
