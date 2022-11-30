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
  console.log(req.body);
  db.loginUser(req.body.username, req.body.password, user => {
    if (user === undefined) {
      return res.send({
        errorCode: 2
      })
    }
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    req.session.userid = user['name'];
    console.log(req.session)
    req.session.save(err => {
      if (err) return console.log(err);
      res.send({
        errorCode: 1
      })
    })
  }, err => {
    console.error(err);
    res.send({
      errorCode: 0
    });
  });
});

router.post('/isloggedin', (req, res) => {
  console.log(req.session);
  res.send('test');
})


module.exports = router;