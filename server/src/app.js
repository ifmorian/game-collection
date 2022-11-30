const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

const cookieParser = require("cookie-parser");
const sessions = require('express-session');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessions({
  saveUninitialized: true,
  resave: false,
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir7671312312313",
  cookie: {
    maxAge: 60000,
    secure: true,
  }
}));
app.use(cookieParser("thisismysecrctekeyfhrgfgrfrty84fwir7671312312313"));

const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const io = require('socket.io')(server);

const db = require('./db');