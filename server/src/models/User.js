const db = require('../db');

const User = async (credentials, cb) => {
  errorCode = 1;
  if (credentials.username === '')  errorCode *= 2;
  if (credentials.email === '')  errorCode *= 3;
  if (credentials.password === '')  errorCode *= 5;
  if (credentials.password !== credentials.repeatPassword)  errorCode *= 7;
  if(!(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(credentials.email))) errorCode *= 11;

  db.exists('name', credentials.username, exists => {
    if (exists) return cb(errorCode * 13);
    db.exists('email', credentials.email, exists => {
      if (exists) return cb(errorCode * 17);
      db.registerUser(credentials.username, credentials.email, credentials.password);
      return cb(errorCode);
    }, err => {
      console.error(err);
      return cb(0);
    });
  }, err => {
    console.error(err);
    return cb(0);
  });
};

module.exports = User;