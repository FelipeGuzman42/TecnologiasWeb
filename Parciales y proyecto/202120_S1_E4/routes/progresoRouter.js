let express = require("express");
let router = express.Router();
const Joi = require("joi");

const Progreso = require("../models/progreso");
const checkToken = require("../jwt/checkToken");

const validateProgreso = (progreso) => {
  const schema = Joi.object({
    bmi: Joi.number().integer().required(),
    balanceAlimenticio: Joi.number().integer().required(),
    porcionesAlimentos: Joi.number().integer().required(),
  });

  return schema.validate(progreso);
};

router.get("/", checkToken, function (req, res) {
  Progreso.findAll().then((result) => {
    res.send(result);
  });
});

router.get("/:id", checkToken, (req, res) => {
  Progreso.findByPk(req.params.id).then((response) => {
    if (response === null)
    {return res
      .status(404)
      .send("The Progreso with the given id was not found.");}
    res.send(response);
  });
});

router.post("/", checkToken, function (req, res) {
  const { error } = validateProgreso(req.body);

  if (error) {
    return res.status(400).send(error);
  }
  
  Progreso.create({ bmi: req.body.bmi, 
    balanceAlimenticio: req.body.balanceAlimenticio, 
    porcionesAlimentos: req.body.porcionesAlimentos }).then(
    (result) => {
      res.send(result);
    }
  );
});

router.put("/:id", checkToken, (req, res) => {
  Progreso.update(req.body, { where: { id: req.params.id } }).then((response) => {
    if (response[0] !== 0) {res.send({ message: "Progreso updated" });}
    else {res.status(404).send({ message: "Progreso was not found" });}
  });
});

router.delete("/:id", checkToken,(req, res) => {
  Progreso.destroy({
    where: {
      id: req.params.id,
    },
  }).then((response) => {
    if (response === 1) {res.status(204).send();}
    else {res.status(404).send({ message: "Progreso was not found" });}
  });
});

module.exports = router;