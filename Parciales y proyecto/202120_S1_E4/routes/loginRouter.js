let express = require("express");
let router = express.Router();

const login = require("../jwt/handler");

router.post("/login", login);

module.exports = router;