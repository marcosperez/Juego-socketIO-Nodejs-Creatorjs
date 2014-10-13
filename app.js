var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();    

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//definimos las rutas
var routes = require('./routes/index');
var users = require('./routes/users');
var juego = require('./routes/juego');
var cuadros = require('./routes/cuadros');
var nave = require('./routes/nave');


app.use('/', routes);
app.use('/users', users);
app.use('/juego',juego);
app.use('/cuadros',cuadros);
app.use('/naves',nave);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

app.set('port',process.env.PORT || 3000);

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3001);

var server = app.listen(3000, function() {
    console.log('El servidor esta corriendo en localhost:%d', server.address().port);
});
var naveOtra=null;
io.on('connection', function(socket){
    console.log('SE CONECTO');

    

    socket.on('join',function(datos){    
        if(naveOtra){
            socket.emit('join',naveOtra);
            socket.broadcast.emit('join',datos);
        }   else{
            naveOtra=datos;
        }
    })

    socket.on('posicion',function(datos){
        //console.log('la otra nave esta en x: '+datos['x']+' - y: '+datos['y']);
        socket.broadcast.emit('posicion',datos);
    
    })
    socket.on('disconnect', function(){
        naveOtra=null;
        socket.broadcast.emit('disconnect');
    });
});

