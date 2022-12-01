const express = require('express');
const router = express.Router();

router.post('/create', (req, res) => {
  if (req.session.userid === undefined) return res.send({
    errorCode: 2
  });
  req.body.userid = req.session.userid;
  require('../models/Lobby')(req.body, errorCode => {
    res.send({
      errorCode: errorCode
    });
  })
});

module.exports = router;