let express = require("express");
let router = express.Router();
const Joi = require("joi");

const HistoriaClinica = require("../models/historiaClinica");
const checkToken = require("../jwt/checkToken");

const validateHistoriaClinica = (HistoriaClinica) => {
  const schema = Joi.object({
    fecha: Joi.date().required(),
    medicamentos: Joi.string().required(),
    enfermedades: Joi.string().required(),
    cirugias: Joi.string().required(),
    alergias: Joi.string().required(),
  });

  return schema.validate(HistoriaClinica);
};

router.get("/", checkToken, function (req, res) {
  HistoriaClinica.findAll().then((result) => {
    res.send(result);
  });
});

router.get("/:id", checkToken, (req, res) => {
  HistoriaClinica.findByPk(req.params.id).then((response) => {
    if (response === null)
    {return res
      .status(404)
      .send("The HistoriaClinica with the given id was not found.");}
    res.send(response);
  });
});

router.post("/", checkToken, function (req, res) {
  const { error } = validateHistoriaClinica(req.body);

  if (error) {
    return res.status(400).send(error);
  }
  
  HistoriaClinica.create({ fecha: req.body.fecha, 
    medicamentos: req.body.medicamentos, 
    enfermedades: req.body.enfermedades, 
    cirugias: req.body.cirugias, 
    alergias: req.body.alergias, }).then(
    (result) => {
      res.send(result);
    }
  );
});

router.put("/:id", checkToken, (req, res) => {
  const { error } = validateHistoriaClinica(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  HistoriaClinica.update(req.body, { where: { id: req.params.id } }).then((response) => {
    if (response[0] !== 0) {res.send({ message: "HistoriaClinica updated" });}
    else {res.status(404).send({ message: "HistoriaClinica was not found" });}
  });
});

router.delete("/:id", checkToken, (req, res) => {
  HistoriaClinica.destroy({
    where: {
      id: req.params.id,
    },
  }).then((response) => {
    if (response === 1) {res.status(204).send();}
    else {res.status(404).send({ message: "HistoriaClinica was not found" });}
  });
});

module.exports = router;