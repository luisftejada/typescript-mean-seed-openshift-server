/// <reference path="../typings/index.d.ts" />
import { Config } from './config';

var jwt = require("jsonwebtoken");
var passwordHash = require("password-hash");
var express = require('express');

let api_router = express.Router();
let TWO_MONTHS = 60 * 24 * 60 * 60;

import * as model from './models' ;

api_router.get('/users', (req, res) => {
  model.getUsers()
    .then(users => {
      res.json({ users: users });
    })
});

// signin
api_router.post('/user/signin', (req, res) => {
  model.Users.findOne({ email: req.body.email}, (err, user) => {
    if (err) {
      return res.status(404).json({
        title: 'An error ocurred',
        error: err
      });
    }
    if (!user) {
      return res.status(404).json({
        title: 'No user found',
        error: { message: "can't find the user" }
      });
    }
    if (!passwordHash.verify(req.body.password, user.password)) {
      return res.status(404).json({
        title: "Can't signin",
        error: { message: "Invalid password"}
      });
    }
    var token = jwt.sign({ user: user}, Config.SUPER_SECRET,
                          { expiresIn: TWO_MONTHS })
    res.status(200).json({ message: 'Success', token: token})
  })
})

// this is signup
api_router.post('/user', (req, res) => {
  console.log("POST /api/user")
  let hashed_password = passwordHash.generate(req.body.password)
  model.createUser({ name: req.body.name,
                     email: req.body.email,
                     password: hashed_password })
    .then(user => {
      res.json({ user: user});
    })
    .catch(err => {
      res.status(404).json({
        title: "Can't create new user",
        error: err
      });
    });
});

// TODO: Delete this route, as it is only for debuggin purposes
api_router.get('/user/:email', (req, res) => {
  console.log('GET /api/user/'+req.params.email)
  model.Users.findOne({email: req.params.email}, (err, user) => {
    if (err) {
      return res.status(404).json({
        title: "Can't find user",
        error: err
      })
    }
    if (!user) {
      return res.status(404).json({
        title: 'No user found',
        error: { message: "can't find the user" }
      });
    }
    res.json({ message: "Succes", user: user})
  })
})

export const api = api_router;
