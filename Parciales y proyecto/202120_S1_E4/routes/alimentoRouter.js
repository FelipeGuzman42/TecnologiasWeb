let express = require("express");
const Joi = require("joi");

const Alimento = require("../models/alimento");

const checkToken = require("../jwt/checkToken");

let router = express.Router();

const schema = Joi.object({
  nombre: Joi.string().min(3).max(30).required(),
  gramos: Joi.number(),
  calorias: Joi.number(),
  vitaminas: Joi.number(),
  proteinas: Joi.number(),
  carbohidratos: Joi.number(),
  grasa: Joi.number(),
  sodio: Joi.number(),
});

router.get("/alimentos", function (req,res)
{
  Alimento.findAll().then(alimentos=>{res.send(alimentos);});
});

router.get("/alimentos/:id",  function (req,res)
{
  Alimento.findByPk(req.params.id).then(alimento=>{
    if (alimento === null) {
      return res.status(404).send("No se encontro un alimento con ese id");
    }
    res.send(alimento);
  });


});

router.post("/alimentos",  function (req, res) {
  
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).send(error);
  }
  
  Alimento.create(req.body).then(alimento=>{
    res.send(alimento);
  });
  
});

router.put("/alimentos/:id", checkToken, function (req, res) {
  Alimento.update(req.body, { where: {
    id: req.params.id
  }}).then(result=>{
    if (result[0] === 0) {
      return res.status(404).send("No se encontro un alimento con ese id");
    }
    res.send("Alimento actualizado");
  });
});

router.delete("/alimentos/:id", checkToken, function (req, res) {
  
  Alimento.destroy({where: {
    id: req.params.id
  }}).then(result=>{
    if(result === 0) {
      return res.status(404).send("No se encontro un alimento con ese id");
    }
    res.sendStatus(204);
  });
});
  
module.exports = router;

