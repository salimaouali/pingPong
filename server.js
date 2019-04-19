// --- INIT DEPENDENCIES
let express = require('express'),
    app = express(),
    path = require('path');

// --x
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use('/', express.static("public"));

// ------------------------
// ROUTE
// ------------------------
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/game.html'))
});

// ------------------------
//
// ------------------------
io.on('connection', function(socket){

    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('message', function(message){
        console.log(message);
        io.emit('cool', message);
    });

    socket.broadcast.emit('hi');

});

// ------------------------
// START SERVER
// ------------------------
http.listen(3010,function(){
    console.info('HTTP server started on port 3010');
});