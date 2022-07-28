const jwt = require("jsonwebtoken");
const config = require("./config");
const Usuario = require("../models/usuario");

const {MD5} = require("crypto-js"); 


function login(req, res) {
  const correo = req.body.correo;
  const password = req.body.password;
    

  if(correo && password) {
    //validar el usuario
    Usuario.findOne({ where: { correo } })
      .then(usuario =>{          
        if(usuario === null) {
          res.status(401).send({
            success: false,
            message: "Authentication failed"
          });                  
        }else{ 
          if (MD5(password).toString() === usuario.password) {
            //autenticacion correcta
    
            //verificar si el usuario tiene un token generado previamente
            const token = jwt.sign({ correo }, config.secret, {expiresIn: "24h"});
            res.status(200).send({
              success: true,
              message: "Authentication successful",
              token
            });
          }
          else{ 
            res.status(401).send({
              success: false,
              message: "Authentication failed"
            });
          }
        }

      }).catch();
        
  } else {
    res.status(401).send({
      success: false,
      message: "You must provide credentials"
    });
  }
}

module.exports = login;