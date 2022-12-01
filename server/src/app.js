const express = require('express');
const app = express();
const cors = require('cors');
const sessions = require('express-session');
const port = 3000;
const memoryStore = new sessions.MemoryStore();

const cookieParser = require("cookie-parser");

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessions({
  saveUninitialized: false,
  resave: false,
  store: memoryStore,
  secret: '1234',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: false,
    httpOnly: true
  }
}));
app.use(cookieParser());

const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

const lobbyRouter = require('./routes/lobby');
app.use('/lobby', lobbyRouter);

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const io = require('socket.io')(server, {
  cors: {
    origin: [
      'http://localhost:5173'
    ],
    credentials: true
  }
});

io.on('connection', socket => {
  let cookie_string = socket.request.headers.cookie;
  let session = memoryStore.sessions[cookie_string.split('connect.sid=s%3A')[1].split('.')[0]];

  function checkSession() {
    if (session === undefined) {
      socket.emit('no-session')
      return;
    }
  }

  console.log('Keine session');
  socket.on('join-lobby', (name, password, cb) => {
    
  })
});

const db = require('./db');