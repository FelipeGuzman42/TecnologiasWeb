let express = require("express");
const Joi = require("joi");

const Plato = require("../models/plato");
const checkToken = require("../jwt/checkToken");

let router = express.Router();

const schema = Joi.object({nombre: Joi.string().min(3).max(30).required()});

router.get("/platos", checkToken, function (req,res)
{
  Plato.findAll().then(platos=>{res.send(platos);});
});

router.get("/platos/:id", checkToken, function (req,res)
{
  Plato.findByPk(req.params.id).then(plato=>{
    if (plato === null) {
      return res.status(404).send("No se encontro un plato con ese id");
    }
    res.send(plato);
  });


});

router.post("/platos", checkToken, function (req, res) {
  
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).send(error);
  }
  
  Plato.create(req.body).then(plato=>{
    res.send(plato);
  });
  
});

router.put("/platos/:id", checkToken, function (req, res) {
  Plato.update(req.body, { where: {
    id: req.params.id
  }}).then(result=>{
    if (result[0] === 0) {
      return res.status(404).send("No se encontro un plato con ese id");
    }
    res.send("Plato actualizado");
  });
});

router.delete("/platos/:id", checkToken, function (req, res) {
  
  Plato.destroy({where: {
    id: req.params.id
  }}).then(result=>{
    if(result === 0) {
      return res.status(404).send("No se encontro un plato con ese id");
    }
    res.sendStatus(204);
  });
});
  
module.exports = router;

