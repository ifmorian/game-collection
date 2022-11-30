const sqlite3 = require('sqlite3');

const usersTable = 'users';

const db = new sqlite3.Database('./databases/userdata.db', err => {
  if (err) return console.error(err.message);
  db.run(`CREATE TABLE IF NOT EXISTS ${usersTable} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`, err => {
    if (err) return console.error(err.message);
  });
});

function exists(column, value, cb, error) {
  sql = `SELECT COUNT() FROM ${usersTable} WHERE ${column}=?`;
  db.all(sql, [value], (err, rows) => {
    if (err) return error(err);
    // error(new Error())
    cb(rows[0]['COUNT()'] > 0);
  });
}

function loginUser(name, password, cb, error) {
  sql = `SELECT * FROM ${usersTable} WHERE name=? AND password=?`;
  db.all(sql, [name, password], (err, rows) => {
    if (err) return error(err);
    cb(rows[0]);
  })
}

function registerUser(name, email, password, error) {
  sql = `INSERT INTO ${usersTable} (name, email, password) VALUES(?,?,?)`;
  db.run(sql, [name, email, password], err => {
    if (err) return error(err);
  });
}

module.exports = { registerUser, exists, loginUser }