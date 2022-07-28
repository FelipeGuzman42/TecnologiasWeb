const jwt = require("jsonwebtoken");
const config = require("./config");

function login(req, res){
    const username = req.body.username;
    const password = req.body.password;

    if(username && password){
        //validar el usuario
        const mockedUsername = "admin";
        const mockedPassword = "password";

        if (username === mockedUsername && password === mockedPassword){
            //autenticacion correcta

            //verificar si el usuario tiene un token generado previamente
            const token = jwt.sign({ username }, config.secret, {expiresIn: "24h"});
            res.send({
                success: true,
                message: "Authentication successful",
                token
            });
        } else {
            res.send({
                success: false,
                message: "Authentication failed"
            });
        }
    } else {
        res.send({
            success: false,
            message: "You must provide credentials"
        });
    }
}

module.exports = login;