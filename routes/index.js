var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' ,estadoHome:"active",estadoJuego:"",estadoCuadros:"",estadoNaves:""});
});

module.exports = router;
