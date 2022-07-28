let express = require("express");
let router = express.Router();
const Joi = require("joi");

const Resena = require("../models/resena");
const checkToken = require("../jwt/checkToken");

const schema = Joi.object({
  // se debe llamar igual que el parámetro
  detalles: Joi.string().min(5).max(60).required(),
  calificacion: Joi.number().min(1).max(5).required(),
});


/* GET/api/resenas. */
router.get("/resenas", checkToken, function (req, res) {
  Resena.findAll().then(resenas => {
    res.send(resenas);
  });
});


/* GET/api/resenas/id. */
router.get("/resenas/:id", checkToken, function (req, res) {
  Resena.findByPk(req.params.id).then(resena => {
    if (resena === null) {
      return res.status(404).send("The Resena with the given id was no found.");
    }
    res.send(resena);
  });
});

/* POST/api/resenas. */
router.post("/resenas", checkToken, function (req, res) {

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(404).send(error.message);
  }

  Resena.create(req.body).then(resena => {
    res.send(resena);
  });
});

router.put("/resenas/:id", checkToken, function (req, res) {

  Resena.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(result => {
    if (result[0] === 0) {
      return res.status(404).send("The Resena with the given id was not found");
    }
    res.send("Resena updated");
  });
});

router.delete("/resenas/:id", checkToken, function (req, res) {

  Resena.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    if (result === 0) {
      return res.status(404).send("The Resena with the given id was not found");
    }
    res.sendStatus(204);
  });
});


module.exports = router;
