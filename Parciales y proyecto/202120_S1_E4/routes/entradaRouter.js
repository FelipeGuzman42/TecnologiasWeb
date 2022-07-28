const express = require("express");
let router = express.Router();
const Joi = require("joi");

const Entrada = require("../models/entrada");
const checkToken = require("../jwt/checkToken");

const schema = Joi.object({
  titulo: Joi.string().min(3).max(30).required(),
  autor: Joi.string().min(3).max(30).required(),
  descripcion: Joi.string().min(3).max(120).required(),
  dieta: Joi.boolean().required()
});

router.get("/entradas", checkToken,function(req, res) {
  Entrada.findAll().then(entradas => {
    res.send(entradas);
  });
});

router.get("/entradas/:id", checkToken, function(req, res) {
  Entrada.findByPk(req.params.id).then(entrada => {
    if(entrada === null) {
      return res.status(404).send("El entrada con el id especificado no existe");
    }
    res.send(entrada);
  });
});

router.post("/entradas", checkToken, function(req, res) {
  const {error} = schema.validate(req.body);
  if(error) {
    return res.status(404).send(error);
  }

  Entrada.create(req.body).then(entrada => {
    res.send(entrada);
  });
});

router.delete("/entradas/:id", checkToken, function(req, res) {
  Entrada.destroy({where: {
    id: req.params.id
  }}).then(result => {
    if(result === 0) {
      return res.status(404).send("El entrada con el id especificado no existe");
    }
    res.sendStatus(204);
  });
});

router.put("/entradas/:id", checkToken, function(req, res) {
  Entrada.update(req.body, {where: {
    id: req.params.id
  }}).then(result => {
    if(result[0] === 0) {
      return res.status(404).send("La entrada con el id especificado no existe");
    }
    res.send();
  });
});

router.post("/entradas/:id/usuarios/:id2", checkToken, function(req, res) {
  Entrada.findByPk(req.params.id).then(entrada => {
    if(entrada === null) {
      return res.send("La entrada con el id especificado no existe");
    }
    entrada.setUsuario(req.params.id2);
    res.send(entrada);
  });
});

module.exports = router;
