const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const {check} = require('express-validator/check');

const User = require('../models/users');


router.post('/', [
  check('name').exists(),
  check('surname').exists(),
  check('email').isEmail(),
  check('age').isInt(),
],
function(req, res) {
  const newUser = new User(req.body);
  newUser.save(function(err) {
    if (err) return res.status(500).json({error: err});
    res.status(201).json(newUser);
  });
});

router.get('/', function(req, res) {
    User.find(function(err, users) {
      if (err) return res.status(500).json({error: err});
      res.json(users);
    });
  });

  

module.exports = router;