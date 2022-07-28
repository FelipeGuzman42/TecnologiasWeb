let express = require("express");
const Joi = require("joi");
let router = express.Router();
const {MD5} = require("crypto-js");

const Usuario = require("../models/usuario");
const Nutritionist = require("../models/nutricionista");
const CitaMedica = require("../models/citaMedica");
const checkToken = require("../jwt/checkToken");

const schema = Joi.object({
  nombre: Joi.string().min(3).max(30).required(),
  edad: Joi.number().integer().min(0).max(150),
  estatura: Joi.number().min(0).max(200),
  peso: Joi.number().min(0).max(250),
  correo: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(3).max(32).required()
});

router.get("/usuarios", checkToken, function (req, res) {
  Usuario.findAll().then(usuarios => { res.send(usuarios); });
});

router.get("/usuarios/:id", checkToken, function (req, res) {
  Usuario.findByPk(req.params.id).then(usuario => {
    if (usuario === null) {
      return res.status(404).send("No se encontro un usuario con ese id");
    }
    res.send(usuario);
  });
});

router.post("/usuarios/correo", function (req, res) {
  Usuario.findOne({ where: { correo: req.body.correo } }).then(usuario => {
    if (usuario === null) {
      return res.status(404).send("No se encontro un usuario con ese id");
    }
    res.send(usuario);
  });
});


router.post("/usuarios", function (req, res) {

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).send(error);
  }

  req.body.password = MD5(req.body.password).toString(); // hash the password
  Usuario.create(req.body).then(usuario => {
    res.send(usuario);
  });

});

router.put("/usuarios/:id", checkToken, function (req, res) {
  Usuario.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(result => {
    if (result[0] === 0) {
      return res.status(404).send("No se encontro un usuario con ese id");
    }
    res.send("Usuario actualizado");
  });
});

router.delete("/usuarios/:id", checkToken, function (req, res) {

  Usuario.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    if (result === 0) {
      return res.status(404).send("No se encontro un usuario con ese id");
    }
    res.sendStatus(204);
  });
});

router.get("/usuarios/:idUsuario/citasMedicas", checkToken, function(req, res) {
  CitaMedica.findAll({
    where: {idUsuario: req.params.idUsuario}
  }).then(citas => res.send(citas));
});

router.get("/usuarios/:idUsuario/nutricionistas", checkToken, function (req, res) {
  CitaMedica.findAll({
    where: {idUsuario: req.params.idUsuario}
  }).then(citas => {
    let idsNutricionistas = {};
    citas.forEach(cita => idsNutricionistas[cita.idNutritionist] = 1);
    Nutritionist.findAll({
      where: {id: Object.keys(idsNutricionistas)}
    }).then(nutricionistas => res.send(nutricionistas));
  });
});

module.exports = router;