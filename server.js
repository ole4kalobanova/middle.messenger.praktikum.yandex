// import authRouter from './src/pages/';
// import orderRouter from './routes/order.js';

const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('./dist'));

app.listen(PORT, function () {
  console.log(`App listening on http://localhost:${PORT}!`);
}); 
