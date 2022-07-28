const express = require("express");
let router = express.Router();
const Joi = require("joi");
const { Op } = require("sequelize");

const Nutritionist = require("../models/nutricionista");
const checkToken = require("../jwt/checkToken");

const schema = Joi.object({
  nombre: Joi.string().required(),
  experiencia: Joi.number().required(),
  especializacion: Joi.string().allow(null).required(),
  correo: Joi.string().required(),
  password: Joi.string().required(),
  foto: Joi.string().required(),
  calificacion: Joi.number().required()
});

router.get("/nutricionistas", checkToken, function (req, res) {
  Nutritionist.findAll().then(nutricionistas => {
    res.send(nutricionistas);
  });
});

router.get("/nutricionistas/best", checkToken, function (req, res) {
  Nutritionist.findAll({
    limit: 4,
    where: {
      calificacion: 5
    }
  }).then(nutricionistas => res.send(nutricionistas));
});

router.get("/nutricionistas/:id", checkToken, function (req, res) {
  Nutritionist.findByPk(req.params.id).then(nutricionista => {
    if (nutricionista === null) {
      return res.status(404).send("El nutricionista con el id especificado no existe");
    }
    res.send(nutricionista);
  });
});

router.post("/nutricionistas", checkToken, function (req, res) {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).send(error);
  }

  Nutritionist.create(req.body).then(nutricionista => {
    res.send(nutricionista);
  });
});

router.delete("/nutricionistas/:id", checkToken, function (req, res) {
  Nutritionist.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    if (result === 0) {
      return res.status(404).send("El nutricionista con el id especificado no existe");
    }
    res.sendStatus(204);
  });
});

router.put("/nutricionistas/:id", checkToken, function (req, res) {
  Nutritionist.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(result => {
    if (result[0] === 0) {
      return res.status(404).send("El nutricionista con el id especificado no existe");
    }
    res.send();
  });
});


router.post("/nutricionistas/buscar", checkToken, function (req, res) {
  // Definir los parámetros que harán parte de la búsqueda
  let parametros = {
    experiencia: {
      [Op.gte]: parseInt(req.body.experiencia)
    },
  };
  if (req.body.nombre != null) {
    parametros["nombre"] = req.body.nombre;
  }
  if (req.body.especializacion == true) {
    parametros["especializacion"] = { [Op.not]: null };
  }

  Nutritionist.findAll({
    where: parametros
  }).then(usuario => {
    if (usuario === null) {
      return res.status(404).send("No se encontro un usuario con ese nombre y experiencia");
    }
    res.send(usuario);
  });
});

module.exports = {
  router,
  schema
};
