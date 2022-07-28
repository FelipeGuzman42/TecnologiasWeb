let express = require("express");
const Joi = require("joi");
let router = express.Router();

const Dieta = require("../models/dieta");

const checkToken = require("../jwt/checkToken");

const schema = Joi.object({ 
  nombre: Joi.string().min(3).max(30).required(),
  fechaInicio: Joi.date().required(),
  fechaFin: Joi.date().greater("now").required()});

router.get("/dietas", checkToken, function (req, res) {
  Dieta.findAll().then(dietas => { res.send(dietas); });
});

router.get("/dietas/:id", checkToken, function (req, res) {
  Dieta.findByPk(req.params.id).then(dieta => {
    if (dieta === null) {
      return res.status(404).send("No se encontro una dieta con ese id");
    }
    res.send(dieta);
  });


});

router.post("/dietas", checkToken, function (req, res) {

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).send(error);
  }

  Dieta.create(req.body).then(dieta => {
    res.send(dieta);
  });

});

router.put("/dietas/:id", checkToken, function (req, res) {
  Dieta.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(result => {
    if (result[0] === 0) {
      return res.status(404).send("No se encontro una dieta con ese id");
    }
    res.send("Dieta actualizada");
  });
});

router.delete("/dietas/:id", checkToken, function (req, res) {

  Dieta.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    if (result === 0) {
      return res.status(404).send("No se encontro una dieta con ese id");
    }
    res.sendStatus(204);
  });
});

module.exports = router;

