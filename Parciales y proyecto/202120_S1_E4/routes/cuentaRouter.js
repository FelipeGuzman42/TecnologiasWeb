let express = require("express");
const Joi = require("joi");
const {MD5} = require("crypto-js"); 
const router = express.Router();

const Cuenta = require("../models/cuenta");

const schema = Joi.object({ 
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(3).max(32).required()});

router.post("/cuentas", function (req, res) {

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).send(error);
  }

  req.body.password = MD5(req.body.password).toString(); // hash the password
  Cuenta.create(req.body).then(Cuenta => {
    res.send(Cuenta);
  }).catch(() =>{
    res.status(404).send("The username already exists");
  });

});

module.exports = router;

