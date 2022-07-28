let express = require("express");
let router = express.Router();
const Joi = require("joi");

const CitaMedica = require("../models/citaMedica");
const Usuario = require("../models/usuario");
const Nutritionist = require("../models/nutricionista");

const checkToken = require("../jwt/checkToken");

const schema = Joi.object({
  // se debe llamar igual que el parámetro
  idUsuario: Joi.number().required(),
  idNutritionist: Joi.number().required(),
  fecha: Joi.date().greater("now").required(),
  lugar: Joi.string().min(5).max(30),
  presencial: Joi.boolean().required(),
  link: Joi.string().min(6).max(60),
  duracion: Joi.number().min(30).max(60).required(),
});


/* GET/api/citasMedicas. */
router.get("/citasMedicas", checkToken, function (req, res) {
  CitaMedica.findAll().then(citasMedicas => {
    res.send(citasMedicas);
  });
});


/* GET/api/citasMedicas/id. */
router.get("/citasMedicas/:id", checkToken, function (req, res) {
  CitaMedica.findByPk(req.params.id).then(citaMedica => {
    if (citaMedica === null) {
      return res.status(404).send("The CitaMedica with the given id was no found.");
    }
    res.send(citaMedica);
  });
});

/* POST/api/citasMedicas. */
router.post("/citasMedicas", checkToken, function (req, res) {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).send(error.message);
  }

  Usuario.findByPk(req.body.idUsuario).then(usuario => {
    if (usuario === null) {
      return res.status(404).send("No se encontro un usuario con ese id");
    }
    Nutritionist.findByPk(req.body.idNutritionist).then(nutricionista => {
      if (nutricionista === null) {
        return res.status(404).send("El nutricionista con el id especificado no existe");
      }
      CitaMedica.create(req.body).then(citaMedica => {
        res.send(citaMedica);
      });
    });
  });
});

router.put("/citasMedicas/:id", checkToken, function (req, res) {
  CitaMedica.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(result => {
    if (result[0] === 0) {
      return res.status(404).send("The CitaMedica with the given id was not found");
    }
    res.send("CitaMedica updated");
  });
});

router.delete("/citasMedicas/:id", checkToken, function (req, res) {

  CitaMedica.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    if (result === 0) {
      return res.status(404).send("The CitaMedica with the given id was not found");
    }
    res.sendStatus(204);
  });
});

module.exports = router;
