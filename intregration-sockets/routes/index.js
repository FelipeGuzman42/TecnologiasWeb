var express = require('express');
var router = express.Router();

/* GET home page. */
const array = [{id: 1, name: "Casablanca"},{id: 2, name: "ET"},{id: 3, name: "Tiburón"}];
router.get('/', function(req, res, next) {
  res.send(array)
});

module.exports = router;
