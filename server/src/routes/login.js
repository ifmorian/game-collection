const express = require('express');
const router = express.Router();

const db = require('../db');

router.post('/register', (req, res) => {
  require('../models/User')(req.body, errorCode => {
    return res.send({
      errorCode: errorCode
    });
  })
});

router.post('/login', (req, res) => {
  db.loginUser(req.body.username, req.body.password, user => {
    if (user === undefined) {
      return res.send({
        errorCode: 2
      })
    }
    let session = req.session;
    session.userid = user['name'];
    res.send({
      errorCode: 1
    })
  }, err => {
    console.error(err);
    res.send({
      errorCode: 0
    });
  });
});

router.post('/isloggedin', (req, res) => {
  res.send(req.session.userid);
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      res.send(false);
    } else {
      res.send(true);
    }
  });
});


module.exports = router;