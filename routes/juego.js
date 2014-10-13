var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('juego', { title: 'Juego Magico' ,estadoHome:"",estadoJuego:"active",estadoCuadros:"",estadoNaves:""});
});

module.exports = router;
