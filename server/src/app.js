const express = require('express');
const app = express();
const port = 3000;

app.post('/', (req, res) => {
  res.send('Hello');
});

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const io = require('socket.io')(server);