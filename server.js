const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('./dist'));

app.get('*', function (request, response) {
  response.sendFile(path.resolve(`./dist/index.html`));
});

app.listen(PORT, function () {
  console.log(`App listening on http://localhost:${PORT}`);
}); 
