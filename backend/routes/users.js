const { Router } = require('express');
const Joi = require('Joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const auth = require('../middlewares/auth');

const router = Router();

router.get('/me', auth, async (req, res) => {
  const id = req.user._id;

  const user = await User.findOne({ _id: id });

  res.send(user);
});

router.post('/', async (req, res) => {
  // validate the entring payload

  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send('Invalid email or password');

  // does the user already exist ?
  let user = await User.findOne({ email: req.body.email }).exec();

  if (user) return res.status(400).send('Email already registered');

  user = new User(req.body);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  res.send(token);
});

module.exports = router;
