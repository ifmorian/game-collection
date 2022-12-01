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
const Lobby = require('./models/Lobby');

io.on('connection', socket => {
  let cookie_string = socket.request.headers.cookie;
  let session = cookie_string !== undefined ? memoryStore.sessions[cookie_string.split('connect.sid=s%3A')[1].split('.')[0]] : undefined;
  if (session !== undefined) session = JSON.parse(session);

  function checkSession() {
    return session !== undefined;
  }
  socket.on('join-lobby', (name, password, cb) => {
    if (!checkSession()) {
      cb(0);
      return;
    }
    let lobby = Lobby.lobbies.find(l => { return l.name === name; })
    if (lobby === undefined) {
      cb(2);
      return;
    }
    if (lobby.password === password) {
      lobby.players.push(session.userid);
      socket.join(lobby.room);
      io.to(lobby.room).emit('update-lobby', lobby.name, lobby.owner, lobby.players)
      cb(1);
    } else {
      cb(3);
    }
  })
  socket.on('rejoin-lobby', (err) => { 
    if (!checkSession()) {
      err();
      return;
    }
    let lobby = Lobby.lobbies.find(l => { return l.players.includes(session.userid) })
    if (lobby === undefined) return;
    socket.emit('update-lobby', lobby.name, lobby.owner, lobby.players)
  })
});

const db = require('./db');
