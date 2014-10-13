var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('nave', { title: 'Juego Magico' ,estadoHome:"",estadoJuego:"",estadoCuadros:"",estadoNaves:"active"});
});

module.exports = router;
